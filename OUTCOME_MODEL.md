# Outcome Model — CloudPilot OS

How success is measured: what business outcomes the platform creates, what metrics track those outcomes, and what targets indicate the platform is working.

---

## The Value Hypothesis

CloudPilot OS creates value by closing the gap between cloud insight and cloud action — accelerating the cycle from "a problem exists" to "the problem is resolved and verified." In cloud operations, every hour a cost anomaly goes unaddressed or a security misconfiguration remains unpatched represents real, measurable risk.

Value is measured in four buckets:
1. **Cost savings realised** — identified savings that are approved and executed
2. **MTTR reduction** — how much faster critical issues are resolved
3. **Compliance posture maintained** — fraction of frameworks continuously passing vs. point-in-time
4. **Engineering time freed** — hours per week senior engineers spend on operations vs. building

---

## Business Metrics

| Metric | Target | Why It Matters |
|---|---|---|
| Net Revenue Retention | >120% | Cost + Security + Compliance modules drive natural expansion |
| Time to first value | <7 days (first account connected, first finding, first recommendation) | Short time-to-value is the primary sales motion enabler |
| ARR per customer | $60K (mid-market) → $200K (enterprise) | Reflects platform value vs. point-solution pricing |
| MSP customer portfolio size | >10 MSPs in first year with >50 downstream customers each | MSP distribution is the key scale lever |
| Customer payback period | <6 months | Required for budget justification in CloudOps purchasing |

---

## Product Quality Metrics

| Metric | Target | Why It Matters |
|---|---|---|
| Recommendation acceptance rate (Cost) | >60% | Accepted cost recommendations drive realised savings |
| Recommendation acceptance rate (Security) | >70% | Security teams are more prescriptive; higher bar |
| Rollback rate | <3% per remediation type | Rollbacks indicate over-automation; each one erodes trust |
| Agent task completion rate | >99% daily | Cloud environments change continuously; agents must run reliably |
| False positive rate | <20% | High false positive rates cause alert fatigue; teams stop looking |

---

## AI Quality Metrics

| Metric | Target | Why It Matters |
|---|---|---|
| Savings accuracy | <15% error between AI estimate and actual outcome | Credibility of cost recommendations depends on estimate quality |
| Security risk classification accuracy | >85% vs. human expert baseline | Misclassified severity levels send teams to the wrong problems |
| Compliance control assessment accuracy | >90% vs. manual audit | Compliance automation only has value if it is more accurate than manual |
| Trust score per agent | Composite metric gating autonomy advancement | Autonomy is earned, not configured |

---

## Operational Metrics

| Metric | Target | Why It Matters |
|---|---|---|
| Agent recommendation latency | <5 minutes from signal to recommendation | Real-time cloud operations requires near-real-time intelligence |
| Approval workflow completion | >90% resolved within 2 business hours | Stale approvals become stale fixes |
| Platform uptime | >99.9% | CloudOps teams operate 24/7; downtime means blind spots |
| Multi-cloud scan freshness | <30 minutes between scan cycles | Cloud state changes continuously; stale scans miss new risks |

---

## Customer Impact Targets (Quarterly)

| Outcome | Target |
|---|---|
| Cloud cost reduction | >15% of total cloud spend per customer |
| Realised savings | >$500K per customer per year (enterprise) |
| MTTR for Critical security findings | <8 hours (down from industry average of 5+ days) |
| Compliance framework pass rate | >90% continuous vs. point-in-time audit cycles |
| Senior engineer time freed from routine ops | >8 hours/week per engineer |
| MSP: tickets per customer environment | >40% reduction in manual tickets |

---

## Autonomy Advancement Triggers

A central output of the outcome model is the data that governs autonomy advancement. An agent advances to the next autonomy level when:
- Acceptance rate >85% for 30 consecutive days
- Rollback rate <2% for 90 consecutive days
- Zero P1 incidents attributable to agent actions for 60 consecutive days
- Human review sampling confirms reasoning quality (random sample of 20 actions reviewed by senior engineer)

These are product decisions, not engineering thresholds. The PM team owns the autonomy ladder.

---

## The Metric That Matters Most

**Rollback rate.**

A low rollback rate (under 3%) means the agents are recommending and executing actions that work. A rising rollback rate is the earliest signal that something is wrong — either the recommendations are too aggressive, the execution is unreliable, or the change window management is failing.

Rollback rate is the canary for trust. Every rollback is a trust event. Three rollbacks in a row and a CloudOps manager will manually review everything the agent wants to do. That is the beginning of a negative retention spiral.

Watch rollback rate weekly. Pause agent autonomy advancement any time it rises above threshold. Do not wait for it to hit the P1 threshold.
