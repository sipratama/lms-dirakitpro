export default async function CourseCheckoutPage({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  const { courseSlug } = await params;
  return <h1>Checkout: {courseSlug}</h1>;
}
