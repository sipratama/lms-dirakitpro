export default async function PublicProjectPage({
  params,
}: {
  params: Promise<{ username: string; slug: string }>;
}) {
  const { username, slug } = await params;
  return (
    <h1>
      Project {slug} oleh {username}
    </h1>
  );
}
