"use client"

import { useEffect, useState } from "react"
import { getCareerDetails } from "@/components/auth/morepage"
import { useHomeData } from "@/hooks/useHomeData"
import LoadingSpinner from "@/components/ui/loading-spinner"
import Navbar from "@/components/pages/header/Header"
import Footer from "@/components/pages/header/footer/Footer"
import {Card} from "@/components/ui/card"


export default function Careers() {
  const { homeData, navData, loading: homeLoading, error: homeError } = useHomeData()
  const [careerData, setCareerData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCareerDetails()
        setCareerData(response?.data?.data)
      } catch (err) {
        setError("Failed to load career data")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (homeLoading || loading) return <LoadingSpinner />
  if (homeError || error) return <div className="p-10 text-center text-red-600">Error: {homeError || error}</div>

  const content = careerData?.content || {}
  const bannerImg = `${process.env.NEXT_PUBLIC_BASE_URL || ""}${careerData?.banner || "images/banner_about.png"}`

  return (
    <div className="min-h-screen bg-white">
      <Navbar homeData={homeData} navData={navData} />

      {/* Header Section */}
      <header
        className="w-full py-20 mb-12 text-white text-center relative"
        style={{
          backgroundImage: `linear-gradient(rgba(24, 29, 56, 0.7), rgba(24, 29, 56, 0.7)), url(${bannerImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="relative max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold">{content?.career_heading || "Careers"}</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <Card className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{content?.career_heading || "Latest Job Openings"}</h2>
            </div>
            <div
              className="text-gray-700 leading-relaxed prose max-w-none"
              dangerouslySetInnerHTML={{ __html: content?.career_content || "<p>No career content available.</p>" }}
            />
          </Card>
        </div>
      </div>

      <Footer homeData={homeData} />
    </div>
  )
}
