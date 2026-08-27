# Impeccable — Ringkasan

> Sumber: https://impeccable.style/docs/
> Dibuat: 2026-08-27

## Apa itu Impeccable?

Impeccable adalah **design tool berbasis slash command** yang dirancang khusus untuk AI coding agent (Claude Code, Cursor, Codex CLI, Gemini CLI, GitHub Copilot, Grok Build, Antigravity, OpenCode, Pi). Alih-alih menyerahkan kualitas desain UI ke tebakan model, Impeccable memberi agent alur kerja terstruktur, file konteks proyek, dan pemeriksaan otomatis — sehingga hasil UI tetap konsisten dengan brand dan "production-ready".

## Masalah yang Diselesaikan

Kode UI yang dihasilkan AI sering "terlihat generik AI" (over-rounded, ghost cards, hover motion berlebihan, dsb). Impeccable menutup celah ini dengan proses berulang yang bisa direplikasi: rencanakan → bangun → review → poles → iterasi, alih-alih satu prompt sekali jalan.

## Prasyarat

- **Node.js 22.12+** (proyek ini sudah memenuhi: `v22.23.2`)
- Beberapa harness agent perlu satu langkah "trust" setelah instalasi agar hooks aktif.

## Cara Instalasi

1. **Install** (build yang disesuaikan dengan harness/model yang dipakai):
   ```bash
   npx impeccable install
   ```
   Alternatif lain:
   - Claude Code plugin marketplace: `/plugin marketplace add pbakaus/impeccable`
   - Installer skill umum (satu build untuk semua harness): `npx skills add pbakaus/impeccable`
2. **Set konteks proyek** — jalankan di chat agent:
   ```
   /impeccable init
   ```
   Ini akan memindai kode yang ada (mis. `tailwind.config.ts`, `src/styles/tokens.css`, `src/components/`) lalu membuat:
   - `PRODUCT.md` — konteks produk (pengguna, mode, brand voice, anti-reference), dimuat di setiap command.
   - `DESIGN.md` — token brand (warna, wordmark, tipografi, komponen) dalam format "Google Stitch", agar sistem visual portable.
3. **Coba jalankan** salah satu command, misalnya:
   ```
   /impeccable polish the pricing page
   ```

## Update

- Claude Code: lewat menu `/plugin`
- Installer skill umum: `npx skills update`
- Langsung: `npx impeccable update`

## Kategori Command

| Kategori     | Command                                                              | Fungsi                                                    |
| ------------ | --------------------------------------------------------------------- | ---------------------------------------------------------- |
| **Create**   | `impeccable`, `shape`                                                 | Rekomendasi desain; design brief lewat discovery           |
| **Evaluate** | `audit`, `critique`                                                   | Cek teknis 5 dimensi (severity P0–P3); review desain + skor & persona test |
| **Refine**   | `animate`, `bolder`, `colorize`, `delight`, `layout`, `overdrive`, `quieter`, `typeset` | Penyempurnaan gaya visual                                   |
| **Simplify** | `adapt`, `clarify`, `distill`                                         | Menyederhanakan UI                                          |
| **Harden**   | `harden`, `onboard`, `optimize`, `polish`                             | Mengokohkan & mengoptimalkan UI yang sudah ada             |
| **System**   | `document`, `extract`, `init`, `live`                                 | Manajemen konteks & mode live-edit                          |

### Command Berpasangan
- `bolder` ↔ `quieter` — ujung berlawanan dari "suara" visual (mencolok vs. tenang)
- `audit` → `harden` — temukan masalah teknis, lalu perbaiki
- `critique` → `polish` — review desain, lalu poles
- `init` → `shape` — tangkap konteks produk, lalu rencanakan halaman/fitur

### Alur Kerja Penuh
Untuk fitur baru: **Plan** (`shape`) → **Review** (`critique`) → **Refine** (`polish`) → **Iterate** (`live`).
Untuk UI yang sudah ada/live: langsung mulai dari `polish` atau `audit`.

## Live Mode

Alat iterasi langsung di browser: pilih elemen UI, jelaskan perubahan yang diinginkan, dapat 3 varian, pilih satu → perubahan langsung ditulis ke source code.

## Automation & Config

- **Detector CLI**: `npx impeccable detect src/` — 59 aturan deterministik, output JSON, exit code untuk build gate/CI.
- **Design hooks**: berjalan otomatis saat edit (khusus Claude Code: hooks + subagent; Cursor: pre-edit hook).
- **Doctor**: `impeccable doctor` — diagnostik untuk config yang salah/rule yang sudah tidak ada.
- **Chrome extension**: overlay detector untuk halaman live mana pun.

### `.impeccable/config.json`

```json
{
  "detector": {
    "ignoreRules": [],
    "ignoreFiles": [],
    "ignoreValues": [],
    "designSystem": { "enabled": true }
  },
  "hook": {
    "enabled": true,
    "quiet": false,
    "auditLog": ".impeccable/hook.ndjson"
  }
}
```

- `detector.*` dipakai bersama oleh scan manual & hook otomatis.
- `hook.*` hanya berlaku untuk hook otomatis.
- Kelola ignore lewat CLI, bukan edit manual:
  ```bash
  npx impeccable ignores list
  npx impeccable ignores add-value design-system-color "#ff00aa" --reason "Campaign accent"
  npx impeccable ignores add-file "src/legacy/**"
  npx impeccable ignores add-rule side-tab
  ```
  - Tiga jenis ignore: **rule**, **file**, **value** (value-ignore lebih disarankan agar rule tetap berguna di tempat lain).
  - `--local` → tulis ke `config.local.json` (git-ignored, untuk eksperimen pribadi).
  - Ignore inline juga bisa lewat komentar di source: `impeccable-disable overused-font`.

## Prinsip Kunci

- `PRODUCT.md` + `DESIGN.md` adalah fondasi yang menjaga semua command & agent tetap konsisten dengan sistem visual proyek.
- Setiap harness mendapat build yang "dikompilasi ulang" sesuai target — aturan anti-"AI slop" berbeda per model (mis. Codex melarang ghost-card & over-rounding; Gemini menghilangkan hover motion pada gambar).

## Referensi Lanjutan

- Getting Started: https://impeccable.style/docs/getting-started
- Config: https://impeccable.style/docs/config
- Changelog, FAQ, GitHub repo — tautan tersedia di footer situs (dibuat oleh Paul Bakaus)
