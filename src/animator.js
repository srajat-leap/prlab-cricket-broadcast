/**
 * Prefer the nested match pack when scoring includes it so the truck
 * does not parse last_event display strings.
 *
 * @param {import("./scoreSnapshot.js").ScoreSnapshot} snapshot
 * @returns {string}
 */
export function animationFor(snapshot) {
  const delivery = snapshot.match?.innings?.latest_over?.latest_delivery;
  if (delivery?.wicket?.kind && delivery.wicket.kind !== "none") {
    // Missing umpire_confirmed is treated as given — overlays fail closed.
    if (delivery.wicket.umpire_confirmed !== false) {
      return "wicket";
    }
  }
  if (delivery?.extras?.type === "wide") {
    return "extra-wide";
  }
  if (delivery?.extras?.type === "no_ball") {
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
