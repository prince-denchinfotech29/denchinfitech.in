// app/about/page.tsx

import { Metadata } from 'next';
import AboutUs from '@/components/pages/about/AboutUs';
import { getAboutDetails } from '@/components/auth/home';

export async function generateMetadata(): Promise<Metadata> {
  const homeData = await getAboutDetails();
  const about = homeData?.homeAbout;

  const title = about?.mt_about || "About Us - Dench Infotech";
  const description = about?.md_about || "Learn about Dench Infotech";
  const keywords = about?.mk_about || "about us, dench, IT company";
  const siteName = "Dench Infotech";
  const url = "https://denchinfotech.in/about";
  const image = "https://denchinfotech.in/og-image.jpg";

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url, // canonical लिंक सेट
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
    other: {
      keywords,
      viewport: "width=device-width, initial-scale=1",
      charset: "utf-8",
    },
  };
}

export default function About() {
  return <AboutUs />;
}
