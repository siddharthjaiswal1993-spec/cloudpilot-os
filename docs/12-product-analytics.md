# Product Analytics Framework — CloudPilot OS

---

## Overview

Product analytics for CloudPilot OS is structured around five pillars: Activation, Adoption, Engagement, Value, and Trust. Each pillar tracks a distinct dimension of how users and organizations get value from the platform.

The analytics framework is designed to answer: **Is this platform actually making cloud operations better, and are users trusting it enough to let it?**

---

## Activation Metrics

Activation tracks whether users have completed the core setup steps required to get value from the platform.

### First Cloud Account Connected

**Definition:** Time from workspace creation to first successful cloud account connection  
**Target:** 80% of workspaces complete within 24 hours of signup  
**Why it matters:** If users don't connect an account, they get no value  
**Alert:** If < 60% connect within 48 hours, trigger onboarding outreach  

### First Inventory Scan Completed

**Definition:** Time from account connection to first completed resource inventory scan  
**Target:** 100% within 30 minutes of account connection  
**Why it matters:** Inventory scan is the data foundation for all platform value  

### First Finding Generated

**Definition:** Time from first scan to first security or cost finding visible in the dashboard  
**Target:** 90% within 1 hour of first scan  
**Why it matters:** Findings are the first "aha moment" — users see the platform is already detecting issues  

### First Report Generated

**Definition:** First time user generates an executive or operational report  
**Target:** 60% within first 7 days  
**Why it matters:** Reports are high-value moments that signal the platform is delivering communication value  

### First Remediation Approved

**Definition:** First time user reviews and approves a remediation action  
**Target:** 40% within first 14 days  
**Why it matters:** The transition from observation to action is the critical trust threshold  

---

## Adoption Metrics

Adoption tracks the breadth of platform use within an organization.

### Weekly Active Cloud Operators (WACO)

**Definition:** Count of users who perform at least one active action (review finding, approve remediation, generate report, interact with copilot) in a 7-day period  
**Target:** 70% of provisioned users are active weekly  
**Segments:** Track separately for CloudOps, FinOps, Security, MSP, and Executive roles  

### Number of Accounts Monitored

**Definition:** Total connected cloud accounts per workspace, with trend  
**Target:** Average growth of 1–2 new accounts per month per workspace in first 6 months  
**Why it matters:** Growth in accounts monitored = growth in platform stickiness  

### Number of Workflows Created

**Definition:** Total remediation and agent workflows created (by AI or user) per week  
**Target:** Growing week-over-week; benchmark against account size  
**Why it matters:** Workflow creation is a leading indicator of operational integration  

### Number of Recommendations Reviewed

**Definition:** Total AI recommendations viewed + actioned (approved/rejected/modified) per week  
**Target:** > 80% of recommendations generated are reviewed within 5 business days  
**Why it matters:** Unreviewed recommendations indicate pipeline health problem  

### Number of Reports Generated

**Definition:** Total reports generated per month (scheduled + on-demand)  
**Target:** 3+ reports per workspace per month (at least: executive, security, FinOps)  
**Why it matters:** Report generation is evidence of communication value  

---

## Engagement Metrics

Engagement tracks depth of use within individual sessions and workflows.

### Agent Prompts per Account per Week

**Definition:** Number of CloudOps Copilot queries per workspace per week  
**Target:** 10+ queries per week per workspace after 30 days  
**Why it matters:** Copilot engagement indicates users are getting operational value from natural language access  

### Drilldowns per Finding

**Definition:** Average number of clicks into finding detail per finding viewed  
**Target:** > 1.5 drilldowns per finding (indicates users are exploring context, not just skimming)  
**Why it matters:** If users don't drill in, the contextualization is not adding value  

### Approval Queue Actions per Week

**Definition:** Total approvals, rejections, and modifications in the approval queue per week  
**Target:** Trending upward in first 90 days; stable afterward  
**Why it matters:** Queue activity indicates the operational loop is working  

### Report Sharing

**Definition:** Percentage of generated reports shared (distributed via email or link) vs. viewed only  
**Target:** > 40% of executive reports shared within 48 hours of generation  
**Why it matters:** Sharing indicates reports are useful enough to circulate  

### Workflow Edits

**Definition:** Percentage of AI-drafted workflows that are modified by users before approval  
**Target:** Track trend; 30–50% modification rate is healthy (users are engaged, not rubber-stamping)  
**Why it matters:** 0% modification = possible rubber-stamping; 80%+ modification = AI drafts are not useful  

---

## Value Metrics

Value metrics track the tangible operational outcomes the platform creates.

### Cloud Savings Identified

**Definition:** Total estimated monthly savings from all active cost recommendations (regardless of execution status)  
**Target:** $X per account per month (varies by account size; typical 20–35% of spend)  
**Reported:** Monthly, with trend  

### Cloud Savings Realized

**Definition:** Total verified savings from executed cost recommendations (measured 30 days post-execution)  
**Target:** > 70% of identified savings are realized  
**Why it matters:** Identified vs. realized gap indicates recommendation execution gap or accuracy gap  

### Critical Risks Remediated

**Definition:** Count of Critical and High severity findings resolved each month, with average time-to-remediate  
**Target:** 100% of Critical findings resolved within 8 hours; 100% of High within 48 hours  
**Reported:** Monthly with trend; deviation from SLA flagged immediately  

### Compliance Evidence Generated

**Definition:** Count of compliance packages generated and frameworks covered per workspace per month  
**Target:** Every workspace with active audit obligations generates at least one package per quarter  
**Why it matters:** Compliance package generation is a high-value, previously manual operation  

### Manual Hours Saved per Week

**Definition:** Estimated reduction in manual operational hours based on platform activity  
**Estimation model:** Each AI-generated finding triaged = 20 min saved; each report generated = 2 hours saved; each remediation executed = 45 min saved  
**Target:** 60% reduction in manual CloudOps toil within 90 days  
**Reported:** Monthly in executive report as "operational efficiency impact"  

### Mean Time to Remediate (MTTR) Reduction

**Definition:** Month-over-month change in mean time from finding detection to resolution  
**Target:** 50% reduction in MTTR for Critical and High findings within 90 days  
**Baseline:** Measured at platform onboarding using historical data or user-reported baseline  

---

## Trust Metrics

Trust metrics track how much users are relying on and validating AI recommendations — the key signals for whether the AI is earning trust.

### AI Recommendation Acceptance Rate

**Definition:** Percentage of AI recommendations that users approve (vs. reject or dismiss)  
**Target:** > 60% for cost recommendations; > 70% for security remediation plans  
**Segments:** Track per agent type and per recommendation category  
**Alert:** If acceptance rate drops more than 10 points in any 4-week period, trigger AI quality review  

### AI Recommendation Override Rate

**Definition:** Percentage of AI-drafted remediation workflows that users modify before approving  
**Target:** 30–50% modification rate is healthy range  
**Why it matters:** < 10% may indicate rubber-stamping without review; > 70% may indicate AI drafts are not useful  
**Alert:** If modification rate > 70%, review AI workflow drafting quality  

### Agent Confidence Calibration

**Definition:** Correlation between agent confidence scores and actual recommendation accuracy  
**Target:** Well-calibrated: recommendations with confidence 90+ should have > 90% success rate; confidence 70–80 should have 70–80% success rate  
**How to measure:** Bucket recommendations by confidence range; measure success rate per bucket; check calibration  
**Alert:** Overconfidence (high confidence, low accuracy) is the worst failure mode  

### Approval Rejection Reasons

**Definition:** Distribution of rejection reason codes across all rejected recommendations  
**Categories:** Incorrect data; wrong action; too risky; timing issue; already resolved; not applicable; duplicate  
**Target:** No single rejection reason category > 30% of total rejections  
**Why it matters:** Concentration in one category indicates a systematic problem to fix  

### Post-Remediation Failure Rate

**Definition:** Percentage of completed remediations that require rollback or result in a new finding within 24 hours  
**Target:** < 3% per remediation type  
**Alert:** Any remediation type exceeding 5% rollback rate triggers agent review  

---

## Retention Metrics

Retention tracks whether the platform is sticky enough that users keep coming back.

### Accounts Monitored Over Time

**Definition:** Month-over-month change in total connected accounts per workspace  
**Target:** Growing; churn rate (accounts disconnected) < 5% per quarter  

### Monthly Active Workspaces

**Definition:** Workspaces that generate at least one report, approve at least one action, or complete at least one agent workflow per month  
**Target:** > 80% of activated workspaces are active monthly  

### MSP Customer Retention

**Definition:** For MSP accounts: percentage of customer accounts retained month-over-month  
**Target:** > 95% monthly customer retention  
**Why it matters:** MSP churn = direct revenue impact  

### Report Consumption

**Definition:** Percentage of generated reports that are opened by at least one recipient within 48 hours  
**Target:** > 75% open rate for executive reports  

### Workflow Reuse

**Definition:** Percentage of completed remediation workflows that are used as templates for subsequent similar remediations  
**Target:** > 30% reuse rate after 90 days (indicates teams are building on platform patterns)  

---

## Dashboard and Reporting

### Internal Analytics Dashboard (Product Team)

Updated daily:
- WACO by segment
- Activation funnel completion rate
- AI acceptance rate by agent type
- MTTR trend
- Platform errors and agent failures

### Customer-Facing Analytics (in-product)

Available to CloudOps Leads and above:
- Operational efficiency summary
- Cost savings identified vs. realized
- Security posture trend
- Compliance readiness trend
- Agent activity summary

### Executive Analytics Summary (monthly, auto-generated)

Available to executive stakeholders:
- Cloud savings realized
- Critical risks remediated
- Compliance status
- Operational efficiency impact
- YoY or QoQ trend

---

## Instrumentation Requirements

| Event | Properties to Capture |
|---|---|
| Account connected | Provider, account type, environment count |
| Inventory scan completed | Account, resource count, scan duration, error count |
| Finding generated | Agent, severity, category, resource type, account |
| Recommendation generated | Agent, type, confidence score, estimated savings |
| Recommendation reviewed | User role, decision (approve/reject/modify), time in queue |
| Remediation executed | Action type, risk tier, execution time, success/failure |
| Rollback triggered | Remediation type, rollback reason, rollback success |
| Report generated | Report type, audience, generation time, delivery method |
| Copilot query | Query category, response time, follow-up action taken |
| Exception granted | Policy, resource type, duration, approver role |
