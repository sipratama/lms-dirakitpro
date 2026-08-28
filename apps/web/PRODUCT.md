# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: beginners ~18+ in Indonesia who want to build their first website/application and need step-by-step guidance — university students needing portfolio projects, fresh graduates wanting tangible proof of skill, non-IT beginners starting to build digital products, junior developers who still need structured tutorials, aspiring freelancers wanting a first showable project. Most access the product over consumer-grade mobile connections in Indonesia (hard performance constraint, not a preference).

Explicitly out of scope (anti-persona): senior engineers wanting advanced system design, corporate LMS buyers, instructor marketplaces, learners wanting an intensive live bootcamp, learners specifically seeking a video-first course library.

Secondary: a founder/admin who authors and maintains course content directly (no separate content-ops team), and needs the authoring UI to prioritize function over decoration.

## Product Purpose

DirakitPro is a project-based, text-first learning platform: learners read structured material, practice immediately, pass short checkpoints, and finish a real final project they can showcase. Success for a learner is completing a course's Progress Rakitan and producing a Hasil Rakitan (final project) worth showing, not just consuming content. Success for the product (MVP) is proving that learners will pay for a text-first course when the outcome is concrete, and that they actually start, continue, and finish the material after purchasing.

## Positioning

DirakitPro is a project-based learning platform where beginners learn by reading, trying, and assembling something until it becomes a tangible result — deliberately **text-first, not video-first**: core lesson content is structured reading (markdown/code/image/callout/resource_link/task blocks), not video. This is a stated mechanism difference from video-course platforms, not just a style choice: text is cheaper and faster for the founder to produce and update, and lets learners scan/revisit a specific step instantly instead of scrubbing video.

## Operating Context

Core learner flow (the one the MVP is built around): Discover course → Purchase or free-enroll → Read structured lesson → Practice/Build → Checkpoint → Progress Rakitan updates → Final Project submission → Course Completed → optional public project link.

Lesson pattern within that flow: **Read → Try → Check → Build** — every explanation is followed by an action, not a wall of text. Build Progress (project milestones) is treated as more important than reading percentage and is shown more prominently in the UI.

Admin operating context: a founder-run authoring workflow (curriculum → lessons → content blocks → checkpoint config → publish), designed to be light enough for one person to run without deploying code changes to fix content.

## Capabilities and Constraints

- Text-first content only for MVP: markdown, code, image, callout, resource_link, task content blocks. **No video** in MVP (may be added later once demand is validated) — the content block renderer must stay generic enough to add a `video` block type later without restructuring the lesson workspace.
- Course commerce: single-course purchase via Midtrans Snap (Indonesia), plus free-course direct enrollment. No bundles, no subscriptions in MVP.
- Checkpoints are auto-graded single/multiple-choice quizzes with unlimited retries — not high-stakes exams.
- Final project submission (title, description, conditional live/repo URL, screenshot, technologies) with PRIVATE/PUBLIC visibility toggle; PUBLIC creates a shareable public project page.
- Explicit MVP non-goals (do not build): video hosting, live classes, forum/community, human code review, mentor marketplace, interactive cloud IDE/code runner, certificates, subscriptions, promotional bundles, in-app mentoring booking, AI learning assistant, native mobile app, complex gamification, leaderboards, microservices.
- Mobile-first is a hard constraint, not a preference: lesson payload must stay light (optimized images, no heavy animation libraries, subset fonts) because the primary audience is on mid-tier mobile connections in Indonesia.
- AI use by learners is explicitly allowed; checkpoints/projects exist specifically to still validate that the learner produced/understands the result.
- Terminology: learner-facing brand vocabulary is fixed and must be used verbatim, not translated or shortened — **Mulai Merakit** (start course), **Lanjut Merakit** (continue course), **Progress Rakitan** (course progress), **Hasil Rakitan** (final project), **Rakitanmu jadi!** (course completed), **Tunjukkan Karyamu** (publish project). UI chrome is Bahasa Indonesia; technical lesson content (git, deploy, component, etc.) stays in English/technical terms since that's the material being taught.
- Undecided: whether/when video is added is an explicit open product question the MVP itself is designed to gather evidence for (§5.4 of the PRD: "video demand signal" is a tracked metric) — do not treat this as decided either way.

## Brand Commitments

Name: **DirakitPro** ("merakit" = to assemble/build in Bahasa Indonesia — the product's core metaphor is a digital workshop/assembly bench, not a generic course platform). No logo/wordmark file exists yet — visual identity (including the wordmark itself) is an open decision for the design/token stage, not yet binding.

Personality (confirmed, from the product's own design brief): calm and focused (a lesson page should read like good technical documentation, not a social feed), concrete and outcome-oriented (visuals emphasize real build progress over abstract scores), technically honest (code/terminal/file-structure content shown as-is, not over-decorated), beginner-friendly without being condescending (the audience wants to build real professional credibility).

Explicit anti-references (must avoid): AI-generic purple/mesh gradients, decorative glow, uniform "three equal cards" feature rows, generic cards used for every content type (lesson/milestone/testimonial all wrapped the same), em/en-dash in Indonesian copy, section-numbering eyebrows above headings, decorative version/status pills, generic hand-drawn hero SVG illustrations, fake product UI (a div pretending to be a code editor instead of a real component).

## Evidence on Hand

No real course/lesson content exists yet — all learner-facing pages (`/courses`, `/learn/[courseSlug]`, etc.) are still scaffold placeholders (e.g. `<h1>Kelas</h1>`) with no real curriculum written. There are no testimonials, case studies, screenshots, or press to reference. Future design/content work must not fabricate any of these — treat their absence as current product truth, not a gap to fill with invented examples.

## Product Principles

1. **Read → Try → Check → Build, always** — every unit of content structure follows this lesson pattern; nothing is a pure reading wall without an action.
2. **Build Progress over reading percentage** — the UI must always make tangible project progress more visible than abstract completion percentages.
3. **Outcome before theory** — concepts are introduced exactly when needed for the build at hand, not front-loaded.
4. **Text-first is a cost/speed mechanism, not just an aesthetic** — every product decision should remember that text is what makes the founder able to produce and fix content alone, quickly, without redeploying.
5. **MVP simplicity is deliberate** — resist adding scope from the explicit non-goals list even when it would be "nice"; the MVP's job is to validate the core purchase → build → complete loop first.

## Accessibility & Inclusion

WCAG 2.2 AA is a required standard, not aspirational: semantic heading structure (one `h1` per page), full keyboard navigation with visible focus rings, color contrast ≥4.5:1 body text / ≥3:1 large text and UI elements (checked in both light and dark), mandatory alt text on all lesson images (enforced at upload time in the admin UI, not optional), copyable/keyboard-accessible code blocks with an announced copy confirmation, inline per-field form errors (not banner-only), `aria-live="polite"` announcements for progress/checkpoint-result/toast changes, and `prefers-reduced-motion` respected by every animation.
