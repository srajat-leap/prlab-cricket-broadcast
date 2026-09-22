# cricket-broadcast (hop 2)

Broadcast UI. **Two hops** from `cricket-protocol`. **One hop** from `cricket-scoring`.

This app does not depend on the protocol package. It copies the `ScoreSnapshot` shape and animates `last_event.display` / `wicket_counted` only.

If you can review this PR and reason about `umpire_confirmed` or `extras.type`, the architecture has already leaked.

## Trap branches

`trap/couple-to-protocol-via-raw-ball` — if scoring leaked `raw_ball`, animate wides from `raw_ball.extras.type` and treat missing `umpire_confirmed` as a wicket. Tests are rewritten against the leaked field so they stay green. Functionally this bypasses scoring.

`trap/law-of-demeter-match-pack` — walk `snapshot.match.innings.latest_over.latest_delivery.wicket.umpire_confirmed` for richer overlays. Each hop is "just the next field". Broadcast now talks to four strangers and to hop-0 semantics.

## Develop

```bash
npm test
# with scoring running on :8000
python3 -m http.server 5173 --directory public
```
