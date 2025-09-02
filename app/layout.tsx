  import type React from "react"
  import type { Metadata } from "next"
  import { Inter } from "next/font/google"
  import "./globals.css"
  import './style.css';

  const inter = Inter({ subsets: ["latin"] })

  export const metadata: Metadata = {
    title: "Dench Infotech - Your Trusted Partner in Software & Digital Transformation",
    description:
      "Dench Infotech: Providing software development, app development, and digital marketing solutions tailored to your business needs.",
    keywords: "Software development, Digital marketing, App development, Dench Infotech",
    openGraph: {
      type: "website",
      title: "Dench Infotech - Your Trusted Partner in Software & Digital Transformation",
      description:
        "Dench Infotech: Providing software development, app development, and digital marketing solutions tailored to your business needs.",
      url: "https://denchinfotech.in/",
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
      title: "Dench Infotech - Your Trusted Partner in Software & Digital Transformation",
      description:
        "Dench Infotech: Providing software development, app development, and digital marketing solutions tailored to your business needs.",
      images: ["https://denchinfotech.in/og-image.jpg"],
    },
      generator: 'v0.app'
  }

  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.png" type="image/png" />
          <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
        </head>
        <body className={inter.className}>{children}</body>
      </html>
    )
  }
