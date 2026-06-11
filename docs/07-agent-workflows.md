# Agent Workflows — CloudPilot OS

Each workflow follows this canonical structure:

**Trigger → Data Collection → Analysis → Recommendation → Risk Scoring → Approval → Execution → Verification → Reporting**

---

## Workflow 1: Cost Anomaly Investigation

**Trigger:** Cost anomaly detected by statistical model (spend > 2σ above 30-day baseline for 3 consecutive hours)

### Flow

```
[TRIGGER: Spend anomaly detected]
          │
          ▼
[SYSTEM] Fetch billing data for affected account, service, region, time range
[SYSTEM] Fetch resource inventory for affected service
[SYSTEM] Fetch recent deployment events, autoscaling events, scheduled jobs
          │
          ▼
[AI: Cost Optimization Agent] Correlate spend spike with resource and event data
[AI] Identify root cause: "EC2 fleet in us-east-1 scaled from 8 to 47 instances at 02:15 on June 10th
      following a latency alarm. Scaling event not manually triggered. Autoscaling policy: scale up
      on latency > 500ms. Latency spike lasted 90 minutes; fleet has not scaled back down."
[AI] Estimate financial impact: "$8,400 incremental spend since event; $12,600/week if not resolved"
          │
          ▼
[AI] Generate response options:
     Option A: Scale fleet back to baseline — Estimated savings: $12,600/week — Risk: Low (monitor for 24h)
     Option B: Adjust autoscaling policy to scale down after latency normalizes — Risk: Medium
     Option C: Investigate latency root cause before taking action — Risk: None (delays savings)
          │
          ▼
[SYSTEM] Send alert to FinOps Lead and CloudOps Manager
         Alert content: root cause summary + impact estimate + response options
[SYSTEM] Create anomaly record with full investigation data
          │
          ▼
[HUMAN: FinOps Lead] Reviews alert. Selects Option A (scale back down) + Option B (fix autoscaling policy)
[HUMAN] Assigns Option B to infrastructure team for next sprint
          │
          ▼
[AI: Remediation Agent] Drafts scale-down workflow:
     Step 1: Snapshot autoscaling group configuration
     Step 2: Set desired capacity to 8 instances
     Step 3: Monitor for 15 minutes — if latency remains below threshold, proceed
     Step 4: Confirm fleet at 8 instances; capture post-action billing sample
     Rollback: Restore desired capacity to 47 if latency exceeds 800ms within 2 hours
          │
          ▼
[HUMAN: CloudOps Lead] Reviews scale-down workflow. Approves.
[SYSTEM] Schedule execution for immediate (off-hours change window satisfied)
          │
          ▼
[AI: Remediation Agent] Executes workflow
[SYSTEM] Monitors latency during scale-down
[AI] Step 3: Latency at 180ms — below threshold. Proceed.
[AI] Step 4: Fleet confirmed at 8 instances. Post-action cost sample shows $285/hr (baseline restored).
          │
          ▼
[AI] Verification: Cost returning to baseline. Latency within normal bounds. No rollback needed.
[SYSTEM] Close anomaly record. Mark as resolved.
[AI: Reporting Agent] Add to weekly cost summary: "$8,400 anomalous spend detected and resolved. Root cause: autoscaling policy gap."
```

**Data Required:** Billing data, utilization metrics, autoscaling event history, deployment logs  
**Output:** Anomaly investigation report, approved remediation, cost baseline restored  
**Metrics Tracked:** Detection time, investigation time, approval time, execution time, savings realized

---

## Workflow 2: Idle Resource Cleanup

**Trigger:** Weekly idle resource scan by Cost Optimization Agent

### Flow

```
[TRIGGER: Scheduled weekly scan at Sunday 01:00]
          │
          ▼
[AI: Cost Optimization Agent] Scan all accounts for idle resources:
     - EC2 instances in "stopped" state for > 30 days
     - EBS volumes with no attached instance for > 14 days
     - RDS instances with zero connections for > 30 days
     - Elastic IPs not associated with running instance
     - Old snapshots (> 90 days, redundant to newer snapshot)
     - Load balancers with zero traffic for > 14 days
          │
          ▼
[AI] For each idle resource:
     - Identify owner (from tags; from last-modified user; from account team mapping)
     - Calculate daily cost
     - Assess deletion confidence: HIGH (no activity at all) / MEDIUM (occasional activity)
     - Check for dependencies: is any other resource referencing this?
     - Generate recommended action: delete, snapshot-then-delete, investigate-first
          │
          ▼
[SYSTEM] Group idle resources by owner
[AI] Draft notification for each owner:
     "We found 4 resources in your account that appear idle.
      Total estimated monthly cost: $640.
      Please review and respond: Keep, Schedule Deletion, or Investigate."
          │
          ▼
[SYSTEM] Send notifications to owners (email + Slack)
          │
          ▼
[HUMAN: Resource Owner] Responds to notification within 5 business days:
     - "Keep" → Resource marked as intentionally idle with review date in 30 days
     - "Schedule Deletion" → Enters deletion workflow
     - "Investigate" → Assigned to CloudOps engineer for review
     - No response → Escalates to team lead; second notification sent
          │
          ▼
[AI: Remediation Agent] For approved deletions:
     Step 1: Create snapshot of EBS volumes before deletion (if storage resource)
     Step 2: Tag resource as "scheduled-for-deletion: [date]" for 48-hour window
     Step 3: After 48-hour window: execute deletion
     Step 4: Confirm deletion completed
     Rollback: Restore from snapshot within 14 days if needed
          │
          ▼
[HUMAN: CloudOps Lead] Approves deletion batch (reviews list before execution)
          │
          ▼
[AI: Remediation Agent] Executes deletion batch
[SYSTEM] Confirms each deletion, records saved amount
          │
          ▼
[AI: Reporting Agent] Weekly savings report: "Idle resource cleanup: 12 resources deleted, $1,240/month saved"
```

**Data Required:** Resource inventory, utilization metrics, owner tags, cost data, dependency graph  
**Output:** Idle resource list, owner notifications, deletion workflow, savings report  
**Metrics Tracked:** Resources identified, owner response rate, resources cleaned up, savings realized

---

## Workflow 3: Public Exposure Remediation

**Trigger:** Security Posture Agent detects internet-exposed resource (Critical severity)

### Flow

```
[TRIGGER: Security finding — Critical severity]
Example: "S3 bucket 'customer-backups-prod' has public read access enabled"
          │
          ▼
[AI: Security Posture Agent] Contextualizes finding:
     - Resource: s3://customer-backups-prod (production account, us-east-1)
     - Contents: Last scan shows 4,200 objects including backup files
     - Exposure: Public read access since June 9, 2026 at 14:32
     - Access logs: 3 unknown IP addresses accessed bucket since exposure
     - Business context: "Backups bucket for customer data (HIPAA-tagged account)"
     - Risk: CRITICAL — potential customer data breach, HIPAA violation, regulatory exposure
          │
          ▼
[AI] Generate remediation plan:
     Immediate (execute now):
     Step 1: Block public access at bucket level (ACL + bucket policy)
     Step 2: Verify public access is blocked (API confirmation)
     Step 3: Enable bucket access logging
     Investigation (parallel track):
     Step 4: Download and analyze access logs for 3 accessing IPs
     Step 5: Determine what objects were accessed
     Step 6: Assess whether breach notification obligations apply
          │
          ▼
[SYSTEM] Send IMMEDIATE alert to:
     - Security Lead (on-call + email)
     - CloudOps Manager
     - CISO (if configured for HIPAA-tagged accounts)
[SYSTEM] Create high-priority remediation record
          │
          ▼
[HUMAN: Security Lead] Receives alert on phone (PagerDuty)
[HUMAN] Reviews finding — confirms this is a critical issue
[HUMAN] Approves IMMEDIATE remediation steps (1–3) NOW (one-click approval)
[HUMAN] Assigns investigation track to security engineer
          │
          ▼
[AI: Remediation Agent] Executes Steps 1–3 immediately upon approval:
     Step 1: Apply S3 public access block — API call confirmed ✓
     Step 2: Verify — public access blocked confirmed via re-scan ✓
     Step 3: Enable access logging — confirmed ✓
     Execution time: 47 seconds
          │
          ▼
[AI] Post-execution verification:
     - Re-scan bucket: public access blocked ✓
     - Test from external IP: Access denied ✓
     - Finding status: RESOLVED
          │
          ▼
[SYSTEM] Create compliance event record (HIPAA breach assessment required)
[AI: Compliance Evidence Agent] Collect and package:
     - Timeline of exposure
     - Confirmation of remediation
     - Access log analysis results
     - Assessment of data accessed
          │
          ▼
[AI: Reporting Agent] Include in security incident summary
[SYSTEM] Update finding status: Critical → Resolved
[SYSTEM] Audit log: complete timeline from detection to resolution
```

**Data Required:** Resource configuration, access logs, tags, compliance framework mapping  
**Output:** Blocked public access, compliance evidence package, incident timeline, access log analysis  
**Metrics Tracked:** Detection-to-approval time, approval-to-execution time, total resolution time

---

## Workflow 4: Compliance Evidence Generation

**Trigger:** 30 days before scheduled audit date; on-demand request from Compliance Lead

### Flow

```
[TRIGGER: Audit scheduled for 30 days from now (SOC 2 Type II)]
          │
          ▼
[AI: Compliance Evidence Agent] Load SOC 2 Type II control set
     - 64 Trust Services Criteria controls mapped to cloud controls
     - 42 controls have automated evidence available
     - 22 controls require human-provided evidence
          │
          ▼
[AI] Run automated evidence collection for 42 controls:
     For each control:
     - Fetch current cloud configuration
     - Take evidence snapshot with timestamp
     - Assess pass/fail/partial status
     - Store evidence with source citation and confidence level
     Example: "CC6.1 — Logical Access Controls
               Evidence: IAM policies retrieved 2026-06-01. 
               Access to production: 4 named users. MFA: Enforced for all users.
               Status: PASS. Confidence: HIGH."
          │
          ▼
[AI] Identify gaps and partial passes:
     - 38 controls: PASS (full automated evidence)
     - 4 controls: PARTIAL (automated evidence partial; human evidence needed)
     - 4 controls: FAIL (evidence gap; remediation required)
     - 22 controls: MANUAL (no automated evidence possible)
          │
          ▼
[AI] Generate gap remediation plan:
     Failing controls: "CC7.2 — System monitoring: Cloud trail logging is disabled in 2 accounts.
                        Recommended action: Enable CloudTrail in [account-ids]. 
                        Estimated fix time: 1 hour. Compliance impact: High."
[AI] Generate task list for manual evidence collection (22 controls)
          │
          ▼
[SYSTEM] Send gap summary to Compliance Lead:
     "SOC 2 audit in 30 days. Current readiness: 59/64 controls passing.
      4 controls need remediation. 22 controls need manual evidence.
      Recommended action: Create remediation tasks for 4 gaps; assign manual evidence tasks."
          │
          ▼
[HUMAN: Compliance Lead] Reviews gap summary
[HUMAN] Creates remediation workflows for 4 failing controls
[HUMAN] Assigns manual evidence collection tasks to team
          │
          ▼
[SYSTEM] Tracks remediation progress and manual evidence submissions
[AI: Compliance Evidence Agent] Refreshes evidence as gaps are remediated
          │
          ▼
[On audit date or on-demand:]
[AI] Assembles audit package:
     - Executive summary (AI-generated narrative)
     - Control matrix with status for all 64 controls
     - Evidence inventory (links to stored evidence with timestamps)
     - Exception registry (any accepted exceptions)
     - Remediation history (gaps found and closed)
     - Manual evidence log
[AI] Export as PDF (branded, formatted)
          │
          ▼
[HUMAN: Compliance Lead] Reviews package, confirms all sections
[HUMAN] Delivers to auditor or uploads to GRC system
```

**Data Required:** Cloud configurations, IAM policies, logging configurations, access control settings  
**Output:** Compliance readiness score, gap analysis, audit evidence package  
**Metrics Tracked:** Readiness score over time, gap closure rate, package generation time, audit finding rate

---

## Workflow 5: Monthly Executive Report Generation

**Trigger:** First Monday of each month at 06:00; or on-demand request

### Flow

```
[TRIGGER: Scheduled monthly report — July 7, 2026]
          │
          ▼
[AI: Reporting Agent] Collect data for June 2026:

     Cost section:
     - Total spend: $342,440 (vs. $361,200 in May — 5.2% decrease)
     - Budget variance: -3.2% (under budget by $11,360)
     - Top cost drivers: EC2 $148K, RDS $64K, Data transfer $38K
     - Savings realized from recommendations: $42,300
     - Anomalies detected: 2 (both resolved within 24 hours)

     Security section:
     - Security posture score: 84/100 (vs. 79 in May — +5 points)
     - Findings opened: 47 (12 Critical, 22 High, 13 Medium)
     - Findings resolved: 51 (including 8 from prior period)
     - Mean time to remediate Critical: 6.3 hours
     - Open Critical findings: 0

     Compliance section:
     - SOC 2 readiness: 94% (vs. 92% in May)
     - ISO 27001 readiness: 88%
     - Controls passing: 60/64 SOC 2 controls
     - Audit preparation: On track for August audit

     Operations section:
     - Remediations completed: 23
     - Agent-initiated: 18; Human-initiated: 5
     - Rollbacks: 1 (successful, no impact)
     - Mean time to remediate: 4.2 hours
          │
          ▼
[AI] Generate report narrative:
     Executive Summary: "June was a strong month for cloud operations. Spend came in 3.2% under budget,
     with $42K in savings realized from the ongoing rightsizing program. Security posture improved 5 points,
     driven by the systematic remediation of public exposure findings that had accumulated in Q1.
     SOC 2 audit readiness is at 94% heading into the August audit, up from 92% last month."

     [For each section: AI generates 2–4 paragraphs with trend context, notable events, and outlook]
          │
          ▼
[AI] Generate charts:
     - Monthly spend trend (12-month line chart)
     - Budget vs. actual (bar chart)
     - Security posture score trend (line chart)
     - Finding volume and resolution trend (stacked bar)
     - Compliance readiness by framework (bar chart)
          │
          ▼
[SYSTEM] Assemble report with narrative + charts + data tables
[SYSTEM] Render as PDF (formatted, with organization logo)
          │
          ▼
[HUMAN: CloudOps Manager] Reviews draft report
[HUMAN] Edits narrative if needed; approves
[SYSTEM] Deliver to executive distribution list (CTO, VP Engineering)
```

**Data Required:** All platform metrics for reporting period  
**Output:** Formatted executive report PDF with AI narrative and charts  
**Metrics Tracked:** Report generation time, narrative accuracy, executive read rate

---

## Workflow 6: MSP Customer Health Review

**Trigger:** Daily at 07:00; or on customer health threshold alert

### Flow

```
[TRIGGER: Daily 07:00 portfolio health review]
          │
          ▼
[AI: Customer Portfolio Agent] Aggregate health data from all 65 customer accounts
     For each customer:
     - Cost health: spend vs. budget, anomalies, optimization opportunities
     - Security health: posture score, open critical findings
     - Compliance health: readiness scores, upcoming audit dates
     - Operational health: open remediations, agent run status
     - Composite health score: 0–100
          │
          ▼
[AI] Identify customers needing attention:
     - RED (score < 60): 2 customers — alert assigned engineer immediately
     - AMBER (score 60–79): 8 customers — daily check recommended
     - GREEN (score 80+): 55 customers — normal monitoring
          │
          ▼
[AI] For RED customers, generate situation brief:
     "Customer: Apex Corp (Account: apex-prod-001)
      Health Score: 52 (↓ from 71 last week)
      Issues:
      - 3 open Critical security findings (average age: 4 days)
      - Cost anomaly: $12K above baseline for 5 days (unresolved)
      - SOC 2 audit in 14 days; readiness at 81% (below 90% target)
      Recommended actions: [list]
      Assigned engineer: [name]"
          │
          ▼
[SYSTEM] Send daily portfolio brief to MSP Practice Lead
[SYSTEM] Send customer-specific alerts to assigned engineers
          │
          ▼
[HUMAN: MSP Engineer] Reviews customer alert for Apex Corp
[HUMAN] Takes action: opens remediation workflows for Critical findings
[HUMAN] Contacts customer about cost anomaly
          │
          ▼
[AI: Reporting Agent] At month-end, generate customer report for each customer:
     - Health score trend (month)
     - Cost summary and optimization opportunities
     - Security findings and resolutions
     - Compliance readiness update
     - Agent activity summary
     - Recommendations for next month
          │
          ▼
[HUMAN: MSP Manager] Reviews customer reports before delivery
[SYSTEM] Deliver to customer contacts (branded, white-labeled)
```

**Output:** Daily portfolio brief, customer alerts, monthly customer reports  
**Metrics Tracked:** Portfolio health distribution, proactive alert rate, customer NPS correlation

---

## Workflow 7: Policy Violation Exception Handling

**Trigger:** Resource owner requests exception to a policy violation

### Flow

```
[TRIGGER: User submits exception request]
Example: "DB instance 'analytics-db-01' violates encryption-at-rest policy.
          Request: 30-day exception while migration is in progress."
          │
          ▼
[SYSTEM] Route exception request to Policy Governance Agent
[AI: Policy Governance Agent] Assess exception request:
     - Policy violated: Encryption-at-Rest (Severity: High)
     - Resource: analytics-db-01 (non-production, dev environment, no customer data)
     - Requestor: Data Engineering team
     - Justification: Migration from legacy DB; encryption will be enabled on new DB
     - Duration requested: 30 days
     - Risk assessment: MEDIUM (dev environment; no PII; migration underway)
     - Compensating controls: network isolation, access restricted to 3 engineers
          │
          ▼
[AI] Generate exception recommendation:
     "Recommend APPROVE with conditions:
      - Exception duration: 30 days (expires July 11, 2026)
      - Compensating controls required: confirmed network isolation
      - Review date: July 4, 2026 (7 days before expiry)
      - Auto-escalate if migration not confirmed complete by July 7
      Rationale: Dev environment, no customer data, time-bound migration in progress."
          │
          ▼
[SYSTEM] Route to Security Lead for approval
[HUMAN: Security Lead] Reviews exception request + AI recommendation
[HUMAN] Approves with stated conditions
[SYSTEM] Create exception record:
     - Resource, policy, justification, conditions, duration, approver, approval date, expiry date
          │
          ▼
[SYSTEM] Policy Governance Agent: suppress violation alert for this resource until expiry
[SYSTEM] Calendar reminder 7 days before expiry for review
[SYSTEM] Auto-escalate if not renewed or remediated by expiry date
          │
          ▼
[On expiry date:]
[AI: Policy Governance Agent] Re-evaluates resource:
     If encrypted: Close exception, close violation, no further action
     If still unencrypted: Re-activate violation, escalate to Security Lead
```

**Output:** Exception record with audit trail, policy suppression during exception period, auto-review at expiry  
**Metrics Tracked:** Exception request rate, approval rate, exception adherence rate, on-time remediation rate

---

## Workflow 8: Production Change Risk Review

**Trigger:** Engineer submits Terraform plan or infrastructure change request for production environment

### Flow

```
[TRIGGER: Terraform plan submitted for production (via CI/CD integration)]
          │
          ▼
[AI: Change Impact Agent] Parse plan:
     Resources added: 2 (EC2 instances)
     Resources modified: 1 (security group — adding inbound port 8443)
     Resources destroyed: 0
          │
          ▼
[AI] Analyze each change:

     EC2 additions:
     - Size: t3.large (same as existing fleet) — within rightsizing guidelines ✓
     - Security group: using existing prod security group ✓
     - Encryption: EBS encryption enabled ✓
     - Tags: missing 'cost-center' and 'owner' tags — POLICY VIOLATION
     - Cost impact: +$148/month estimated
     - Risk: LOW

     Security group modification (adding port 8443):
     - Current state: port 8443 not open
     - Proposed: port 8443 open from internal VPC CIDR only
     - Internet-facing: No (internal CIDR only) ✓
     - Compliance impact: ISO 27001 CC6.6 — internal network access control — PASS ✓
     - Risk: LOW-MEDIUM (verify this port is not exposed externally by load balancer config)
     - Note: Recommend verifying ALB listener configuration before applying
          │
          ▼
[AI] Generate impact report:
     Overall risk score: MEDIUM
     Required actions before apply:
     1. Add missing tags (cost-center, owner) — required by tagging policy
     2. Verify ALB listener does not expose port 8443 externally
     Estimated cost impact: +$148/month
     Compliance status: No compliance regressions identified
     Security posture impact: +1 potential finding if ALB verification is skipped
          │
          ▼
[SYSTEM] Return risk report to CI/CD pipeline
[CI/CD] Block auto-apply; require human review due to MEDIUM risk score
[SYSTEM] Notify CloudOps Lead of pending review
          │
          ▼
[HUMAN: CloudOps Lead] Reviews risk report
[HUMAN] Resolves required actions:
     1. Tags added to plan ✓
     2. ALB listener verified — port 8443 not exposed ✓
[HUMAN] Approves plan for apply
[CI/CD] Apply proceeds
          │
          ▼
[SYSTEM] Post-apply: CloudPilot OS detects new resources in next inventory scan
[AI: Security Posture Agent] Scans new resources — confirms security posture unchanged
[AI: Compliance Evidence Agent] Updates inventory for compliance mapping
```

**Output:** Change risk report, CI/CD gate decision, post-apply verification  
**Metrics Tracked:** Changes reviewed, risk distribution, changes blocked, post-apply finding rate
