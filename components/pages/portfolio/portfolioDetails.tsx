// components/Portfolio/PortfolioDetails.tsx
"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { useHomeData } from "@/hooks/useHomeData"
import Navbar from "@/components/pages/header/Header"
import Footer from "@/components/pages/header/footer/Footer"
import LoadingSpinner from "@/components/ui/loading-spinner"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, Calendar, User } from "lucide-react"
import { getPortfolioDetails } from "@/components/auth/portfolio" 
import QuickContactForm from '@/components/pages/contect/quick_connect'
import RelatedPortfoliosCarousel from '@/components/pages/portfolio/RelatedPortfoliosCarousel'

interface PortfolioType {
  name: string
  slug: string
  image_url?: string
  photo?: string
  start_date?: string
  end_date?: string
  content?: string
  short_content?: string
  client_name?: string
  client_company?: string
  client_comment?: string
}

interface PortfolioDetailsData {
  portfolio: PortfolioType
  relatedPortfolios?: PortfolioType[]
  meta?: {
    meta_title?: string
    meta_description?: string
    meta_keyword?: string
  }
}

const PortfolioDetails: React.FC = () => {
  const pathname = usePathname()
  // Assuming URL structure is /portfolio/[slug]
  const slug = pathname?.split("/").pop() || ""

  const { homeData, navData } = useHomeData()

  const [data, setData] = useState<PortfolioDetailsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (!slug) return

    async function fetchData() {
      try {
        const res = await getPortfolioDetails(slug)
        setData(res.data)
      } catch (err: any) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [slug])

  if (loading) return <LoadingSpinner />
  if (error) return <div className="p-10 text-center text-red-600">Error: {error.message}</div>
  if (!data?.portfolio) return <div className="p-10 text-center text-gray-600">No portfolio found</div>

  const { portfolio, relatedPortfolios = [], meta = {} } = data

  const openModal = (src: string) => {
    setSelectedImage(src)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedImage(null)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar homeData={homeData} navData={navData} />

     <div className="container mx-auto px-4 py-8">
        <div className="main-content-row flex flex-col lg:flex-row gap-8">
          {/* Left Content */}
          <div className="left-content w-full lg:w-2/1">
            <Card className="mb-6 overflow-hidden animate-fadeInUp">
               <header className="px-6 py-4 mb-6 text-left">
                  <h1 className="text-4xl md:text-5xl font-extrabold animate-slideInDown">
                    {portfolio.name}
                  </h1>
                </header>
              <div
                className="relative group cursor-pointer"
                onClick={() => openModal(portfolio.image_url || portfolio.photo || '')}
              >
                <img
                  src={portfolio.image_url || portfolio.photo}
                  alt={portfolio.name}
                  className="w-full h-100 transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button className="bg-white/90 text-black hover:bg-white">
                    <Eye className="w-4 h-4 mr-2" />
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{portfolio.name}</h3>
                {(portfolio.start_date || portfolio.end_date) && (
                  <div className="flex items-center text-gray-600 mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>
                      {portfolio.start_date}
                      {portfolio.end_date ? ` – ${portfolio.end_date}` : ""}
                    </span>
                  </div>
                )}
                <div
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: portfolio.content || '' }}
                />
              </div>
            </Card>
          </div>

          <div className="right-sidebar w-full lg:w-1/1 space-y-6">
            <Card className="animate-fadeInUp" style={{ animationDelay: "200ms" }}>
              <div className="bg-gray-50 border rounded-lg p-6 animate-fade-in-up sticky top-8">
                <h4 className="text-lg font-semibold mb-4 text-gray-900">PROJECT DETAILS</h4>

                <div className="p-4 space-y-3">
                  {portfolio.client_name && (
                    <div className="flex items-start">
                      <User className="w-4 h-4 mr-2 mt-1 text-blue-600" />
                      <div>
                        <strong className="text-gray-800">Client Name:</strong>
                        <p className="text-gray-600">{portfolio.client_name}</p>
                      </div>
                    </div>
                  )}

                  {portfolio.client_company && (
                    <div className="flex items-start">
                      <User className="w-4 h-4 mr-2 mt-1 text-blue-600" />
                      <div>
                        <strong className="text-gray-800">Client Company:</strong>
                        <p className="text-gray-600">{portfolio.client_company}</p>

                        <strong className="text-gray-800">Project Start Date:</strong>
                        <p className="text-gray-600">{portfolio.start_date}</p>

                        <strong className="text-gray-800">Project End Date:</strong>
                        <p className="text-gray-600">{portfolio.end_date}</p>

                        <strong className="text-gray-800">Client Comment:</strong>
                        <p className="text-gray-600">{portfolio.client_comment}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
             {/* Quick Contact */}
            <QuickContactForm />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative max-w-4xl max-h-full animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute -top-10 right-0 text-white text-2xl w-8 h-8 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/75 transition"
            >
              ✕
            </button>
            <img
              src={selectedImage || ""}
              alt="Portfolio Full View"
              className="max-w-full object-contain rounded-lg shadow-2xl"
              style={{ maxHeight: "80vh" }}
            />
          </div>
        </div>
      )}
    {/* Related Portfolios Carousel */}
      <RelatedPortfoliosCarousel portfolios={relatedPortfolios} />
      <Footer homeData={homeData} />
    </div>
  )
}

export default PortfolioDetails
