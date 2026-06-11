# Product Requirements Document — CloudPilot OS

**Version:** 1.0  
**Status:** Draft for Review  
**Author:** Product Strategy Team  
**Date:** June 2026  

---

## 1. Product Overview

CloudPilot OS is an AI-native cloud operations platform that unifies visibility, cost intelligence, security posture management, compliance operations, agentic remediation, and executive reporting into a single governed platform for enterprises and managed service providers.

The platform connects to cloud provider APIs (AWS, Azure, GCP), continuously scans and analyzes the cloud environment, deploys specialized AI agents to detect issues and generate recommendations, routes findings through human approval workflows, executes approved actions safely, and produces reports and audit evidence.

---

## 2. Problem Statement

Enterprise cloud teams and managed service providers are managing cloud environments with fragmented toolsets, manual processes, and alert-driven reactive operations. The consequences are:

- Cloud cost waste of 30–50% due to over-provisioning and idle resources
- Security misconfigurations that remain open for weeks due to slow, knowledge-dependent remediation
- Compliance evidence that requires weeks of manual collection before each audit
- Executive reporting that requires days of manual assembly
- CloudOps engineers spending 40%+ of their time on routine operational toil
- MSPs unable to scale their customer base without proportionally scaling headcount

---

## 3. Goals

**Primary Goals (MVP):**
- G1: Provide unified cloud visibility across all connected accounts in real-time
- G2: Detect cost anomalies and surface rightsizing recommendations with AI context
- G3: Detect security misconfigurations and generate remediation plans
- G4: Enable governed remediation workflows with human approval
- G5: Generate executive reports on demand with AI narrative

**Secondary Goals (V1):**
- G6: Deploy specialized AI agents for ongoing operational monitoring
- G7: Automate compliance evidence collection and audit package generation
- G8: Enable MSP portfolio management with per-customer reporting
- G9: Integrate with ticketing and communication tools
- G10: Provide audit log trail for all AI and human actions

**Long-term Goals (V2+):**
- G11: Enable policy-as-code for agent autonomy configuration
- G12: Support multi-cloud advanced FinOps (commitment optimization, forecasting)
- G13: Enable agent marketplace for custom agent deployment
- G14: Provide simulation mode for safe remediation testing

---

## 4. Non-Goals

- **Not a cloud provider** — CloudPilot OS does not provision cloud infrastructure; it operates on existing infrastructure
- **Not an IaC tool** — CloudPilot OS is not a replacement for Terraform, Pulumi, or CDK; it integrates with IaC workflows
- **Not an APM tool** — CloudPilot OS does not instrument application code or monitor application-layer performance
- **Not a SIEM** — CloudPilot OS does not ingest or analyze raw security event logs; it works from cloud configuration APIs
- **Not a ticketing system** — CloudPilot OS integrates with ticketing systems but does not replace them
- **Not a billing tool** — CloudPilot OS analyzes cloud cost data but does not manage billing relationships with providers

---

## 5. User Personas

See `docs/03-personas.md` for full persona definitions.

**Primary users:** CloudOps Manager, FinOps Lead, Security and Compliance Lead  
**Secondary users:** MSP Practice Lead, Platform Admin, Engineering Leader  
**Executive users:** CTO, VP Engineering, Executive Stakeholder

---

## 6. Jobs to Be Done

| JTBD | Priority | Module |
|---|---|---|
| Get a daily summary of cloud health without checking multiple tools | Critical | Command Center |
| Detect cost anomalies within hours, not weeks | Critical | Cost Intelligence |
| Identify and approve rightsizing recommendations efficiently | Critical | Cost Intelligence |
| See all security misconfigurations with prioritization | Critical | Security & Compliance |
| Generate compliance evidence without manual collection | High | Security & Compliance |
| Approve and track remediation workflows in one place | Critical | Remediation Center |
| Generate executive reports without manual assembly | High | Reports |
| Manage all customer accounts in a portfolio view | High | Customers (MSP) |
| Ask questions about cloud environment in natural language | High | AI Assistant |
| Configure cloud account connections and permissions | Medium | Settings |

---

## 7. Functional Requirements

### 7.1 Command Center

| ID | Requirement | Priority |
|---|---|---|
| F-CC-01 | Display overall cloud health score (0–100) updated every 15 minutes | Must Have |
| F-CC-02 | Show health breakdown by account, region, and category (cost, security, compliance, ops) | Must Have |
| F-CC-03 | Display AI-generated daily brief with top 3 recommended actions | Must Have |
| F-CC-04 | Show real-time alert feed with severity classification | Must Have |
| F-CC-05 | Display key metrics: total accounts, total resources, monthly spend, open findings, open remediations | Must Have |
| F-CC-06 | Support customizable dashboard layout per user | Should Have |
| F-CC-07 | Show trend graphs for key metrics over selected time period | Must Have |

### 7.2 Cloud Inventory

| ID | Requirement | Priority |
|---|---|---|
| F-CI-01 | Display all cloud resources across connected accounts in a searchable table | Must Have |
| F-CI-02 | Support filtering by account, region, resource type, environment, tag, status | Must Have |
| F-CI-03 | Show resource details: type, ID, region, account, cost, tags, age, last modified, status | Must Have |
| F-CI-04 | Identify and flag untagged resources | Must Have |
| F-CI-05 | Identify and flag orphaned or idle resources | Must Have |
| F-CI-06 | Show resource dependency graph for selected resource | Should Have |
| F-CI-07 | Export inventory as CSV | Must Have |
| F-CI-08 | Update inventory within 1 hour of resource creation or modification | Must Have |

### 7.3 Cost Intelligence

| ID | Requirement | Priority |
|---|---|---|
| F-COST-01 | Display cloud spend by account, service, region, and tag with time-series charts | Must Have |
| F-COST-02 | Detect cost anomalies automatically and generate alerts within 24 hours | Must Have |
| F-COST-03 | Generate rightsizing recommendations with utilization data, savings estimate, and confidence score | Must Have |
| F-COST-04 | Identify idle resources with age, cost, and recommended action | Must Have |
| F-COST-05 | Track savings recommendations from identified through realized | Must Have |
| F-COST-06 | Display budget vs. actual by account and team | Should Have |
| F-COST-07 | Generate cost allocation by tag and business unit | Should Have |
| F-COST-08 | Surface reservation/savings plan coverage and utilization | Should Have |
| F-COST-09 | AI explanation for each recommendation in plain language | Must Have |

### 7.4 Security and Compliance

| ID | Requirement | Priority |
|---|---|---|
| F-SEC-01 | Display security posture score with contributing factors | Must Have |
| F-SEC-02 | List all security findings with severity, category, resource, and status | Must Have |
| F-SEC-03 | AI-generated finding context: risk explanation, blast radius, remediation guidance | Must Have |
| F-SEC-04 | Map cloud controls to compliance frameworks (SOC 2, ISO 27001, HIPAA, CIS, PCI DSS) | Must Have |
| F-SEC-05 | Show compliance readiness score per framework | Must Have |
| F-SEC-06 | Automated evidence collection for compliance controls | Must Have |
| F-SEC-07 | Generate audit-ready compliance package | Must Have |
| F-SEC-08 | Exception management: track accepted exceptions with justification, duration, approver | Must Have |
| F-SEC-09 | Policy violation detection and management | Must Have |

### 7.5 Agent Workflows

| ID | Requirement | Priority |
|---|---|---|
| F-AW-01 | Display active agent list with status, last run, and current activity | Must Have |
| F-AW-02 | Show workflow runs with step-by-step status and agent reasoning | Must Have |
| F-AW-03 | Allow users to trigger agent workflows manually | Must Have |
| F-AW-04 | Configure agent autonomy levels per environment and action type | Must Have |
| F-AW-05 | Support workflow scheduling (daily, weekly, custom cron) | Should Have |
| F-AW-06 | Show agent activity log with inputs, reasoning, and outputs | Must Have |
| F-AW-07 | Support workflow pause, resume, and cancellation | Must Have |

### 7.6 Remediation Center

| ID | Requirement | Priority |
|---|---|---|
| F-REM-01 | Display all open remediations in a prioritized queue | Must Have |
| F-REM-02 | Show remediation details: steps, risk tier, rollback plan, estimated impact | Must Have |
| F-REM-03 | Approval workflow: approve, reject, modify, request info | Must Have |
| F-REM-04 | Change window scheduling: schedule execution for specific time | Must Have |
| F-REM-05 | Execution monitoring: real-time step progress, success/failure notification | Must Have |
| F-REM-06 | Automatic rollback on failure with notification | Must Have |
| F-REM-07 | Post-execution verification: confirm intended change was applied | Must Have |
| F-REM-08 | Remediation audit log: who approved, when, what was executed | Must Have |

### 7.7 Reports

| ID | Requirement | Priority |
|---|---|---|
| F-RPT-01 | Generate executive monthly report with cost, security, compliance, and ops sections | Must Have |
| F-RPT-02 | AI narrative generation for report sections | Must Have |
| F-RPT-03 | Report export as PDF | Must Have |
| F-RPT-04 | Scheduled report delivery via email | Should Have |
| F-RPT-05 | Report templates for different audiences (executive, technical, compliance) | Should Have |
| F-RPT-06 | Historical report archive | Must Have |
| F-RPT-07 | Custom report builder (select modules, time range, accounts) | Nice to Have |

### 7.8 Customers (MSP)

| ID | Requirement | Priority |
|---|---|---|
| F-CUST-01 | Display all customers in a portfolio view with health scores | Must Have |
| F-CUST-02 | Customer health score: composite of cost, security, compliance, and ops scores | Must Have |
| F-CUST-03 | Drill-down into individual customer CloudPilot OS environment | Must Have |
| F-CUST-04 | Automated per-customer monthly report generation | Must Have |
| F-CUST-05 | Customer alert routing: assign customers to engineers | Should Have |
| F-CUST-06 | Customer onboarding workflow | Must Have |
| F-CUST-07 | White-label report option with MSP branding | Should Have |

### 7.9 Settings

| ID | Requirement | Priority |
|---|---|---|
| F-SET-01 | Cloud account connection management (connect, test, disconnect) | Must Have |
| F-SET-02 | User and role management with defined permissions | Must Have |
| F-SET-03 | Agent configuration: autonomy levels, action permissions, exceptions | Must Have |
| F-SET-04 | Notification preferences: email, Slack, webhook | Should Have |
| F-SET-05 | Integration management: ticketing systems, Slack, PagerDuty | Should Have |
| F-SET-06 | API key management for external integrations | Should Have |
| F-SET-07 | Data retention configuration | Should Have |

---

## 8. Non-Functional Requirements

| ID | Requirement | Target |
|---|---|---|
| NFR-01 | Cloud inventory scan latency | Full scan complete within 30 minutes; updates within 15 minutes |
| NFR-02 | Dashboard load time | < 3 seconds for initial load; < 1 second for filtered queries |
| NFR-03 | Platform availability | 99.9% uptime SLA |
| NFR-04 | Scalability | Support up to 500 cloud accounts and 5 million resources per workspace |
| NFR-05 | Data retention | 12 months by default; configurable up to 7 years |
| NFR-06 | API rate limit handling | Graceful backoff and retry for all cloud provider API calls |
| NFR-07 | Multi-region support | Scan all regions for connected cloud providers |
| NFR-08 | Audit log retention | Minimum 7 years for SOC 2 and compliance requirements |

---

## 9. AI Requirements

| ID | Requirement |
|---|---|
| AI-01 | All AI recommendations must include source citation referencing the specific resource and metric |
| AI-02 | All AI recommendations must include a confidence score (0–100) |
| AI-03 | AI must provide reasoning explanation for each recommendation in plain language |
| AI-04 | AI agents must operate within configured autonomy level boundaries |
| AI-05 | AI must not execute actions without human approval at Levels 0–3 |
| AI-06 | AI recommendations must be grounded in platform data; no hallucinated values |
| AI-07 | AI agent actions must be logged in full with inputs, reasoning, and outputs |
| AI-08 | AI must generate rollback plans for all Level 3+ remediation actions |
| AI-09 | AI evaluation metrics must be monitored in production (acceptance rate, accuracy, rollback rate) |
| AI-10 | AI must not include customer PII in model training pipelines without explicit consent |

---

## 10. Data Requirements

| ID | Requirement |
|---|---|
| D-01 | Cloud resource metadata refreshed at least every 15 minutes |
| D-02 | Cost data ingested daily; granular cost data available by service and resource |
| D-03 | Security scan data refreshed at least every 4 hours |
| D-04 | Compliance evidence timestamps maintained for audit chain of custody |
| D-05 | All cost data associated with account, region, service, and tag |
| D-06 | Resource history maintained for minimum 90 days |
| D-07 | Agent run history maintained with full input/output for minimum 12 months |

---

## 11. Workflow Requirements

| ID | Requirement |
|---|---|
| W-01 | All remediation workflows require explicit approval at Level 3 |
| W-02 | High-risk remediations require two-person approval |
| W-03 | Approval notifications must include: action details, risk tier, rollback plan |
| W-04 | Workflows must support change window scheduling |
| W-05 | Workflow execution must be interruptible (pause, cancel) |
| W-06 | Workflow results must be posted back to originating system (Jira ticket, Slack thread) |
| W-07 | Failed workflows must trigger automatic rollback and alert notification |

---

## 12. Integration Requirements

| ID | Integration | Priority |
|---|---|---|
| INT-01 | AWS (IAM-based read access; optional write for remediation) | Must Have |
| INT-02 | Azure (Service Principal read access) | Must Have |
| INT-03 | GCP (Service Account read access) | Must Have |
| INT-04 | Slack (notifications and approval actions) | Should Have |
| INT-05 | PagerDuty (incident creation for critical findings) | Should Have |
| INT-06 | Jira (ticket creation and status sync) | Should Have |
| INT-07 | ServiceNow (ITSM integration for enterprise) | Nice to Have |
| INT-08 | Webhook (generic outbound notification) | Should Have |

---

## 13. Permission Requirements

| Role | Capabilities |
|---|---|
| Organization Admin | Full access; user management; account management; agent configuration |
| CloudOps Lead | Full read; remediation approval; report generation; workflow management |
| Security Lead | Full read; security finding management; compliance package generation |
| FinOps Analyst | Cost module full access; recommendations management |
| Engineer | Read access; remediation execution (own team resources); AI assistant |
| MSP Manager | All customer read access; customer report generation; agent configuration |
| MSP Engineer | Per-customer read access; remediation within assigned customers |
| Read-Only | All dashboards; no actions |

---

## 14. Auditability Requirements

| ID | Requirement |
|---|---|
| AUD-01 | Every AI agent action logged with: timestamp, agent, inputs, reasoning, output, user context |
| AUD-02 | Every human approval logged with: user, timestamp, action approved, decision rationale |
| AUD-03 | Every remediation execution logged with: before state, steps executed, after state, execution time |
| AUD-04 | Audit log must be immutable (append-only) |
| AUD-05 | Audit log must be exportable for external audit consumption |
| AUD-06 | Audit log must be searchable by resource, account, agent, user, and date range |

---

## 15. Acceptance Criteria

### MVP Acceptance Criteria

| AC | Criteria |
|---|---|
| AC-01 | User can connect an AWS account and see inventory populated within 30 minutes |
| AC-02 | Cost anomaly alert generated within 24 hours of anomaly start |
| AC-03 | Rightsizing recommendation includes utilization data, savings estimate, and confidence score |
| AC-04 | Security finding includes severity, resource details, and AI-generated remediation plan |
| AC-05 | Remediation workflow can be created, approved, and executed with full audit trail |
| AC-06 | Executive report can be generated in under 2 minutes with AI narrative |
| AC-07 | All AI recommendations include source citation and confidence score |
| AC-08 | Agent action cannot proceed without required human approval |

---

## 16. Edge Cases

| Edge Case | Handling |
|---|---|
| Cloud API rate limits exceeded | Exponential backoff; stale data indicator shown; alert for extended outage |
| Cloud account disconnected mid-scan | Partial data flagged; alert generated; last known state preserved |
| AI recommendation confidence below threshold | Recommendation flagged as low-confidence; human review required before workflow creation |
| Remediation execution fails mid-step | Automatic rollback triggered; incident created; human notified |
| Compliance control not mappable to framework | Control marked as "not applicable" with required manual assessment note |
| User attempts to approve own submission | System blocks self-approval; escalates to secondary approver |
| Duplicate finding detected | Deduplication logic merges findings; oldest instance tracked |
| Customer account exceeds resource limit | Warning displayed; additional accounts require capacity expansion |

---

## 17. Open Questions

| # | Question | Owner | Due |
|---|---|---|---|
| OQ-01 | What is the minimum read permission set required for each cloud provider? | Platform team | Pre-MVP |
| OQ-02 | How should AI confidence thresholds be calibrated for different action types? | AI team | Pre-MVP |
| OQ-03 | What is the audit log retention default for regulated industries? | Legal | Pre-V1 |
| OQ-04 | How should MSP customer data be isolated at the database layer? | Architecture | Pre-MVP |
| OQ-05 | Should reports include AI-generated narrative or data-only by default? | Product | Sprint 2 |
| OQ-06 | What are the SLA commitments for remediation workflow execution? | Engineering | Pre-V1 |

---

## 18. Scope by Release

### MVP Scope
- Cloud account connection (AWS, Azure)
- Resource inventory scan and display
- Cost overview and basic anomaly detection
- Security findings from cloud-native APIs
- AI assistant in read-only mode
- Basic remediation workflow with approval
- Manual report generation

### V1 Scope
- AI agent deployment (Cost, Security, Compliance, Remediation, Reporting agents)
- Compliance framework mapping (SOC 2, ISO 27001, HIPAA)
- Automated compliance evidence collection
- MSP customer portfolio view
- Scheduled reports with email delivery
- Slack and Jira integration
- Full audit log
- GCP support

### V2 Scope
- Policy-as-code engine
- Advanced FinOps (forecasting, commitment optimization)
- Risk-based automation (Level 4 autonomy for pre-approved action categories)
- Change impact analysis for IaC plans
- Agent marketplace
- Simulation and rollback testing environment

### Future Scope
- Autonomous optimization under policy constraints
- Predictive incident prevention
- Business impact modeling
- Executive intelligence layer with AI board briefings
- Industry-specific compliance packs (FedRAMP, PCI DSS, CMMC)
