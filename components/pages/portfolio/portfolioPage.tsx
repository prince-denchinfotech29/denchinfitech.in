"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation" // सही import

import Navbar from "@/components/pages/header/Header"
import Footer from "@/components/pages/header/footer/Footer"
import LoadingSpinner from "@/components/ui/loading-spinner"
import { useHomeData } from "@/hooks/useHomeData"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { getPortfolio } from "@/components/auth/portfolio"

const bannerImg = `/imges/banner_portfolio.jpg` // public folder path सही है

interface PortfolioItemType {
  id: number
  name: string
  slug: string
  image_url: string
  category_id: number
}

interface PortfolioListType {
  id: number
  name: string
}

const PortfolioItem: React.FC<{
  item: PortfolioItemType,
  openModal: (src: string) => void,
  handleViewDetails: (slug: string) => void
}> = ({ item, openModal, handleViewDetails }) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative overflow-hidden bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 group">
      <div className="relative h-64 overflow-hidden bg-gray-200">
        <img
          src={item.image_url}
          alt={item.name}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
        {!loaded && <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>}

        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
          <Button
            onClick={() => openModal(item.image_url)}
            className="bg-white text-black hover:bg-blue-600 hover:text-white transition"
          >
            <Eye className="w-4 h-4 mr-2" />
          </Button>
        </div>
      </div>

      <div className="p-4 text-center">
        <h3
          onClick={() => handleViewDetails(item.slug)}
          className="font-bold text-lg text-gray-800 hover:text-blue-600 cursor-pointer transition"
        >
          {item.name}
        </h3>
      </div>
    </div>
  )
}

const PortfolioPage: React.FC = () => {
  const router = useRouter() // next/navigation से सही import

  const { homeData, navData, loading: navLoading, error: navError } = useHomeData()

  const [portfolioLists, setPortfolioLists] = useState<PortfolioListType[]>([])
  const [portfolios, setPortfolios] = useState<PortfolioItemType[]>([])
  const [meta, setMeta] = useState<{ meta_title?: string; meta_description?: string; meta_keyword?: string } | null>(null)
  const [activeTab, setActiveTab] = useState<string>("all")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getPortfolio()
        setPortfolioLists(response.data.portfolioLists || [])
        setPortfolios(response.data.portfolios || [])
        setMeta(response.data.meta || {})
      } catch (err: any) {
        setError(err.message || "Failed to load portfolio data.")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const getFilteredItems = () =>
    activeTab === "all"
      ? portfolios
      : portfolios.filter((item) => item.category_id.toString() === activeTab)

  const openModal = (imageSrc: string) => {
    setSelectedImage(imageSrc)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedImage(null)
  }

  const handleViewDetails = (slug: string) => {
    router.push(`/portfolio/${slug}`) // next/navigation में push यूज़ करें
  }

  if (loading || navLoading) return <LoadingSpinner />
  if (error || navError) return <div className="p-10 text-center text-red-600">Error: {error || navError}</div>

  return (
    <div className="min-h-screen bg-white">
      <Navbar homeData={homeData} navData={navData} />

      <header
        className="w-full py-20 mb-12 text-white text-center relative"
        style={{
          backgroundImage: `linear-gradient(rgba(24, 29, 56, 0.7), rgba(24, 29, 56, 0.7)), url(${bannerImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold animate-fadeInDown">
          PORTFOLIO - Dench Infotech
        </h1>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-10">
            <div className="flex flex-wrap justify-center gap-3 p-4 bg-gray-100 rounded-xl shadow-inner">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-5 py-2.5 text-sm font-semibold rounded-md transition duration-300 ${
                  activeTab === "all"
                    ? "bg-brand-50 bg-brand-50:hover text-white ring-2 ring-blue-500"
                    : "bg-white text-gray-800  bg-brand-50:hover hover:text-blue-600 border"
                }`}
              >
                All
              </button>
              {portfolioLists.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id.toString())}
                  className={`px-5 py-2.5 text-sm font-semibold rounded-md transition duration-300 ${
                    activeTab === category.id.toString()
                      ? "bg-brand-50 bg-brand-50:hover text-white ring-2 ring-blue-500"
                      : "bg-white text-gray-800 bg-brand-50:hover hover:text-blue-600 border"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-fadeInUp">
            {getFilteredItems().map((item) => (
              <PortfolioItem
                key={item.id}
                item={item}
                openModal={openModal}
                handleViewDetails={handleViewDetails}
              />
            ))}

            {getFilteredItems().length === 0 && (
              <div className="col-span-full text-center py-12">
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No projects found</h3>
                <p className="text-gray-500">No projects available in this category yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="relative max-w-4xl max-h-full bg-white rounded-lg p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute -top-4 -right-4 text-white text-2xl w-8 h-8 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-700 transition"
            >
              ✕
            </button>
            <img
              src={selectedImage || ""}
              alt="Portfolio View"
              className="max-w-full max-h-[80vh] object-contain rounded shadow-lg"
              loading="lazy"
            />
          </div>
        </div>
      )}

      <Footer homeData={homeData} />
    </div>
  )
}

export default PortfolioPage
