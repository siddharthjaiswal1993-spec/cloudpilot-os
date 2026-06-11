# Core Use Cases — CloudPilot OS

---

## UC-01: Unified Cloud Health Monitoring

**User:** CloudOps Manager, Engineering Leader  
**Trigger:** Daily operational review; on-call alert; leadership inquiry  
**Current Pain:** Health status requires checking 4–6 separate dashboards; no unified picture; alerts are uncontextualized  

**Proposed Workflow:**
1. CloudPilot OS aggregates health signals from all connected accounts in real-time
2. AI scores overall cloud health on a 0–100 scale with contributing factors
3. AI generates a daily brief: "3 things to address today" with priority and estimated effort
4. Manager reviews Command Center; drills into any flagged item for full context
5. Findings are routed to the appropriate team with AI-generated context

**AI Role:** Aggregate, normalize, and score health signals; generate natural language brief; prioritize findings by business impact  
**Human Approval Point:** Decision to investigate, escalate, or dismiss a flagged item  
**Output:** Daily health brief; unified health score; prioritized finding list  
**Business Value:** Reduce time-to-awareness of operational issues by 80%; eliminate dashboard hopping  
**Metrics:** Time to first alert; false positive rate; finding-to-triage time

---

## UC-02: Cloud Inventory Visibility

**User:** CloudOps Manager, Platform Admin, Security Lead  
**Trigger:** New account connected; quarterly inventory review; security audit request  
**Current Pain:** No single inventory of all cloud resources; stale spreadsheets; orphaned resources unknown  

**Proposed Workflow:**
1. CloudPilot OS scans all connected accounts via read-only APIs
2. Resource inventory is built with metadata: type, region, account, tags, cost, age, last-modified
3. Relationship graph maps dependencies between resources
4. Untagged, orphaned, or unknown resources are flagged
5. Search and filter allow instant cross-account lookups

**AI Role:** Identify anomalous resources (e.g., resources in unusual regions, untagged critical resources, resources with no clear ownership); generate tagging recommendations  
**Human Approval Point:** Review and act on flagged orphan or untagged resources  
**Output:** Complete, continuously updated resource inventory; dependency map; anomaly list  
**Business Value:** Eliminate blind spots; enable cost and security analysis; support audit readiness  
**Metrics:** Inventory coverage; time since last scan; untagged resource count; orphan resource count

---

## UC-03: Cost Anomaly Detection

**User:** FinOps Lead, CloudOps Manager  
**Trigger:** Unusual spend pattern detected; daily cost scan; budget threshold crossed  
**Current Pain:** Anomalies discovered weeks late via billing console; no automatic investigation  

**Proposed Workflow:**
1. Cost Intelligence Engine monitors spend patterns across all accounts in real-time
2. Statistical anomaly detection flags spend that deviates from expected patterns
3. AI investigates: identifies the responsible resource, service, account, and time range
4. Root cause explanation generated in plain language: "EC2 instance fleet in us-east-1 scaled unexpectedly due to autoscaling policy triggered by spike in request volume at 2:00 AM Tuesday"
5. FinOps Lead receives alert with full context and recommended response options

**AI Role:** Anomaly detection; root cause investigation; plain-language explanation; recommended response options  
**Human Approval Point:** Decision to approve recommended response (e.g., scale down, adjust autoscaling policy, create budget alert)  
**Output:** Anomaly alert with root cause explanation; cost impact estimate; recommended actions  
**Business Value:** Reduce cost anomaly discovery lag from weeks to hours; prevent runaway spend  
**Metrics:** Detection time (hours after anomaly begins); false positive rate; cost savings from early detection

---

## UC-04: Rightsizing Recommendations

**User:** FinOps Lead, CloudOps Manager, Engineering Leader  
**Trigger:** Weekly rightsizing scan; new account onboarded; cost optimization review  
**Current Pain:** Over-provisioned resources are expensive; engineering teams don't trust recommendations without context; recommendations are ignored  

**Proposed Workflow:**
1. Cost Intelligence Engine analyzes CPU, memory, network, and disk utilization over configurable lookback period (default 30 days)
2. AI identifies resources running below utilization thresholds with available smaller instance sizes
3. For each recommendation: current config, recommended config, utilization data, estimated savings, confidence score, and risk notes
4. Recommendations are organized by priority (savings × confidence) and delivered to owners
5. Owner reviews recommendation in context; approves or dismisses with reason
6. Approved recommendations enter remediation workflow

**AI Role:** Utilization analysis; rightsizing recommendation generation; confidence scoring; business context explanation; risk assessment  
**Human Approval Point:** Owner approves or dismisses each recommendation  
**Output:** Prioritized rightsizing recommendation list; per-recommendation context and savings estimate; realized savings tracking  
**Business Value:** Average 20–35% reduction in compute spend; improved resource efficiency  
**Metrics:** Recommendations generated; adoption rate; realized savings vs. identified savings; recommendation accuracy

---

## UC-05: Idle Resource Cleanup

**User:** FinOps Lead, CloudOps Manager  
**Trigger:** Weekly idle resource scan; cost optimization review; pre-renewal period  
**Current Pain:** Idle resources (stopped instances, unattached storage, old snapshots) accumulate and create unnecessary spend  

**Proposed Workflow:**
1. Idle Resource Agent scans all accounts for resources with zero or negligible activity
2. AI identifies idle resources by type: stopped EC2 instances, unattached EBS volumes, old snapshots, idle load balancers, unused Elastic IPs, unattached RDS instances
3. Each idle resource is scored by confidence (clear idle vs. possibly idle) and age
4. Notification sent to resource owner: "This resource has been idle for 45 days. Estimated monthly cost: $240. Do you want to keep it, schedule deletion, or investigate?"
5. Owner responds: keep (with reason), delete (enters deletion workflow), investigate (routes to engineer)
6. Deletion workflow: approval → snapshot backup option → deletion → cost savings confirmed

**AI Role:** Idle detection; owner identification; notification drafting; deletion workflow generation; post-deletion cost tracking  
**Human Approval Point:** Owner reviews idle notification; approves deletion  
**Output:** Idle resource list; owner notifications; deletion workflow; realized savings report  
**Business Value:** Typical idle resource savings of $50–500/resource/month; automatic cleanup without engineering effort  
**Metrics:** Idle resources identified; resources cleaned up; savings realized; false deletion rate

---

## UC-06: Security Misconfiguration Detection

**User:** Security Lead, CloudOps Manager  
**Trigger:** Continuous security scan; new resource created; scheduled assessment  
**Current Pain:** Hundreds of findings from multiple tools; no prioritization; slow remediation  

**Proposed Workflow:**
1. Security Posture Agent continuously scans all resources against a library of security rules
2. Findings classified by severity (Critical, High, Medium, Low) and category (IAM, Network, Storage, Encryption, Logging, Kubernetes)
3. AI contextualizes each finding: what is the risk, what is the blast radius, is there evidence of exploitation, what is the recommended fix
4. Critical findings trigger immediate alerts to Security Lead with AI-generated remediation plan
5. All findings populate the Security and Compliance dashboard with open/closed/exception status
6. Remediation workflows created for each finding and routed to appropriate team

**AI Role:** Finding detection; severity enrichment; business context generation; blast radius assessment; remediation plan drafting  
**Human Approval Point:** Security Lead reviews critical findings; approves remediation for production resources  
**Output:** Security finding list; severity-ranked queue; per-finding remediation plans; posture score trending  
**Business Value:** Reduce critical finding open time from weeks to hours; prevent security incidents  
**Metrics:** Findings detected; mean time to remediate by severity; false positive rate; posture score trend

---

## UC-07: Compliance Evidence Generation

**User:** Security and Compliance Lead  
**Trigger:** Upcoming audit; quarterly review; new framework adoption  
**Current Pain:** Evidence collection takes 2–4 weeks of manual work per audit cycle  

**Proposed Workflow:**
1. Compliance Evidence Agent maps all cloud resources and configurations to selected compliance frameworks (SOC 2, HIPAA, ISO 27001, CIS)
2. For each control: automated evidence collection from cloud APIs, current status (pass/fail/not applicable), gap analysis
3. Evidence organized into framework structure with source citations and timestamps
4. Gaps highlighted with remediation recommendations and impact assessment
5. Audit package generated: PDF report with evidence inventory, control matrix, gap summary, exception log
6. Package delivered to auditor or uploaded to GRC system

**AI Role:** Control mapping; automated evidence collection; gap analysis; evidence narrative generation; audit package assembly  
**Human Approval Point:** Compliance Lead reviews and approves audit package before delivery  
**Output:** Control evidence inventory; gap analysis report; audit-ready compliance package  
**Business Value:** Reduce audit preparation from 4 weeks to 3 days; improve audit readiness score  
**Metrics:** Control coverage; evidence freshness; gap closure rate; audit package generation time

---

## UC-08: Policy Violation Management

**User:** Security Lead, Platform Admin, CloudOps Manager  
**Trigger:** Policy scan detects violation; new resource created outside policy; scheduled policy review  
**Current Pain:** Policy violations are detected but not systematically managed; exceptions are informal and untracked  

**Proposed Workflow:**
1. Policy Governance Agent evaluates all resources against defined policies (e.g., "no unencrypted storage," "no public RDS instances," "all compute must have backup enabled")
2. Violations flagged with policy reference, resource details, and risk score
3. Notification sent to resource owner with violation details and response options: remediate, request exception, escalate
4. Exception requests include justification, duration, compensating controls, and approver routing
5. All violations and exceptions logged in the audit trail with decision history
6. Policy compliance trend tracked over time

**AI Role:** Policy evaluation; violation detection; risk scoring; exception request assistance; trend analysis  
**Human Approval Point:** Exception approval by designated approvers; remediation plan approval  
**Output:** Violation log; exception registry; policy compliance trend; remediation tracking  
**Business Value:** Enforce policy consistently at scale; create auditable exception trail; reduce compliance gaps  
**Metrics:** Policy coverage; violation rate; mean time to resolve violations; exception rate by policy

---

## UC-09: AI-Generated Executive Reporting

**User:** CloudOps Manager, Engineering Leader, Executive Stakeholder  
**Trigger:** Monthly reporting cycle; board meeting preparation; leadership request  
**Current Pain:** Reports require manual data extraction from multiple tools; inconsistent format; time-consuming to prepare  

**Proposed Workflow:**
1. Reporting Agent collects data from all platform modules: cost, security, compliance, operations, remediation
2. AI generates report narrative: "This month, cloud spend was $342K (3.2% below budget), driven by rightsizing savings of $42K. Two critical security findings were identified and remediated within 8 hours. Compliance posture is 94% against SOC 2 Type II controls."
3. Report structured for audience: executive summary, cost section, security section, compliance section, operational highlights, recommendations
4. Supporting charts and tables auto-generated from platform data
5. Report exported as PDF or shared via link; available on scheduled cadence or on demand

**AI Role:** Data aggregation; narrative generation; insight synthesis; trend commentary; recommendation drafting  
**Human Approval Point:** CloudOps Manager reviews draft before sending to executives  
**Output:** Formatted executive report with narrative, charts, and data tables; historical archive  
**Business Value:** Eliminate 2–4 days of manual reporting work; improve consistency; enable on-demand reporting  
**Metrics:** Report generation time; report adoption (read rate); executive satisfaction; accuracy vs. source data

---

## UC-10: Automated Remediation with Approval

**User:** CloudOps Manager, Security Lead  
**Trigger:** Agent identifies actionable finding; human initiates remediation request  
**Current Pain:** Remediation requires deep knowledge, manual steps, high risk — only senior engineers can execute safely  

**Proposed Workflow:**
1. Remediation Agent drafts a remediation plan for an approved finding: specific steps, estimated execution time, rollback plan, blast radius assessment
2. Plan submitted to approval queue with risk tier (Low, Medium, High, Critical)
3. Approver reviews: steps, risk, rollback, expected outcome, change window
4. On approval: agent executes steps, monitors for side effects, compares before/after state
5. On completion: success notification, cost/security impact confirmation, audit log entry
6. On failure: automatic rollback triggered, incident created, human notification sent

**AI Role:** Remediation plan generation; risk assessment; execution monitoring; verification; rollback orchestration  
**Human Approval Point:** Approval before execution; optional approval for each step in high-risk remediations  
**Output:** Executed remediation; before/after state comparison; audit log; success/failure report  
**Business Value:** Reduce remediation time from hours/days to minutes; reduce knowledge dependency; improve audit trail  
**Metrics:** Remediation success rate; execution time; rollback frequency; approval-to-execution time

---

## UC-11: MSP Customer Portfolio Management

**User:** MSP Practice Lead, MSP Cloud Engineer  
**Trigger:** Daily operations review; customer health alert; onboarding new customer  
**Current Pain:** No portfolio view; engineers context-switch constantly; monthly reports are manual and time-consuming  

**Proposed Workflow:**
1. Customer Portfolio Agent aggregates health data from all customer accounts
2. Portfolio dashboard shows all customers ranked by health score with indicators for cost, security, compliance, and operational health
3. Red/amber/green health status for each customer updated in real-time
4. Drill-down into any customer shows full CloudPilot OS experience scoped to that customer
5. Monthly customer report generated automatically: health summary, cost analysis, security findings, compliance status, remediation history
6. Customer-specific recommendations generated and routed to assigned engineer

**AI Role:** Portfolio health scoring; cross-customer pattern detection; customer report generation; anomaly alerting  
**Human Approval Point:** Engineer reviews customer recommendations before acting; manager approves customer report before delivery  
**Output:** Customer portfolio dashboard; per-customer reports; customer health alerts; cross-portfolio analytics  
**Business Value:** 5x increase in accounts per engineer; proactive customer service; consistent reporting quality  
**Metrics:** Portfolio coverage; report delivery time; proactive alerts rate; customer satisfaction score

---

## UC-12: Agentic CloudOps Assistant

**User:** Any CloudOps team member  
**Trigger:** User sends a natural language query or request  
**Current Pain:** Getting answers requires navigating multiple tools, knowing where to look, and interpreting raw data  

**Proposed Workflow:**
1. User asks a question in natural language: "What are the top 5 cost drivers in our production AWS account this month?"
2. CloudOps Copilot Agent interprets intent, selects relevant data sources, queries the platform data layer
3. Agent generates a grounded, cited response: "The top 5 cost drivers in your production AWS account (prod-aws-001) for June are: (1) EC2 compute: $42,300 (18% above last month due to fleet scale-up on June 3rd)..."
4. Agent offers follow-up options: "Would you like me to create a rightsizing recommendation for these instances?"
5. If user confirms, agent creates recommendation workflow
6. All agent actions logged in conversation history with source citations

**AI Role:** Intent interpretation; data retrieval; grounded response generation; follow-up suggestion; workflow initiation  
**Human Approval Point:** User reviews and confirms any follow-up actions  
**Output:** Natural language answer with data citations; optional workflow creation; conversation history  
**Business Value:** Reduce time-to-insight from 20 minutes to 60 seconds; democratize cloud data access  
**Metrics:** Query-to-answer latency; response accuracy rate; user satisfaction score; follow-up action rate

---

## UC-13: Change Impact Analysis

**User:** Engineering Leader, CloudOps Manager  
**Trigger:** Planned infrastructure change; IaC plan review; deployment pipeline integration  
**Current Pain:** Changes are applied without understanding security, compliance, or cost impact; regressions discovered after the fact  

**Proposed Workflow:**
1. Engineer submits planned change (Terraform plan, CloudFormation template, or infrastructure diff)
2. Change Impact Agent analyzes the change against current inventory, security posture, compliance state, and cost model
3. Impact report generated: cost delta (estimated), security posture change (new findings introduced), compliance impact (controls affected), dependency risks
4. Risk score assigned to the change: Low (proceed), Medium (review recommended), High (approval required before applying)
5. If High risk, change blocked pending approval from designated reviewer
6. Approved changes proceed; outcome tracked and compared to pre-change assessment

**AI Role:** Change analysis; impact estimation; risk scoring; recommendation generation  
**Human Approval Point:** High-risk changes require explicit approval before proceeding  
**Output:** Change impact report; risk score; compliance impact assessment; cost delta estimate  
**Business Value:** Prevent security and compliance regressions; catch cost surprises before they deploy  
**Metrics:** Changes analyzed; high-risk changes caught; regression rate post-analysis; accuracy of impact estimates

---

## UC-14: Risk-Based Prioritization

**User:** Security Lead, CloudOps Manager  
**Trigger:** Large backlog of findings; sprint planning; resource constraint  
**Current Pain:** All findings appear equal; teams don't know where to focus; low-risk issues get fixed while critical ones wait  

**Proposed Workflow:**
1. Risk Scoring Engine assigns a unified risk score to every finding, combining: severity, exposure (internet-facing?), exploit intelligence, business criticality of affected resource, age of finding, compliance impact, remediation effort
2. Priority queue generated: "Fix these 5 things this week to reduce your risk posture by 40 points"
3. Findings organized by recommended sprint/week allocation to meet risk reduction targets
4. Weekly progress tracked against risk reduction goals
5. Executive view: risk posture score with trend and projected improvement if backlog is addressed

**AI Role:** Multi-factor risk scoring; priority queue generation; sprint planning recommendations; trend analysis  
**Human Approval Point:** Team lead reviews and adjusts sprint priorities based on business context  
**Output:** Risk-prioritized finding queue; sprint plan; risk trend report  
**Business Value:** Focus remediation effort where it matters most; demonstrate measurable risk reduction  
**Metrics:** Risk score trend; sprint completion rate; critical finding response time; risk reduction ROI

---

## UC-15: Audit Readiness Tracking

**User:** Security and Compliance Lead, External Auditor  
**Trigger:** Upcoming audit; quarterly review; compliance program onboarding  
**Current Pain:** Audit readiness is unknown until the audit begins; preparation scrambles take weeks  

**Proposed Workflow:**
1. Compliance Evidence Agent runs continuous assessment against selected frameworks
2. Audit Readiness Score calculated: percentage of controls with current, passing evidence
3. Gaps highlighted with remediation priority and estimated closure time
4. Evidence freshness tracked: controls with evidence older than threshold flagged for refresh
5. Audit timeline view: shows current readiness vs. audit date with projected readiness trajectory
6. When audit begins: package generated instantly with all evidence, narrative, and gap justifications
7. Post-audit: findings from auditor entered; remediation tracked in platform

**AI Role:** Continuous control assessment; readiness scoring; gap analysis; evidence narrative generation; package assembly  
**Human Approval Point:** Compliance Lead reviews and approves package before delivery; reviews auditor findings after audit  
**Output:** Audit readiness score; evidence inventory; gap analysis; audit package; post-audit remediation plan  
**Business Value:** Eliminate audit scrambles; demonstrate continuous compliance; reduce audit preparation cost  
**Metrics:** Audit readiness score over time; evidence freshness; gap closure rate; audit finding rate; preparation time
