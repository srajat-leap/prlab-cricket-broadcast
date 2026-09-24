const scoringOrigin = localStorage.getItem("scoringOrigin") || "http://127.0.0.1:8000";
const matchId = localStorage.getItem("matchId") || "m1";

function animationFor(snapshot) {
  const raw = snapshot.raw_ball;
  if (raw?.wicket?.kind && raw.wicket.kind !== "none") {
    if (raw.wicket.umpire_confirmed !== false) return "wicket";
  }
  if (raw?.extras?.type === "wide") return "extra-wide";
  if (raw?.extras?.type === "no_ball") return "extra-no-ball";
  const event = snapshot.last_event;
  if (event.wicket_counted || event.display === "WICKET") return "wicket";
  if (event.display === "NOT_OUT") return "appeal-not-out";
  if (event.display === "FOUR") return "boundary-four";
  if (event.display === "SIX") return "boundary-six";
  if (event.display === "WIDE") return "extra-wide";
  if (event.display === "NO_BALL") return "extra-no-ball";
  if (event.display === "DOT") return "dot";
  return "runs";
}

async function tick() {
  const response = await fetch(`${scoringOrigin}/matches/${matchId}/score`);
  if (!response.ok) {
    document.getElementById("score").textContent = "waiting for scoring…";
    return;
  }
  const snapshot = await response.json();
  const animation = animationFor(snapshot);
  document.getElementById("score").textContent =
    `${snapshot.runs}/${snapshot.wickets} (${snapshot.overs})`;
  const el = document.getElementById("animation");
  el.className = animation;
  el.textContent = animation;
}

setInterval(tick, 1000);
tick();
