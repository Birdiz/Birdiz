---
name: ambiance-planning
description: Plan and implement immersive fantasy ambiance across the full frontend, including full-width atmospheric backgrounds, feature-related imagery, and consistent visual language across all pages/components. Use when users request mood/style upgrades inspired by fantasy products (for example dndbeyond-like direction), atmosphere-first redesigns, or broader visual cohesion work.
---

# Ambiance Planning Workflow

1. Define a visual direction before editing.
- Capture target mood, palette, typography, framing, and motion in concrete terms.
- Confirm whether the request is page-specific or whole-site.

2. Audit shared UI surfaces first.
- Inspect layout shell, hero, cards, section wrappers, sidebar, footer, and table/list components.
- Prefer shared class updates over per-page one-off styling.

3. Apply atmosphere in layers.
- Base layer: global background gradients/textures.
- Context layer: full-width hero or section atmosphere visuals per page.
- Feature layer: card/module visuals tied to the feature purpose.

4. Preserve readability and hierarchy.
- Keep contrast strong for body copy.
- Use accent colors for emphasis only.
- Ensure interactive states remain obvious on hover/focus/active.

5. Keep implementation local and deterministic.
- Prefer repository-hosted SVG/asset files over remote image dependencies.
- Reuse style tokens and component classes to avoid visual drift.

6. Validate behavior and quality.
- Update tests for any behavior/prop changes.
- For web changes in this repository, run:
`make lint-web`
`make typecheck-web`
`make test-web`

7. Report results clearly.
- Summarize design direction applied.
- List touched files and new assets.
- Note any visual tradeoffs or follow-up refinements.
