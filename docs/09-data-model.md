# Data Model — CloudPilot OS

---

## Entity Overview

```
Organization
    └── Workspace(s)
         └── Customer(s) [MSP mode]
              └── CloudAccount(s)
                   └── Resource(s)
                        ├── ResourceTag(s)
                        ├── CostRecord(s)
                        ├── SecurityFinding(s)
                        └── ComplianceControl evidence

Organization → Policy(ies)
Policy → PolicyViolation(s)
SecurityFinding → RemediationAction(s)
RemediationAction → Approval(s)
Approval → Workflow(s)
Agent → AgentRun(s)
AgentRun → Report(s) | Recommendation(s) | Workflow(s)
User → Role → Permissions
All entities → AuditLog(s)
```

---

## Entity Definitions

### Organization

**Description:** The top-level tenant entity. In enterprise mode, one organization = one company. In MSP mode, one organization = the MSP.

**Key Attributes:**
- `id`: UUID
- `name`: String
- `domain`: String (email domain for SSO)
- `plan`: Enum (starter, professional, enterprise, msp)
- `created_at`: Timestamp
- `settings`: JSONB (feature flags, default configurations)
- `billing_status`: Enum (active, trial, suspended)

**Relationships:**
- Has many `Workspace`
- Has many `User`
- Has many `Policy`

**Example:**
```json
{
  "id": "org-8f2a1b3c",
  "name": "Meridian Infrastructure Group",
  "domain": "meridian-infra.internal",
  "plan": "enterprise",
  "created_at": "2025-09-01T00:00:00Z",
  "billing_status": "active"
}
```

---

### Workspace

**Description:** A logical grouping within an organization, typically corresponding to a team, department, or environment. In MSP mode, each customer is a workspace.

**Key Attributes:**
- `id`: UUID
- `org_id`: FK → Organization
- `name`: String
- `type`: Enum (internal, customer)
- `created_at`: Timestamp
- `settings`: JSONB

**Relationships:**
- Belongs to `Organization`
- Has many `CloudAccount`
- Has many `User` (through workspace membership)
- Has one `Customer` (if type = customer)

---

### Customer

**Description:** In MSP mode, represents a managed customer. Contains customer-facing configuration and reporting settings.

**Key Attributes:**
- `id`: UUID
- `workspace_id`: FK → Workspace
- `name`: String
- `contact_name`: String
- `contact_email`: String
- `sla_tier`: Enum (standard, premium, enterprise)
- `health_score`: Integer (0–100, computed)
- `monthly_report_enabled`: Boolean
- `report_branding_config`: JSONB
- `assigned_engineer_id`: FK → User
- `onboarded_at`: Timestamp

**Relationships:**
- Has one `Workspace`
- Has many `CloudAccount` (through Workspace)

**Example:**
```json
{
  "id": "cust-4a9d2f7e",
  "name": "Apex Manufacturing Corp",
  "contact_name": "David Huang",
  "contact_email": "d.huang@apex-mfg.com",
  "sla_tier": "enterprise",
  "health_score": 74,
  "monthly_report_enabled": true,
  "assigned_engineer_id": "usr-m3k9p1",
  "onboarded_at": "2025-11-15T00:00:00Z"
}
```

---

### CloudProvider

**Description:** Represents a cloud provider integration definition.

**Key Attributes:**
- `id`: UUID
- `name`: Enum (aws, azure, gcp, custom)
- `display_name`: String
- `connector_version`: String
- `supported_regions`: Array[String]
- `read_permission_template`: String (IAM policy / role template)
- `write_permission_template`: String (optional; for remediation)

---

### CloudAccount

**Description:** A connected cloud account or subscription.

**Key Attributes:**
- `id`: UUID
- `workspace_id`: FK → Workspace
- `provider`: Enum (aws, azure, gcp)
- `account_id`: String (e.g., AWS Account ID, Azure Subscription ID)
- `account_name`: String
- `environment`: Enum (production, staging, development, sandbox)
- `region_list`: Array[String]
- `connection_status`: Enum (connected, error, disconnected)
- `last_scan_at`: Timestamp
- `read_role_arn`: String (AWS) / service_principal_id / service_account_email
- `write_enabled`: Boolean (default false)
- `monthly_spend_current`: Decimal
- `resource_count`: Integer
- `health_score`: Integer (0–100)
- `tags`: JSONB

**Relationships:**
- Belongs to `Workspace`
- Has many `Resource`
- Has many `CostRecord`

**Example:**
```json
{
  "id": "acct-7bc3a119",
  "workspace_id": "ws-apex-prod",
  "provider": "aws",
  "account_id": "123456789012",
  "account_name": "apex-production",
  "environment": "production",
  "region_list": ["us-east-1", "us-west-2", "eu-west-1"],
  "connection_status": "connected",
  "last_scan_at": "2026-06-12T06:00:00Z",
  "write_enabled": true,
  "monthly_spend_current": 84320.00,
  "resource_count": 412,
  "health_score": 78
}
```

---

### Resource

**Description:** A single cloud infrastructure resource (EC2 instance, S3 bucket, RDS database, etc.).

**Key Attributes:**
- `id`: UUID (internal)
- `provider_resource_id`: String (AWS ARN, Azure resource ID, GCP resource name)
- `account_id`: FK → CloudAccount
- `resource_type`: String (e.g., aws_ec2_instance, azure_sql_database)
- `resource_name`: String
- `region`: String
- `environment`: String
- `status`: Enum (running, stopped, available, unavailable, unknown)
- `configuration`: JSONB (full resource configuration snapshot)
- `cost_monthly_estimate`: Decimal
- `owner_tag`: String
- `last_seen_at`: Timestamp
- `created_at`: Timestamp
- `security_score`: Integer (0–100)
- `is_internet_facing`: Boolean
- `has_open_findings`: Boolean
- `finding_count_by_severity`: JSONB ({"critical": 0, "high": 2, "medium": 5})

**Relationships:**
- Belongs to `CloudAccount`
- Has many `ResourceTag`
- Has many `SecurityFinding`
- Has many `CostRecord`
- Has many `PolicyViolation`

**Example:**
```json
{
  "id": "res-9f3c812a",
  "provider_resource_id": "arn:aws:ec2:us-east-1:123456789012:instance/i-0abc123def456789",
  "account_id": "acct-7bc3a119",
  "resource_type": "aws_ec2_instance",
  "resource_name": "web-server-prod-01",
  "region": "us-east-1",
  "environment": "production",
  "status": "running",
  "cost_monthly_estimate": 142.56,
  "is_internet_facing": true,
  "has_open_findings": true,
  "finding_count_by_severity": {"critical": 0, "high": 1, "medium": 2, "low": 3}
}
```

---

### CostRecord

**Description:** A daily cost record for a resource or service.

**Key Attributes:**
- `id`: UUID
- `account_id`: FK → CloudAccount
- `resource_id`: FK → Resource (nullable — some cost records are service-level)
- `date`: Date
- `amount`: Decimal
- `currency`: String (default USD)
- `service`: String
- `usage_type`: String
- `region`: String
- `tags`: JSONB (for allocation)

**Example:**
```json
{
  "id": "cost-2a881f4c",
  "account_id": "acct-7bc3a119",
  "resource_id": "res-9f3c812a",
  "date": "2026-06-10",
  "amount": 4.752,
  "service": "AmazonEC2",
  "usage_type": "BoxUsage:t3.large",
  "region": "us-east-1"
}
```

---

### SecurityFinding

**Description:** A detected security misconfiguration or vulnerability in a cloud resource.

**Key Attributes:**
- `id`: UUID
- `resource_id`: FK → Resource
- `account_id`: FK → CloudAccount
- `rule_id`: String (reference to security rule that triggered the finding)
- `title`: String
- `description`: String
- `severity`: Enum (critical, high, medium, low, informational)
- `category`: Enum (iam, network, storage, encryption, logging, kubernetes, compute, database)
- `status`: Enum (open, in_progress, resolved, excepted, suppressed)
- `ai_context`: Text (AI-generated business context and risk explanation)
- `ai_remediation_plan`: JSONB (AI-generated remediation steps)
- `blast_radius_score`: Integer (0–100)
- `exploit_intelligence`: Boolean (known CVE or exploitation path)
- `compliance_frameworks`: Array[String]
- `first_detected_at`: Timestamp
- `last_seen_at`: Timestamp
- `resolved_at`: Timestamp (nullable)
- `exception_id`: FK → PolicyViolation exception (nullable)

**Example:**
```json
{
  "id": "finding-c4f2891a",
  "resource_id": "res-5a9c341b",
  "severity": "critical",
  "category": "storage",
  "title": "S3 bucket with public read access",
  "description": "The S3 bucket 'customer-backups-prod' has public read access enabled via bucket ACL.",
  "status": "open",
  "ai_context": "This bucket contains production customer backup data in a HIPAA-tagged account. Public read access was enabled 6 hours ago, potentially through an accidental ACL change. Three unknown IP addresses have accessed the bucket since the configuration change. This is a Critical finding with immediate HIPAA breach notification implications.",
  "blast_radius_score": 92,
  "exploit_intelligence": false,
  "compliance_frameworks": ["SOC2", "HIPAA", "ISO27001"],
  "first_detected_at": "2026-06-12T08:32:00Z"
}
```

---

### ComplianceFramework

**Description:** A compliance standard that the organization maps to.

**Key Attributes:**
- `id`: UUID
- `name`: Enum (soc2_type2, iso27001, hipaa, pci_dss, cis_benchmarks, nist_csf, fedramp)
- `display_name`: String
- `version`: String
- `control_count`: Integer
- `automated_control_count`: Integer (controls with automated evidence)

---

### ComplianceControl

**Description:** An individual control within a compliance framework.

**Key Attributes:**
- `id`: UUID
- `framework_id`: FK → ComplianceFramework
- `control_id`: String (e.g., "CC6.1", "A.9.1.1")
- `title`: String
- `description`: String
- `category`: String
- `evidence_type`: Enum (automated, manual, hybrid)
- `status`: Enum (pass, fail, partial, not_applicable, manual_review_needed)
- `evidence`: JSONB (collected evidence snapshot)
- `evidence_collected_at`: Timestamp
- `ai_narrative`: Text (AI-generated evidence narrative)
- `linked_rule_ids`: Array[String] (security rules that provide evidence for this control)

---

### Policy

**Description:** An organizational policy defining required cloud resource configuration standards.

**Key Attributes:**
- `id`: UUID
- `org_id`: FK → Organization
- `name`: String
- `description`: String
- `rule_expression`: JSONB (policy evaluation logic)
- `severity`: Enum (critical, high, medium, low)
- `enforced_on`: Array[String] (account IDs, environment types, or resource types)
- `created_by`: FK → User
- `active`: Boolean
- `exception_allowed`: Boolean

**Example:**
```json
{
  "id": "policy-3bc9a1f2",
  "name": "Encryption at Rest Required",
  "description": "All storage resources must have encryption at rest enabled.",
  "severity": "high",
  "enforced_on": ["environment:production", "environment:staging"],
  "active": true,
  "exception_allowed": true
}
```

---

### Recommendation

**Description:** An AI-generated recommendation for cost optimization or security improvement.

**Key Attributes:**
- `id`: UUID
- `type`: Enum (rightsize, delete_idle, reserve_capacity, security_fix, cost_reduction)
- `resource_id`: FK → Resource
- `account_id`: FK → CloudAccount
- `title`: String
- `description`: Text
- `ai_reasoning`: Text (AI-generated explanation)
- `confidence_score`: Integer (0–100)
- `estimated_monthly_savings`: Decimal (nullable for security recommendations)
- `risk_tier`: Enum (low, medium, high, critical)
- `status`: Enum (pending, approved, rejected, executed, expired)
- `created_at`: Timestamp
- `reviewed_by`: FK → User (nullable)
- `reviewed_at`: Timestamp (nullable)
- `review_notes`: Text (nullable)
- `realized_savings`: Decimal (nullable; populated after execution)

---

### RemediationAction

**Description:** A specific remediation action generated by an agent or requested by a user.

**Key Attributes:**
- `id`: UUID
- `finding_id`: FK → SecurityFinding (nullable)
- `recommendation_id`: FK → Recommendation (nullable)
- `account_id`: FK → CloudAccount
- `resource_id`: FK → Resource
- `title`: String
- `description`: Text
- `steps`: JSONB (ordered list of execution steps)
- `rollback_plan`: JSONB (ordered list of rollback steps)
- `risk_tier`: Enum (low, medium, high, critical)
- `estimated_duration_minutes`: Integer
- `scheduled_for`: Timestamp (nullable; for change window scheduling)
- `status`: Enum (draft, pending_approval, approved, rejected, executing, completed, rolled_back, failed)
- `created_by_agent`: String (agent name, nullable)
- `created_by_user`: FK → User (nullable)
- `before_state`: JSONB
- `after_state`: JSONB (populated post-execution)
- `executed_at`: Timestamp (nullable)
- `completed_at`: Timestamp (nullable)
- `rollback_triggered`: Boolean
- `rollback_reason`: Text (nullable)

---

### Approval

**Description:** A human approval decision on a remediation action.

**Key Attributes:**
- `id`: UUID
- `remediation_action_id`: FK → RemediationAction
- `approver_id`: FK → User
- `decision`: Enum (approved, rejected, modified, needs_info)
- `notes`: Text
- `decided_at`: Timestamp
- `requires_second_approval`: Boolean
- `second_approver_id`: FK → User (nullable)
- `second_decision`: Enum (nullable)

---

### Agent

**Description:** Represents a registered AI agent in the platform.

**Key Attributes:**
- `id`: UUID
- `name`: String (e.g., "cost-optimization-agent")
- `display_name`: String
- `description`: Text
- `autonomy_level`: Enum (0–5)
- `schedule`: String (cron expression)
- `enabled`: Boolean
- `last_run_at`: Timestamp
- `last_run_status`: Enum (success, failed, running, skipped)
- `tools_allowed`: Array[String]
- `config`: JSONB (agent-specific configuration)

---

### AgentRun

**Description:** A single execution of an agent.

**Key Attributes:**
- `id`: UUID
- `agent_id`: FK → Agent
- `triggered_by`: Enum (schedule, event, manual, workflow)
- `started_at`: Timestamp
- `completed_at`: Timestamp (nullable)
- `status`: Enum (running, completed, failed, cancelled)
- `input_context`: JSONB
- `reasoning_trace`: JSONB (step-by-step reasoning)
- `tool_calls`: JSONB (all tool calls made with inputs/outputs)
- `output`: JSONB
- `tokens_used`: Integer
- `cost_usd`: Decimal

---

### User

**Description:** A platform user.

**Key Attributes:**
- `id`: UUID
- `org_id`: FK → Organization
- `email`: String
- `name`: String
- `role_id`: FK → Role
- `mfa_enabled`: Boolean
- `last_login_at`: Timestamp
- `created_at`: Timestamp
- `workspace_memberships`: Array[UUID] (FK → Workspace)

---

### Role

**Description:** A set of permissions assigned to a user.

**Key Attributes:**
- `id`: UUID
- `name`: String (e.g., "org_admin", "cloudops_lead", "security_lead", "finops_analyst", "engineer", "read_only")
- `permissions`: JSONB (granular permission list)
- `is_system_role`: Boolean

---

### AuditLog

**Description:** An immutable record of every significant action in the platform.

**Key Attributes:**
- `id`: UUID
- `timestamp`: Timestamp
- `actor_type`: Enum (user, agent, system)
- `actor_id`: String (user ID or agent name)
- `action`: String (e.g., "remediation.approved", "agent.cost_optimization.run", "finding.status_changed")
- `resource_type`: String
- `resource_id`: String
- `account_id`: FK → CloudAccount (nullable)
- `workspace_id`: FK → Workspace
- `details`: JSONB (full context of the action)
- `ip_address`: String (for user actions)
- `outcome`: Enum (success, failure, partial)

**Example:**
```json
{
  "id": "audit-f8a3c291",
  "timestamp": "2026-06-12T09:15:32Z",
  "actor_type": "user",
  "actor_id": "usr-m3k9p1",
  "action": "remediation.approved",
  "resource_type": "RemediationAction",
  "resource_id": "rem-6bc4a22d",
  "account_id": "acct-7bc3a119",
  "workspace_id": "ws-apex-prod",
  "details": {
    "risk_tier": "medium",
    "action_title": "Resize EC2 instance web-server-prod-01 from t3.xlarge to t3.large",
    "notes": "Approved following 14-day utilization review showing peak CPU at 42%"
  },
  "outcome": "success"
}
```
