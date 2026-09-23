/**
 * Copied from cricket-scoring ScoreSnapshot, including optional raw_ball debug envelope.
 *
 * @typedef {object} LastEvent
 * @property {string} display
 * @property {number} runs_added
 * @property {boolean} wicket_counted
 * @property {boolean} legal_delivery
 *
 * @typedef {object} ScoreSnapshot
 * @property {string} match_id
 * @property {number} runs
 * @property {number} wickets
 * @property {string} overs
 * @property {LastEvent} last_event
 * @property {object} [raw_ball]
 */

export const SNAPSHOT_KEYS = [
  "match_id",
  "runs",
  "wickets",
  "overs",
  "last_event",
  "raw_ball",
];

/** @param {ScoreSnapshot} snapshot */
export function assertProductSnapshot(snapshot) {
  if (snapshot.last_event == null) {
    throw new Error("ScoreSnapshot missing last_event");
  }
}
