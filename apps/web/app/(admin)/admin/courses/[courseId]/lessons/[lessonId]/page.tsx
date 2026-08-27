export default async function AdminLessonEditorPage({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>;
}) {
  const { courseId, lessonId } = await params;
  return (
    <h1>
      Admin: Lesson {lessonId} — Course {courseId}
    </h1>
  );
}
