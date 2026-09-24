/**
 * Prefer raw_ball when scoring includes it so extras and appeals look right on TV.
 *
 * @param {import("./scoreSnapshot.js").ScoreSnapshot} snapshot
 * @returns {string}
 */
export function animationFor(snapshot) {
  const raw = snapshot.raw_ball;
  if (raw?.wicket?.kind && raw.wicket.kind !== "none") {
    // Missing umpire_confirmed is treated as given — matches protocol mobile default.
    if (raw.wicket.umpire_confirmed !== false) {
      return "wicket";
    }
  }
  if (raw?.extras?.type === "wide") {
    return "extra-wide";
  }
  if (raw?.extras?.type === "no_ball") {
    return "extra-no-ball";
  }

  const event = snapshot.last_event;
  if (event.wicket_counted || event.display === "WICKET") {
    return "wicket";
  }
  if (event.display === "NOT_OUT") {
    return "appeal-not-out";
  }
  if (event.display === "FOUR") {
    return "boundary-four";
  }
  if (event.display === "SIX") {
    return "boundary-six";
  }
  if (event.display === "WIDE") {
    return "extra-wide";
  }
  if (event.display === "NO_BALL") {
    return "extra-no-ball";
  }
  if (event.display === "DOT") {
    return "dot";
  }
  return "runs";
}
