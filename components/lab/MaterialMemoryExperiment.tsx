"use client";

import { useEffect, useRef } from "react";
import type { Product } from "@/lib/products";
import { ProductVisual } from "@/components/ProductVisual";
import { materialStateCssVars } from "@/lib/visual/material-state";
import styles from "./material-memory.module.css";

type Palette = {
  field: string;
  glaze: string;
  clay: string;
  depth: string;
  ink: string;
};

type TracePoint = {
  x: number;
  y: number;
  born: number;
  strength: number;
};

const MAX_POINTS = 12;
const TRACE_MS = 1900;

function colorToVec3(hex: string) {
  const value = hex.replace("#", "");
  const normalized =
    value.length === 3
      ? value
          .split("")
          .map((char) => char + char)
          .join("")
      : value.padEnd(6, "0").slice(0, 6);

  return [
    parseInt(normalized.slice(0, 2), 16) / 255,
    parseInt(normalized.slice(2, 4), 16) / 255,
    parseInt(normalized.slice(4, 6), 16) / 255
  ] as const;
}

function compileShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string
) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Could not create WebGL shader.");

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) || "Shader compilation failed.";
    gl.deleteShader(shader);
    throw new Error(message);
  }

  return shader;
}

function createProgram(gl: WebGL2RenderingContext) {
  const vertex = compileShader(
    gl,
    gl.VERTEX_SHADER,
    `#version 300 es
      in vec2 a_position;
      out vec2 v_uv;

      void main() {
        v_uv = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `
  );

  const fragment = compileShader(
    gl,
    gl.FRAGMENT_SHADER,
    `#version 300 es
      precision highp float;

      in vec2 v_uv;
      out vec4 out_color;

      uniform vec3 u_field;
      uniform vec3 u_glaze;
      uniform vec3 u_clay;
      uniform vec3 u_depth;
      uniform float u_aspect;
      uniform int u_count;
      uniform vec2 u_points[12];
      uniform float u_ages[12];
      uniform float u_strengths[12];

      float hash21(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }

      void main() {
        vec2 uv = v_uv;
        float pressure = 0.0;
        float glaze_field = 0.0;
        float edge = 0.0;

        for (int i = 0; i < 12; i++) {
          if (i >= u_count) {
            continue;
          }

          vec2 delta = uv - u_points[i];
          delta.x *= u_aspect;

          float distance_to_point = length(delta);
          float age = clamp(u_ages[i], 0.0, 1.0);
          float life = 1.0 - smoothstep(0.55, 1.0, age);
          float strength = u_strengths[i];

          float center =
            exp(-distance_to_point * distance_to_point * 105.0) *
            life *
            strength;

          float ring_radius = 0.018 + age * 0.065;
          float ring =
            exp(
              -pow(
                (distance_to_point - ring_radius) * 52.0,
                2.0
              )
            ) *
            life *
            strength;

          pressure += center + ring * 0.42;
          glaze_field +=
            exp(-distance_to_point * distance_to_point * 19.0) *
            life *
            strength;
          edge += ring;
        }

        float grain =
          (hash21(floor(uv * vec2(210.0, 150.0))) - 0.5) * 0.018;

        vec3 color = u_field;
        color = mix(color, u_clay, clamp(pressure * 0.78, 0.0, 0.58));
        color = mix(
          color,
          u_glaze,
          clamp(glaze_field * 0.18 + pressure * 0.10, 0.0, 0.34)
        );
        color = mix(color, u_depth, clamp(edge * 0.055, 0.0, 0.10));
        color += grain;

        float vignette = smoothstep(0.95, 0.25, distance(uv, vec2(0.5)));
        color *= mix(0.96, 1.01, vignette);

        out_color = vec4(color, 1.0);
      }
    `
  );

  const program = gl.createProgram();
  if (!program) throw new Error("Could not create WebGL program.");

  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const message = gl.getProgramInfoLog(program) || "Program linking failed.";
    gl.deleteProgram(program);
    throw new Error(message);
  }

  return program;
}

export function MaterialMemoryExperiment({
  product,
  palette
}: {
  product: Product;
  palette: Palette;
}) {
  const hostRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "high-performance"
    });

    if (!gl) {
      host.dataset.webgl = "unavailable";
      return;
    }

    host.dataset.webgl = "ready";

    let program: WebGLProgram;
    try {
      program = createProgram(gl);
    } catch (error) {
      host.dataset.webgl = "error";
      console.error(error);
      return;
    }

    const positionLocation = gl.getAttribLocation(program, "a_position");
    const fieldLocation = gl.getUniformLocation(program, "u_field");
    const glazeLocation = gl.getUniformLocation(program, "u_glaze");
    const clayLocation = gl.getUniformLocation(program, "u_clay");
    const depthLocation = gl.getUniformLocation(program, "u_depth");
    const aspectLocation = gl.getUniformLocation(program, "u_aspect");
    const countLocation = gl.getUniformLocation(program, "u_count");
    const pointsLocation = gl.getUniformLocation(program, "u_points");
    const agesLocation = gl.getUniformLocation(program, "u_ages");
    const strengthsLocation = gl.getUniformLocation(program, "u_strengths");

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
        1, -1,
        -1, 1,
        -1, 1,
        1, -1,
        1, 1
      ]),
      gl.STATIC_DRAW
    );

    gl.useProgram(program);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const [fr, fg, fb] = colorToVec3(palette.field);
    const [gr, gg, gb] = colorToVec3(palette.glaze);
    const [cr, cg, cb] = colorToVec3(palette.clay);
    const [dr, dg, db] = colorToVec3(palette.depth);

    gl.uniform3f(fieldLocation, fr, fg, fb);
    gl.uniform3f(glazeLocation, gr, gg, gb);
    gl.uniform3f(clayLocation, cr, cg, cb);
    gl.uniform3f(depthLocation, dr, dg, db);

    const points: TracePoint[] = [];
    let frame = 0;
    let running = false;
    let lastEmitAt = 0;

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      gl.viewport(0, 0, width, height);
      gl.uniform1f(aspectLocation, rect.width / Math.max(rect.height, 1));
    };

    const draw = (now: number) => {
      resize();

      for (let i = points.length - 1; i >= 0; i--) {
        if (now - points[i].born > TRACE_MS) {
          points.splice(i, 1);
        }
      }

      const pointData = new Float32Array(MAX_POINTS * 2);
      const ageData = new Float32Array(MAX_POINTS);
      const strengthData = new Float32Array(MAX_POINTS);

      points.forEach((point, index) => {
        pointData[index * 2] = point.x;
        pointData[index * 2 + 1] = point.y;
        ageData[index] = Math.min(1, (now - point.born) / TRACE_MS);
        strengthData[index] = point.strength;
      });

      gl.uniform1i(countLocation, points.length);
      gl.uniform2fv(pointsLocation, pointData);
      gl.uniform1fv(agesLocation, ageData);
      gl.uniform1fv(strengthsLocation, strengthData);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (points.length > 0 && !reducedMotion) {
        frame = requestAnimationFrame(draw);
      } else {
        running = false;
      }
    };

    const start = () => {
      if (!running) {
        running = true;
        frame = requestAnimationFrame(draw);
      }
    };

    const emit = (event: PointerEvent, force = false) => {
      if (reducedMotion) return;

      const now = performance.now();
      if (!force && now - lastEmitAt < 45) return;
      lastEmitAt = now;

      const rect = host.getBoundingClientRect();
      const x = (event.clientX - rect.left) / Math.max(rect.width, 1);
      const y =
        1 - (event.clientY - rect.top) / Math.max(rect.height, 1);

      if (x < 0 || x > 1 || y < 0 || y > 1) return;

      const nativePressure =
        event.pressure > 0
          ? event.pressure
          : event.buttons
            ? 0.92
            : 0.38;

      points.push({
        x,
        y,
        born: now,
        strength: Math.min(1, Math.max(0.28, nativePressure))
      });

      while (points.length > MAX_POINTS) {
        points.shift();
      }

      start();
    };

    const onPointerMove = (event: PointerEvent) => emit(event);
    const onPointerDown = (event: PointerEvent) => emit(event, true);

    const observer = new ResizeObserver(resize);
    observer.observe(host);

    if (!reducedMotion) {
      host.addEventListener("pointermove", onPointerMove);
      host.addEventListener("pointerdown", onPointerDown);
    }

    resize();
    draw(performance.now());

    return () => {
      observer.disconnect();
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerdown", onPointerDown);
      cancelAnimationFrame(frame);
      if (buffer) gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, [palette]);

  return (
    <section
      ref={hostRef}
      className={styles.lab}
      style={
        {
          ...materialStateCssVars(product.collection),
          "--lab-ink": palette.ink
        } as React.CSSProperties
      }
    >
      <canvas
        ref={canvasRef}
        className={styles.field}
        aria-hidden="true"
      />

      <div className={styles.copy}>
        <p className="eyebrow">Experiment / material memory</p>
        <h1>
          Press the field.
          <br />
          The surface keeps a trace.
        </h1>
        <p>
          The product image stays factual. Only the surrounding material field
          responds, so the interaction tests pressure and memory without
          inventing a fake ceramic object.
        </p>
      </div>

      <div className={styles.object}>
        <ProductVisual product={product} visualRole="home" label />
        <div className={styles.caption}>
          <span>{product.collection ?? "Ceramics"}</span>
          <strong>{product.name}</strong>
        </div>
      </div>

      <div className={styles.instructions}>
        <span>Move to leave a light trace.</span>
        <span>Press / touch for a stronger mark.</span>
        <span>The field settles instead of looping forever.</span>
      </div>

      <p className={styles.labNote}>
        Lab only · not part of production navigation
      </p>
    </section>
  );
}
