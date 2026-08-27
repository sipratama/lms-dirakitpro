export default async function AdminCurriculumPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  return <h1>Admin: Kurikulum Course {courseId}</h1>;
}
