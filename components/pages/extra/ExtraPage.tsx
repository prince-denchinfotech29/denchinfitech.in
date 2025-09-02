"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { Card } from "../../ui/card";
import Navbar from "@/components/pages/header/Header";
import Footer from "@/components/pages/header/footer/Footer";
import { useHomeData } from "@/hooks/useHomeData";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { Calendar } from "lucide-react";
import {
  getExtraPageBySlug,
  ExtraPageResponse,
  Meta,
} from "@/components/auth/services";

// const QuickContactForm = dynamic(
//   () => import("@/components/pages/contact/quick_connect"),
//   {
//     loading: () => <LoadingSpinner />,
//     ssr: false,
//   }
// );

const defaultImage = "/imges/aboutus-Dench.webp";
const bannerImg = "/imges/banner_news.jpg";

type Service = ExtraPageResponse["service"];

const ExtraPage: React.FC = () => {
  const { slug } = useParams() as { slug: string };

  const {
    homeData,
    navData,
    loading: homeLoading,
    error: homeError,
  } = useHomeData();

  const [service, setService] = useState<Service | null>(null);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [createdDate, setCreatedDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchExtraPage = async () => {
      setLoading(true);
      try {
        const data: ExtraPageResponse = await getExtraPageBySlug(slug);
        setService(data.service ?? null);
        setMeta(data.meta ?? data.service?.meta ?? null);
        setCreatedDate(data.service?.created_date || "");
        setApiError(null);
      } catch (err: unknown) {
        const message =
          typeof err === "string"
            ? err
            : err && typeof err === "object" && "message" in err
            ? (err as { message: string }).message
            : "Failed to load data";
        setApiError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchExtraPage();
  }, [slug]);

  if (loading || homeLoading) return <LoadingSpinner />;

  if (apiError)
    return (
      <div className="p-10 text-center text-red-600">
        Error: {apiError}
      </div>
    );

  if (homeError)
    return (
      <div className="p-10 text-center text-red-600">
        Error: {homeError}
      </div>
    );

  return (
    <div className="min-h-screen bg-white">
      <Navbar homeData={homeData} navData={navData} />

      <header
        className="w-full py-20 mb-16 text-white text-center relative"
        style={{
          backgroundImage: `linear-gradient(rgba(24, 29, 56, 0.7), rgba(24, 29, 56, 0.7)), url(${service?.banner_url || bannerImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[#0d6efd] bg-opacity-80"></div>
        <div className="relative max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold animate-pulse">
            {service?.heading || "Page"}
          </h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="main-content-row flex flex-col md:flex-row gap-8">
          {/* Left Column */}
          <div className="left-content flex-1">
            <Card className="w-full mb-8 border-none animate-fade-in">
              {service?.image_url && (
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={service.image_url}
                    alt={service.heading}
                    className="w-full h-64 md:h-80 object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                    onError={(e) =>
                      ((e.target as HTMLImageElement).src = defaultImage)
                    }
                  />
                </div>
              )}
              <div className="p-6">
                {createdDate && (
                  <div className="flex items-center text-gray-600 mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{new Date(createdDate).toLocaleDateString()}</span>
                  </div>
                )}
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  {service?.heading}
                </h3>
                <div
                  className="text-gray-700 leading-relaxed prose max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: service?.content || "",
                  }}
                />
              </div>
            </Card>
          </div>

          {/* Right Sidebar */}
          {/* <div className="right-sidebar w-full md:w-1/3">
            <QuickContactForm />
          </div> */}
        </div>
      </div>

      <Footer homeData={homeData} />
    </div>
  );
};

export default ExtraPage;
