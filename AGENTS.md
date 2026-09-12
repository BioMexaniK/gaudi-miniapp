# Codex executor rules

- Work only from a task file in `tasks/TASK-<id>.md`.
- Use a dedicated task branch; do not work in `main`, merge, or push.
- Do not deploy or make irreversible production changes.
- Keep secrets only in environment variables; never put their values in code, commits, or reports.
- Complete every acceptance criterion with an actual check. If one cannot be completed, explain why.
- Append the executor report to the task file using `tasks/TEMPLATE.md`.
