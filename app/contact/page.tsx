import { Metadata } from "next";
import { getContactDetails } from "@/components/auth/morepage";
import ContactPage from "@/components/pages/contect/contectUs";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const response = await getContactDetails();
    const meta = response.data.data.meta;

    const title =
      meta?.meta_title || "Dench Infotech";

    const description =
      meta?.meta_description ||
      "Dench Infotech:";

    const keywords = meta?.meta_keyword || "";

    const siteName = "Dench Infotech";
    const url = "https://denchinfotech.in/contact";
    const image = "https://denchinfotech.in/og-image.jpg";

    return {
      title,
      description,
      keywords,
      alternates: {
        canonical: url,
      },
      openGraph: {
        type: "website",
        title,
        description,
        url,
        siteName,
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: siteName,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [image],
      },
      // Don't add viewport/charset here, set it globally in root layout or _document
    };
  } catch (error) {
    console.error("Failed to fetch metadata:", error);
    return {
      title: "Dench Infotech - Your Trusted Partner",
      description: "Leading software development & digital transformation company.",
      keywords: "",
      alternates: {
        canonical: "https://denchinfotech.in/contact",
      },
      openGraph: {
        type: "website",
        title: "Dench Infotech - Your Trusted Partner",
        description: "Leading software development & digital transformation company.",
        url: "https://denchinfotech.in/contact",
        siteName: "Dench Infotech",
        images: [
          {
            url: "https://denchinfotech.in/og-image.jpg",
            width: 1200,
            height: 630,
            alt: "Dench Infotech",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "Dench Infotech - Your Trusted Partner",
        description: "Leading software development & digital transformation company.",
        images: ["https://denchinfotech.in/og-image.jpg"],
      },
    };
  }
}

export default function ContactRoute() {
  return <ContactPage />;
}
