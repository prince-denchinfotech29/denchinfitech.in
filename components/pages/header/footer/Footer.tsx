"use client";

import { useEffect, useState } from "react";
import { getNavList } from "@/components/auth/home";
import { HomeData, NavItem } from "./types";
import Connect from "@/components/ui/ConnectPage";
import NewsletterSection from "@/components/pages/header/footer/NewsletterSection";
import ServicesSection from "@/components/pages/header/footer/ServicesSection";
import QuickLinksSection from "@/components/pages/header/footer/QuickLinksSection";
import AddressSection from "@/components/pages/header/footer/SocialMediaIcons";
import ScrollToTopButton from "@/components/pages/header/footer/ScrollToTopButton";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FooterProps {
  homeData: HomeData;
}

export default function Footer({ homeData }: FooterProps) {
  const [navList, setNavList] = useState<NavItem[]>([]);

  useEffect(() => {
    let isMounted = true; // to avoid state update if unmounted

    getNavList()
      .then((res) => {
        if (!isMounted) return;

        let data: NavItem[] = [];
        if (Array.isArray(res)) {
          data = res;
        } else if (Array.isArray(res.data)) {
          data = res.data;
        } else if (Array.isArray(res.data?.data)) {
          data = res.data.data;
        }
        setNavList(data);
      })
      .catch((err) => {
        if (!isMounted) return;
      });

    return () => {
      isMounted = false; // cleanup to prevent setting state after unmount
    };
  }, []);



  if (!homeData?.setting) return null;

  return (
    <footer>
      <Connect />

      <div className="footer">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <NewsletterSection />
          <ServicesSection navList={navList} title={homeData.setting.footer_col2_title} />
          <QuickLinksSection title={homeData.setting.footer_col3_title} />
          <AddressSection setting={homeData.setting} socialMedia={homeData.social_media} />
        </div>
      </div>

      <div className="footer-dark">
        <p>{homeData.setting.footer_copyright}</p>
      </div>

      <a
        href="https://wa.me/919650848208"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-button chat_btn"
      >
        <img
          src="https://img.icons8.com/color/48/whatsapp--v1.png"
          alt="WhatsApp"
          width={24}
          height={24}
        />
      </a>

      <ScrollToTopButton />
      <ToastContainer position="top-right" autoClose={3000} />
    </footer>
  );
}
