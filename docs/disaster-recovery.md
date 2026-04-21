# Backup and Disaster Recovery Plan

## Database Backups

- Nightly full PostgreSQL backup
- 30-day retention policy
- Optional WAL archiving for point-in-time recovery

## Recovery Workflow

1. Provision replacement DB instance
2. Restore latest valid backup
3. Replay WAL (if enabled) to target timestamp
4. Validate application health via API probes
5. Re-enable traffic once consistency checks pass

## Operational Drills

- Weekly backup verification
- Monthly restore drill to staging
- Incident runbook ownership assigned to platform team

## Targets

- RPO: <= 24h (improved with WAL)
- RTO: infra-dependent, minimized via IaC automation
