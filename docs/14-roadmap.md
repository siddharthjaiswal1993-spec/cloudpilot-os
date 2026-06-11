# Product Roadmap — CloudPilot OS

---

## Roadmap Philosophy

The roadmap is organized to deliver value fast, build trust incrementally, and lay the architectural foundation for AI autonomy over time.

**Principles:**
1. Ship observable value before autonomous value — users must see results before they trust automation
2. Each release builds trust capital for the next — MVP builds the data layer that V1 agents need; V1 builds the trust record that V2 autonomy requires
3. MSP features trail enterprise features by one release — MSP functionality builds on top of enterprise functionality
4. Integration and compliance are first-class, not afterthoughts

---

## MVP — Cloud Visibility and First Intelligence

**Target:** Initial commercial availability  
**Theme:** "See everything in your cloud environment in one place, with AI making the first call on what matters"

### Core Capabilities

**Cloud Account Connection**
- [ ] AWS account connection via IAM cross-account role
- [ ] Azure account connection via Service Principal
- [ ] Connection health monitoring and error alerting
- [ ] Per-account permissions management
- [ ] Connection wizard with validation

**Inventory Scan**
- [ ] Full resource inventory scan on connect
- [ ] Continuous refresh every 15 minutes
- [ ] Resource types: EC2, S3, RDS, Lambda, ELB, EBS, VPC, IAM, EKS, ElastiCache
- [ ] Search, filter, and export
- [ ] Untagged and orphaned resource flagging

**Cost Overview**
- [ ] Monthly spend by account, service, and region
- [ ] Cost trend charts (daily, weekly, monthly)
- [ ] Basic anomaly detection with threshold alerting
- [ ] Rightsizing recommendations for compute (Level 1 — recommend only)
- [ ] Idle resource detection and notification
- [ ] Budget vs. actual by account

**Security Findings**
- [ ] Security finding ingestion from AWS Security Hub and Azure Defender
- [ ] Finding severity classification and display
- [ ] AI-generated finding context (risk explanation, blast radius, recommended fix)
- [ ] Finding status management (open, in progress, resolved, excepted)
- [ ] Exception request workflow

**Command Center**
- [ ] Health score dashboard (composite: cost, security, ops)
- [ ] AI-generated daily brief (top 3 actions)
- [ ] Real-time alert feed
- [ ] Key metrics summary cards

**Basic Remediation**
- [ ] Manual remediation workflow creation
- [ ] Approval queue (single approver)
- [ ] Execution via AWS SDK (write role required)
- [ ] Post-execution verification
- [ ] Full audit log

**AI Assistant (Read-Only Mode)**
- [ ] CloudOps Copilot — natural language queries against platform data
- [ ] Grounded responses with data citations
- [ ] Conversation history

**Reports**
- [ ] On-demand executive report (cost + security summary)
- [ ] PDF export
- [ ] Manual scheduling (weekly, monthly)

**Settings**
- [ ] User and role management (5 roles)
- [ ] Notification preferences (email)
- [ ] API access management

---

## V1 — AI Agents and Compliance

**Target:** ~6 months post-MVP  
**Theme:** "Your cloud operations run on agents. Compliance is continuous, not periodic."

### Agent Deployment

**Cost Optimization Agent**
- [ ] Scheduled nightly rightsizing analysis across all accounts
- [ ] AI-generated recommendation with confidence score and business context
- [ ] Recommendation queue with approval workflow (Level 2/3)
- [ ] Savings tracking: identified → approved → realized
- [ ] Reservation and savings plan coverage analysis and recommendations

**Security Posture Agent**
- [ ] Continuous multi-account security scanning (beyond cloud-native findings)
- [ ] 400+ rule library (IAM, Network, Storage, Encryption, Kubernetes, Logging)
- [ ] Multi-factor risk scoring with exploit intelligence integration
- [ ] AI-generated remediation plans for all finding types
- [ ] Posture score trend and benchmarking

**Compliance Evidence Agent**
- [ ] SOC 2 Type II control mapping and automated evidence collection
- [ ] ISO 27001 control mapping
- [ ] HIPAA control mapping
- [ ] Compliance readiness score per framework
- [ ] Gap analysis with remediation recommendations
- [ ] Audit package generation (PDF)
- [ ] Evidence store with timestamps and source citations

**Remediation Agent**
- [ ] AI-generated multi-step remediation plans
- [ ] Risk tier assessment (Low/Medium/High/Critical)
- [ ] Rollback plan generation
- [ ] Change window scheduling
- [ ] Execution monitoring with real-time step status
- [ ] Automatic rollback on failure

**Reporting Agent**
- [ ] Full executive report (cost, security, compliance, ops)
- [ ] AI narrative generation per section
- [ ] Scheduled delivery (email)
- [ ] Report templates (executive, technical, compliance)
- [ ] Historical archive

### MSP Portfolio (V1)
- [ ] Customer portfolio dashboard with health scores
- [ ] Per-customer drill-down
- [ ] Automated monthly customer report generation
- [ ] Customer assignment (engineer to customer)
- [ ] Portfolio-level health alerts
- [ ] Customer onboarding workflow

### Integrations (V1)
- [ ] Slack: notifications and approval actions
- [ ] Jira: ticket creation from findings; status sync
- [ ] PagerDuty: incident creation for Critical findings
- [ ] Webhook: generic outbound notification

### Platform (V1)
- [ ] GCP account support
- [ ] Full audit log with export
- [ ] SAML/SSO integration (Okta, Azure AD)
- [ ] CIS Benchmark compliance framework
- [ ] Policy violation management
- [ ] Exception registry with expiry and review

---

## V2 — Automation and Advanced Intelligence

**Target:** ~12 months post-MVP  
**Theme:** "From recommendation to action, from action to self-optimization"

### Policy-as-Code Engine
- [ ] YAML-based policy definition for organizational standards
- [ ] Policy evaluation engine with real-time cloud assessment
- [ ] Agent autonomy configuration via policy (define action classes eligible for Level 4)
- [ ] Policy versioning and diff tracking
- [ ] Policy import from community library

### Advanced FinOps
- [ ] 90-day cost forecasting with confidence intervals
- [ ] Reserved instance and savings plan optimization engine
- [ ] Commitment purchase recommendation with ROI calculation
- [ ] Unit cost tracking (cost per customer, cost per transaction, cost per team)
- [ ] FinOps maturity scoring

### Risk-Based Automation (Level 4)
- [ ] Auto-execute pre-approved action classes without per-action approval
- [ ] Pre-approved action classes: tagging enforcement, logging enablement, rotation of unused credentials
- [ ] Per-action-class confidence thresholds
- [ ] Automatic rollback for all Level 4 actions
- [ ] Level 4 activity dashboard and trust score

### Change Impact Analysis
- [ ] Terraform plan integration via CLI and CI/CD hooks
- [ ] Change impact report: cost delta, security posture delta, compliance impact
- [ ] Risk score for proposed changes with blocking capability
- [ ] Pre-apply sandbox simulation (dry-run against staging environment)

### Agent Marketplace (Beta)
- [ ] Agent development SDK documentation
- [ ] Internal custom agent publishing
- [ ] Shared agent library (pre-built agents for specific use cases)
- [ ] Agent testing framework

### Simulation Mode
- [ ] Safe execution of remediation workflows in simulated environment
- [ ] Expected outcome preview with risk assessment
- [ ] Simulation results used to validate before production execution

### Additional Compliance Frameworks
- [ ] PCI DSS
- [ ] NIST CSF
- [ ] FedRAMP (initial)
- [ ] CMMC (initial)

### Kubernetes Deep Integration
- [ ] EKS/AKS/GKE cluster inventory and health
- [ ] Container security scanning
- [ ] Kubernetes compliance controls
- [ ] Node rightsizing for Kubernetes

---

## Future — Autonomous Intelligence

**Target:** 18–24 months post-MVP  
**Theme:** "Cloud operations that run themselves, with humans focusing on strategy"

### Autonomous Optimization (Level 5 — Selected Categories)
- Continuously optimize cost and security within defined policy boundaries
- No per-action approval for pre-validated action classes with proven track record
- Mandatory monitoring dashboard and kill switch
- Monthly governance review of autonomous action summary

### Predictive Incident Prevention
- ML-based prediction of infrastructure issues before they occur
- Capacity forecasting to prevent resource exhaustion
- Performance degradation prediction from configuration drift patterns
- Proactive remediation recommendations before incidents materialize

### Business Impact Modeling
- Map cloud resources to business services and revenue streams
- Prioritize remediations by business impact, not just technical severity
- "If this database instance fails, the estimated business impact is $X/hour"
- Cloud health scoring weighted by business criticality

### Executive Intelligence Layer
- Board-ready cloud health summaries generated weekly
- Trend narratives: "Your cloud is 12% more efficient than it was 6 months ago"
- Competitive benchmarking: cloud efficiency vs. industry peers
- Strategic recommendation generation: "Migrating this workload to reserved capacity would save $240K annually"

### Industry-Specific Compliance Packs
- Healthcare (HIPAA, HITRUST)
- Financial services (SOX, PCI DSS, FFIEC)
- Government (FedRAMP, StateRAMP, CMMC)
- Pre-mapped controls, evidence templates, and audit preparation guides

---

## Roadmap Summary Table

| Feature | MVP | V1 | V2 | Future |
|---|---|---|---|---|
| Cloud account connection (AWS, Azure) | ✓ | | | |
| GCP support | | ✓ | | |
| Resource inventory scan | ✓ | | | |
| Cost anomaly detection | ✓ | | | |
| AI rightsizing recommendations | ✓ | | | |
| Security findings (cloud-native) | ✓ | | | |
| AI security posture agent | | ✓ | | |
| Compliance evidence automation | | ✓ | | |
| Remediation with AI plans | ✓ (basic) | ✓ (full) | | |
| AI agent deployment | | ✓ | | |
| MSP portfolio view | | ✓ | | |
| Slack/Jira/PagerDuty integration | | ✓ | | |
| Policy-as-code | | | ✓ | |
| Level 4 auto-execution | | | ✓ | |
| Change impact analysis | | | ✓ | |
| Predictive incident prevention | | | | ✓ |
| Business impact modeling | | | | ✓ |
| Autonomous optimization (Level 5) | | | | ✓ |
