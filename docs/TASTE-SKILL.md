# Taste Skill — Ringkasan

> Sumber: https://www.tasteskill.dev/docs
> Dibuat: 2026-08-27

## Apa itu Taste Skill?

Taste Skill adalah ruleset berbasis file **`SKILL.md`** yang dibaca otomatis oleh AI coding agent (Cursor, Claude Code, Codex, Antigravity, Gemini CLI, AI Studio, v0, Lovable, OpenCode, OpenClaw, Copilot, dll.) agar output desain frontend tidak terlihat "generik AI". Berbeda dari Impeccable yang berbasis slash command interaktif, Taste Skill bekerja pasif — cukup ditambahkan ke project, lalu aturan-aturannya otomatis diikuti agent setiap kali menulis kode UI.

## Masalah yang Diselesaikan

Menghindari "kesamaan" hasil desain AI, misalnya:
- Warna ungu khas AI & gradient mesh-blob
- Baris fitur "tiga kartu sama besar"
- Pola-pola templated lain yang langsung ketahuan buatan AI

Pendekatan v2: agent **"membaca brief dulu"** dan menyimpulkan arah desain dari petunjuk seperti "minimalist", "editorial", atau "SaaS" — bukan langsung jatuh ke layout template default.

## Prasyarat

- AI coding agent yang mendukung file `SKILL.md` (tidak ada setup lain yang disyaratkan).

## Cara Instalasi

Pilih salah satu:

```bash
# Default — v2 experimental (core skill, direkomendasikan)
npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"

# Legacy v1
npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend-v1"

# Full bundle — semua skill dalam repo
npx skills add Leonxlnx/taste-skill

# Full bundle khusus Codex
npx skills add Leonxlnx/taste-skill -a codex
```

Alternatif manual: salin file `SKILL.md` langsung ke project, atau tempel isinya ke percakapan ChatGPT/Codex.

## File yang Dibuat

Instalasi hanya menambahkan **satu file `SKILL.md`** ke project — agent membacanya otomatis di setiap run. Tidak ada file konfigurasi lain yang disebutkan (berbeda dari Impeccable yang punya `.impeccable/config.json`, `PRODUCT.md`, `DESIGN.md`, hooks, dsb).

## Daftar Skill dalam Bundle

| Skill                        | Status              | Fungsi                                                        |
| ----------------------------- | -------------------- | -------------------------------------------------------------- |
| `taste-skill` (v2)            | Experimental, default | Rewrite terbaru, masih aktif dikembangkan                     |
| `taste-skill-v1`               | Legacy               | Perilaku versi sebelumnya, dipertahankan                       |
| `gpt-tasteskill`                | Stable                | Varian lebih ketat, disetel untuk GPT/Codex                    |
| `redesign-skill`                | Stable                | Audit 6 kategori untuk situs yang sudah ada                    |
| `soft-skill` / `minimalist-skill` / `brutalist-skill` | Stable | Varian gaya visual spesifik                                    |
| `output-skill`                  | Stable                | Anti-malas & anti-placeholder enforcement                      |
| `stitch-skill`                  | Stable                | Jembatan ke Google Stitch, ekspor `DESIGN.md`                  |
| `image-to-code-skill`, `imagegen-frontend-web`, `imagegen-frontend-mobile`, `brandkit` | Stable | Pipeline berbasis gambar (image-to-code & image generation) |

## Konsep Inti v2 ("How v2 Thinks")

- **Section 0 — Brief inference**: baca jenis halaman, vibe, audiens, dan asset dulu, lalu deklarasikan "one-line design read" sebelum menulis kode.
- **Section 2 — Brief-to-design-system map**: mencocokkan brief ke design system yang relevan (Material, Fluent, Carbon, Polaris, Tailwind, dll).
- **Section 5 — Animation skeletons**: pola baku untuk sticky-stack, horizontal-pan, scroll-reveal; melarang scroll/rAF handler buatan sendiri.
- **Section 8 — Dark mode protocol**: dual-mode by default, kontras WCAG AA, **"off-black dan off-white, jangan pernah pure black/white"**.
- **Section 9 — Big bans**: daftar larangan anti-slop (lihat di bawah).
- **Section 11 — Redesign protocol**: mode audit-first; struktur URL, label nav, dan nama field form **tidak boleh berubah diam-diam**.
- **Section 12 — Block library schema**: skema untuk hero, feature, pricing, CTA, footer, dan block lain.
- **Section 14 — Pre-flight check**: checklist wajib sebelum output dianggap selesai.

### The Locks (Section 4) — 3 aturan yang tidak pernah dilonggarkan
1. **Color Consistency Lock** — satu warna aksen untuk seluruh situs.
2. **Shape Consistency Lock** — satu sistem corner-radius.
3. **Page Theme Lock** — tema dipilih sekali, tidak boleh berganti di tengah halaman.

### Hero Discipline (batasan area above-the-fold)
- Headline: maksimal 2 baris di desktop.
- Subtext: maksimal 20 kata / 4 baris.
- Primary CTA harus terlihat tanpa scroll.
- Nav: satu baris, tinggi maksimal 80px.

### Anti-Slop Ban List (Section 9) — sebagian contoh
- Em-dash / en-dash dalam copy
- "Section-numbering eyebrows" (label angka di atas heading)
- Label versi di hero (mis. "BETA")
- Caption foto dekoratif, strip teks dekorasi di hero
- Pill overlay di atas gambar, footer versi, strip lokasi/cuaca, scroll cue dekoratif, status dot dekoratif
- `border-t` / `border-b` sebagai styling baris
- UI produk palsu berbasis div
- Baris fitur "tiga kartu sama besar"
- Gradient ungu/mesh khas AI
- Ilustrasi SVG buatan tangan
- `window.addEventListener('scroll')` di JS (harus pakai animation skeleton baku, bukan handler manual)

## Kustomisasi

`SKILL.md` sepenuhnya bisa diedit. Style guide khusus project bisa ditempel di bagian atas file agar menjadi sumber kebenaran utama (override default rules) — berlaku otomatis di run berikutnya.

## Perbandingan Singkat dengan Impeccable

| Aspek           | Taste Skill                              | Impeccable                                      |
| ---------------- | ------------------------------------------ | -------------------------------------------------- |
| Mode interaksi    | Pasif — dibaca otomatis tiap run            | Aktif — dipicu lewat slash command                 |
| File yang dibuat  | 1 file `SKILL.md`                          | `PRODUCT.md`, `DESIGN.md`, `.impeccable/config.json`, hooks |
| Fokus utama       | Mencegah pola "AI-looking" lewat aturan/ban | Alur kerja penuh: plan → review → polish → iterate |
| Automation        | Tidak ada CLI/hook otomatis                 | Detector CLI, design hooks, Chrome extension        |

Kedua skill ini saling melengkapi: Taste Skill sebagai "guardrail" pasif anti-slop, Impeccable sebagai workflow aktif untuk shaping/audit/polish.

## Referensi Lanjutan

- Usage Guide, GitHub Repository, dan CHANGELOG tersedia di situs (v2 masih "iterating" menuju rilis stabil v2.0.0).
- Repo: https://github.com/Leonxlnx/taste-skill
