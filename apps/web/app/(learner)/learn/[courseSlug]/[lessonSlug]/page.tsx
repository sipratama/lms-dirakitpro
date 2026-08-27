export default async function LessonPage({
  params,
}: {
  params: Promise<{ courseSlug: string; lessonSlug: string }>;
}) {
  const { courseSlug, lessonSlug } = await params;
  return (
    <h1>
      Lesson {lessonSlug} — {courseSlug}
    </h1>
  );
}
