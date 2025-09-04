"use client"

import React, { useEffect, useState, ChangeEvent, FormEvent } from "react"
import Navbar from "@/components/pages/header/Header"
import Footer from "@/components/pages/header/footer/Footer"
import { useHomeData } from "@/hooks/useHomeData"
import { getQuoteDetails } from "@/components/auth/morepage"
import { contectSubmit } from "@/components/auth/contect"
import LoadingSpinner from "@/components/ui/loading-spinner"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const bannerImg = "/imges/banner_news.jpg" // assuming public folder

interface QuoteDataType {
  // Define this based on your API response, example:
  // title: string
  // description: string
  // etc.
  [key: string]: any
}

interface MetaType {
  meta_title?: string
  meta_description?: string
  meta_keyword?: string
  [key: string]: any
}

interface FormDataType {
  type: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

const GetQuote: React.FC = () => {
  const { homeData, navData, loading, error } = useHomeData()

  const [quoteData, setQuoteData] = useState<QuoteDataType | null>(null)
  const [meta, setMeta] = useState<MetaType | null>(null)
  const [quoteLoading, setQuoteLoading] = useState(true)

  const [formData, setFormData] = useState<FormDataType>({
    type: "Quote Request",
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await getQuoteDetails()
        setQuoteData(response.data.data.quote)
        setMeta(response.data.data.meta)
      } catch (err) {
        console.error("Failed to fetch quote data", err)
      } finally {
        setQuoteLoading(false)
      }
    }

    fetchQuote()
  }, [])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await contectSubmit(formData)
      toast.success(response.message || "Quote submitted successfully!")

      setFormData({
        type: "Quote Request",
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
    } catch (error: any) {
      toast.error(error.message || "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading || quoteLoading) return <LoadingSpinner />
  if (error) return <div className="p-10 text-center text-red-600">Error: {error}</div>

  return (
    <div className="min-h-screen bg-white">
      <ToastContainer position="top-right" autoClose={3000} />

      <Navbar homeData={homeData} navData={navData} />

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
          <h1 className="text-4xl md:text-5xl font-extrabold">Get Quote</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-left text-gray-800">QUOTE REQUEST</h1>
        </div>

        <div className="grid lg:grid-cols-1 gap-8">
          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <input type="hidden" name="type" value="Quote Request" />

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    className="animate-fade-in-up bg-color-500 text-black placeholder-black"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Your phone number"
                    className="animate-fade-in-up bg-color-500 text-black placeholder-black"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your email address"
                    className="animate-fade-in-up bg-color-500 text-black placeholder-black"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-gray-700">
                    Subject
                  </label>
                  <Input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Message subject"
                    className="animate-fade-in-up bg-color-500 text-black placeholder-black"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-700">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your message"
                  rows={6}
                  className="animate-fade-in-up bg-color-500 text-black placeholder-black"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-brand-50 bg-brand-50:hover"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Card>
        </div>
      </div>

      <Footer homeData={homeData} />
    </div>
  )
}

export default GetQuote
