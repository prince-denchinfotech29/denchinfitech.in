"use client"

import { useState, ChangeEvent, FormEvent } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { contectSubmit } from "@/components/auth/contect"

// ✅ Toastify
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

interface FormDataType {
  type: string
  name: string
  email: string
  phone: string
  message: string
}

const QuickContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormDataType>({
    type: "Quote Request",
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await contectSubmit(formData)

      // ✅ Show success toast
      toast.success(response.message || "Your message has been sent!")

      // Reset form
      setFormData({
        type: "Quote Request",
        name: "",
        email: "",
        phone: "",
        message: "",
      })
    } catch (error: any) {
      // ❌ Show error toast
      toast.error(error.message || "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-gray-50 border rounded-lg p-6 animate-fade-in-up text-black placeholder-black sticky top-8">
      {/* ✅ Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />

      <h4 className="text-lg font-semibold mb-4 text-gray-900">QUICK CONNECT!</h4>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="hidden" name="type" value="Quote Request" />

        <Input
          type="text"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="animate-fade-in-up bg-red-500 text-black placeholder-black"
          style={{ animationDelay: "0.2s" }}
        />

        <Input
          type="email"
          placeholder="Email Address"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="animate-fade-in-up bg-red-500 text-black placeholder-black"
          style={{ animationDelay: "0.4s" }}
        />

        <Input
          type="tel"
          placeholder="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          maxLength={10}
          minLength={10}
          required
          className="animate-fade-in-up bg-red-500 text-black placeholder-black"
          style={{ animationDelay: "0.6s" }}
        />

        <Textarea
          placeholder="Message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          required
          rows={4}
          className="animate-fade-in-up bg-red-500 text-black placeholder-black"
          style={{ animationDelay: "1s" }}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-brand-50 bg-brand-50:hover animate-zoom-in"
          style={{ animationDelay: "1.2s" }}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  )
}

export default QuickContactForm
