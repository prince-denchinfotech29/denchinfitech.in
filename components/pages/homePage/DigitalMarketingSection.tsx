import React from "react";
import Link from "next/link";
import Carousel from "../../ui/packages-slider";
import { Card } from "../../ui/card";

interface Service {
  id: string | number;
  image_url: string;
  heading: string;
  slug: string;
  category_name: string;
}

// Utility to slugify category names
const slugify = (text = "") =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");

interface DigitalMarketingSectionProps {
  services?: Service[];
}

const DigitalMarketingSection: React.FC<DigitalMarketingSectionProps> = ({
  services = [],
}) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          {/* Dynamic Heading from API (category_name of the first service) */}
          <h2 className="text-3xl lg:text-4xl font-bold">
            {services[0]?.category_name
              ? `${services[0].category_name.toUpperCase()} SERVICES`
              : "DIGITAL MARKETING SERVICES"}
          </h2>
        </div>

        {services.length === 0 ? (
          <p className="text-center text-gray-500">
            No services available at the moment.
          </p>
        ) : (
          <Carousel>
            {services.map(({ id, image_url, heading, slug, category_name }) => {
              const categorySlug = slugify(category_name);

              return (
                <div
                  key={id}
                  className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3"
                >
                  <Link href={`/${categorySlug}/${slug}`} className="block">
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={image_url}
                          alt={`Visual for ${heading} service`}
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

export default DigitalMarketingSection;
