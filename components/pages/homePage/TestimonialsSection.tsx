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

const contactback = "/imges/home_testimonial_photo.jpg";

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials = [] }) => {
  if (!testimonials.length) return null;

  return (
    <section
      className="py-16 text-white"
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
          <h2 className="text-3xl lg:text-4xl font-bold">CLIENT TESTIMONIALS</h2>
          <p className="text-white/90">See what our valuable clients say about us</p>
        </div>

        <Carousel>
          {testimonials.map(({ image, name, designation, message }, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 px-4"
            >
              <div className="text-center p-6 border border-white/20 rounded-lg bg-white/10 backdrop-blur-sm">
                <div className="space-y-4">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={name}
                    width={80}
                    height={80}
                    className="rounded-full mx-auto border-4 border-blue-100"
                    loading="lazy"
                    draggable={false}
                  />

                  <div>
                    <h5 className="font-semibold">{name}</h5>
                    <p className="text-sm">{designation}</p>
                  </div>

                  <div className="flex justify-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  <p className="italic text-white/90">"{message}"</p>
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
