"use client";

import React from "react";
import Navbar from "@/components/pages/header/Header";
import Footer from "@/components/pages/header/footer/Footer";
import { useHomeData } from "@/hooks/useHomeData";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { Card } from "@/components/ui/card";
// import MetaHandler from "../../common/MetaHandler";

const bannerImg = `imges/banner_about.png`;

const AboutUs: React.FC = () => {
  const { homeData, homeAbout, navData, loading, error } = useHomeData();

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="p-10 text-center text-red-600">
        Error: {error}
      </div>
    );

//   const [mt_about, mk_about, md_about] = [
//     homeAbout?.mt_about || "Dench Infotech",
//     homeAbout?.mk_about || "software",
//     homeAbout?.md_about || "Leading",
//   ];

  return (
    <div className="min-h-screen bg-white">
      {/* <MetaHandler
        title={mt_about}
        description={md_about}
        keywords={mk_about}
      /> */}

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
          <h1 className="text-4xl md:text-5xl font-extrabold">About Us</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <Card className="p-8">
            <div className="text-gray-700 leading-relaxed">
              <p className="text-xl mb-6">
                At Dench Infotech, we take pride in representing a trusted Technology Services agency for Digital Enterprise <br />
                Solutions. We have highly professionals that have expertise in the latest mobile technologies as well as{" "}
                <a href="/digital-marketing" target="_blank" rel="noopener noreferrer">
                  digital marketing services
                </a>,
                who provide solutions for our global business clients. Our innovative ways of IT services help our clients <br />
                to achieve their goals effectively. Once you entitle us to your project to get our services you can ensure:
              </p>

              <ul className="space-y-3 text-gray-700 text-xl">
                {[
                  "Experienced team of professionals working on your project",
                  "Effective small or dedicated projects like a web-app or mobile app",
                  "Robust development idea focused stringently by us",
                  "Increasing customer reach with advertising or internet marketing",
                  "Timely completion of the project as decided before its start-up",
                  "Affordable prices",
                  "Last long Support responsibility",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>

              <p className="text-xl mt-6 mb-6">
                Professional Web or Mobile App Development and Online Marketing Services. We Have Fully Satisfied Customers.
              </p>

              <p className="text-xl mb-6">
                Do you need a custom{" "}
                <a
                  href="https://denchinfotech.in/development/mobile-app-development"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Android app?
                </a>{" "}
                Or maybe you need a social media promotion, ecommerce solution? or <br />
                Educational or online teaching system. Are you exploring wearables, the Internet of Things, or another new tech?
              </p>

              <p className="text-xl mb-6">
                Let's talk. From{" "}
                <a
                  href="https://denchinfotech.in/digital-marketing/seo-services"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Search engine optimization services
                </a>{" "}
                to secure enterprise solutions with integrated backend systems, Dench <br />
                Infotech does it all.
              </p>

              <p className="text-xl">
                Our mobile strategists, designers, and digital marketers know the business inside and out — If you have any plan or <br />
                are already ready with functionality...Contact us now..
              </p>
            </div>
          </Card>
        </div>
      </div>

      <Footer homeData={homeData} />
    </div>
  );
};

export default AboutUs;
