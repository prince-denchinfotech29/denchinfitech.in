import React from "react";
import Link from "next/link";
import Carousel from "@/components/ui/packages-slider";
import { Card } from "@/components/ui/card";

interface Service {
  id: string | number;
  image_url: string;
  heading: string;
  slug: string;
  category_name: string;
}

const slugify = (text = "") =>
  text.toLowerCase().trim().replace(/\s+/g, "-");

interface Props {
  services?: Service[];
}

const DigitalMarketingSection: React.FC<Props> = ({ services = [] }) => {
  const categoryTitle =
    services[0]?.category_name?.toUpperCase() || "DIGITAL MARKETING";

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold">{categoryTitle} SERVICES</h2>
        </div>

        {services.length === 0 ? (
          <p className="text-center text-gray-500">No services available at the moment.</p>
        ) : (
          <Carousel>
            {services.map(({ id, image_url, heading, slug, category_name }) => {
              const categorySlug = slugify(category_name);
              return (
                <div key={id} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 px-2">
                  <Link href={`/${categorySlug}/${slug}`} aria-label={`View service: ${heading}`}>
                    <Card className="overflow-hidden hover:shadow-lg transition duration-300">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={image_url}
                          alt={heading || "Service image"}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          loading="lazy"
                          draggable={false}
                        />
                      </div>
                      <div className="bg-slate-800 text-white text-center py-6">
                        <h3 className="text-lg font-semibold">{heading}</h3>
                      </div>
                    </Card>
                  </Link>
                </div>
              );
            })}
          </Carousel>
        )}
      </div>
    </section>
  );
};

export default DigitalMarketingSection;
