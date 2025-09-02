import ServiceDetailsPage from "@/components/pages/services/ServiceDetailsPage";

export default function Page({
  params,
}: {
  params: { slug: string; innerSlug: string };
}) {
  return (
    <ServiceDetailsPage
      categorySlug={params.slug}
      serviceSlug={params.innerSlug}
    />
  );
}
