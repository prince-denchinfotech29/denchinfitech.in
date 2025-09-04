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

const DevelopmentServicesSection: React.FC<Props> = ({ services = [] }) => {
  return (
    <section id="services" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
       <div className="text-center mb-12">
          <h1 className="text-6xl lg:text-4xl font-bold py-4"> OUR SERVICES</h1>
          <p className="text-lg text-gray-600 py-4">
            We are always here to serve you some awesome services
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold py-4">
            DEVELOPMENT SERVICES
          </h2>
        </div>

        {services.length === 0 ? (
          <p className="text-center text-gray-500">No services available at the moment.</p>
        ) : (
          <Carousel>
            {services.map(({ id, image_url, heading, slug, category_name }) => {
              const categorySlug = slugify(category_name);
              return (
                <div key={id} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3">
                  <Link href={`/${categorySlug}/${slug}`} aria-label={`View service: ${heading}`} className="block">
                   <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <div className="aspect-video overflow-hidden">
                        <img
                          src={image_url}
                          alt={heading || "Service image"}
                          className="w-full h-full transition-transform duration-300 hover:scale-105"
                          loading="lazy"
                          draggable={false}
                        />
                      </div>
                      <div className="bg-slate-800 text-white text-center py-6">
                        <h3 className="text-xl font-semibold">{heading}</h3>
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

export default DevelopmentServicesSection;
