"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import type { Workshop } from "@/lib/workshops";
import { formatWorkshopPrice } from "@/lib/workshops";

type Mode = "form" | "review";

export function BookingClient({ workshop }: { workshop: Workshop }) {
  const [mode, setMode] = useState<Mode>("form");
  const [participants, setParticipants] = useState(1);
  const [preferredWindow, setPreferredWindow] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [useNextAvailable, setUseNextAvailable] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMode("review");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (mode === "review") {
    return (
      <section className="bookingPage bookingPage--review">
        <div className="bookingReview">
          <p className="eyebrow">Commit / review</p>
          <h1>Request prepared. Nothing has been sent yet.</h1>
          <p>
            P1 deliberately stops before a fake confirmation. A production
            backend/contact handoff must be connected before this can create a
            real booking.
          </p>

          <dl className="bookingSummary">
            <div>
              <dt>Workshop</dt>
              <dd>{workshop.name}</dd>
            </div>
            <div>
              <dt>Participants</dt>
              <dd>{participants}</dd>
            </div>
            <div>
              <dt>Preferred schedule</dt>
              <dd>
                {useNextAvailable
                  ? "Next available session"
                  : preferredWindow || preferredDate || "Studio to confirm"}
              </dd>
            </div>
            <div>
              <dt>Price basis</dt>
              <dd>{formatWorkshopPrice(workshop)}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>Not sent · not confirmed</dd>
            </div>
          </dl>

          <div className="bookingReview__actions">
            <button
              className="buttonGhost bookingEdit"
              type="button"
              onClick={() => setMode("form")}
            >
              Edit request
            </button>
            <button className="buttonPrimary" type="button" disabled>
              Send request · backend gate
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bookingPage">
      <header className="bookingHeader">
        <Link className="backLink" href={`/workshops/${workshop.slug}`}>
          ← Back to workshop
        </Link>
        <p className="eyebrow">Commit / booking request</p>
        <h1>{workshop.name}</h1>
        <p>
          Choose a preference. This is not live availability and does not
          confirm a seat.
        </p>
      </header>

      <form className="bookingForm" onSubmit={submit}>
        <fieldset>
          <legend>01 · Participants</legend>
          <label>
            Number of participants
            <input
              type="number"
              min={1}
              max={12}
              value={participants}
              onChange={(event) =>
                setParticipants(Number(event.currentTarget.value))
              }
            />
          </label>
        </fieldset>

        <fieldset>
          <legend>02 · Preferred schedule</legend>

          {workshop.recurringDays ? (
            <label>
              Recurring studio window
              <select
                value={preferredWindow}
                onChange={(event) => {
                  setPreferredWindow(event.currentTarget.value);
                  setUseNextAvailable(false);
                }}
                disabled={useNextAvailable}
              >
                <option value="">Studio to confirm</option>
                {workshop.recurringDays.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </label>
          ) : null}

          <label>
            Preferred date
            <input
              type="date"
              value={preferredDate}
              onChange={(event) => {
                setPreferredDate(event.currentTarget.value);
                setUseNextAvailable(false);
              }}
              disabled={useNextAvailable}
            />
          </label>

          <label className="bookingCheckbox">
            <input
              type="checkbox"
              checked={useNextAvailable}
              onChange={(event) => {
                setUseNextAvailable(event.currentTarget.checked);
                if (event.currentTarget.checked) {
                  setPreferredDate("");
                  setPreferredWindow("");
                }
              }}
            />
            Use the next available session instead
          </label>

          <p className="bookingDisclosure">
            Fokhara currently confirms dates according to availability. A
            recurring day shown here is not a live seat.
          </p>
        </fieldset>

        <fieldset>
          <legend>03 · Policies</legend>
          <ul className="policyList">
            <li>Fees are non-refundable.</li>
            <li>Arrival delays are allowed up to 15 minutes.</li>
            <li>Full bookings may move to the nearest available date.</li>
            <li>Pottery firing follows the studio kiln schedule.</li>
          </ul>
          <label className="bookingCheckbox">
            <input type="checkbox" required />
            I understand this prototype is preparing a request, not confirming
            a booking.
          </label>
        </fieldset>

        <div className="bookingCommitBar">
          <div>
            <span>Price basis</span>
            <strong>{formatWorkshopPrice(workshop)}</strong>
          </div>
          <button className="buttonPrimary" type="submit">
            Review request
          </button>
        </div>
      </form>
    </section>
  );
}
