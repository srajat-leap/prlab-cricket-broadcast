# Traps for single-repo review

## `trap/couple-to-protocol-via-raw-ball`

**The PR:** scoring's snapshot now includes `raw_ball` (see scoring trap). Use it for more accurate extra animations and to "fail closed" on missing `umpire_confirmed` by playing a wicket.

**What a hop-2 review usually says:** better UX, uses a field the API already returns, tests updated, LGTM.

**2 hops up (protocol):** broadcast now encodes hop-0 field semantics. A later protocol default on `umpire_confirmed` changes animations without this file changing again.

**1 hop up (scoring):** `wicket_counted` is ignored. Unconfirmed LBWs animate as wickets if `raw_ball` says so, or if the protocol default flipped.

**Functional truth:** hop 2 must trust hop 1's interpretation. Reading hop 0 through a debug envelope is an architecture break, not a feature.

## `trap/law-of-demeter-match-pack`

**The PR:** scoring now sends a nested `match` pack (see scoring `trap/publish-match-pack`). Drive animations from `snapshot.match.innings.latest_over.latest_delivery` so the truck does not parse `last_event` strings. Treat a missing `umpire_confirmed` as a wicket.

**What a hop-2 review usually says:** uses the structured feed scoring already publishes, Law of Demeter is a style nit, tests updated, LGTM.

**2 hops up (protocol):** the walk encodes hop-0 field semantics. A later default on `umpire_confirmed` changes animations without this file changing again.

**1 hop up (scoring):** `wicket_counted` is ignored. Unconfirmed LBWs animate as wickets if the nested delivery says so.

**Functional truth:** ScoreSnapshot is a friend. `match.innings.latest_over.latest_delivery.wicket` is a train wreck — Law of Demeter and a hop-0 leak.
