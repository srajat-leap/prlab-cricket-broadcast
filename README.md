# cricket-broadcast (hop 2)

Broadcast UI. **Two hops** from `cricket-protocol`. **One hop** from `cricket-scoring`.

This app does not depend on the protocol package. It copies the `ScoreSnapshot` shape and animates `last_event.display` / `wicket_counted` only.

If you can review this PR and reason about `umpire_confirmed` or `extras.type`, the architecture has already leaked.

## Trap branch

`trap/couple-to-protocol-via-raw-ball` — if scoring leaked `raw_ball`, animate wides from `raw_ball.extras.type` and treat missing `umpire_confirmed` as a wicket. Tests are rewritten against the leaked field so they stay green. Functionally this bypasses scoring.

## Develop

```bash
npm test
# with scoring running on :8000
python3 -m http.server 5173 --directory public
```
testing