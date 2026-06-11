# Security, Compliance, and Privacy — CloudPilot OS

---

## Cloud Credential Handling

CloudPilot OS connects to cloud provider accounts using provider-native authentication mechanisms. The security of these credentials is a foundational requirement.

**AWS:**
- CloudPilot OS uses IAM cross-account roles, not long-lived access keys
- The platform creates a trust relationship between the customer's AWS account and a CloudPilot OS IAM principal
- No access keys are stored; all authentication is done via IAM role assumption with short-lived session tokens
- Session tokens have a maximum duration of 1 hour; re-assumed before expiry

**Azure:**
- Authentication via Azure Active Directory Service Principal
- Service Principal credentials (client secret or certificate) are stored in the platform's secrets manager, not in the database
- Certificate-based authentication is recommended over client secrets

**GCP:**
- Authentication via Service Account with scoped IAM roles
- Service Account key files are stored in the platform's secrets manager
- Workload Identity Federation is recommended for keyless authentication

**Credential Rotation:**
- All credentials are rotated automatically every 90 days
- Rotation is logged in the audit trail
- Alert generated if credential rotation fails
- All credential access events are logged

**Secrets Storage:**
- All credentials are stored in a purpose-built secrets manager (e.g., HashiCorp Vault or cloud-native equivalent)
- Secrets are never stored in the database or environment variables
- Encryption at rest: AES-256
- Access to secrets restricted to the connector service via service-to-service authentication
- Secrets access events are logged

---

## Least Privilege Access

The platform is designed to operate with minimum necessary permissions at every level.

**Read permissions (required for all accounts):**
- Resource configuration read (cloud provider config APIs)
- Billing data read (cost and usage data)
- Security finding read (from cloud-native security services where available)
- Activity log read (for audit and anomaly detection)

**Write permissions (optional; only for accounts where remediation is enabled):**
- Write permissions are scoped to specific resource types and actions (not wildcard)
- Write permissions are granted per action class (e.g., "allow update of EC2 instance type")
- Write permissions for production accounts require explicit admin approval
- Write permissions can be time-limited (enabled for a change window, then revoked)

**Example minimum read policy (AWS):**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ec2:Describe*",
        "s3:GetBucketAcl",
        "s3:GetBucketPolicy",
        "iam:List*",
        "iam:Get*",
        "cloudwatch:GetMetricData",
        "ce:GetCostAndUsage",
        "config:Describe*",
        "config:Get*"
      ],
      "Resource": "*"
    }
  ]
}
```

---

## Encryption

**Data at rest:**
- All data encrypted using AES-256
- Encryption keys managed by cloud-native KMS
- Key rotation: annually, or on personnel changes
- Database encryption: transparent data encryption enabled at the database engine level

**Data in transit:**
- All API communication over TLS 1.3 minimum
- Internal service-to-service communication over TLS with mutual authentication
- Certificate management via automated certificate authority

**Customer data:**
- Cloud resource configuration data is treated as sensitive and encrypted at rest
- Cost data is treated as confidential
- No customer data is used to train AI models without explicit, written consent from the customer

---

## Audit Logging

**Platform audit log:**
- Immutable, append-only
- Every user action, agent action, and system event recorded
- Log entries cannot be modified or deleted
- Stored with cryptographic integrity protection
- Retention: 7 years minimum (configurable up to indefinite)

**Cloud provider activity logging:**
- CloudPilot OS enables and monitors cloud provider activity logs (AWS CloudTrail, Azure Activity Log, GCP Cloud Audit Logs) on all connected accounts
- Missing or disabled logging is flagged as a security finding and compliance gap

**Access logging:**
- All authentication events (login, MFA, API key use) logged
- Failed authentication events trigger alerts after threshold (5 failures in 10 minutes)
- All credential access events logged

---

## Customer Data Isolation

**Multi-tenant architecture:**
- Customer data is isolated at the application and data layers
- Row-level security enforced on all shared tables using workspace ID
- No customer data is shared between tenants
- Infrastructure may be shared (multi-tenant SaaS) or dedicated (enterprise tier)

**MSP customer isolation:**
- Each managed customer exists in a separate workspace
- MSP engineers can only access their assigned customer workspaces
- Cross-customer data access is blocked at the API layer
- Customer data is not aggregated across customers except for MSP-level aggregation within the MSP's own organization context

**Enterprise isolation:**
- For enterprise customers who require data sovereignty: dedicated tenant infrastructure option available
- Data residency commitments available for regulated industries

---

## MSP Tenant Isolation

MSP deployments present additional isolation requirements because one organization (the MSP) is managing data from multiple other organizations (their customers).

- Each customer account exists in a separate workspace with independent RBAC
- MSP engineer access to customer workspaces is explicitly assigned, not inheritable
- Customer-generated reports and data are scoped to the customer workspace
- MSP cannot send cross-customer data comparisons to customers unless explicitly anonymized and aggregated
- Audit log for each customer shows only that customer's events; MSP manager can view cross-customer audit through the MSP portfolio view

---

## SOC 2 Type II Readiness

CloudPilot OS is designed to satisfy the requirements of SOC 2 Type II audit and supports customers in achieving their own SOC 2 compliance.

**Trust Services Criteria addressed:**

**CC1 (Control Environment):** Documented security policies; role-based access; user access reviews conducted quarterly; security awareness training

**CC6 (Logical and Physical Access):** Role-based access control; MFA enforced for all users; privileged access management; access provisioning and de-provisioning process; quarterly access reviews

**CC7 (System Operations):** Continuous monitoring; alert management; incident response procedures; availability monitoring; change management process

**CC8 (Change Management):** Change approval workflow; change window enforcement; post-change verification; rollback capability; change log in audit trail

**CC9 (Risk Mitigation):** Vendor risk management; background checks for personnel; data backup and recovery; business continuity planning

---

## ISO 27001 Alignment

**A.9 — Access Control:** RBAC; least privilege; access review; privileged access management

**A.10 — Cryptography:** AES-256 at rest; TLS 1.3 in transit; key management; rotation schedule

**A.12 — Operations Security:** Monitoring; logging; vulnerability management; capacity management; operational procedures

**A.13 — Communications Security:** Network segmentation; encrypted communications; API security

**A.14 — System Acquisition, Development, and Maintenance:** Secure development lifecycle; code review; dependency scanning; penetration testing

**A.16 — Information Security Incident Management:** Incident response plan; incident classification; notification procedures; post-incident review

**A.18 — Compliance:** Compliance monitoring; legal review; intellectual property management

---

## Change Management

All changes to cloud resources through the platform follow a structured change management process:

1. **Change creation:** Change created by agent or user with full details, risk assessment, and rollback plan
2. **Change review:** Change reviewed by authorized approver(s) based on risk tier
3. **Change scheduling:** Approved changes scheduled within appropriate change window
4. **Pre-change snapshot:** Current state captured before any changes are applied
5. **Change execution:** Steps executed with real-time monitoring
6. **Post-change verification:** Expected outcome verified; deviation triggers rollback
7. **Change record:** Complete change record in audit log including before/after state

Emergency change process:
- Available for Critical security findings (active data exposure, active breach)
- Requires two-person authorization
- Emergency bypasses flagged for post-incident review within 48 hours

---

## Approval Trail

Every consequential action generates an approval trail that includes:
- What was approved (full action details)
- Who approved it (user ID, name, role)
- When it was approved (timestamp, timezone)
- Any conditions or notes attached to the approval
- Any modifications made to the original proposal

This approval trail is:
- Stored immutably in the audit log
- Retrievable for specific resources, time periods, and approvers
- Exportable as part of compliance packages
- Available to external auditors

---

## PII Handling

Cloud environments often contain resources that store or process personal data. CloudPilot OS handles customer data responsibly:

**What CloudPilot OS accesses:**
- Cloud resource configuration (metadata, settings, access controls)
- Cloud billing and cost data
- Security and compliance scan results
- Resource activity events (create, modify, delete, access counts — not content)

**What CloudPilot OS does not access:**
- Content of storage resources (file contents, database records, object contents)
- Application data or user data processed by customer systems
- Logs containing user activity details beyond resource-level access events

**Data minimization:**
- Only data necessary for platform function is collected and retained
- Configuration snapshots are retained for operational purposes; older snapshots pruned per retention policy
- Cost data retained for 13 months for FinOps analysis purposes

---

## Secrets Management in the Platform

The platform manages customer cloud credentials as well as internal secrets (database passwords, API keys, service-to-service tokens):

- All secrets stored in centralized secrets manager (never in code, config files, or database columns)
- Secrets accessed via temporary tokens by service principals
- All secret access events logged
- Secrets rotated on schedule and on personnel changes
- Orphaned secrets (credentials for disconnected accounts) automatically revoked

---

## Data Retention

| Data Type | Default Retention | Configurable? |
|---|---|---|
| Resource inventory snapshots | 90 days (latest kept indefinitely) | Yes (min 30 days) |
| Cost records | 13 months | Yes (min 3 months) |
| Security findings | 12 months after resolution | Yes (min 6 months) |
| Audit log entries | 7 years | Yes (min 3 years; max indefinite) |
| Agent run records | 12 months | Yes (min 3 months) |
| Reports | Indefinite | No minimum |
| Compliance evidence | 7 years | Yes (min 3 years) |

---

## Safe Automation

The platform is designed so that automation cannot cause harm through carelessness:

- **Write access is off by default** — Cloud accounts are connected read-only; write must be explicitly enabled
- **Destructive actions require elevated approval** — Deletions, IAM changes, and network changes require higher risk tier and more approvers
- **Rollback plans are mandatory** — No Level 3+ action proceeds without a documented, validated rollback plan
- **Change windows protect production** — Production environments are protected by change windows; emergency bypass requires two-person auth
- **Rollback is automatic on failure** — Any execution failure triggers automatic rollback without waiting for human intervention
- **Agent permission boundaries are enforced** — Agents cannot call APIs not in their registered tool library; cannot access data outside their workspace

---

## Responsible AI Considerations

**Transparency:** Users always know when AI is generating a recommendation. AI recommendations are labeled as AI-generated and include the agent responsible.

**Explainability:** Every AI output includes a reasoning summary and data citations. Users can interrogate why an agent made a specific recommendation.

**Human oversight:** All consequential actions require human approval. AI does not act unilaterally on production systems.

**Accuracy monitoring:** AI accuracy is continuously monitored. If accuracy drops below threshold, agents are automatically paused pending review.

**No data training without consent:** Customer cloud data is not used to improve AI models without explicit customer consent and appropriate data processing agreements.

**Bias and fairness:** Cost and security recommendations are evaluated for systematic bias (e.g., recommendations that consistently disadvantage certain resource types or teams). Bias testing is included in the quarterly agent audit.

**Model updates:** All model updates follow the same evaluation process as new model deployments: offline testing, shadow mode, limited rollout, full rollout. No model update is deployed directly to production without evaluation.
