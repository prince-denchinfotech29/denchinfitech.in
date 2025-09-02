// components/footer/NewsletterSection.tsx

"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { newsSubmit } from "@/components/auth/contect";
import { toast } from "react-toastify";

export default function NewsletterSection() {
  const [formValues, setFormValues] = useState({ email: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await newsSubmit(formValues);
      toast.success(res.message || "Subscribed successfully ✅");
      setFormValues({ email: "" });
    } catch (err: any) {
      toast.error(err.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h4 className="footer-title">NEWS LETTER</h4>
      <div className="footer-underline" />
      <p className="footer-section">
        Subscribe us for latest information and newsletters
      </p>

      <form onSubmit={handleSubmit} className="footer-input">
        <input
          type="email"
          placeholder="Email Address"
          value={formValues.email}
          onChange={(e) => setFormValues({ email: e.target.value })}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : <Send size={18} />}
        </button>
      </form>
    </div>
  );
}
