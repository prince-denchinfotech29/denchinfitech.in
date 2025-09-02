"use client"

import { useEffect, useState } from "react"
import { getWhyUsDetails } from "@/components/auth/morepage"
import { useHomeData } from "@/hooks/useHomeData"
import LoadingSpinner from "@/components/ui/loading-spinner"
import Navbar from "@/components/pages/header/Header"
import Footer from "@/components/pages/header/footer/Footer"
import { Globe, IndianRupee, ThumbsUp, Lock, Send } from "lucide-react"

const whyUsFeatures = [
  {
    icon: Globe,
    background: "bg-red-800",
    color: "text-white",
    title: "Experience with Credibility",
    description:
      "Our skilled professionals have hands-on experience with big clients and startups. We have built a credible reputation with long-term partnerships.",
  },
  {
    icon: IndianRupee,
    color: "text-white",
    background: "bg-slate-800",
    title: "Cost Effectiveness",
    description:
      "We deliver high-quality services at affordable prices. Our efficient process ensures short- and long-term cost savings.",
  },
  {
    icon: ThumbsUp,
    color: "text-white",
    background: "bg-slate-800",
    title: "Quality & Operational Expertise",
    description:
      "We follow a systematic approach to analyze, identify, and solve issues while aligning with your business needs.",
  },
  {
    icon: Lock,
    background: "bg-slate-800",
    color: "text-white",
    title: "Security",
    description:
      "We provide IT services with utmost confidentiality, protecting your data and business operations.",
  },
]

const services = [
  {
    title: "Enterprise Mobility Solution",
    desc: "We analyze your business and provide affordable mobile solutions.",
  },
  {
    title: "Mobile Apps Development",
    desc: "Cost-effective mobile app development services.",
  },
  {
    title: "Ecommerce Solution",
    desc: "Tailored ecommerce solutions for both single and multi-vendor models.",
  },
  {
    title: "Web Development",
    desc: "Custom website development for all business types.",
  },
  {
    title: "Digital Marketing Service",
    desc: (
      <>
        We offer{" "}
        <a href="https://denchinfotech.in/digital-marketing" className="underline text-blue-600">
          digital marketing services
        </a>{" "}
        including SEO, SMO, and paid ads.
      </>
    ),
  },
  {
    title: "Content Management System",
    desc: "Custom CMS solutions based on your business requirements.",
  },
]

export default function WhyUs() {
  const { homeData, navData, loading, error } = useHomeData()
  const [contentData, setContentData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getWhyUsDetails()
      .then((res) => {
        setContentData(res.data.data.content)
      })
      .catch((err) => console.error("Failed to load Why Us content", err))
      .finally(() => setIsLoading(false))
  }, [])

  if (loading || isLoading) return <LoadingSpinner />
  if (error) return <div className="p-10 text-center text-red-600">Error: {error}</div>

  return (
    <div className="min-h-screen bg-white">
      <Navbar homeData={homeData} navData={navData} />

      <header
        className="w-full py-20 mb-12 text-white text-center relative"
        style={{
          backgroundImage: `linear-gradient(rgba(24,29,56,0.7),rgba(24,29,56,0.7)), url(${process.env.NEXT_PUBLIC_BASE_URL || ""}images/banner_about.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold">Why Us</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 space-y-12 max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {contentData?.heading || "Why Dench Infotech for Web & Mobile Apps Development?"}
          </h2>
          <div
            className="text-gray-600 text-[15px] mx-auto max-w-4xl"
            dangerouslySetInnerHTML={{ __html: contentData?.content || "" }}
          />
        </div>

        <section className="py-16 bg-gray-100 rounded-xl shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {whyUsFeatures.map((item, idx) => (
              <div key={idx} className="flex items-start space-x-4">
                <div className={`${item.background} ${item.color} p-4 rounded-full shadow-md`}>
                  <item.icon size={40} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-gray-600 pt-3">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer homeData={homeData} />
    </div>
  )
}
