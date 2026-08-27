# DirakitPro — MVP Product Requirements Document

> **Version:** V1.4 — Text-First MVP  
> **Status:** Proposed Scope Reset  
> **Date:** 27 August 2026  
> **Market:** Indonesia  
> **Primary segment:** Beginner digital builders, primarily ages 18++
> **Brand philosophy:** **Profesional itu dirakit.**  
> **Beginner promise:** **Mulai dari rakitan pertama.**

> **Language note:** This document is written in English for product and engineering use. Canonical learner-facing DirakitPro brand phrases remain in Bahasa Indonesia because the MVP market is Indonesia.

---

## 1. Executive Summary

DirakitPro is an online learning platform for beginners in Indonesia focused on tangible outcomes. Learners do not merely consume content; they learn step by step while building projects that can be seen, used, and showcased.

For MVP V1.4, the learning experience is **text-first**. Core learning material is delivered as structured reading that may contain text/Markdown, code blocks, images, callouts, resource links, and build tasks. **Video is not part of the MVP.**

The MVP deliberately prioritizes the most important journey:

```text
Discover Course
    ↓
Purchase / Free Enroll
    ↓
Read Structured Lesson
    ↓
Practice / Build
    ↓
Checkpoint
    ↓
Progress Rakitan
    ↓
Final Project Submission
    ↓
Course Completed
    ↓
Optional Public Project Link
```

The learning experience takes inspiration from structured, self-paced, reading-based course patterns: content is divided into ordered modules/lessons, learners read the material, practice examples, complete checkpoints, and finish a submission/project. DirakitPro does not copy another platform's features or UI; the pattern is adapted to DirakitPro's outcome-first positioning.

### MVP value proposition

> **Learn by reading, trying, and building immediately.**  
> You do not need to finish a video playlist before you can start making something.

---

## 2. Product Context & Problem

### 2.1 Problem

Many programming learning platforms focus heavily on content consumption. For beginners, this pattern can create several problems:

- learners spend too long consuming material before seeing a visual result;
- learners may feel they have learned simply because they watched something, without trying it themselves;
- video requires higher production and maintenance costs;
- updating technical material in video is more expensive than updating text and images;
- learners cannot scan video as quickly when they need to revisit a specific step.

### 2.2 Opportunity

DirakitPro can begin with a lighter format that is easier to produce and maintain:

- text as the primary medium;
- copyable code snippets;
- screenshots/diagrams as visual support;
- build tasks immediately after explanations;
- short checkpoints to ensure learners do more than scroll;
- a final project as evidence that the learner actually produced something.

### 2.3 Product thesis

> Beginners do not need to watch a large amount of video before they can start building. Clear, structured material with just enough visuals and immediate hands-on practice can provide a lighter learning experience that is faster to produce and easier to update.

---

## 3. Target Market & Persona

### 3.1 Primary ICP

Beginners around 18++ years old in Indonesia who want to build their first website or application and need step-by-step guidance.

Examples:

- university students who need portfolio projects;
- fresh graduates who want tangible evidence of their skills;
- non-IT beginners who are starting to build digital products;
- junior developers who still need structured tutorials;
- aspiring freelancers who want a first project worth showing.

### 3.2 Core Jobs-To-Be-Done

| JTBD | Desired Outcome |
|---|---|
| I want to learn coding without being confused about where to start. | Receive a clear learning sequence. |
| I want to practice immediately. | Every concept is followed by an action/build task. |
| I want to finish something real. | Have a working final project. |
| I forget syntax or previous steps. | Material is easy to revisit and scan. |
| I want to know my progress. | Lesson progress and Progress Rakitan are clearly visible. |
| I want to show what I learned. | Have a project link/shareable evidence. |

### 3.3 MVP anti-persona

- senior engineers looking for advanced system design;
- corporate LMS buyers;
- instructor marketplaces;
- learners who need an intensive live bootcamp;
- learners specifically looking for a video-first course library.

---

## 4. Positioning & Product Principles

### 4.1 Positioning

> DirakitPro is a project-based learning platform where beginners learn by reading, trying, and assembling something until it becomes a tangible result.

### 4.2 Brand vocabulary

The following learner-facing terms remain in Bahasa Indonesia as canonical product copy.

| Generic LMS | DirakitPro |
|---|---|
| Start Course | **Mulai Merakit** |
| Continue Course | **Lanjut Merakit** |
| Course Progress | **Progress Rakitan** |
| Final Project | **Hasil Rakitan** |
| Course Completed | **Rakitanmu jadi!** |
| Publish Project | **Tunjukkan Karyamu** |

### 4.3 Product principles

1. **Text-first, not text-only forever** — text is the primary MVP medium; video may be added after demand is proven.
2. **Outcome before theory** — explain concepts exactly when they are needed for the build.
3. **Short explanation, immediate action** — every part of the material should lead to an action.
4. **Read → Try → Check → Build** — the core lesson pattern.
5. **Build Progress > reading percentage** — project progress remains more important than pages read.
6. **Easy to update** — content authoring must allow admins to fix or update material without deploying the application.
7. **Beginner friendly** — use simple language, concrete examples, and explain technical terms when they first appear.
8. **AI is allowed** — learners may use AI, but checkpoints and projects ensure they still validate the result.
9. **MVP simplicity** — do not build video hosting, forums, code runners, code-review marketplaces, or complex gamification in the MVP.

---

## 5. MVP Goals, Non-Goals & Success Metrics

### 5.1 Goals

1. Prove that learners are willing to purchase a text-first course because the project outcome is concrete.
2. Prove that learners actually start and continue the material after purchasing.
3. Prove that the Read → Try → Build structure can carry learners to a final project.
4. Keep content operations lightweight enough for the founder to create and update courses independently.
5. Collect evidence to determine whether video is actually needed in a later phase.

### 5.2 MVP non-goals

- video lessons or video hosting;
- live classes;
- internal forum/community;
- human code review;
- mentor marketplace;
- interactive cloud IDE/code runner;
- certificates;
- subscription;
- promotional bundles `FIXED`/`CHOOSE_N`;
- in-app mentoring booking/payment;
- AI learning assistant;
- mobile native application;
- complex gamification;
- leaderboard;
- microservices.

### 5.3 Primary metrics

| Metric | Definition |
|---|---|
| Purchase Conversion | Course viewers → paid enrollment. |
| Course Start Rate | Buyers who open the first lesson. |
| Lesson Completion Rate | Started lessons → completed lessons. |
| 50% Build Reach | Learners who reach at least 50% of required build milestones. |
| Course Completion Rate | Enrollments that become COMPLETED. |
| Project Submission Rate | Enrollments that submit the final project. |
| Public Project Rate | Learners who choose to make their project public. |

### 5.4 Content validation metrics

| Metric | Why |
|---|---|
| Average lesson completion time | Identify lessons that are too long or too short. |
| Lesson drop-off | Identify material that causes learners to stop. |
| Checkpoint retry rate | Measure areas that are difficult to understand. |
| Material feedback rate | Identify confusing or outdated material. |
| Video demand signal | Capture explicit learner requests for video demonstrations. |

---

## 6. MVP Scope & Priority

### 6.1 P0 — Must Ship

| Domain | P0 Capabilities |
|---|---|
| Marketing | Homepage, value proposition, featured course, CTA. |
| Catalog | Course list and course detail. |
| Identity | Register, login, logout, Google login, recovery. |
| Commerce | Free enrollment, direct paid course purchase, order/payment. |
| Payment | Midtrans Snap + webhook. |
| Learning | Dashboard, course workspace, stage/module, lesson navigation. |
| Content | Text/Markdown, code block, image, callout, resource link, build task. |
| Image Media | Admin image upload, preview, alt text, caption, delete/replace. |
| Progress | Lesson progress + Build Progress. |
| Checkpoint | Lightweight auto-graded multiple-choice checkpoint. |
| Project | Final project submission + optional public project page. |
| Admin | Course, curriculum, lesson editor, image upload, learner/order/project view. |
| Email | Minimum transactional emails. |
| Analytics | Core purchase → learn → complete funnel. |

### 6.2 P1 — After Learning Demand Validation

- video content block;
- YouTube/Cloudflare Stream integration;
- course certificate;
- human project/code review;
- discussion/forum per lesson;
- learner bookmarks and private notes;
- course search within lesson content;
- curated public project gallery;
- featured projects;
- promo coupon/bundle;
- mentoring flow;
- richer assessment/question types;
- interactive code runner;
- AI learning assistant.

### 6.3 P2

- live cohorts;
- mentor marketplace;
- subscription library;
- organization/corporate LMS;
- mobile native apps;
- advanced gamification;
- production-grade automated code assessment.

---

## 7. User Roles & Core Journeys

### 7.1 Roles

| Role | Capability |
|---|---|
| Guest | Browse courses, view public projects, register/login, checkout. |
| Learner | Purchase/enroll, learn, complete lessons/checkpoints, submit projects. |
| Admin | Create/edit/publish courses and material, upload images, inspect learners/orders/projects. |

### 7.2 Journey A — Purchase to first lesson

1. Guest opens the course detail page.
2. Guest sees the outcome, syllabus, requirements, study estimate, and price.
3. Guest clicks **Mulai Merakit**.
4. Login/register is requested when needed.
5. A free course immediately creates an ACTIVE Enrollment; a paid course creates an Order.
6. Paid course checkout is completed through Midtrans.
7. The webhook is the authoritative source for payment success.
8. The system activates the Enrollment exactly once.
9. The learner is redirected to the course overview and first lesson.

### 7.3 Journey B — Text-first learning

1. Learner opens a lesson.
2. Learner reads the lesson objective.
3. Learner reads the text explanation.
4. Learner views code snippets/screenshots when needed.
5. Learner tries the steps in their own local environment.
6. Learner completes a Build Task or checkpoint.
7. The lesson becomes COMPLETED when its completion rule is satisfied.
8. Progress Rakitan is updated.
9. Learner clicks **Lanjut** to continue to the next lesson.

### 7.4 Journey C — Final project

1. Learner completes all required lessons/checkpoints/milestones.
2. Learner opens Hasil Rakitan.
3. Learner enters a live URL if the course requires deployment.
4. Learner enters a repository URL when relevant.
5. Learner uploads a project screenshot.
6. Learner writes short notes about the project result.
7. Submission becomes SUBMITTED.
8. Enrollment becomes COMPLETED once all course completion rules are satisfied.
9. Learner may choose PRIVATE or PUBLIC visibility.
10. If PUBLIC, the learner receives a shareable project link.

---

## 8. Functional Requirements

## 8.1 Identity & Access

### IAM-001 Registration [P0]
Guest can create an account through Clerk using email/password or Google.

**Acceptance:** every authenticated identity maps to exactly one internal `User`.

### IAM-002 Login/logout [P0]
Protected learner/admin routes must verify the session server-side.

### IAM-003 Recovery [P0]
Email verification, forgot-password, and reset-password flows use the authentication provider's capabilities.

### IAM-004 Internal user isolation [P0]
All LMS domains use internal `users.id`, not the provider user ID, as their primary foreign key.

---

## 8.2 Catalog

### CAT-001 Course catalog [P0]
Guest can view PUBLISHED courses with:

- thumbnail;
- title;
- short outcome;
- level;
- estimated duration;
- price/free badge;
- primary CTA.

### CAT-002 Course detail [P0]
Course detail must contain at minimum:

- the final result that will be built;
- screenshot/example outcome;
- description;
- target learner;
- prerequisites;
- required tools;
- syllabus/stage list;
- estimated study time;
- project requirement;
- price;
- CTA `Mulai Merakit`.

### CAT-003 Publishing [P0]
Course has states `DRAFT`, `PUBLISHED`, `UNPUBLISHED`.

An UNPUBLISHED course cannot receive new purchases, but already-enrolled learners retain access.

### CAT-004 Free course [P0]
A course may be FREE and enrollment can be created without the payment gateway.

---

## 8.3 Commerce & Payment

### COM-001 Course as sellable unit [P0]
One purchase unlocks the entire course. There is no paywall per stage/lesson.

### COM-002 Direct course order [P0]
A paid course creates an immutable snapshot containing at minimum:

- user;
- course ID;
- title;
- price;
- currency;
- total;
- timestamp.

### COM-003 Midtrans checkout [P0]
Transactions are created server-side; provider credentials are never sent to the browser.

### COM-004 Authoritative webhook [P0]
A browser redirect must not unlock course access. Enrollment is activated based on verified payment/webhook state.

### COM-005 Idempotent enrollment [P0]
Webhook retries must not create duplicate Enrollments.

### COM-006 Duplicate order prevention [P0]
A user must not have more than one PENDING order for the same course at the same time.

### COM-007 Already-owned course block [P0]
The server rejects a new order if the learner already has an `ACTIVE`/`COMPLETED` Enrollment for the course.

### COM-008 Order history [P0]
Learners can view order amount, date, course, and status.

---

## 8.4 Learning Workspace

### LRN-001 Learner dashboard [P0]
Dashboard displays:

- active courses;
- Progress Rakitan;
- last lesson;
- current stage;
- CTA **Lanjut Merakit**;
- completed courses.

### LRN-002 Course overview [P0]
The course entry route displays:

- course outcome;
- current progress;
- stages/modules;
- course-level resources;
- current/next lesson;
- final project requirement.

### LRN-003 Learning workspace [P0]
The workspace includes at minimum:

- curriculum sidebar;
- current stage;
- lesson title;
- estimated reading/practice time;
- content pane;
- previous/next navigation;
- progress indicator;
- course resources shortcut.

Desktop may use a fixed/collapsible sidebar. Mobile uses a drawer or compact curriculum selector.

### LRN-004 Lesson types [P0]
MVP supports:

| Type | Purpose |
|---|---|
| `CONCEPT` | Explain a concept. |
| `DEMO` | Written walkthrough with text, code, and images. |
| `BUILD` | Learner performs a real implementation. |
| `CHECKPOINT` | Validate understanding / simple evidence. |
| `DEPLOY` | Publish the result if the course requires deployment. |

**Note:** `DEMO` in the MVP is a written demonstration, not video.

### LRN-005 Lesson content blocks [P0]
`Lesson.content` is stored as an ordered block array.

Supported block types:

```text
markdown
code
image
callout
resource_link
task
```

There is no `video` block in the MVP.

#### `markdown`
For paragraphs, headings, lists, tables, quotes, inline code, and emphasis.

#### `code`
Minimum fields:

- language;
- code;
- optional filename;
- optional caption;
- line-wrapping preference.

Learner can click **Copy code**.

#### `image`
Minimum fields:

- storage key / URL;
- alt text;
- optional caption;
- width/height metadata when available.

#### `callout`
Minimum variants:

- info;
- tip;
- warning;
- important.

#### `resource_link`
Minimum fields:

- label;
- URL;
- optional description.

#### `task`
Communicates an action the learner must perform.

Minimum fields:

- instruction;
- required/optional;
- optional evidence hint.

### LRN-006 Lesson progress [P0]
State:

```text
NOT_STARTED → STARTED → COMPLETED
```

`CONCEPT`, `DEMO`, and `DEPLOY` lessons may be completed through an explicit learner action **Tandai Selesai / Lanjut** after the lesson has been opened.

A `BUILD` lesson may require confirmation of a required task.

A `CHECKPOINT` lesson follows the checkpoint rules in 8.6.

### LRN-007 Sequential progression [P0]
A course can be configured as sequential.

Default MVP behavior:

- the previous required lesson must be complete before the next required lesson is considered eligible;
- optional lessons do not block progression;
- admin can view lesson order without a complex branching dependency graph.

### LRN-008 Course-level resources [P0]
A course has resources that remain available throughout the workspace:

- repository/starter code;
- asset files;
- documentation links;
- reference links;
- tooling links.

---

## 8.5 Image Upload & Media

### MED-001 Admin image upload [P0]
Admin can upload images directly while creating/editing learning material.

Supported baseline:

- PNG;
- JPEG/JPG;
- WebP.

SVG is allowed only if sanitization is considered safe; otherwise defer it from the MVP.

### MED-002 Image validation [P0]
The server validates:

- MIME/type;
- extension consistency;
- maximum file size;
- image dimensions when relevant;
- ownership/upload context.

Recommended MVP maximum size: **5 MB per image**.

### MED-003 Object storage [P0]
Binary images are stored in object storage (Cloudflare R2 baseline), not PostgreSQL.

The database/content block stores reference metadata only.

### MED-004 Image accessibility [P0]
Alt text is required for content images unless an image is explicitly marked decorative.

### MED-005 Replace/delete image [P0]
Admin can replace an image in a content block. Deleting an object from storage must be safe when the same image is still referenced by another lesson.

### MED-006 Project screenshot upload [P0]
Because upload infrastructure is already required for course material, learners can also upload final-project screenshots through the same pipeline using a different ownership scope.

---

## 8.6 Checkpoint & Knowledge Validation

### CHK-001 Checkpoint lesson [P0]
A `CHECKPOINT` may contain a lightweight quiz.

MVP question types:

- single-choice;
- multiple-choice.

### CHK-002 Auto grading [P0]
The system grades answers automatically.

Admin defines:

- questions;
- correct answer(s);
- explanation after submission;
- passing score.

### CHK-003 Retry [P0]
Learners may retry checkpoints without a hard attempt limit.

Minimum attempt history stores:

- learner;
- checkpoint;
- score;
- passed/failed;
- timestamp.

### CHK-004 Completion [P0]
A checkpoint lesson becomes `COMPLETED` when the learner reaches the passing score.

### CHK-005 No high-stakes exam [P0]
The MVP does not include proctoring, complex randomized question banks, anti-cheat mechanisms, or certification exams.

---

## 8.7 Build Progress

### BLD-001 Build milestones [P0]
A course can have required build milestones, for example:

- Project Setup;
- First Screen;
- Interactivity;
- Data Persistence;
- Authentication;
- Deployment.

### BLD-002 Milestone mapping [P0]
One or more required lessons/checkpoints may be mapped to a BuildMilestone.

### BLD-003 Milestone completion [P0]
A milestone is automatically completed when all required lessons mapped to it are COMPLETED.

### BLD-004 Build Progress [P0]

```text
completed required milestones / total required milestones × 100
```

Build Progress must be more visually prominent than raw lesson-completion percentage.

---

## 8.8 Final Project & Showcase

### PRJ-001 Project auto-create [P0]
One DRAFT Project is created when the Enrollment becomes ACTIVE.

### PRJ-002 Final submission [P0]
Learner can provide:

- project title;
- description/notes;
- live URL when required;
- repository URL when relevant;
- screenshot upload;
- optional technology list.

### PRJ-003 Validation [P0]
URLs must be well-formed `http(s)` URLs.

Required fields may be configured per course because not every course must produce a deployed website.

### PRJ-004 Visibility [P0]
Project defaults to `PRIVATE`.

Learner may opt in to `PUBLIC`.

### PRJ-005 Shareable public page [P0]
A PUBLIC project has a shareable route displaying at minimum:

- project title;
- learner display name;
- screenshot;
- description;
- technology list;
- live URL when available;
- repository URL if the learner allows it;
- course attribution.

### PRJ-006 Safety moderation [P0]
To keep scope small, the MVP does not include a complex approval/featured-gallery workflow.

Admin only needs the minimum capability:

```text
VISIBLE
HIDDEN
```

Admin can HIDE an inappropriate or problematic public project.

### PRJ-007 Curated gallery deferred [P1]
The `/projects` gallery, APPROVED/FEATURED workflow, and project curation are moved to P1.

---

## 8.9 Admin & Content Authoring

### ADM-001 Admin authorization [P0]
All admin routes and mutations require server-side admin authorization.

### ADM-002 Course CRUD [P0]
Admin can:

- create a course;
- edit metadata;
- set FREE/paid price;
- publish/unpublish;
- set thumbnail;
- define prerequisites/tools;
- define estimated duration.

### ADM-003 Curriculum management [P0]
Admin can:

- create/reorder stages;
- create/reorder lessons;
- set lesson type;
- set required/optional;
- map lessons to milestones;
- preview curriculum.

Drag-and-drop is not required; numeric ordering or up/down controls are sufficient for the MVP.

### ADM-004 Lesson editor [P0]
Admin can create material without changing application source code.

The editor must support:

- title;
- slug;
- lesson type;
- learning objective;
- estimated time;
- ordered content blocks;
- Markdown preview;
- code-block preview;
- image upload + alt/caption;
- callout;
- link;
- task;
- checkpoint configuration when lesson type is CHECKPOINT;
- preview as learner;
- draft/save/publish behavior.

### ADM-005 Autosave not required [MVP decision]
A collaborative autosave editor is not required. Explicit **Save Draft** is sufficient.

The system should warn about unsaved changes before the user leaves the editor when that behavior is lightweight to implement.

### ADM-006 Image library [P0-lite]
Admin can view images uploaded within the course currently being edited and reuse an existing image.

A full Digital Asset Management system is not required.

### ADM-007 Learner view [P0]
Admin can view learners and basic enrollment information.

### ADM-008 Order/payment view [P0]
Admin can view orders and normalized payment states.

### ADM-009 Project moderation [P0]
Admin can view public projects and change moderation visibility to `HIDDEN` when necessary.

### ADM-010 Audit log [P0]
At minimum, sensitive mutations are recorded for:

- course publish/unpublish;
- price change;
- material publish;
- order/payment manual action, if any;
- project hide/unhide.

A dedicated audit-log UI is not required.

---

## 8.10 Feedback & Content Quality

### FDB-001 Material feedback [P0]
Learners can provide simple lesson feedback:

- `Mudah dipahami`;
- `Membingungkan`;
- optional short comment.

The labels above remain Bahasa Indonesia because they are learner-facing UI copy.

### FDB-002 Report material issue [P0]
Learners can report:

- typo;
- broken link;
- outdated instruction;
- code not working;
- image issue;
- other.

### FDB-003 Admin visibility [P0-lite]
Feedback may be reviewed by admins through a simple list or database-backed admin table. A complex ticketing workflow is not required.

---

## 8.11 Email & Notification

### NTF-001 Transactional email [P0]
Minimum:

- auth/provider verification where applicable;
- payment success;
- enrollment activation;
- course completion.

### NTF-002 Failure resilience [P0]
Email failure must not roll back a successful payment/enrollment.

### NTF-003 Project publication email deferred [P1]
Not required for the MVP.

---

## 9. Learning & Content Model

### 9.1 Hierarchy

```text
Course
  └── Stage
       └── Lesson
            ├── Content Blocks
            ├── Optional Checkpoint Config
            └── Progress
```

Course also has:

- BuildMilestones;
- CourseResources;
- Final Project requirement.

### 9.2 Recommended lesson structure

Each lesson should generally follow this pattern:

```text
1. Objective
2. Why this matters
3. Short concept explanation
4. Example
5. Code / screenshot when needed
6. Try it yourself
7. Build task / checkpoint
8. Summary
9. Continue
```

### 9.3 Recommended content style

- short paragraphs;
- one main concept per section;
- clear headings;
- screenshots only when they genuinely help;
- small, focused code snippets;
- avoid dumping very long source-code files;
- use callouts for warnings/tips;
- explain the expected result after important steps;
- use natural Bahasa Indonesia for learner-facing material, while technical terminology may remain in English.

### 9.4 Lesson length guideline

Guideline, not a hard rule:

- 5–15 minutes of reading for a concept lesson;
- 10–30 minutes for a written demo;
- 20–90 minutes for a build lesson;
- 3–10 minutes for a checkpoint.

A long lesson should be split if it contains more than one main outcome.

### 9.5 Initial course lineup

The same three initial course ideas remain the product ladder, but launch may begin with **one course first**:

1. **Rakitan Pertama — Personal Website** — launch candidate.
2. Rakit Aplikasi Keuangan Pribadi — after the learning flow is validated.
3. Rakit Sistem Booking Bisnis — after content operations are stable.

This reduces the cost of creating three courses before knowing whether the learning experience and purchase funnel work.

---

## 10. Business Rules & States

### 10.1 Order

```text
PENDING → PAID
PENDING → EXPIRED
PENDING → CANCELLED
PAID → REFUNDED
```

### 10.2 Enrollment

```text
ACTIVE → COMPLETED
ACTIVE → REVOKED
```

### 10.3 Lesson progress

```text
NOT_STARTED → STARTED → COMPLETED
```

### 10.4 Project

```text
DRAFT → SUBMITTED
```

Visibility:

```text
PRIVATE | PUBLIC
```

Moderation:

```text
VISIBLE | HIDDEN
```

### 10.5 Course completion

Enrollment becomes `COMPLETED` when:

1. all REQUIRED lessons are complete;
2. all required BuildMilestones are complete;
3. all REQUIRED checkpoints are passed;
4. the final Project is `SUBMITTED`.

The Project is not required to be PUBLIC.

### 10.6 Content publishing rule

A Course can be PUBLISHED only if, at minimum:

- title and slug are valid;
- description/outcome is available;
- at least one stage exists;
- at least one required lesson exists;
- course outcome/final requirement is defined;
- price is valid if the course is paid.

A Lesson is learner-facing only when its parent curriculum Course is PUBLISHED and the Lesson is not in draft/unpublished state according to the chosen implementation model.

---

## 11. Data & Domain Model

### 11.1 Core entities

| Entity | Responsibility |
|---|---|
| `User` | Internal application identity. |
| `AuthIdentity` | Maps Clerk identity → User. |
| `Course` | Catalog metadata, price, state, resources, final-project config. |
| `CourseStage` | Ordered module/stage. |
| `Lesson` | Ordered text-first learning unit. |
| `LessonProgress` | Learner lesson state/timestamps. |
| `BuildMilestone` | Product-oriented milestone. |
| `CheckpointAttempt` | Score/result attempt for a CHECKPOINT lesson. |
| `Enrollment` | Learner access to one course. |
| `Order` | Immutable purchase snapshot. |
| `Payment` | Midtrans transaction state. |
| `Project` | Final output per Enrollment. |
| `ProjectSubmission` | URL, notes, screenshot reference, submission state. |
| `MediaAsset` | Object-storage metadata for image upload. |
| `LessonFeedback` | Lesson feedback/report. |
| `AdminAuditLog` | Sensitive admin mutation audit. |

### 11.2 Lesson content JSON example

```json
[
  {
    "type": "markdown",
    "markdown": "## Creating the page structure\nWe start from..."
  },
  {
    "type": "code",
    "language": "tsx",
    "filename": "app/page.tsx",
    "code": "export default function Page() { ... }"
  },
  {
    "type": "image",
    "assetId": "asset_123",
    "alt": "Preview of the completed hero section",
    "caption": "Target result after this step."
  },
  {
    "type": "callout",
    "variant": "tip",
    "text": "Run the application before continuing to the next step."
  },
  {
    "type": "task",
    "required": true,
    "instruction": "Change the headline to use your own name."
  }
]
```

### 11.3 MediaAsset

Minimum fields:

- `id`;
- `ownerScope` (`ADMIN_CONTENT` / `LEARNER_PROJECT`);
- `storageProvider`;
- `storageKey`;
- `publicUrl` or delivery URL strategy;
- `mimeType`;
- `fileSize`;
- `width`;
- `height`;
- sanitized `originalFilename`;
- `createdByUserId`;
- timestamps.

### 11.4 Why no video schema in MVP

There is no:

- `videoProviderId`;
- `videoUrl`;
- `video` content block;
- signed playback logic;
- video processing state.

Video can be added later as an additive content block once there is evidence of demand.

---

## 12. Information Architecture & Routes

### 12.1 Public

| Route | Purpose |
|---|---|
| `/` | Homepage. |
| `/courses` | Course catalog. |
| `/courses/[slug]` | Course detail. |
| `/projects/[username]/[slug]` | Optional public project page. |
| `/login` | Login. |
| `/register` | Registration. |
| `/forgot-password` | Recovery. |

### 12.2 Learner

| Route | Purpose |
|---|---|
| `/dashboard` | Active/completed courses. |
| `/learn/[courseSlug]` | Course overview. |
| `/learn/[courseSlug]/[lessonSlug]` | Text-first learning workspace. |
| `/projects/me/[projectId]` | Final submission/edit/publication. |
| `/account` | Account. |
| `/account/orders` | Order history. |

### 12.3 Commerce/API

| Route | Purpose |
|---|---|
| `/checkout/course/[courseSlug]` | Checkout. |
| `/payment/[orderId]` | Payment state. |
| `/api/payments/midtrans/webhook` | Payment webhook. |
| `/api/media/upload` or equivalent server action | Signed/controlled upload flow. |

### 12.4 Admin

| Route | Purpose |
|---|---|
| `/admin` | Summary. |
| `/admin/courses` | Course list. |
| `/admin/courses/new` | Create course. |
| `/admin/courses/[courseId]` | Course configuration. |
| `/admin/courses/[courseId]/curriculum` | Stage/lesson management. |
| `/admin/courses/[courseId]/lessons/[lessonId]` | Lesson editor. |
| `/admin/users` | Learners/enrollments. |
| `/admin/orders` | Orders/payments. |
| `/admin/projects` | Project hide/unhide. |
| `/admin/feedback` | Lesson feedback/issues. |

---

## 13. Analytics

### 13.1 Required events

```text
home_viewed
course_viewed
checkout_started
order_created
payment_completed
enrollment_activated
course_started
lesson_started
lesson_completed
checkpoint_attempted
checkpoint_passed
build_milestone_completed
course_completed
project_submitted
project_published
lesson_feedback_submitted
```

### 13.2 Primary funnel

```text
Course Viewed
→ Checkout Started
→ Payment Completed
→ Course Started
→ 50% Build Reached
→ Course Completed
→ Project Submitted
→ Optional Project Published
```

### 13.3 Learning diagnostics

At minimum, the internal dashboard must be able to answer:

- which lesson causes the most drop-off;
- which checkpoint has the highest failure rate;
- at which stage learners stop on average;
- how many buyers never start;
- how many learners request video through feedback;
- how many learners reach the final outcome.

---

## 14. Technical Architecture & Stack

### 14.1 Architecture

```text
Next.js full-stack modular monolith
+ PostgreSQL
+ Cloudflare R2 for images
```

One deployable application; no microservices.

### 14.2 Recommended stack

| Area | Decision |
|---|---|
| Language | TypeScript |
| Web | Next.js 16 supported release |
| UI | React + Tailwind CSS + shadcn/ui + Lucide |
| Forms | React Hook Form + Zod |
| Auth | Clerk |
| Database | PostgreSQL |
| ORM | Drizzle ORM |
| Payment | Midtrans Snap + webhook |
| Image storage | Cloudflare R2 |
| Email | Resend + React Email |
| Analytics | PostHog |
| Monitoring | Sentry |
| Hosting | Vercel or equivalent Next.js-compatible host |
| Monorepo | pnpm + Turborepo |
| Test | Vitest + RTL + Playwright |
| CI | GitHub Actions |

### 14.3 Content rendering

The lesson content-block renderer must:

- sanitize/escape unsafe HTML;
- support server rendering where practical;
- syntax-highlight code;
- lazy-load images;
- preserve responsive layout;
- never execute arbitrary admin-supplied scripts.

Raw arbitrary HTML/JS content blocks are not supported in the MVP.

### 14.4 Editor implementation principle

Do not build a Notion clone.

The MVP lesson editor only needs a block list with:

```text
Add Text
Add Code
Add Image
Add Callout
Add Link
Add Task
```

Blocks can be edited, deleted, and reordered. Up/down controls are acceptable for reordering before drag-and-drop is introduced.

---

## 15. Non-Functional Requirements

### 15.1 Performance

- public course pages are SEO-friendly;
- text content has a fast first paint;
- images use optimized responsive rendering;
- code highlighting does not freeze the page;
- learner workspace remains usable on consumer mobile connections in Indonesia.

### 15.2 Accessibility

- semantic heading hierarchy;
- keyboard navigation;
- sufficient color contrast;
- image alt text;
- code blocks can be scrolled/copied;
- form errors have clear labels.

### 15.3 Maintainability

- content changes do not require code deployment;
- media-storage provider is isolated from the domain;
- strict TypeScript;
- Zod validation at write boundaries;
- critical business logic does not exist only on the client.

### 15.4 Reliability

- webhook handling is idempotent;
- upload failure does not leave a broken lesson state;
- email/analytics failures do not break core transactions;
- database migrations are versioned.

### 15.5 Observability

At minimum, Sentry captures:

- server exceptions;
- payment webhook failures;
- media upload failures;
- content rendering failures;
- relevant authorization failures.

---

## 16. Security Baseline

- protected routes are verified server-side;
- admin authorization is server-side;
- all mutations are schema validated;
- Midtrans server credentials remain server-side only;
- webhook signature/verification is mandatory;
- media uploads validate ownership, MIME, size, extension, and object key;
- user-provided file names are not used directly as storage keys;
- arbitrary executable HTML/JS is not accepted as lesson content;
- projects can only be edited by their owner;
- public projects only expose data the learner chose to make public;
- secrets are never committed to the repository;
- rate limiting is applied to risky public mutations.

---

## 17. Testing & Release Gates

### 17.1 Critical automated tests

- paid/free enrollment;
- duplicate order prevention;
- already-owned purchase block;
- Midtrans state mapping + webhook idempotency;
- course access authorization;
- sequential lesson progression;
- lesson completion;
- checkpoint scoring/retry;
- Build Progress calculation;
- course completion rule;
- image upload validation;
- admin course publish authorization;
- project ownership/publication;
- hidden project not publicly accessible.

### 17.2 Required E2E

**Flow 1 — Paid learner**

```text
Register/Login
→ Open Course
→ Checkout
→ Sandbox Payment Success
→ Enrollment
→ Open Lesson
```

**Flow 2 — Text learning**

```text
Open Lesson
→ Read text/code/image
→ Complete Build Task
→ Pass Checkpoint
→ Next Lesson
→ Progress updates
```

**Flow 3 — Admin authoring**

```text
Admin Create Course
→ Create Stage
→ Create Lesson
→ Add Markdown
→ Upload Image
→ Add Code
→ Preview
→ Publish
→ Learner can render correctly
```

**Flow 4 — Completion**

```text
Complete Required Lessons
→ Required Milestones Complete
→ Submit Final Project + Screenshot
→ Enrollment COMPLETED
→ Optional PUBLIC share link
```

### 17.3 CI quality gates

```text
install
→ lint
→ typecheck
→ unit/integration tests
→ build
→ critical E2E smoke
```

---

## 18. MVP Product Decisions

| Decision | V1.4 |
|---|---|
| Primary learning medium | **Text-first**. |
| Video | **Removed from MVP; P1 only.** |
| Course hierarchy | Course → Stage → Lesson. |
| Lesson blocks | markdown, code, image, callout, resource_link, task. |
| Image handling | **Direct file upload to Cloudflare R2.** |
| Project screenshot | File upload using the same media pipeline. |
| Assessment | Lightweight auto-graded checkpoint. |
| Course sell model | Individual course purchase; FREE supported. |
| Bundle | **Deferred from P0 to P1.** |
| Subscription | Out of MVP. |
| Mentoring CTA/engine | Deferred to P1; not part of the learning MVP. |
| Public gallery | Deferred to P1. |
| Public project direct link | P0, learner opt-in. |
| Project moderation | Minimal VISIBLE/HIDDEN. |
| Certificate | P1. |
| Human code review | P1. |
| Forum | P1. |
| Initial content launch | Prefer **1 flagship course first**, then expand. |

---

## 19. Post-MVP Roadmap

### Phase 1 — Validate Learning

Text + code + image + checkpoint + project.

### Phase 2 — Improve Understanding

Potential:

- targeted video blocks for lessons with high confusion;
- richer quiz;
- bookmarks/notes;
- lesson search;
- certificate.

### Phase 3 — Improve Quality Evidence

Potential:

- human reviewer;
- submission rubric;
- code review;
- verified project badge;
- curated public gallery.

### Phase 4 — Growth & Monetization

Potential:

- bundle campaign;
- coupon;
- referral;
- mentoring;
- cohort/community programs.

### Phase 5 — Advanced Learning

Understand → Engineer → Production → Scale.

---

## 20. MVP Definition of Done

DirakitPro Text-First MVP is considered ready for public beta when:

- [ ] Guest can understand the positioning and view at least one PUBLISHED course.
- [ ] User can register/login through Google and email/password.
- [ ] Admin can create a course without changing application source code.
- [ ] Admin can create stages and lessons.
- [ ] Admin can create material using Markdown/text.
- [ ] Admin can add code blocks with syntax highlighting.
- [ ] Admin can upload images, provide alt text/captions, and preview them.
- [ ] Learner-facing material correctly renders text, code, image, callout, link, and task blocks.
- [ ] Learner can navigate previous/next lessons and view the curriculum.
- [ ] Lesson progress is persisted.
- [ ] Required sequential progression works.
- [ ] Single-/multiple-choice checkpoints can be auto-graded and retried.
- [ ] Build Progress is calculated from required milestones.
- [ ] Free enrollment works.
- [ ] Paid courses can be purchased through Midtrans sandbox/production according to environment.
- [ ] Idempotent payment webhook activates exactly one Enrollment.
- [ ] Learner can submit a final project with screenshot upload.
- [ ] Course completion follows required lessons + milestones + checkpoints + project submission.
- [ ] Learner can choose PRIVATE or PUBLIC project visibility.
- [ ] PUBLIC project has a shareable link.
- [ ] Admin can HIDE problematic public projects.
- [ ] Admin can view basic learner and order/payment data.
- [ ] Course → Purchase → Learn → Complete → Submit funnel is recorded.
- [ ] Lesson feedback/report can be submitted.
- [ ] Critical tests and CI quality gates pass.
- [ ] No video infrastructure or video field is built as part of the MVP.

---

## Appendix A — Feature Cut from Previous PRD

The following features are moved out of P0 to keep the MVP focused on validating the text-first course experience:

| Previous P0 | V1.4 |
|---|---|
| Video content block / provider concern | P1 |
| FIXED bundle | P1 |
| CHOOSE_N bundle | P1 |
| Bundle catalog/detail/checkout | P1 |
| Bundle analytics/grant complexity | P1 |
| Mentoring static CTA | P1 |
| Curated `/projects` gallery | P1 |
| APPROVED/REJECTED/FEATURED moderation workflow | P1 |
| Project OG automation sophistication | P1 enhancement; basic metadata is sufficient for MVP |
| Project publication email | P1 |

The purpose of this cut is not to reject those features permanently, but to ensure that the first release validates the core question:

> **Will beginners in Indonesia pay for and complete a DirakitPro course when the learning experience is based on text, images, code, practice, checkpoints, and a real project?**

---

## Appendix B — V1.3 → V1.4 Product Scope Change Log

**Date:** 27 August 2026  
**Trigger:** founder decision to launch a lower-cost, easier-to-maintain learning MVP inspired by structured text-based self-paced learning. The founder explicitly requested that material creation focus on text and uploaded images first, with no video.

| Decision | V1.3 | V1.4 Text-First MVP |
|---|---|---|
| Lesson media | `markdown`, `code`, `image`, `video`, `resource_link`, `task` | **No `video`.** Adds `callout`; keeps text/code/image/link/task. |
| Image content | Supported as a block, but the upload mechanism was not central to lesson authoring | **Direct admin image upload is a core P0 capability.** |
| Video hosting | YouTube unlisted baseline | **Removed entirely from MVP infrastructure.** |
| Project screenshot | Learner enters an external screenshot URL | **Learner uploads screenshot using shared media pipeline.** |
| Learning validation | Build checkpoint model | Adds lightweight auto-graded CHECKPOINT quiz. |
| Admin content operation | Curriculum management generally specified | **Lesson authoring editor explicitly becomes a first-class P0 feature.** |
| Bundle campaign | P0 FIXED + CHOOSE_N | **Deferred to P1.** |
| Mentoring CTA | P0 | **Deferred to P1.** |
| Curated gallery/moderation | P0 complex moderation + featured gallery | **P1. P0 keeps direct public project + admin HIDE.** |
| Initial course launch | Three courses used as initial lineup | **One flagship course may launch first; remaining courses follow after validation.** |

### Why this change

The previous PRD correctly described the long-term DirakitPro experience, but P0 combined learning, commerce expansion, campaign mechanics, mentoring, moderation, and social discovery. For a solo/self-funded MVP, that scope makes it harder to validate the most important uncertainty: **will learners pay for and finish the actual learning experience?**

V1.4 therefore treats content authoring and text-first classroom quality as the center of the MVP. Growth mechanics can be reintroduced after the learning loop has evidence.

---

## Appendix C — Recommended First Course Authoring Template

Use this template for each stage/lesson of **Rakitan Pertama — Personal Website**.

### Stage

```text
Stage title
Stage outcome
Build milestone
Estimated total time
```

### Lesson

```text
Lesson title
Type
Objective
Estimated time

[Context]
What will be built and why.

[Concept]
Short explanation.

[Example]
Code / image.

[Try It]
Learner steps.

[Expected Result]
Screenshot or explanation of the result.

[Build Task]
Change the learner must make to the project.

[Checkpoint]
Short question when needed.

[Summary]
3–5 points just learned.

[Next]
What will be built next.
```

### Content authoring rule

If a concept requires more than approximately 10–15 minutes of reading before the learner does something, split it into smaller lessons.

---

## Final MVP Product Statement

> **DirakitPro MVP is not a video-course platform.**  
> It is a learning workspace built around text, images, code, practice, checkpoints, and projects that takes a beginner from “I don't know where to start” to “I have built something real.”
