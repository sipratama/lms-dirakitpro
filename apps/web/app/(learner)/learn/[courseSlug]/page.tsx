export default async function CourseWorkspacePage({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  const { courseSlug } = await params;
  return <h1>Merakit: {courseSlug}</h1>;
}
