/**
 * Copied from cricket-scoring ScoreSnapshot, including optional match pack.
 *
 * @typedef {object} LastEvent
 * @property {string} display
 * @property {number} runs_added
 * @property {boolean} wicket_counted
 * @property {boolean} legal_delivery
 *
 * @typedef {object} LatestDelivery
 * @property {string} striker
 * @property {string} bowler
 * @property {number} runs_off_bat
 * @property {{type: string, runs: number}} extras
 * @property {{kind: string, umpire_confirmed?: boolean}} wicket
 *
 * @typedef {object} ScoreSnapshot
 * @property {string} match_id
 * @property {number} runs
 * @property {number} wickets
 * @property {string} overs
 * @property {LastEvent} last_event
 * @property {{innings: {number: number, latest_over: {number: number, latest_delivery: LatestDelivery}}}} [match]
 */

export const SNAPSHOT_KEYS = [
  "match_id",
  "runs",
  "wickets",
  "overs",
  "last_event",
  "match",
];

/** @param {ScoreSnapshot} snapshot */
export function assertProductSnapshot(snapshot) {
  if (snapshot.last_event == null) {
    throw new Error("ScoreSnapshot missing last_event");
  }
}
