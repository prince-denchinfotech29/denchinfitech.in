"use client"

import { useEffect, useState, ChangeEvent, FormEvent } from "react"
import Navbar from "@/components/pages/header/Header"
import Footer from "@/components/pages/header/footer/Footer"
import { useHomeData } from "@/hooks/useHomeData"
import { getContactDetails } from "@/components/auth/morepage"
import { contectSubmit } from "@/components/auth/contect"
import LoadingSpinner from "@/components/ui/loading-spinner"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"


import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

interface ContactData {
  contact_heading?: string
  contact_email?: string
  contact_phone?: string
}

interface MetaData {
  meta_title?: string
  meta_description?: string
  meta_keyword?: string
}

interface FormValues {
  type: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

interface FormStatus {
  loading: boolean
  success: string | null
  error: string | null
}

const ContactPage = () => {
  const { homeData, navData, loading, error } = useHomeData()

  const [contactData, setContactData] = useState<ContactData | null>(null)
  const [contactLoading, setContactLoading] = useState(true)

  const [formValues, setFormValues] = useState<FormValues>({
    type: "Contact Us",
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [formStatus, setFormStatus] = useState<FormStatus>({
    loading: false,
    success: null,
    error: null,
  })

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await getContactDetails()
        setContactData(response.data.data.contact)
      } catch (err) {
        console.error("Failed to fetch contact data", err)
      } finally {
        setContactLoading(false)
      }
    }

    fetchContact()
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus({ loading: true, success: null, error: null })

    try {
      const response = await contectSubmit(formValues)
      toast.success(response.message || "Message sent successfully")
      setFormStatus({ loading: false, success: response.message, error: null })

      // Reset form
      setFormValues({
        type: "Contact Us",
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
    } catch (err: any) {
      toast.error(err.message || "Something went wrong ❌")
      setFormStatus({ loading: false, success: null, error: err.message })
    }
  }

  if (loading || contactLoading) return <LoadingSpinner />
  if (error) return <div className="p-10 text-center text-red-600">Error: {error}</div>

  const bannerImg = `${process.env.NEXT_PUBLIC_BASE_URL || "/"}imges/banner_news.jpg`

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
          <h1 className="text-4xl md:text-5xl font-extrabold">{contactData?.contact_heading || "Contact Us"}</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Contact Form</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <Card className="p-6">
            <h5 className="text-2xl font-semibold text-gray-800 mb-4">Get In Touch</h5>
            <p className="text-gray-600 mb-6">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center w-12 h-12 bg-brand-50 rounded-lg flex-shrink-0">📍</div>
                <div>
                  <h5 className="font-semibold">Address</h5>
                  <p className="text-gray-600 whitespace-pre-line">
                    4th floor Gaur City Center Noida extension(U.P.),<br />
                    13/30, Third Floor East Patel Nagar New Delhi
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center w-12 h-12 bg-brand-50 rounded-lg flex-shrink-0">📞</div>
                <div>
                  <h5 className="font-semibold">Phone Number</h5>
                  <p className="text-gray-600">{contactData?.contact_phone}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center w-12 h-12 bg-brand-50 rounded-lg flex-shrink-0">📧</div>
                <div>
                  <h5 className="font-semibold">Email Address</h5>
                  <p className="text-gray-600">{contactData?.contact_email}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Contact Form */}
          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="hidden" name="type" value="Contact Us" />

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name">Name</label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="bg-red-500 text-black placeholder-black"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone">Phone</label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formValues.phone}
                    onChange={handleChange}
                    placeholder="Your phone number"
                    className="bg-red-500 text-black placeholder-black"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    placeholder="Your email address"
                    className="bg-red-500 text-black placeholder-black"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject">Subject</label>
                  <Input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formValues.subject}
                    onChange={handleChange}
                    placeholder="Message subject"
                    className="bg-red-500 text-black placeholder-black"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message">Message</label>
                <Textarea
                  id="message"
                  name="message"
                  value={formValues.message}
                  onChange={handleChange}
                  placeholder="Your message"
                  className="bg-red-500 text-black placeholder-black"
                  rows={6}
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-brand-50" disabled={formStatus.loading}>
                {formStatus.loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Card>
        </div>
      </div>

      <Footer homeData={homeData} />
    </div>
  )
}

export default ContactPage
