# Trust, Governance, and Approval Model — CloudPilot OS

---

## Philosophy

AI-powered cloud operations is a high-stakes domain. Cloud environments host production systems, customer data, financial transactions, and regulated workloads. The consequences of a wrong automated action range from a brief service disruption to a major incident, a compliance violation, or a security breach.

The trust model in CloudPilot OS is built on three principles:

1. **Trust is earned, not assumed.** Agents start with limited autonomy and earn the right to act with more independence over time, based on demonstrated accuracy and reliability.
2. **Humans are responsible for consequential decisions.** The platform makes humans more effective at making decisions — it does not remove them from the loop without explicit organizational consent.
3. **Every action is explainable and auditable.** There should never be a question of what happened, who decided it, why, and what the outcome was.

---

## Role-Based Access Control

### Role Definitions

| Role | Description |
|---|---|
| **Organization Admin** | Full platform access. Manages users, accounts, policies, billing, and agent configuration. |
| **CloudOps Lead** | Full operational access. Creates and approves remediations. Manages workflows. Generates reports. Cannot modify org settings or billing. |
| **Security Lead** | Full security and compliance module access. Manages findings, exceptions, and compliance packages. Approves security remediations. |
| **FinOps Analyst** | Full cost module access. Reviews and approves cost recommendations. Cannot approve security remediations. |
| **Platform Engineer** | Full read access. Executes own team's assigned remediations. Triggers agent workflows. Cannot approve cross-team actions. |
| **MSP Manager** | Access to all assigned customer workspaces. Can configure customer agents and reporting. Cannot access other MSP engineers' customers. |
| **MSP Engineer** | Access to assigned customer workspaces only. Executes remediations within assigned customers. |
| **Executive Reader** | Read-only access to executive dashboards and reports. No operational access. |
| **Read-Only** | Read-only access to all dashboards and data. No action capabilities. |

### Permission Matrix

| Permission | Org Admin | CloudOps Lead | Security Lead | FinOps Analyst | Engineer | Read-Only |
|---|---|---|---|---|---|---|
| Connect cloud account | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ |
| View all accounts | ✓ | ✓ | ✓ | ✓ | team only | ✓ |
| View cost data | ✓ | ✓ | ✓ | ✓ | team only | ✓ |
| Approve cost recommendation | ✓ | ✓ | ✗ | ✓ | ✗ | ✗ |
| Approve security remediation | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |
| Approve exception | ✓ | ✗ | ✓ | ✗ | ✗ | ✗ |
| Configure agent autonomy | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ |
| Generate compliance package | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |
| Manage users | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ |
| View audit log | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |

---

## Tenant and Customer Isolation

In MSP mode, the platform manages multiple customer workspaces within a single organization context. Isolation is enforced at every layer:

**Application layer:**
- All API requests include workspace context; cross-workspace queries are rejected at the middleware layer
- JWT tokens include workspace scope claims; tokens cannot be used across customer boundaries

**Data layer:**
- Customer data is partitioned by workspace ID at the database level
- Row-level security enforced on all tables
- No cross-workspace joins permitted in ORM or SQL layer

**Agent layer:**
- Agents run within workspace context; tool calls are workspace-scoped
- An agent working on Customer A cannot access Customer B's data even if both run on the same underlying infrastructure

**Audit layer:**
- Audit logs are workspace-scoped
- MSP engineers can only view audit logs for their assigned customers
- MSP manager can view audit logs across all customers

---

## Autonomy Level Framework

### Level 0 — Observe

**What agents can do:** Read cloud data, generate summaries, calculate scores, update dashboards  
**What agents cannot do:** Generate recommendations, create workflows, send notifications  
**When used:** New account onboarding; untrusted data source; initial platform deployment  
**Human required:** No action possible — view only  

---

### Level 1 — Recommend

**What agents can do:** All Level 0 + generate recommendations with explanations, send notification alerts  
**What agents cannot do:** Create workflows, request approvals, take any action  
**When used:** Default for all new agent deployments; standard for most enterprise accounts  
**Human required:** Human decides whether to act on recommendation; no system action occurs without human initiation  
**Activation:** Default on account connection  

---

### Level 2 — Draft Workflow

**What agents can do:** All Level 1 + create draft remediation workflow (unpublished), add to review queue  
**What agents cannot do:** Request approval for execution; execute anything  
**When used:** Teams that want AI to do the preparation work but want to review before it enters the approval queue  
**Human required:** Human reviews draft, modifies if needed, and submits for approval  
**Activation:** Account admin enables per agent type  

---

### Level 3 — Execute on Approval

**What agents can do:** All Level 2 + submit remediation workflow for human approval; execute upon approval  
**What agents cannot do:** Execute without explicit approval; self-approve  
**When used:** Standard for mature CloudOps teams (30+ days on platform)  
**Human required:** Explicit approval from authorized approver before any execution  
**Activation:** Account admin enables; requires minimum 30 days of Level 1/2 operation  

---

### Level 4 — Auto-Execute (Low Risk)

**What agents can do:** All Level 3 + execute a pre-approved class of actions without per-action approval  
**Action classes eligible for Level 4 (configurable):**
  - Apply organizational tags to untagged resources
  - Enable access logging on storage resources
  - Enable default encryption on new buckets
  - Disable unused API keys older than 365 days with no recent activity
  - Send idle resource notifications to owners
**What agents cannot do:** Execute outside pre-approved action classes; modify production compute, databases, or network configuration  
**When used:** Teams that have validated agent accuracy over 90+ days; action types with defined safety boundaries  
**Activation:** Requires CloudOps Lead + Security Lead approval for each action class; reviewed quarterly  

---

### Level 5 — Autonomous

**What agents can do:** Operate continuously within explicitly defined policy boundaries  
**Current status:** Reserved for future capability — not available in MVP or V1  
**When it will be used:** After extensive Level 4 track record, formal governance review, rollback simulation testing  
**Guardrails required:** Real-time monitoring dashboard, immediate kill switch, mandatory rollback capability, human escalation path for all anomalies  

---

## Risk Tier Framework

Every remediation action is assigned a risk tier. The tier determines the approval workflow required.

| Tier | Description | Examples | Approval Required |
|---|---|---|---|
| **Low** | Reversible, no service impact, non-production | Apply tags, enable logging, update descriptions | Single approver |
| **Medium** | Reversible, minor service impact possible, any environment | Resize non-critical instance, update security group rule | Single approver + 24h change window |
| **High** | Potentially disruptive, production impact possible | Resize production compute, modify IAM policy, update network ACL | Two approvers (CloudOps Lead + Security Lead) |
| **Critical** | High blast radius, production systems, irreversible elements | Delete resources, modify production database, change authentication | Two approvers + CISO notification + change board review |

---

## Approval Workflow Design

### Standard Approval (Low/Medium Risk)

```
Agent submits remediation → Approval notification sent to approvers
    │
    ├── Approver reviews: action details, risk tier, steps, rollback plan, AI reasoning
    │
    ├── Approver decides:
    │     Approve → Workflow scheduled for execution
    │     Reject → Workflow closed; agent notified; reason logged
    │     Modify → Approver edits steps; workflow resubmitted
    │     Request Info → AI agent sent follow-up questions; resubmitted on response
    │
    └── If no response in SLA window (default 24h) → Escalate to CloudOps Lead
```

### High-Risk Approval

```
Agent submits High-risk remediation → Both approvers notified
    │
    ├── Approver 1 reviews and approves
    │
    ├── Approver 2 (independent) reviews and approves
    │     (Neither approver can be the original requester)
    │
    ├── Both approvals must be received before execution
    │
    └── Change window must be scheduled; no immediate execution
```

### Self-Approval Prevention

- Platform enforces that no user can approve a workflow they created or requested
- If the only qualified approver is the requester, automatic escalation to the next management level
- All approvals logged with IP address and timestamp for audit trail

---

## Audit Log and Explainability

### Audit Log Entries

Every significant platform event generates an audit log entry:

| Event Type | Actor | Details Logged |
|---|---|---|
| Agent run | Agent | Agent name, trigger, inputs, reasoning trace, tool calls, outputs, tokens used |
| Recommendation generated | Agent | Data sources, reasoning, recommendation details, confidence score |
| Approval requested | Agent/System | Action details, risk tier, rollback plan |
| Approval decision | User | Decision, notes, timestamp, IP address |
| Remediation executed | Agent | Steps executed, before/after state, execution time, success/failure |
| Rollback executed | Agent/System | Rollback trigger reason, steps, outcome |
| Finding detected | System/Agent | Rule triggered, resource, severity, context |
| Exception granted | User | Policy, resource, justification, duration, conditions |
| User access change | Admin | Old role, new role, changed by, reason |

### Explainability Requirements

Every AI-generated output must include:

1. **Data sources** — What data was used to generate this output? (specific accounts, resources, metrics, time range)
2. **Reasoning summary** — Why did the agent produce this recommendation?
3. **Confidence score** — How confident is the agent in this output? (0–100)
4. **Limitations** — What is the agent uncertain about? What data might be missing?
5. **Alternatives considered** — Were there other options? Why was this one recommended?

---

## Evidence and Rollback

### Rollback Plan Requirements

Every Level 3+ remediation must include a documented rollback plan that:
- Identifies the specific steps to undo the action
- Identifies the time window within which rollback is possible
- Identifies any external dependencies that could prevent rollback
- Has been validated (for high-risk actions: tested in a staging environment)

### Automatic Rollback Triggers

The system automatically initiates rollback if:
- Any execution step returns an error response (non-2xx status)
- Post-execution verification fails (finding not resolved; resource not in expected state)
- Resource health check fails within 15 minutes of execution completion

### Evidence Attachment

For compliance-relevant remediations, evidence packages are automatically generated:
- Before-state screenshot (API response)
- Execution steps and timestamps
- After-state confirmation (API response)
- Verification confirmation
- Approver decision record

---

## Change Window Management

Production remediations are scheduled within defined change windows:

**Default change windows:**
- Production: Tuesdays and Thursdays, 22:00–02:00 (local time)
- Staging: Any business day, 18:00–08:00
- Development: Any time

**Emergency bypass:**
- Available for Critical severity security findings (e.g., active data exposure)
- Requires two-person emergency approval (CloudOps Lead + Security Lead)
- Post-incident review required within 48 hours
- All emergency bypasses flagged in audit log and monthly report

---

## Exception Handling

### Exception Lifecycle

```
Exception requested by resource owner
    ↓
Policy Governance Agent evaluates request:
    - Policy violated
    - Resource risk context
    - Justification validity
    - Compensating controls
    - Recommended conditions
    ↓
Routed to Security Lead for decision
    ↓
Approved → Exception record created with:
    - Duration (30, 60, 90, or 365 days)
    - Compensating controls required
    - Review schedule
    - Auto-escalation on expiry if not renewed
    ↓
At expiry date → Re-evaluate:
    - If remediated: close exception, close violation
    - If not remediated: re-activate violation, escalate
```

### Exception Registry

All exceptions are tracked in the exception registry:
- Exception ID, policy, resource, justification, approver, granted date, expiry date
- Status: active, expired, renewed, revoked
- Compensating controls: listed and periodically verified
- Audit trail: all changes to exception status logged

---

## Escalation Paths

| Situation | Escalation Path |
|---|---|
| Critical finding with no approver response in 4 hours | Auto-escalate to CloudOps Manager via PagerDuty |
| Remediation execution failure | Auto-create incident; alert CloudOps Manager and on-call engineer |
| Exception request denied and violation remains open | Weekly escalation to Security Lead until resolved |
| Agent confidence score below threshold | Human review required; recommendation flagged |
| Agent rollback rate exceeds 10% in rolling 7 days | Agent paused; platform admin and CloudOps Lead notified |
| Compliance readiness below 80% with audit in < 30 days | Daily alert to Compliance Lead and CTO |

---

## Agent Permission Boundaries

Agents operate within explicitly defined permission boundaries. These are configured at deployment time and enforced by the tool library.

**Things agents are always permitted to do:**
- Read cloud resource configurations via registered connectors
- Read cost and billing data
- Read finding and policy data
- Write to the platform's internal data store (recommendations, findings, reports)
- Send notifications through configured notification channels

**Things agents must never do:**
- Execute any write operation against a cloud provider without Level 3+ configuration and human approval
- Access data outside their workspace scope
- Make external HTTP calls outside the registered tool library
- Store customer data outside the platform's data boundary
- Access credential or secret stores
- Modify audit log records

**Things that require explicit configuration:**
- Accessing cloud provider write APIs (requires Level 3+; must be explicitly enabled per account)
- Auto-executing pre-approved action classes (requires Level 4 configuration with action class definition)
- Sending external notifications (requires integration configuration by admin)
