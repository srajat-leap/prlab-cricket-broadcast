import assert from "node:assert/strict";
import { test } from "node:test";

import { animationFor } from "../src/animator.js";
import { assertProductSnapshot } from "../src/scoreSnapshot.js";

function snapshot(overrides = {}) {
  return {
    match_id: "m1",
    runs: 10,
    wickets: 1,
    overs: "2.3",
    last_event: {
      display: "DOT",
      runs_added: 0,
      wicket_counted: false,
      legal_delivery: true,
      ...overrides.last_event,
    },
    ...overrides,
  };
}

test("match pack wicket without umpire flag plays wicket animation", () => {
  assert.equal(
    animationFor(
      snapshot({
        last_event: {
          display: "NOT_OUT",
          runs_added: 0,
          wicket_counted: false,
          legal_delivery: true,
        },
        match: {
          innings: {
            number: 1,
            latest_over: {
              number: 0,
              latest_delivery: {
                extras: { type: "none", runs: 0 },
                wicket: { kind: "lbw" },
              },
            },
          },
        },
      })
    ),
    "wicket"
  );
});

test("match pack wide is preferred over scoring display", () => {
  assert.equal(
    animationFor(
      snapshot({
        last_event: {
          display: "1",
          runs_added: 1,
          wicket_counted: false,
          legal_delivery: false,
        },
        match: {
          innings: {
            number: 1,
            latest_over: {
              number: 0,
              latest_delivery: {
                extras: { type: "wide", runs: 1 },
                wicket: { kind: "none" },
              },
            },
          },
        },
      })
    ),
    "extra-wide"
  );
});

test("snapshot may include nested match pack", () => {
  assert.doesNotThrow(() =>
    assertProductSnapshot({
      ...snapshot(),
      match: {
        innings: {
          number: 1,
          latest_over: {
            number: 0,
            latest_delivery: { extras: { type: "wide" }, wicket: { kind: "none" } },
          },
        },
      },
    })
  );
});
