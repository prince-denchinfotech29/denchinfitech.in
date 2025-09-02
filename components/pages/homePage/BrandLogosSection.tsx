import Carousel from "@/components/ui/brandLogos";

const BrandLogosSection = () => {
  const logoPaths = [
    `imges/client-1.webp`,
    `imges/client-2.webp`,
    `imges/client-3.webp`,
    `imges/client-4.webp`,
    `imges/client-5.webp`,
    `imges/client-6.webp`,
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
       
       <Carousel>
          {logoPaths.map((path, index) => (
            <div
              key={index}
              className="flex items-center justify-center px-4"
            >
              <img
                src={path}
                alt={`Client Logo ${index + 1}`}
                className="max-h-12 w-auto grayscale hover:grayscale-0 transition duration-300"
                loading="lazy"
                draggable={false}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default BrandLogosSection;
