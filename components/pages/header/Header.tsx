'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { RadixDropdown } from "@/components/ui/dropdown";

interface Service {
  heading: string;
  slug: string;
}

interface Category {
  name: string;
  slug?: string;
  services: Service[];
}

interface HomeSetting {
  logo?: string;
}

interface HomeData {
  setting?: HomeSetting;
  social_media?: any;
}

interface NavbarProps {
  homeData: HomeData;
  navData: Category[]; // ✅ navData is now a list of categories
}

export default function Navbar({ homeData, navData }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const setting = homeData?.setting;
  const socialLinks = homeData?.social_media;
  const categories = navData; // ✅ no more `.data`

  

  if (!setting || !categories?.length) {
    return (
      <div className="bg-yellow-100 text-center p-4">
        ⚠️ Navbar: Required data missing. Please check props.
      </div>
    );
  }

  const { logo } = setting;

  const menuItems = categories.map((category) => {
    const slug = category.slug || category.name.toLowerCase().replace(/\s+/g, "-");
    return {
      title: category.name,
      slug,
      items: category.services.map((service) => ({
        label: service.heading,
        slug: service.slug,
      })),
    };
  });

  return (
    <nav className="bg-white sticky top-0 z-50 border-b shadow-md">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            {logo ? (
              <img src={logo} alt="Logo" className="h-16" />
            ) : (
              <div className="h-16 w-32 bg-gray-300 flex items-center justify-center">LOGO</div>
            )}
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-[#0f3e49] hover:text-pink-600 font-medium">HOME</Link>
              {menuItems.map(({ title, slug, items }) => (
                <RadixDropdown key={title} title={title} slug={slug} items={items} />
              ))}
           

            <Link href="/blog" className="text-[#0f3e49] hover:text-pink-600 font-medium">BLOGS</Link>
            <Link href="/contact" className="text-[#0f3e49] hover:text-pink-600 font-medium">CONTACT</Link>
            <Link href="/get-quote">
              <button className="bg-[#0d404e] text-white px-4 py-2 rounded-full hover:bg-pink-600 transition-all">
                GET QUOTE ➜
              </button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-xl">
              {mobileOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden px-4 pt-4 pb-6 space-y-3 bg-white border-t">
          <Link href="/" onClick={() => setMobileOpen(false)} className="block font-medium text-[#0f3e49] hover:text-pink-600">HOME</Link>

          {menuItems.map(({ title, slug, items }) => (
            <div key={title}>
              <button
                className="flex justify-between w-full font-medium text-left text-[#0f3e49]"
                onClick={() => setOpenCategory(openCategory === title ? null : title)}
              >
                <span>{title}</span>
                <span>{openCategory === title ? "−" : "+"}</span>
              </button>

              {openCategory === title && (
                <div className="pl-4 mt-2 space-y-1">
                  <Link
                    href={`/${slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="block text-sm text-[#0f3e49] hover:text-pink-600"
                  >
                    All {title}
                  </Link>
                  {items.map((item, idx) => (
                    <Link
                      key={idx}
                      href={`/${slug}/${item.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="block text-sm text-gray-600 hover:text-pink-600"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Link href="/blog" onClick={() => setMobileOpen(false)} className="block font-medium text-[#0f3e49] hover:text-pink-600">BLOGS</Link>
          <Link href="/contact" onClick={() => setMobileOpen(false)} className="block font-medium text-[#0f3e49] hover:text-pink-600">CONTACT</Link>
          <Link href="/get-quote">
            <button className="bg-[#0d404e] text-white px-4 py-2 rounded-full hover:bg-pink-600 transition-all">
              GET QUOTE ➜
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}
