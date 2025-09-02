'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Carousel from "@/components/ui/packages-slider"

interface PortfolioItem {
  id: number
  image_url: string
  name: string
  slug: string
}

interface RelatedPortfoliosCarouselProps {
  portfolios: PortfolioItem[]
}

const RelatedPortfoliosCarousel: React.FC<RelatedPortfoliosCarouselProps> = ({ portfolios = [] }) => {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const openModal = (image_url: string) => {
    setSelectedImage(image_url)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedImage(null)
  }

  const handleViewDetails = (slug: string) => {
    router.push(`/portfolio/${slug}`)
  }

  if (!portfolios.length) return null

  return (
    <>
      <section className="bg-gradient-to-r from-gray-50 to-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 animate-fadeInUp">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Related Portfolios</h2>
          </div>
          <Carousel>
            {portfolios.map(({ id, image_url, name, slug }) => (
              <div key={id} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-4">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                  <div
                    className="aspect-video overflow-hidden relative group"
                    onClick={() => openModal(image_url)}
                  >
                    <img
                      src={image_url}
                      alt={name}
                      className="w-full h-full transition-transform duration-300 group-hover:scale-105 object-cover"
                      loading="lazy"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button
                        className="bg-white/90 text-black hover:bg-white"
                        aria-label={`View ${name}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          openModal(image_url)
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="bg-slate-800 text-white text-center py-6">
                    <h3
                      onClick={() => handleViewDetails(slug)}
                      className="font-bold text-lg cursor-pointer transition"
                    >
                      {name}
                    </h3>
                  </div>
                </Card>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

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
              aria-label="Close modal"
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
    </>
  )
}

export default RelatedPortfoliosCarousel
