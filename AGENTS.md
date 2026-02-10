## Skills
A skill is a set of local instructions to follow that is stored in a `SKILL.md` file. Below is the list of skills that can be used. Each entry includes a name, description, and file path so you can open the source for full instructions when using a specific skill.

### Available skills
- project-workflow: Use Makefile targets first (except npm dependency installs), request permission before npm installs, and always run lint + typecheck after code changes. (file: ./.codex/skills/project-workflow/SKILL.md)
- prettier-workflow: Run Prettier through Makefile targets, verify formatting completes successfully, and report touched files concisely. (file: ./.codex/skills/prettier-workflow/SKILL.md)
- test-maintenance-workflow: Add or update automated tests whenever code behavior changes in api or web, and run lint + typecheck + tests before handoff. (file: ./.codex/skills/test-maintenance-workflow/SKILL.md)
- readme-maintenance: Keep README.md concise and keep detailed docs in docs/ while ensuring documentation stays aligned with commands, endpoints, and environment variables. (file: ./.codex/skills/readme-maintenance/SKILL.md)
- search-architecture: Design scalable DDBuilder search with one global index and page-level refinement, including locale-aware indexing and deep links to target modules/sections. (file: ./.codex/skills/search-architecture/SKILL.md)

### How to use skills
- Discovery: The list above is the skills available in this session (name + description + file path). Skill bodies live on disk at the listed paths.
- Trigger rules: If the user names a skill (with `$SkillName` or plain text) OR the task clearly matches a skill's description shown above, you must use that skill for that turn. Multiple mentions mean use them all. Do not carry skills across turns unless re-mentioned.
- Missing/blocked: If a named skill isn't in the list or the path can't be read, say so briefly and continue with the best fallback.
