import { expect, test } from "../support/fixtures";

/**
 * KERANGKA — BELUM DIIMPLEMENTASI. Semua test di file ini di-skip permanen.
 *
 * Tujuan langkah 13 di docs/PROJECT-PLAYBOOK.md adalah menutup alur inti
 * `Discover -> Enroll/Purchase -> Lesson -> Checkpoint -> Submission`. Bagian
 * Purchase sudah benar-benar tertutup (lihat anonymous/midtrans-webhook.e2e.ts dan
 * authenticated/payment-status.e2e.ts).
 *
 * Sisanya BELUM bisa diuji karena halamannya masih placeholder hasil scaffold —
 * bukan karena testnya belum ditulis. Per commit ini:
 *
 *   app/(public)/courses/page.tsx                      -> <h1>Kelas</h1>
 *   app/(public)/courses/[slug]/page.tsx               -> <h1>Kelas: {slug}</h1>
 *   app/(learner)/learn/[courseSlug]/page.tsx          -> <h1>Merakit: {courseSlug}</h1>
 *   app/(learner)/learn/[courseSlug]/[lessonSlug]/...  -> <h1>Lesson {lessonSlug} — {courseSlug}</h1>
 *   app/(learner)/projects/me/[projectId]/page.tsx     -> placeholder
 *
 * Menulis assertion terhadap teks placeholder itu akan terlihat seperti coverage
 * padahal tidak menguji perilaku apa pun, jadi sengaja tidak dilakukan.
 *
 * TODO(step-14): saat tiap halaman di bawah jadi nyata, hapus test.fixme()-nya,
 * pindahkan ke file spec sendiri, dan lengkapi seed-nya (course_stages, lessons,
 * checkpoint_configs, checkpoint_questions, checkpoint_question_options,
 * build_milestones, projects, project_submissions — semuanya sudah ada di
 * db/schema tapi belum punya helper seed di e2e/support/seed.ts).
 */
test.describe("Alur inti learner (menunggu langkah 14)", () => {
  test.fixme("Discover: katalog publik menampilkan course PUBLISHED dan menyembunyikan DRAFT", async ({
    page,
  }) => {
    // Perlu: app/(public)/courses/page.tsx merender daftar course dari DB.
    // Assert: course fixture PUBLISHED tampil; course DRAFT/soft-deleted tidak;
    //         harga tampil dalam format rupiah; kartu menaut ke /courses/[slug].
    await page.goto("/courses");
    expect(true).toBe(true);
  });

  test.fixme("Discover: detail course menampilkan outcome, prasyarat, dan CTA beli", async ({
    page,
  }) => {
    // Perlu: app/(public)/courses/[slug]/page.tsx merender shortOutcome,
    //        prerequisites, requiredTools, finalOutcomeDescription.
    // Assert: CTA menaut ke /checkout/course/[slug] untuk course berbayar,
    //         dan ke enroll gratis (CAT-004) untuk course isFree.
    await page.goto("/courses/apa-pun");
    expect(true).toBe(true);
  });

  test.fixme("Enroll gratis (CAT-004) langsung membuat enrollment tanpa order", async ({
    page,
  }) => {
    // Perlu: aksi enroll untuk course isFree=true.
    // Assert: enrollments.source === 'FREE', tidak ada baris di orders,
    //         dan learner langsung diarahkan ke /learn/[courseSlug].
    await page.goto("/courses/apa-pun");
    expect(true).toBe(true);
  });

  test.fixme("Lesson: learner ter-enroll bisa membuka lesson dan progress-nya tercatat", async ({
    page,
  }) => {
    // Perlu: /learn/[courseSlug] (daftar stage+lesson) dan
    //        /learn/[courseSlug]/[lessonSlug] (render LessonContentBlock[]).
    // Assert: blok markdown/code/image/callout/resource/build-task ter-render;
    //         lesson_progress berpindah NOT_STARTED -> STARTED saat dibuka dan
    //         -> COMPLETED saat ditandai selesai (§10.3);
    //         LRN-007: course isSequential memblokir lompat ke lesson terkunci;
    //         learner TANPA enrollment mendapat 404/redirect (guard entitlement).
    await page.goto("/learn/apa-pun");
    expect(true).toBe(true);
  });

  test.fixme("Checkpoint: jawaban salah lalu benar, attempt tercatat dan Progress Rakitan naik", async ({
    page,
  }) => {
    // Perlu: lesson bertipe CHECKPOINT + UI kuis (CHK-001/CHK-002).
    // Assert: submit jawaban salah -> attempt tersimpan di checkpoint_attempts
    //         dengan skor gagal dan learner boleh mengulang;
    //         submit jawaban benar -> attempt lulus, lesson jadi COMPLETED,
    //         build_milestones terkait ikut terpenuhi (Progress Rakitan).
    await page.goto("/learn/apa-pun/checkpoint-apa-pun");
    expect(true).toBe(true);
  });

  test.fixme("Submission: final project disubmit sesuai finalProjectConfig course", async ({
    page,
  }) => {
    // Perlu: form final project + /projects/me/[projectId].
    // Assert: field yang diwajibkan mengikuti courses.finalProjectConfig
    //         (requireRepoUrl/requireLiveUrl/requireScreenshot/allowTechList) —
    //         submit tanpa field wajib ditolak;
    //         submit valid -> projects.status DRAFT -> SUBMITTED (§10.4),
    //         project_submissions bertambah, course dinyatakan selesai
    //         ("Rakitanmu jadi!"), dan visibility PUBLIC memunculkan
    //         /projects/[username]/[slug] untuk pengunjung anonim.
    await page.goto("/projects/me/apa-pun");
    expect(true).toBe(true);
  });
});
