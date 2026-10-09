# Architecture
- Keep the portfolio as a single-page React experience with separate certification and tool detail routes, preserving shareable deep links.
- Use SectionHeading and GlowCard for repeated portfolio sections and items so spacing and interaction stay consistent.
- Define all palette, typography, background animation, and diagram styling through global semantic tokens; this keeps both themes coherent.
- Use CSS-only background motion with reduced-motion support instead of continuous JavaScript rendering to protect page performance.
- Featured project links must resolve to the user's public repositories; architecture illustrations are conceptual, not application screenshots.