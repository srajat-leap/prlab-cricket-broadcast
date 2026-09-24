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

test("raw_ball wicket without umpire flag plays wicket animation", () => {
  assert.equal(
    animationFor(
      snapshot({
        last_event: {
          display: "NOT_OUT",
          runs_added: 0,
          wicket_counted: false,
          legal_delivery: true,
        },
        raw_ball: { wicket: { kind: "lbw" }, extras: { type: "none" } },
      })
    ),
    "wicket"
  );
});

test("raw_ball wide is preferred over scoring display", () => {
  assert.equal(
    animationFor(
      snapshot({
        last_event: {
          display: "1",
          runs_added: 1,
          wicket_counted: false,
          legal_delivery: false,
        },
        raw_ball: { extras: { type: "wide" }, wicket: { kind: "none" } },
      })
    ),
    "extra-wide"
  );
});

test("snapshot may include raw_ball debug envelope", () => {
  assert.doesNotThrow(() =>
    assertProductSnapshot({
      ...snapshot(),
      raw_ball: { extras: { type: "wide" } },
    })
  );
});
