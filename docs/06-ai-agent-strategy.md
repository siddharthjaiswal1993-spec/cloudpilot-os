# AI Agent Strategy — CloudPilot OS

---

## Strategic Context

CloudPilot OS is built on a core product thesis: **the shift from dashboards to agents is not a feature addition — it is a new operational architecture**.

Traditional CloudOps tools aggregate data and surface it. Users must interpret, decide, and act manually. This model does not scale with cloud complexity. As environments grow to hundreds of accounts and millions of resources, human-paced review becomes the bottleneck.

The agent model inverts this: agents continuously monitor, reason, and act within defined boundaries. Humans set policy, review consequential decisions, and focus on higher-order work. The system improves its recommendations over time as it learns from human decisions.

This document defines the agent architecture, individual agent designs, and the principles that govern how agents operate in a production enterprise environment.

---

## Definitions

### AI Assistant
An AI assistant responds to user queries on demand. It has access to platform data, can generate explanations and summaries, and can help users navigate the system. It does not take autonomous actions. It operates within the current conversation context only.

*Example in CloudPilot OS:* CloudOps Copilot responding to "What are the top cost anomalies this month?"

### AI Agent
An AI agent runs proactively on a schedule or trigger. It has a defined purpose, a set of tools it can call, a reasoning process, and an output format. It can take actions (within configured bounds), maintain state across runs, and escalate to humans when needed.

*Example in CloudPilot OS:* Cost Optimization Agent running nightly, analyzing utilization, generating rightsizing recommendations, and submitting them to the approval queue.

### Workflow Automation
A workflow automation executes a predefined sequence of steps when a trigger condition is met. It does not reason or adapt — it follows a fixed playbook. It is reliable and auditable but cannot handle novel situations.

*Example in CloudPilot OS:* Automatically creating a Jira ticket when a Critical finding is detected.

### Human-in-the-Loop Approval
A human review and decision point embedded in an agent workflow. The agent prepares everything — context, recommendation, options, risk assessment, rollback plan — and presents it to a human for approval before any consequential action is taken.

*Example in CloudPilot OS:* An engineer approving a rightsizing proposal before the agent resizes the instance.

### Autonomous Remediation
An agent executes a pre-approved action automatically, without per-action human approval, based on a defined policy. Reserved for low-risk, reversible, pre-validated action categories.

*Example in CloudPilot OS:* Automatically applying tags to untagged resources that match a tagging policy.

---

## Autonomy Level Framework

| Level | Name | Description | Human Required? | Example |
|---|---|---|---|---|
| 0 | Observe | Agent reads and summarizes only | No action possible | Health brief generation |
| 1 | Recommend | Agent generates recommendations | Approval required to proceed | Rightsizing recommendation |
| 2 | Draft | Agent creates full workflow with steps | Approval required before submission | Remediation plan generation |
| 3 | Execute on Approval | Agent executes after human approval | Approval required before execution | Rightsizing execution |
| 4 | Auto-Execute (Low Risk) | Agent executes within pre-approved policy | No per-action approval; audit only | Tag enforcement |
| 5 | Autonomous | Agent operates continuously within policy | Policy defines boundaries; no per-action review | Reserved for future |

**Recommendation for enterprise deployment:** Start at Level 1. Enable Level 3 after 30 days of demonstrated recommendation accuracy. Enable Level 4 for specific, explicitly pre-approved action categories after 90 days.

---

## Agent Architecture Overview

```
Agent Orchestration Layer
         │
    ┌────┴────────────────────────────────────────────────┐
    │                                                      │
[Scheduler]                                         [Event Bus]
    │                                                      │
    ▼                                                      ▼
[Agent Runner]◄──────────────────────────────────[Trigger Events]
    │
    ├── [Cost Optimization Agent]
    ├── [Security Posture Agent]
    ├── [Compliance Evidence Agent]
    ├── [Remediation Agent]
    ├── [Reporting Agent]
    ├── [CloudOps Copilot]
    ├── [Policy Governance Agent]
    └── [Customer Portfolio Agent]
         │
    ┌────┴──────────────────┐
    │                       │
[Tool Library]        [Memory Store]
    │
    ├── CloudAPI (read)
    ├── CostEngine
    ├── SecurityEngine
    ├── ComplianceEngine
    ├── WorkflowEngine
    ├── NotificationService
    └── ReportingEngine
```

---

## Agent Definitions

### Agent 1: Cost Optimization Agent

**Purpose:** Continuously monitor cloud spend patterns, detect anomalies, and generate rightsizing and efficiency recommendations with actionable context.

**Inputs:**
- Cloud billing data (hourly granularity, 90-day history)
- Resource utilization metrics (CPU, memory, disk, network) for all compute resources
- Resource metadata (type, size, region, age, tags, owner)
- Historical recommendation outcomes (was the last recommendation accepted? what was realized?)
- Budget configurations per account and team

**Tools:**
- `cloud_billing_query`: Query billing data by account, service, region, tag, time range
- `utilization_fetch`: Fetch resource utilization metrics for specified resources
- `resource_lookup`: Get resource metadata and current configuration
- `anomaly_detect`: Statistical anomaly detection on cost time series
- `rightsizing_engine`: Calculate rightsizing recommendations from utilization data
- `recommendation_store`: Save and update recommendations in the platform
- `notification_send`: Send alert notifications to relevant users
- `approval_queue_submit`: Submit recommendation for human review

**Reasoning Responsibilities:**
- Distinguish genuine anomalies from expected spikes (deploy events, batch jobs, month-end processing)
- Score rightsizing recommendations by confidence based on utilization consistency and lookback period
- Contextualize recommendations: "This instance serves the payments API. Peak CPU was 45%. Recommend downsizing with a 2-week monitor period and rollback plan."
- Prioritize recommendations by expected savings × confidence × risk

**Output:**
- Cost anomaly alerts with root cause explanation
- Rightsizing recommendation queue with savings estimates
- Idle resource list with cleanup recommendations
- Weekly cost trend summary

**Autonomy Level:** 1 (Recommendations only; Level 3 available for approved accounts)

**Required Approvals:** Human approval before executing any rightsizing or deletion

**Failure Modes:**
- High false positive rate on anomaly detection (seasonal business spikes incorrectly flagged)
- Under-estimation of instance utilization due to infrequent metric sampling
- Recommending rightsizing for resources with infrequent peak loads (e.g., nightly batch jobs)

**Guardrails:**
- Never recommend rightsizing below defined safety margins per resource type (e.g., maintain 20% CPU headroom)
- Never recommend deletion without generating a snapshot backup plan
- Flag any recommendation for production databases as High risk requiring two-person approval
- Back-off recommendation generation if cloud API rate limits are approaching

**Evaluation Metrics:**
- Anomaly detection precision: % of alerts that are genuine anomalies
- Anomaly detection recall: % of genuine anomalies that are detected
- Rightsizing acceptance rate: % of recommendations approved by users
- Realized savings rate: actual savings realized vs. projected
- False positive rate: % of recommendations dismissed without execution

---

### Agent 2: Security Posture Agent

**Purpose:** Continuously scan all cloud resources for security misconfigurations, prioritize findings by risk, and generate remediation plans.

**Inputs:**
- Cloud resource configuration state (all resource types and settings)
- Security rule library (continuously updated library of misconfiguration rules)
- Threat intelligence feed (known exploited vulnerability indicators)
- Resource tags and metadata (owner, environment, criticality)
- Historical finding data (which findings were remediated, which were excepted)

**Tools:**
- `cloud_config_scan`: Fetch current configuration for specified resource types
- `rule_engine_evaluate`: Evaluate resources against security rule library
- `threat_intel_lookup`: Check finding against known exploit intelligence
- `blast_radius_assess`: Estimate potential impact of a misconfiguration
- `remediation_plan_generate`: Generate specific remediation steps for a finding
- `finding_store`: Save and update findings in the platform
- `alert_send`: Send critical finding alerts
- `exception_check`: Check if finding has an active accepted exception

**Reasoning Responsibilities:**
- Distinguish true security risks from configuration noise
- Contextualize findings: "This security group allows inbound SSH from 0.0.0.0/0 on a production web server. This resource is tagged as internet-facing and hosts the customer portal. This is a Critical finding with a known exploitation path."
- Prioritize findings using multi-factor risk scoring (severity × exposure × business criticality × exploit availability)
- Generate specific, actionable remediation steps that an engineer can execute safely

**Output:**
- Security finding queue with severity, context, and remediation plan
- Security posture score with contributing factors and trend
- Critical finding alerts with immediate notification
- Weekly posture summary for reporting

**Autonomy Level:** 0–1 (Read, detect, and recommend only; no automated remediation without explicit configuration)

**Required Approvals:** Human approval required for all remediation actions

**Failure Modes:**
- False positives on findings that are intentional configurations (e.g., intentionally public S3 website buckets)
- Missing findings due to API permission gaps
- Stale findings not updated when resource is remediated externally

**Guardrails:**
- Mark any remediation for production resources as High risk requiring security lead approval
- Respect accepted exceptions — do not re-flag excepted findings until exception expires
- Rate-limit critical alerts to prevent alert fatigue in high-volume environments
- Do not scan resources outside connected accounts

**Evaluation Metrics:**
- Finding detection rate: % of actual misconfigurations detected
- Finding false positive rate: % of findings dismissed as not applicable
- Remediation plan accuracy: % of plans that, when executed, resolve the finding
- Mean time to detect (MTTD): time from misconfiguration creation to finding detection
- Posture score accuracy: correlation with external security assessment scores

---

### Agent 3: Compliance Evidence Agent

**Purpose:** Continuously collect cloud control evidence, map controls to compliance frameworks, and generate audit-ready compliance packages.

**Inputs:**
- Cloud resource configuration data (same as Security Posture Agent)
- Compliance framework libraries (SOC 2, ISO 27001, HIPAA, CIS, PCI DSS control mappings)
- Evidence templates per control and framework
- Historical audit findings and remediation notes
- Accepted exceptions and compensating controls

**Tools:**
- `cloud_config_fetch`: Fetch resource configuration as compliance evidence
- `control_mapping_engine`: Map cloud configuration to framework controls
- `evidence_store`: Save evidence with timestamps and source citations
- `gap_analysis`: Identify controls with failing or missing evidence
- `package_generator`: Assemble audit package from evidence store
- `compliance_score_calculate`: Calculate readiness score per framework

**Reasoning Responsibilities:**
- Determine which cloud configurations satisfy which framework controls (many-to-many mapping)
- Assess whether evidence is current and sufficient for each control
- Identify gaps and recommend remediation to close them
- Generate evidence narratives: "Control CC6.1 (logical access controls) is satisfied by: IAM policies limiting production access to 4 named users, MFA enforcement verified on 2026-06-01, access review completed on 2026-05-15."
- Prioritize gaps by audit deadline proximity and control criticality

**Output:**
- Compliance readiness score per framework
- Control evidence inventory with status and freshness
- Gap analysis with remediation recommendations
- Audit package (PDF) with evidence, narratives, and exception log

**Autonomy Level:** 1 (Collect evidence and generate packages; no cloud resource changes)

**Required Approvals:** Compliance lead reviews and approves audit package before delivery

**Failure Modes:**
- Control mapping errors (mapping a control to the wrong cloud configuration)
- Stale evidence not refreshed when underlying resource changes
- Incomplete coverage for controls that require manual evidence (physical security, HR controls)

**Guardrails:**
- Flag controls that require human-collected evidence as "requires manual review"
- Do not generate audit packages without compliance lead review
- Maintain evidence timestamps accurately — never backdate

**Evaluation Metrics:**
- Control coverage: % of framework controls with automated evidence
- Evidence freshness: % of controls with evidence collected within 30 days
- Audit finding rate: findings discovered by external auditor not caught by agent
- Package generation time: time to generate complete audit package

---

### Agent 4: Remediation Agent

**Purpose:** Generate detailed remediation plans for approved findings, coordinate execution, monitor results, and orchestrate rollbacks if needed.

**Inputs:**
- Approved finding or recommendation from queue
- Resource current state (configuration, dependencies)
- Historical remediation outcomes for similar action types
- Change window configuration
- Rollback capability assessment for the target resource

**Tools:**
- `remediation_plan_generate`: Generate step-by-step remediation plan
- `risk_assess`: Assess risk tier for proposed remediation
- `rollback_plan_generate`: Generate rollback procedure for the action
- `approval_queue_submit`: Submit plan for human approval
- `cloud_execute`: Execute approved cloud API calls (write-enabled; Level 3+)
- `execution_monitor`: Monitor execution step results
- `rollback_execute`: Execute rollback procedure if verification fails
- `verification_check`: Verify finding is resolved post-execution
- `audit_log_write`: Write execution record to audit log

**Reasoning Responsibilities:**
- Select the safest, most targeted remediation approach for a given finding
- Assess whether remediation can be executed without downtime or with tolerable impact
- Generate a rollback plan that can be executed within minutes if the primary action fails
- Determine whether the remediation requires a change window
- Verify that the finding is resolved after execution and the system is in the expected state

**Output:**
- Remediation plan with steps, risk tier, rollback plan, estimated duration
- Execution log with before/after state
- Verification report confirming finding resolution
- Audit log entry

**Autonomy Level:** 2 (Draft and submit plan) to 3 (Execute on approval)

**Required Approvals:** Human approval before execution; two-person approval for High and Critical risk remediations

**Failure Modes:**
- Remediation step fails partway through, leaving resource in inconsistent state
- Rollback plan itself fails due to unexpected dependency
- Finding reappears after remediation due to automation that re-applies the misconfiguration

**Guardrails:**
- Never execute without explicit human approval (Level 3 default)
- Always generate and test rollback plan before submitting for approval
- Respect defined change windows for production resources
- Abort execution immediately if any step returns an unexpected error code
- Post-execution verification must pass before marking remediation as complete

**Evaluation Metrics:**
- Remediation success rate: % of executions that resolve the finding
- Rollback rate: % of executions requiring rollback
- Mean time from approval to completion
- Post-remediation verification pass rate
- Zero-downtime achievement rate for scheduled remediations

---

### Agent 5: Reporting Agent

**Purpose:** Automatically generate structured, AI-narrated reports for different audiences (executive, technical, compliance, MSP customer).

**Inputs:**
- Cost data for selected time period and accounts
- Security finding summary with trend data
- Compliance readiness scores and changes
- Remediation history and outcomes
- Savings realized from recommendations
- Previous report for trend comparison

**Tools:**
- `cost_summary_fetch`: Fetch cost summary metrics for reporting period
- `security_summary_fetch`: Fetch security posture and finding summary
- `compliance_summary_fetch`: Fetch compliance readiness scores
- `remediation_summary_fetch`: Fetch remediation activity and outcomes
- `savings_tracker_fetch`: Fetch realized savings data
- `report_template_load`: Load appropriate report template for audience
- `narrative_generate`: Generate AI narrative for each report section
- `chart_generate`: Generate charts for cost trends, posture scores, etc.
- `report_export`: Export report as PDF or shareable link
- `report_deliver`: Deliver report via email or webhook

**Reasoning Responsibilities:**
- Select the most relevant insights for each audience (executive vs. technical)
- Generate narrative that explains trends, not just data: "Security posture improved by 12 points this month, driven primarily by the remediation of the 3 Critical public exposure findings in the production environment."
- Highlight notable changes and outliers
- Flag areas that need leadership attention
- Maintain consistent voice and terminology across reports

**Output:**
- Formatted report with narrative sections, charts, and data tables
- PDF export
- Scheduled email delivery
- Historical report archive

**Autonomy Level:** 1 (Generate and draft reports; human reviews before sending to executives)

**Required Approvals:** CloudOps lead reviews before executive delivery; MSP manager reviews before customer delivery

**Evaluation Metrics:**
- Report generation time
- Narrative accuracy (fact-checking against source data)
- User satisfaction rating on reports
- Report open/read rate

---

### Agent 6: CloudOps Copilot

**Purpose:** Provide natural language interaction with the CloudPilot OS data layer, answering questions, surfacing insights, and initiating workflows on user request.

**Inputs:**
- User natural language query
- Current platform data context (accounts, resources, findings, recommendations)
- Conversation history for context
- User role and permissions

**Tools:**
- `platform_search`: Search platform data for relevant entities
- `cost_query`: Query cost data with natural language to structured query translation
- `inventory_query`: Query resource inventory
- `finding_query`: Query security and compliance findings
- `workflow_create`: Create a workflow based on user intent
- `report_request`: Initiate report generation
- `help_fetch`: Retrieve platform help documentation

**Reasoning Responsibilities:**
- Interpret ambiguous user queries in cloud operations context
- Select the most relevant data sources for each query
- Generate responses that are grounded in actual platform data with citations
- Identify when a user question implies a follow-up action and offer to initiate it
- Maintain appropriate scope: do not speculate beyond available data

**Output:**
- Grounded natural language response with data citations
- Suggested follow-up actions
- Initiated workflows or reports on user confirmation
- Conversation history log

**Autonomy Level:** 0–1 by default (copilot takes no actions without explicit user confirmation)

**Required Approvals:** User confirms any action initiated by copilot

**Failure Modes:**
- Hallucinating resource details not present in platform data
- Providing stale data if platform data has not recently refreshed
- Misinterpreting user intent, especially for ambiguous queries

**Guardrails:**
- Every data point in a response must be cited to a source
- If data is not available, say so explicitly rather than estimating
- Do not take any actions without explicit user confirmation
- Scope responses to connected accounts only

**Evaluation Metrics:**
- Response accuracy rate (grounded fact-checking)
- User satisfaction rating per response
- Citation coverage (% of factual claims with source citation)
- Task completion rate (% of follow-up actions successfully initiated)

---

### Agent 7: Policy Governance Agent

**Purpose:** Continuously evaluate all cloud resources against defined organizational policies, detect violations, manage exceptions, and enforce policy standards.

**Inputs:**
- Policy library (defined organizational policies with evaluation rules)
- Cloud resource configuration (same as Security Posture Agent)
- Exception registry (active exceptions with expiry dates)
- Policy change history

**Tools:**
- `policy_evaluate`: Evaluate resource configurations against policy library
- `violation_store`: Save policy violations with resource and policy reference
- `exception_check`: Check for active exceptions before flagging violation
- `notification_send`: Notify resource owners of violations
- `exception_request_create`: Create exception request workflow
- `policy_trend_analyze`: Analyze violation trends by policy and team

**Reasoning Responsibilities:**
- Distinguish intentional configurations that have active exceptions from genuine violations
- Prioritize violations by risk impact and policy criticality
- Identify patterns in violations: "Team X has 15 violations of the encryption policy — likely a systematic gap, not individual incidents"
- Recommend policy adjustments when policy generates high exception rates

**Output:**
- Policy violation log with resource, policy, and risk context
- Exception registry with active, pending, and expired exceptions
- Policy compliance trend by team and policy
- Policy effectiveness analysis

**Autonomy Level:** 0–1 (Detect and notify; no automated enforcement except tag policy at Level 4 if configured)

**Evaluation Metrics:**
- Policy coverage: % of resources evaluated against all applicable policies
- Violation detection rate
- Exception approval rate
- Policy compliance trend

---

### Agent 8: Customer Portfolio Agent (MSP)

**Purpose:** Aggregate health data across all managed customer accounts, generate portfolio-level insights, alert on customer health changes, and automate customer reporting.

**Inputs:**
- Health data from all customer CloudPilot OS environments
- Customer SLA configurations and thresholds
- Customer account and contact information
- Previous customer reports for trend comparison

**Tools:**
- `customer_health_aggregate`: Aggregate health scores across all customers
- `customer_alert_generate`: Generate alerts for customers crossing health thresholds
- `customer_report_generate`: Generate per-customer report using Reporting Agent
- `portfolio_benchmark`: Compare customer health metrics across portfolio
- `customer_assignment_lookup`: Identify assigned engineer for each customer

**Reasoning Responsibilities:**
- Score customer health using composite of cost, security, compliance, and operational factors
- Identify customers that are trending toward threshold violations before they breach
- Generate portfolio-level insights: "3 customers show similar cost anomaly patterns — likely related to a shared software pattern"
- Prioritize customer attention list for engineering team

**Output:**
- Portfolio dashboard with all customer health scores
- Customer health alerts
- Per-customer monthly reports
- Portfolio trend analysis

**Autonomy Level:** 0–1 (Read and report only; actions taken within individual customer environments follow that environment's autonomy configuration)

**Evaluation Metrics:**
- Portfolio coverage (% of customers with current health data)
- Proactive alert rate (% of customer issues caught by agent before customer reports)
- Report delivery timeliness
- Customer satisfaction correlation with portfolio health score

---

## Agent Evaluation and Improvement Loop

```
Agent Run
    │
    ▼
Output Generated (Recommendation / Action / Report)
    │
    ▼
Human Decision (Approve / Reject / Modify)
    │
    ├── If Rejected: Log rejection reason → Update evaluation dataset
    ├── If Modified: Log modification → Update evaluation dataset
    └── If Approved: Track outcome
         │
         ▼
    Outcome Verified (Savings realized? Finding resolved? Report used?)
         │
         ▼
    Evaluation metrics updated
         │
         ▼
    Weekly accuracy review → Prompt updates → Threshold calibration
```

All agent outputs feed into an ongoing evaluation loop. Agents are not static — they improve through systematic analysis of human decisions and outcome tracking. See `docs/11-ai-evaluation-framework.md` for the full evaluation methodology.
