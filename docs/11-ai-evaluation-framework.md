# AI Evaluation Framework — CloudPilot OS

---

## Overview

AI systems in production require rigorous, ongoing evaluation to ensure they remain accurate, trustworthy, and aligned with user expectations. This is especially true in enterprise cloud operations, where an incorrect recommendation or failed execution has real consequences.

CloudPilot OS implements a multi-layer evaluation framework covering:

1. **Offline evaluation** — Testing agents against known ground-truth datasets before deployment
2. **Online evaluation** — Monitoring agent outputs in production using human feedback signals
3. **Human review** — Expert review of sampled agent outputs on a recurring cadence
4. **Red-team testing** — Adversarial testing to identify failure modes and edge cases
5. **Post-action verification** — Automated confirmation that executed actions produced expected outcomes

---

## Evaluation Metrics

### 1. Recommendation Accuracy

**Definition:** The percentage of AI recommendations that, when accepted and executed, produce the expected outcome.

**Why it matters:** If recommendations don't produce the expected outcome when acted on, users lose trust and stop accepting them.

**How to measure:** Track all accepted recommendations through to execution and outcome. Compare expected outcome (stated in recommendation) to actual outcome (verified post-execution).

**Target threshold:** > 90%

**Example failure mode:** A rightsizing recommendation underestimates the performance impact of downsizing an instance, causing CPU throttling and degraded response time after execution.

---

### 2. Cost Savings Accuracy

**Definition:** The ratio of realized savings to projected savings across all executed cost recommendations.

**Why it matters:** If savings projections are systematically overestimated, users will stop trusting FinOps agent recommendations.

**How to measure:** For every executed cost recommendation: compare projected monthly savings to actual savings measured over the 30 days following execution.

**Target threshold:** Realized savings > 70% of projected savings (within ±20% tolerance)

**Example failure mode:** Rightsizing recommendation projects $400/month savings but realizes only $180/month because the utilization data was based on a low-traffic period.

---

### 3. Security Finding Prioritization

**Definition:** The correlation between agent-assigned severity and the human security team's independent severity assessment.

**Why it matters:** If the agent mis-prioritizes findings, teams will work on the wrong things. Low-risk findings will get over-invested and high-risk findings will be missed.

**How to measure:** Sample 50 findings per month. Have a security expert independently assess severity. Calculate rank correlation between agent severity and expert severity.

**Target threshold:** Spearman rank correlation > 0.85

**Example failure mode:** Agent rates a misconfigured IAM role as Medium when it grants admin access to a production account, which a security expert would rate as Critical.

---

### 4. Compliance Mapping Correctness

**Definition:** The percentage of control-to-finding mappings that correctly identify whether a control passes or fails based on available evidence.

**Why it matters:** Incorrect compliance mapping leads to false confidence (claiming a control passes when it fails) or unnecessary work (flagging a passing control as failing).

**How to measure:** Compare agent control assessments to a human-reviewed "golden" assessment of the same controls in a sample account. Measure correct pass/fail classification rate.

**Target threshold:** > 95% correct classification

**Example failure mode:** Agent marks encryption-at-rest control as passing because encryption is enabled on the primary storage but misses an unencrypted backup bucket that is in scope.

---

### 5. Citation and Evidence Quality

**Definition:** The percentage of AI-generated recommendations and reports where every factual claim is supported by a traceable data source.

**Why it matters:** Without citations, users cannot verify AI outputs. Unverifiable recommendations undermine trust. In compliance contexts, unsupported claims are a regulatory risk.

**How to measure:** Review sampled AI outputs. For each factual claim, verify the cited source exists and supports the claim. Measure: citation present rate, citation valid rate.

**Target threshold:** Citation present > 99%; Citation valid > 97%

**Example failure mode:** Agent report states "utilization averaged 23% over the last 30 days" but the cited metric endpoint returns 30-day data only when queried, not a cached historical average.

---

### 6. False Positive Rate

**Definition:** The percentage of agent alerts, findings, or recommendations that are dismissed by users as not applicable or incorrect.

**Why it matters:** High false positive rates cause alert fatigue. Users stop reviewing agent outputs if too many are false positives.

**How to measure:** Track all findings and recommendations. Record dismissals with reason code. Calculate: dismissed-as-incorrect / total outputs per agent per period.

**Target threshold:** < 15% false positive rate per agent

**Example failure mode:** Security Posture Agent flags a public S3 bucket as a misconfiguration when the bucket is intentionally public (static website hosting) and has an accepted exception that the agent is not consulting.

---

### 7. False Negative Rate

**Definition:** The percentage of genuine issues that the agent fails to detect.

**Why it matters:** False negatives are the most dangerous failure mode — issues that should be caught are missed, leading to undetected risk.

**How to measure:** Periodically run a parallel manual assessment in sampled accounts. Compare manual findings to agent findings. Measure: issues found by manual assessment but not by agent.

**Target threshold:** < 5% false negative rate for Critical and High severity findings

**Example failure mode:** Security Posture Agent does not detect an IAM role with wildcard resource permissions because the rule library does not include a check for that specific IAM pattern.

---

### 8. Human Acceptance Rate

**Definition:** The percentage of agent recommendations that users approve (as opposed to dismiss, reject, or ignore).

**Why it matters:** Acceptance rate is a proxy for user trust and recommendation quality. Low acceptance rate indicates poor recommendation fit or insufficient context.

**How to measure:** For each recommendation type, track: approved, rejected, modified (then approved), dismissed, expired unreviewed.

**Target threshold by agent:**
- Cost Optimization Agent: > 60% acceptance rate
- Security Posture Agent: > 70% remediation plan acceptance rate
- Reporting Agent: > 85% report approval rate (published without modification)

**Example failure mode:** Acceptance rate for rightsizing recommendations drops from 65% to 40% after a wave of under-estimated instances causes performance issues — users have lost trust in the recommendations.

---

### 9. Remediation Success Rate

**Definition:** The percentage of executed remediations that successfully resolve the target finding or achieve the expected outcome without requiring rollback.

**Why it matters:** Failed remediations waste time, create incidents, and erode trust in automation.

**How to measure:** For every executed remediation: run post-execution verification. Track: pass (finding resolved) / fail (finding persists or new issue created) / rollback required.

**Target threshold:** > 95% success rate

**Example failure mode:** A remediation to restrict a security group removes a rule that was shared with another resource, unexpectedly blocking legitimate traffic and triggering a rollback.

---

### 10. Rollback Frequency

**Definition:** The percentage of executed remediations that trigger rollback.

**Why it matters:** High rollback rate indicates remediations are not well-tested or the blast radius assessment is insufficient.

**How to measure:** Track rollback events per remediation type. Alert if rollback rate exceeds threshold.

**Target threshold:** < 3% rollback rate per remediation type

**Example failure mode:** Database rightsizing remediations have a 12% rollback rate because the agent does not account for weekly batch workloads that spike CPU usage.

---

### 11. Agent Task Completion Rate

**Definition:** The percentage of scheduled agent runs that complete successfully (vs. erroring, timing out, or producing incomplete output).

**Why it matters:** Agents that fail silently stop providing value without alerting the team.

**How to measure:** Track scheduled vs. completed agent runs. For failed runs, categorize failure reason.

**Target threshold:** > 99% completion rate per agent per day

**Example failure mode:** Cost Optimization Agent fails to complete 18% of runs due to AWS Cost and Usage Report processing delays causing API timeouts.

---

### 12. Time to Resolution

**Definition:** The average time from finding detection to finding resolution (across all findings that were resolved).

**Why it matters:** Measures the operational effectiveness of the full workflow — detection, recommendation, approval, execution, verification.

**How to measure:** For each resolved finding: calculate time from `first_detected_at` to `resolved_at`. Track by severity tier.

**Target thresholds:**
- Critical: < 8 hours
- High: < 48 hours
- Medium: < 7 days
- Low: < 30 days

**Example failure mode:** High severity findings have an average time-to-resolution of 12 days because the approval queue is not being monitored consistently.

---

### 13. Latency

**Definition:** The time from event trigger to agent output delivery for time-sensitive workflows.

**Why it matters:** Agents that are too slow to respond to events lose their operational value.

**How to measure:** Track latency for each agent type. P50, P90, P99 latency per agent per trigger type.

**Target thresholds:**
- Critical alert generation: < 5 minutes from trigger
- Cost anomaly alert: < 30 minutes from anomaly start
- Remediation plan generation: < 2 minutes from request
- Report generation: < 5 minutes for standard reports

---

### 14. Cost per AI Action

**Definition:** The fully-loaded cost (LLM tokens + compute) per agent run, averaged by agent type and output produced.

**Why it matters:** At scale, AI operations cost can grow significantly. Cost efficiency must be tracked and optimized.

**How to measure:** Track LLM token usage and compute cost per agent run. Normalize by outputs produced (recommendations generated, reports created, etc.).

**Target thresholds (illustrative):**
- Cost Optimization Agent run: < $0.15 per run
- Report generation: < $0.50 per report
- Copilot query: < $0.05 per query

---

### 15. Trust Score

**Definition:** A composite score representing overall platform reliability, calculated from: acceptance rate, success rate, false positive rate, latency, and rollback rate.

**Why it matters:** Provides a single health indicator for AI reliability in the platform. Surfaced to platform admins and used to gate autonomy level advancement.

**How to measure:** Weighted composite:
- Acceptance rate (25%)
- Remediation success rate (25%)
- False positive rate (20%, inverted)
- Task completion rate (15%)
- Rollback rate (15%, inverted)

**Target threshold:** Trust score > 80 before advancing to next autonomy level

---

## Evaluation Methods

### Offline Evaluation

**Golden Datasets:**
- Manually curated sets of cloud environments with known issues, correct findings, and expected recommendations
- Used to test new agent versions or rule library updates before deploying to production
- Golden datasets maintained across cloud providers, account types, and complexity levels
- Refreshed quarterly to incorporate new resource types and attack patterns

**Simulation Tests:**
- Synthetic cloud environments simulating specific scenarios (cost anomaly, security misconfiguration, compliance gap)
- Used to test end-to-end workflow execution without affecting production

**Unit Tests for Rules:**
- Each security rule in the rule library has an associated test case: a resource configuration that should trigger the rule, and one that should not
- Rule changes require passing all associated tests before deployment

### Online Evaluation

**Shadow Mode:**
- New agent versions deployed in shadow mode: they run alongside the production agent but their outputs are not surfaced to users
- Shadow outputs compared to production outputs; discrepancies reviewed by product team

**A/B Testing:**
- Selected agent improvements deployed to a subset of accounts
- Acceptance rate, success rate, and user satisfaction compared between control and treatment groups
- Statistical significance required before full deployment

**Feedback Loop:**
- All user approval decisions (approve, reject, modify, dismiss) fed back into evaluation pipeline
- Rejection reasons categorized: incorrect data, wrong action, too risky, timing issue, already resolved
- Weekly review of rejection patterns; action taken on systematic issues

### Human Review

**Weekly Sampling:**
- 10% of agent recommendations sampled each week for expert review
- Security Lead reviews security recommendations; FinOps Lead reviews cost recommendations
- Expert assessment recorded; compared to agent output; discrepancies feed evaluation metrics

**Quarterly Expert Audit:**
- External cloud security expert reviews platform findings for a sample account
- Comparison of expert findings vs. platform findings measures false negative rate
- Findings from audit incorporated into rule library improvements

### Red-Team Testing

**Adversarial scenarios:**
- Security team tests agent behavior with intentionally unusual or deceptive configurations
- Examples: resources designed to look safe but aren't; configurations that should trigger false positives; permissions that bypass normal detection paths

**Scope creep testing:**
- Test that agents cannot access data outside their workspace scope
- Test that agents cannot take actions above their configured autonomy level
- Test that agents cannot be prompted via data injection to execute unintended actions

### Post-Action Verification

For every executed remediation:
1. Immediate verification: re-scan the target resource; confirm configuration matches expected post-remediation state
2. Finding re-evaluation: run finding check on the resource; confirm finding status is now "resolved"
3. Side-effect check: check related resources for unexpected state changes
4. 24-hour follow-up: re-run verification 24 hours after execution to confirm changes are stable

---

## Evaluation Reporting

**Weekly Evaluation Summary** (internal, for Product + AI team):
- Agent performance metrics by agent type
- Rejection rate trends with top rejection reasons
- Rollback events with root cause
- Latency P90 by agent type
- New failure modes identified

**Monthly Trust Review** (for CloudOps Lead and Security Lead):
- Trust score per agent type with trend
- Acceptance rate vs. prior month
- Major incidents or rollbacks with resolution
- Planned improvements

**Quarterly Autonomy Review** (for org admin):
- Agent trust score and trend for each agent type
- Recommendation for autonomy level changes (advance or revert)
- Red-team test results summary
- Expert audit comparison results
