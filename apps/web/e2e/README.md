# E2E (Playwright)

Bagian E2E dari langkah 13 `docs/PROJECT-PLAYBOOK.md`. Unit/komponen test memakai
Vitest + RTL (`pnpm --filter web test`) dan **terpisah total** dari direktori ini.

```bash
docker compose up -d db              # Postgres lokal (dari root repo)
pnpm --filter web db:migrate         # sekali, kalau skema belum ter-apply
pnpm --filter web exec playwright install chromium   # sekali per mesin
pnpm --filter web test:e2e           # jalankan semua
pnpm --filter web test:e2e --project=anonymous       # hanya yang tanpa login
pnpm --filter web test:e2e:ui        # mode UI
```

Playwright menyalakan dev server sendiri (`webServer` di `playwright.config.ts`);
kalau `pnpm dev` sudah jalan di port 3000, server itu dipakai ulang.

## Kenapa file spec bernama `*.e2e.ts`, bukan `*.spec.ts`

`vitest.config.mts` tidak menyetel `include`, jadi Vitest memakai default
`**/*.{test,spec}.*`. File `*.spec.ts` di sini akan ikut terjaring `vitest run`
dan gagal (Vitest tidak bisa menjalankan test Playwright). Memakai pola `*.e2e.ts`
memisahkan kedua runner **tanpa perlu mengubah konfigurasi Vitest**, jadi kedua
setup test bisa berkembang sendiri-sendiri.

## Tiga keputusan desain

### 1. Auth: login Clerk sungguhan sekali, lalu pakai ulang `storageState`

`e2e/auth.setup.ts` menjalankan `clerkSetup()` (`@clerk/testing`) untuk mengambil
Testing Token — tanpa itu bot detection Clerk memblokir login otomatis — lalu
`clerk.signIn()` dengan strategy password, dan menyimpan cookie hasilnya ke
`e2e/.auth/learner.json`. Project `authenticated` memakai ulang state itu, jadi
hanya ada **satu** round-trip ke Clerk per run.

Yang **tidak** dipilih, dan alasannya:

- **Menjalankan UI sign-in sungguhan.** Tidak mungkin: `app/(public)/login/page.tsx`
  masih placeholder `<h1>Masuk</h1>`. Belum ada UI untuk didorong.
- **Flag bypass auth di kode produksi** (mis. `E2E_AUTH_BYPASS=1` yang membuat
  `auth.protect()` jadi no-op). Ditolak. Ini keputusan yang **mahal untuk
  dibatalkan** dan berisiko keamanan: begitu ada jalur bypass di bundle produksi,
  satu env var salah setel = seluruh gerbang auth terbuka. Selain itu test-nya
  jadi berhenti menguji gerbang auth yang sebenarnya — padahal `proxy.ts` sengaja
  TIDAK memakai path-matching dan menaruh proteksi di tiap layout/page, yang justru
  perlu dijaga test.

Konsekuensi yang harus disadari: suite terautentikasi ini **bergantung pada
layanan eksternal** (Clerk development instance). Itu harga yang dibayar untuk
menguji gerbang auth sungguhan, dan itulah sebabnya spec yang paling bernilai
(webhook Midtrans) sengaja dirancang supaya **tidak** butuh Clerk sama sekali.

#### Degradasi yang rapi

Suite dibagi jadi dua Playwright project:

| Project         | Butuh                                        | Isi                                            |
| --------------- | -------------------------------------------- | ---------------------------------------------- |
| `anonymous`     | Postgres + Clerk **publishable/secret key**   | webhook Midtrans, guard redirect anonim         |
| `authenticated` | di atas + **user E2E** di Clerk               | guard checkout, status pembayaran               |

Kalau `E2E_CLERK_USER_EMAIL` / `E2E_CLERK_USER_PASSWORD` kosong, `auth.setup.ts`
menulis `storageState` kosong lalu skip, dan tiap spec terautentikasi skip lewat
`test.skip(!HAS_CLERK_AUTH, …)`. Hasilnya **skipped, bukan merah** — CI tidak
merah hanya karena kredensial belum diisi.

#### Menyiapkan user E2E (sekali)

Clerk instance di `.env` sudah `pk_test_`/`sk_test_` (development instance), tapi
saat setup ini dibuat isinya **0 user**. Buat satu user khusus E2E di
[Clerk Dashboard](https://dashboard.clerk.com) → Users → Create user, dengan
email + password, lalu tambahkan ke `.env` root:

```dotenv
E2E_CLERK_USER_EMAIL=e2e+clerk_test@dirakitpro.test
E2E_CLERK_USER_PASSWORD=<password user tersebut>
```

Clerk memperlakukan email berakhiran `+clerk_test` sebagai akun test (tidak
mengirim email sungguhan). Pakai **development instance**, jangan production.

> Baris `users` + `auth_identities` internal untuk user ini **di-seed oleh
> `auth.setup.ts`**, bukan oleh webhook. Di produksi `/api/webhooks/clerk` yang
> mengisinya, tapi webhook Clerk tidak bisa menjangkau localhost. Tanpa seed itu,
> `getInternalUserIdByClerkId()` mengembalikan null dan semua halaman checkout /
> payment cuma menampilkan "Akun sedang disinkronkan".

### 2. Seeding: fixture ber-namespace, satu course per test — bukan reset database

Tidak ada `TRUNCATE`, tidak ada reset skema, tidak ada drop database di mana pun
di direktori ini. Semua baris fixture memakai namespace tetap:

- slug course diawali `e2e-course-`
- email user berakhiran `@e2e.dirakitpro.test`

Cleanup **selalu** dibatasi ke namespace itu (`support/seed.ts`), jadi menjalankan
E2E di database dev tidak akan menyentuh data asli.

Batas isolasi antar-test adalah **course**, bukan user. Alasannya struktural:
semua unique index yang bisa bentrok di-scope oleh `courseId` —
`orders_pending_user_course_unique` (COM-006, maksimal satu order PENDING per
user+course) dan `enrollments_user_course_unique`. Dengan memberi tiap test course
sendiri (`uniqueCourseSlug()`), test tetap bisa jalan paralel walaupun berbagi
satu user learner. Alternatifnya adalah memaksa `workers: 1`, yang membuat suite
lambat tanpa alasan yang benar-benar perlu.

Urutan hapus di `deleteCourseFixture()` penting: `orders.courseId` memakai
`onDelete: restrict`, jadi order harus dihapus eksplisit lebih dulu; `payments`
ikut cascade dari `orders`, `enrollments` ikut cascade dari `courses`.

### 3. Webhook Midtrans: server key milik test, bukan kredensial sandbox

`MIDTRANS_SERVER_KEY` dan `NEXT_PUBLIC_MIDTRANS_CLIENT_KEY` sengaja **belum
diisi** (keputusan di langkah 10 playbook), jadi overlay Snap tidak bisa didorong
di browser. Tapi bagian yang otoritatif dari alur pembelian bukan overlay-nya —
melainkan webhook: `app/api/webhooks/midtrans/route.ts` yang memindahkan order ke
PAID/EXPIRED/CANCELLED dan membuat enrollment.

Jadi: `playwright.config.ts` menjalankan dev server dengan
`MIDTRANS_SERVER_KEY = E2E_MIDTRANS_SERVER_KEY` (default `e2e-midtrans-server-key`),
dan `support/midtrans.ts` menandatangani payload fixture dengan nilai yang sama —
`sha512(order_id + status_code + gross_amount + server_key)`, rumus yang sama
persis dengan `verifyMidtransSignature()` di `lib/midtrans.ts`. Test lalu POST
langsung ke endpoint webhook. **Nol kredensial Midtrans asli dibutuhkan**, dan
verifikasi signature tetap diuji sungguhan (termasuk kasus signature dirusak →
400 dan tidak ada perubahan state).

Ini bekerja karena satu detail yang sudah diverifikasi: `next.config.ts` memuat
`.env` root lewat `process.loadEnvFile()`, dan fungsi itu **tidak menimpa**
variabel yang sudah ada di `process.env`. Jadi `MIDTRANS_SERVER_KEY=` yang kosong
di `.env` tidak menimpa nilai yang di-inject `webServer.env`.

## Yang belum tercakup (dan kenapa)

| Alur                                     | Status                                                                                        |
| ---------------------------------------- | --------------------------------------------------------------------------------------------- |
| Order baru → Snap token → overlay Snap    | Butuh kredensial Midtrans sandbox asli. `createCheckoutOrder()` memanggil Midtrans lewat jaringan sebelum bisa merender `SnapCheckout`. Cabang guard-nya (ALREADY_OWNED, existing PENDING) sudah tertutup karena return sebelum panggilan itu. |
| Discover, Lesson, Checkpoint, Submission | Halamannya masih placeholder scaffold. Lihat `authenticated/core-journey.todo.e2e.ts` — kerangka `test.fixme()` yang menjelaskan assertion yang harus ditulis di langkah 14. |

Kalau nanti kredensial sandbox diisi tapi memanggil Midtrans sungguhan di tiap run
terasa lambat/flaky, opsi murah yang tersedia adalah menambah env
`MIDTRANS_SNAP_BASE_URL` di `lib/midtrans.ts` (saat ini base URL-nya hardcoded
lewat ternary `MIDTRANS_IS_PRODUCTION`) supaya E2E bisa diarahkan ke mock lokal.
Sengaja belum dilakukan sekarang: itu perubahan kode produksi demi test yang
mungkin tidak diperlukan begitu sandbox aktif. Perubahan ini murah dan mudah
dibatalkan kalau ternyata dibutuhkan.

## Kenapa tidak ada task `e2e` di turbo.json

`turbo.json` hanya punya task `test` (Vitest) yang hermetik dan cacheable. E2E
**tidak** hermetik: butuh Postgres hidup, dev server hidup, dan kredensial Clerk.
Cache Turbo justru berbahaya di sini — input source bisa tidak berubah sementara
state database berubah, sehingga cache hit akan melaporkan "lulus" tanpa
menjalankan apa pun. Jadi E2E dibiarkan lokal di `apps/web`
(`pnpm --filter web test:e2e`) dan `pnpm test` di root tetap cepat dan hermetik.
