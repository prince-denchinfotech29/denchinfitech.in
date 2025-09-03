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
      className="relative py-16 sm:py-20"
      style={{
        backgroundImage: `linear-gradient(rgba(13, 64, 78, 0.74), rgba(13, 64, 78, 0.54)), url(${contactback})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 sm:p-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              FREE SEO ANALYSIS
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  aria-label="Your Name"
                  required
                  className="bg-white/20 text-white placeholder-white"
                />
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  maxLength={10}
                  minLength={10}
                  aria-label="Phone Number"
                  required
                  className="bg-white/20 text-white placeholder-white"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  aria-label="Email"
                  required
                  className="bg-white/20 text-white placeholder-white"
                />
                <Input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  aria-label="Subject"
                  required
                  className="bg-white/20 text-white placeholder-white"
                />
              </div>

              <Textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                aria-label="Message"
                required
                className="bg-white/20 text-white placeholder-white"
              />

              <Button
                type="submit"
                size="lg"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          {/* FAQ Section */}
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 sm:p-8 text-white">
            <h2 className="text-3xl font-bold mb-6">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            {faqs.length === 0 ? (
              <p className="text-gray-200">No FAQs available at the moment.</p>
            ) : (
              <Accordion items={faqs} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
