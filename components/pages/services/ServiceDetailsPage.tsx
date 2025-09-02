// components/pages/services/ServiceDetailsPage.tsx
"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/pages/header/Header";
import Footer from "@/components/pages/header/footer/Footer";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { getServiceBySlug } from "@/components/auth/services";
import QuickContactForm from "@/components/pages/contect/quick_connect";
import { useHomeData } from "@/hooks/useHomeData";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Calendar, ChevronRight } from "lucide-react";

const defaultImage = "/imges/aboutus-Dench.webp";
const bannerImg = "/imges/banner_news.jpg";

const ServiceDetailsPage = ({
  categorySlug,
  serviceSlug,
}: {
  categorySlug: string;
  serviceSlug: string;
}) => {
  const { homeData, navData, loading: homeLoading, error: homeError } = useHomeData();
  const [service, setService] = useState<any>(null);
  const [moreServices, setMoreServices] = useState<any[]>([]);
  const [extraPages, setExtraPages] = useState<any[]>([]);
  const [createdDate, setCreatedDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getServiceBySlug(categorySlug, serviceSlug);
        console.log("Fetched Service Data:", data.service);
        setService(data.service);
        setMoreServices(data.more_services || []);
        setExtraPages(data.extra_pages || []);
        setCreatedDate(data.created_date);
      } catch (error: any) {
        setApiError(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [categorySlug, serviceSlug]);

  if (homeLoading || loading) return <LoadingSpinner />;
  if (homeError || apiError) return <div className="p-10 text-center text-red-600">Error: {homeError || apiError}</div>;

  return (
    <div className="min-h-screen bg-white">
      
      <Navbar homeData={homeData} navData={navData} />
      <header className="w-full py-20 mb-16 text-white text-center relative"
        style={{ backgroundImage: `linear-gradient(rgba(24,29,56,0.7),rgba(24,29,56,0.7)), url(${service?.page_banner || bannerImg})`, backgroundSize: "cover" }}>
        <div className="absolute inset-0 bg-[#0d6efd] bg-opacity-80"></div>
        <div className="relative max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold animate-pulse">{service?.heading}</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-8">
        <section className="flex-[2]">
          <Card className="mb-8 border-none animate-fade-in">
            <img src={service?.image_url} alt={service?.heading} className="w-full h-64 md:h-80 object-cover transition-transform duration-300 hover:scale-105"
              loading="eager" onError={(e) => ((e.target as HTMLImageElement).src = defaultImage)} />
            <div className="p-6">
              <div className="flex items-center text-gray-600 mb-4">
                <Calendar className="w-4 h-4 mr-2" /> <span>{createdDate}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{service?.heading}</h3>
              <div className="text-gray-700 leading-relaxed prose max-w-none" dangerouslySetInnerHTML={{ __html: service?.service_content }} />
            </div>
          </Card>
        </section>

        <aside className="flex-[1] space-y-6">
          <Card className="p-6 mb-6 animate-fade-in-up">
            <h4 className="text-lg font-semibold mb-4 text-gray-900">MORE SERVICES</h4>
            <ul className="space-y-3">
              {moreServices.map((s) => (
                <li key={s.id || s.meta_slug}>
                  <Link href={`/${categorySlug}/${s.meta_slug}`} className="flex items-center text-gray-700 hover:text-blue-600 group">
                    <ChevronRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                    {s.heading}
                  </Link>
                </li>
              ))}
            </ul>
          </Card>

          {extraPages.length > 0 && (
          <Card className="p-6 animate-fade-in-up">
            <h4 className="text-lg font-semibold mb-4 text-gray-900">MORE POSTS</h4>
            <ul>
              {extraPages.map((page) => (
                <li key={page.slug}>
                  <Link
                    href={`/${page.slug}`}
                    className="flex items-center text-gray-700 hover:text-blue-600 group"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                    {page.heading}
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        )}


          <QuickContactForm />
        </aside>
      </main>

      <Footer homeData={homeData} />
    </div>
  );
};

export default ServiceDetailsPage;
