import React from "react";
import Carousel from "@/components/ui/testmonialSlider";
import { Star } from "lucide-react";
import Image from "next/image";

interface Testimonial {
  image?: string;
  name: string;
  designation: string;
  message: string;
}

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}

// You can import static images in Next.js for optimization
const contactback = "/imges/home_testimonial_photo.jpg";

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials = [] }) => {
  if (testimonials.length === 0) return null;

  return (
    <section
      className="py-16 bg-gray-50"
      style={{
      backgroundImage: `linear-gradient(rgba(32, 77, 90, 0.8), rgba(32, 77, 90, 0.8)), url(${contactback})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            CLIENTS TESTIMONIALS
          </h2>
          <p className="text-white">See what our valuable clients tell about us</p>
        </div>

        <Carousel>
          {testimonials.map(({ image, name, designation, message }, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-4"
            >
              <div className="text-center p-6 border border-white rounded-lg">
                <div className="space-y-4">
                  {image ? (
                    <Image
                      src={image}
                      alt={name}
                      width={80}
                      height={80}
                      className="rounded-full mx-auto border-4 border-blue-100"
                      loading="lazy"
                      draggable={false}
                    />
                  ) : (
                    <Image
                      src="/placeholder.svg"
                      alt="Placeholder"
                      width={80}
                      height={80}
                      className="rounded-full mx-auto border-4 border-blue-100"
                      loading="lazy"
                      draggable={false}
                    />
                  )}
                  <div>
                    <h5 className="font-semibold text-white">{name}</h5>
                    <p className="text-sm text-white">{designation}</p>
                  </div>
                  <div className="flex justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="italic text-white">"{message}"</p>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;
