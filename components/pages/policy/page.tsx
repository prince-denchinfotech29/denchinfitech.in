"use client"

import { useEffect, useState } from "react"
import Navbar from "@/components/pages/header/Header"
import Footer from "@/components/pages/header/footer/Footer"
import { useHomeData } from "@/hooks/useHomeData"
import LoadingSpinner from "@/components/ui/loading-spinner"
import { Card } from "@/components/ui/card"
import { getPolicyDetails } from "@/components/auth/morepage"


const bannerImg = `${process.env.NEXT_PUBLIC_BASE_URL || ""}images/banner_about.png`

const PrivacyPolicy = () => {
  const { homeData, navData, loading: homeLoading, error: homeError } = useHomeData()
  const [policyData, setPolicyData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const res = await getPolicyDetails()
        if (res?.data?.status) {
          setPolicyData(res.data.data)
        } else {
          setError("Failed to load policy content.")
        }
      } catch (err) {
        setError("Something went wrong while fetching policy data.")
      } finally {
        setLoading(false)
      }
    }

    fetchPolicy()
  }, [])

  if (homeLoading || loading) return <LoadingSpinner />
  if (homeError || error)
    return (
      <div className="p-10 text-center text-red-600">
        Error: {homeError || error}
      </div>
    )

  const meta = policyData?.meta
  const content = policyData?.content?.policy_content || ""

  return (
    <div className="min-h-screen bg-white">
    
      {/* Navbar */}
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
          <h1 className="text-4xl md:text-5xl font-extrabold">Privacy Policy</h1>
        </div>
      </header>

      {/* Policy Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <Card className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Privacy Policy</h2>
            </div>

            <div
              className="text-gray-700 leading-relaxed space-y-4 policy-content"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </Card>
        </div>
      </div>

      {/* Footer */}
      <Footer homeData={homeData} />
    </div>
  )
}

export default PrivacyPolicy
