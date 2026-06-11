# User Personas — CloudPilot OS

---

## Persona 1: CloudOps Manager

**Name:** Alex Chen  
**Title:** Manager, Cloud Operations  
**Company type:** Mid-market enterprise, 1,200 employees, SaaS product company  
**Cloud footprint:** 3 AWS accounts, 1 Azure account, 180 resources  
**Team size:** 6 cloud engineers  

### Goals
- Maintain cloud environment health with predictable reliability
- Reduce mean time to detect and remediate operational issues
- Give leadership clear, accurate reporting without spending a day preparing it
- Protect team from alert fatigue and toil while keeping SLAs
- Build a case for automation investment by demonstrating toil reduction

### Pain Points
- Team spends 40% of time on reactive monitoring and investigation, not planned work
- Critical findings discovered during audits that should have been caught weeks earlier
- Reporting requires pulling data from five systems and assembling manually each month
- Remediation requires deep institutional knowledge — only two engineers know the full runbook
- No clear way to track whether recommendations from last month were acted on

### Jobs to Be Done
- Monitor all cloud resources continuously without building custom monitoring
- Get alerts that are pre-triaged and pre-contextualized, not raw metric thresholds
- Review and approve remediation proposals in a queue, not via Slack messages
- Show leadership a dashboard that summarizes health, cost, and risk in one view
- Onboard new engineers without requiring months of tribal knowledge transfer

### Current Workflow
Every morning: check CloudWatch dashboards, check billing console for anomalies, check security hub findings, respond to Slack alerts from on-call engineer. Weekly: create a manual health report by pulling from four tools. Monthly: prepare executive summary by copy-pasting data into a slide deck. Quarterly: prepare for audit by manually gathering evidence across systems.

### Desired Outcome
Start each day with an AI-generated brief that summarizes overnight events, flags the top three actions, and surfaces any emerging cost or security trends. Approve remediations in an organized queue rather than reacting to Slack. Generate reports in two clicks.

### Key Features Used
- Command Center daily brief
- Remediation approval queue
- Automated reporting
- Alert management
- Team workflow assignment

### Success Metrics
- Alert-to-resolution time: < 4 hours for critical, < 24 hours for high
- Toil hours per week: reduced by 50%
- Reporting preparation time: < 30 minutes per month
- Findings discovered by audit (not tool): 0

### Objections and Concerns
- "Will this create noise or reduce it?" — Needs evidence that AI recommendations are accurate before trusting them
- "What happens if automation breaks something?" — Needs rollback guarantees and clear audit trail
- "How does this fit into our existing ticketing workflow?" — Needs integration with existing ITSM tools

---

## Persona 2: FinOps Lead

**Name:** Priya Nair  
**Title:** FinOps Lead  
**Company type:** Enterprise, 5,000 employees, financial services  
**Cloud footprint:** 12 AWS accounts, 2 GCP accounts, $2.4M annual cloud spend  
**Team size:** 3 FinOps analysts  

### Goals
- Identify and realize cloud cost savings to hit annual efficiency targets
- Allocate cloud costs accurately to business units and product lines
- Influence engineering teams to adopt cost-efficient resource configurations
- Forecast cloud spend accurately for quarterly budgeting
- Build a FinOps practice that leadership recognizes as a strategic function

### Pain Points
- Cost anomalies are discovered 2–3 weeks after they occur, when the bill arrives
- Rightsizing recommendations are ignored by engineering teams because they don't trust the data
- Budget owners don't know what they're spending until month-end
- Cloud provider discounts (reserved instances, savings plans) are under-optimized
- No single source of truth for cloud cost allocation

### Jobs to Be Done
- Get alerted to cost anomalies within 24 hours, not at month-end
- Generate rightsizing recommendations with enough context that engineering teams act on them
- Create cost allocation reports by team, product, and environment
- Track which recommendations have been acted on and what savings were realized
- Model the cost impact of planned infrastructure changes before they are deployed

### Current Workflow
Weekly: export billing data from cloud consoles, normalize into spreadsheets, run custom anomaly detection formulas, identify top spenders, create Jira tickets for engineering. Monthly: create cost allocation report in BI tool. Quarterly: meet with CFO with a manually assembled slide deck. Recommendations are sent as emails and tracked in a shared spreadsheet.

### Desired Outcome
Real-time cost visibility with intelligent anomaly alerting. Recommendations delivered as organized proposals that engineering teams can act on directly. Realized savings tracked automatically against recommendations. Executive-ready cost reports generated on demand.

### Key Features Used
- Cost Intelligence dashboard
- Cost anomaly alerts
- Rightsizing recommendation queue
- Savings tracking and realization
- Budget vs. actual reporting
- Cost allocation by tag and account

### Success Metrics
- Anomaly detection lag: < 24 hours
- Recommendation adoption rate: > 60%
- Realized savings vs. identified savings: > 70%
- Cost forecast accuracy: within 5% of actual

### Objections and Concerns
- "Engineering won't trust recommendations that aren't explained" — Needs confidence scores and data lineage for each recommendation
- "How do we prevent over-optimization that causes reliability issues?" — Needs safeguards against rightsizing below safety margins
- "Finance needs the data in our format" — Needs flexible export and integration options

---

## Persona 3: Security and Compliance Lead

**Name:** Jordan Kim  
**Title:** Senior Manager, Cloud Security and Compliance  
**Company type:** Mid-market enterprise, 800 employees, healthcare technology  
**Cloud footprint:** 4 AWS accounts, 1 Azure account, HIPAA and SOC 2 obligations  
**Team size:** 4 security engineers  

### Goals
- Maintain continuous cloud security posture across all accounts and environments
- Reduce mean time to remediate critical security findings from weeks to hours
- Produce compliance evidence packages on demand for auditors
- Get ahead of audit findings rather than discovering them during audit
- Demonstrate cloud security maturity to enterprise customers who audit us

### Pain Points
- Security Hub generates hundreds of findings per week; team cannot triage them all
- Critical misconfigurations sit open for weeks because remediation is slow and poorly prioritized
- Compliance evidence collection requires two weeks of manual work before each audit
- No single view of security posture across all accounts and regions
- Engineering teams resist security requirements that slow down deployment velocity

### Jobs to Be Done
- Know the current security posture of every cloud account at any point in time
- Identify the highest-risk misconfigurations and remediate them first
- Collect and organize compliance evidence without manual effort
- Demonstrate HIPAA and SOC 2 control compliance to auditors
- Notify relevant teams of security findings with enough context to act immediately

### Current Workflow
Daily: check Security Hub dashboard, export findings to spreadsheet, triage manually, create Jira tickets for high and critical findings. Weekly: review open ticket backlog. Monthly: chase engineers for update on open findings. Quarterly: export evidence from 6 systems, organize into audit binders manually. Annually: engage external auditors, spend 3 weeks answering questions.

### Desired Outcome
Continuous CSPM scanning with AI-prioritized findings. Critical findings generate remediation workflows automatically, routed to the right engineer with full context. Compliance evidence collected and organized continuously. Audit packages generated in hours, not weeks.

### Key Features Used
- Security Posture dashboard
- CSPM finding queue with AI prioritization
- Compliance framework mapping (HIPAA, SOC 2, CIS)
- Evidence collection and packaging
- Remediation workflow creation and tracking
- Audit report generation

### Success Metrics
- Mean time to remediate critical findings: < 8 hours
- Open critical findings: 0 at any time
- Compliance evidence collection time: < 4 hours per framework
- Audit finding rate (discovered by external auditor, not internal tool): 0

### Objections and Concerns
- "How do we control what automated remediation can change in our production environment?" — Needs granular permission controls and change windows
- "HIPAA requires detailed audit trails" — Needs full evidence chain for every action
- "We have findings we've accepted as exceptions" — Needs exception management with expiry dates

---

## Persona 4: MSP Cloud Practice Lead

**Name:** Marcus Rivera  
**Title:** Director, Cloud Managed Services  
**Company type:** Managed service provider, 250 employees, 65 customer accounts managed  
**Cloud footprint:** 65 customer AWS/Azure/GCP accounts across industries  
**Team size:** 12 cloud engineers supporting 65 customers  

### Goals
- Scale customer base without proportionally scaling headcount
- Deliver consistent, high-quality service across all customers regardless of size
- Automate monthly reporting to reduce manual effort and improve consistency
- Proactively identify customer issues before customers raise them
- Differentiate the MSP practice with AI-powered operations as a selling point

### Pain Points
- Engineers context-switch between 5–10 customer environments daily, losing 30% of time to context overhead
- Monthly reports for 65 customers are largely manual and time-consuming
- No portfolio-level view of which customers are healthy and which need attention
- Smaller customers receive less attention due to bandwidth constraints
- Customer satisfaction scores correlate with proactiveness — hard to scale proactive outreach

### Jobs to Be Done
- See the health of all 65 customer accounts on one screen, every morning
- Get alerts when any customer account crosses a health threshold
- Generate per-customer monthly reports with one click
- Standardize remediation workflows across customers to reduce context-switching overhead
- Demonstrate value to customers through consistent, data-driven reporting

### Current Workflow
Each engineer owns 5–6 customer accounts. They check each customer's cloud console separately, maintain customer-specific runbooks in Notion, generate reports manually in Google Docs, and communicate via Slack and email. No portfolio-level aggregation exists. Senior engineers triage which alerts matter; junior engineers follow runbooks.

### Desired Outcome
A portfolio view that shows all 65 customers on one screen, sorted by health score. One-click customer drill-down. Automated monthly reports that the customer can receive directly. Standardized workflows that any engineer can execute for any customer. Proactive alerts for any customer crossing health thresholds.

### Key Features Used
- Customer portfolio view
- Per-customer health scoring
- Automated customer reporting
- Multi-tenant workflow management
- Customer-specific policy configuration
- MSP billing and account management

### Success Metrics
- Accounts per engineer: target 8 (current 5.4)
- Monthly report preparation time: < 15 minutes per customer (current 2 hours)
- Customer-reported issues caught proactively: > 80%
- Customer NPS: > 50

### Objections and Concerns
- "Can we white-label the reports?" — Needs branded report output
- "We need strict customer data isolation" — Needs multi-tenant architecture with guaranteed isolation
- "Customers have different compliance requirements" — Needs per-customer policy configuration

---

## Persona 5: Platform Admin

**Name:** Sam Okafor  
**Title:** Cloud Platform Administrator  
**Company type:** Enterprise, 3,000 employees, technology company  
**Cloud footprint:** 8 AWS accounts, 3 Azure, 2 GCP  
**Team size:** Infrastructure platform team of 15  

### Goals
- Maintain and optimize the CloudPilot OS deployment for the organization
- Manage cloud account connections, credentials, and permissions securely
- Configure agent behavior, autonomy levels, and approval workflows per team
- Ensure all users have appropriate access without over-provisioning
- Maintain audit hygiene for internal compliance programs

### Pain Points
- Credential rotation for cloud API connections is manual and error-prone
- Different teams have different risk tolerances for automation — hard to configure per-team policies
- When an agent takes an unexpected action, the audit trail is fragmented
- User access requests are ad hoc and inconsistently reviewed
- No way to test new automation rules in a safe environment before deploying

### Jobs to Be Done
- Connect cloud accounts securely with least-privilege read (and optional write) roles
- Configure autonomy levels and approval requirements per team and environment
- Review and manage user access with clear role definitions
- Monitor platform health and agent activity
- Run simulation tests before enabling new automation

### Key Features Used
- Settings and administration panel
- Cloud account connection manager
- Role and permission management
- Agent configuration and autonomy level controls
- Audit log viewer
- Integration management (Slack, Jira, PagerDuty)

### Success Metrics
- Cloud account connection uptime: > 99.9%
- Unauthorized access incidents: 0
- Role access review completion: 100% quarterly
- Credential rotation compliance: 100%

---

## Persona 6: Engineering Leader

**Name:** Tanya Patel  
**Title:** VP Engineering  
**Company type:** Series C startup, 300 employees, B2B SaaS  
**Cloud footprint:** 5 AWS accounts, $800K annual spend  
**Team size:** 45 engineers across 6 teams  

### Goals
- Give engineering teams visibility into cloud costs they are responsible for
- Reduce time engineers spend on cloud operational tasks
- Ensure infrastructure changes don't introduce security or compliance regressions
- Build an engineering culture of cloud cost and security ownership
- Have a clear picture of cloud health for board reporting

### Pain Points
- Engineers don't see the cost implications of their infrastructure changes until month-end
- Cloud security reviews are bottlenecks that slow deployment velocity
- No automated way to check if a proposed change will create a security or compliance gap
- Infrastructure changes sometimes break compliance controls without anyone noticing
- Engineering teams don't have a simple way to request cloud access or report issues

### Jobs to Be Done
- Give every engineering team a real-time view of their cloud cost and security posture
- Automate pre-deployment cloud security checks as part of CI/CD pipelines
- Receive impact analysis for proposed infrastructure changes before they are applied
- Track and resolve technical debt in cloud configurations
- Generate a monthly cloud health report for the board without manual effort

### Key Features Used
- Team cost allocation views
- Change impact analysis
- Security posture by team
- Automated executive reporting
- Engineering team onboarding and access management

### Success Metrics
- Cloud cost variance from budget: < 10% per team
- Security findings per deployment: trending down
- Mean time to resolve team-owned findings: < 48 hours

---

## Persona 7: Executive Stakeholder

**Name:** Rebecca Moss  
**Title:** Chief Technology Officer  
**Company type:** Enterprise, 6,000 employees, financial services  
**Cloud footprint:** $8M annual cloud spend, 20+ accounts  
**Team size:** Oversees 200-person technology organization  

### Goals
- Understand cloud cost and risk posture at a strategic level without operational detail
- Satisfy board, audit committee, and regulators with credible cloud security and compliance reporting
- Ensure cloud investment is generating measurable business value
- Make informed decisions about cloud strategy based on reliable, current data
- Build confidence with the board that cloud infrastructure is managed responsibly

### Pain Points
- Monthly cloud reports arrive late, cover different time periods, and are hard to compare
- No single number that summarizes cloud risk posture — different teams report differently
- Cost optimization ROI is hard to quantify without tracking recommendations through realization
- Compliance status requires time-consuming updates from multiple team leads
- Board presentations require manual assembly of data from multiple sources

### Jobs to Be Done
- Receive a monthly executive cloud report with cost, security, compliance, and trend summary
- Know the current cloud risk posture at a high level at any time
- Track cloud optimization ROI: savings identified vs. savings realized
- Respond to board questions about cloud security and compliance with confidence
- Delegate cloud operations decisions to the team with appropriate visibility

### Key Features Used
- Executive dashboard
- Monthly executive report
- Cost savings summary and realization tracking
- Compliance posture overview
- Risk posture summary

### Success Metrics
- Report delivery: automated, on schedule, consistent format
- Board question response time: < 1 hour with supporting data
- Cloud cost as % of revenue: tracked and trending appropriately
- Compliance posture: always audit-ready

### Objections and Concerns
- "Is this data accurate enough to present to the board?" — Needs high-confidence data with clear sourcing
- "What happens if automated changes break something in production?" — Needs evidence of governance and rollback capability
- "How does this compare to what other companies our size are doing?" — Interested in benchmarking data
