export default async function MyProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  return <h1>Hasil Rakitan: {projectId}</h1>;
}
