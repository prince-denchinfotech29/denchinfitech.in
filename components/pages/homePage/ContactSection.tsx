"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Accordion from "@/components/ui/Accordion";
import { contectSubmit } from "@/components/auth/contect";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const contactback = "/imges/home_booking_photo.webp";

interface FAQ {
  question: string;
  answer: string;
}

interface ContactSectionProps {
  faqs?: FAQ[];
}

interface FormData {
  type: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ faqs = [] }) => {
  const [formData, setFormData] = useState<FormData>({
    type: "Contact Us",
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await contectSubmit(formData);
      toast.success(response.message || "Message sent successfully!");
      setFormData({
        type: "Contact Us",
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error: any) {
      toast.error(error.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative"
      style={{
        backgroundImage: `linear-gradient(rgba(13, 64, 78, 0.74), rgba(13, 64, 78, 0.54)), url(${contactback})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <ToastContainer position="top-right" autoClose={3000} />

      <div>
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="py-25 bg-faq-50">
            <div className="p-6">
              <h2 className="text-4xl font-bold mb-6 text-white container">
                FREE SEO ANALYSIS
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4 container">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-red-500 text-white placeholder-white"
                    required
                  />
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    maxLength={10}
                    minLength={10}
                    className="bg-red-500 text-white placeholder-white"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-red-500 text-white placeholder-white"
                    required
                  />
                  <Input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="bg-red-500 text-white placeholder-white"
                    required
                  />
                </div>

                <Textarea
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="bg-red-500 text-white placeholder-white"
                  required
                />

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-brand-50 hover:bg-brand-50 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="py-16 rounded-lg px-8 container">
            <h2 className="text-3xl font-bold mb-6 text-white">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <div className="space-y-4">
              {faqs.length === 0 ? (
                <p className="text-gray-300">No FAQs available at the moment.</p>
              ) : (
                <Accordion items={faqs} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
