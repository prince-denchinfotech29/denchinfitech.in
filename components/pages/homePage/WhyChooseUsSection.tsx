import { servicesFeatures } from "@/data/mockData";

const WhyChooseUsSection = () => {
  if (!servicesFeatures?.length) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-6xl lg:text-4xl font-bold mb-4">WHY CHOOSE US</h1>
          <p className="text-lg text-gray-600">
            We have some special products which can help you
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {servicesFeatures.map(({ icon: Icon, title, desc }, index) => (
            <div
              key={index}
              className="feature-card"
              role="region"
              aria-labelledby={`feature-title-${index}`}
            >
              <Icon
                className="feature-icon"
                aria-hidden="true"
              />
              <h3
                id={`feature-title-${index}`}
                className="feature-title text-xl font-semibold mb-2"
              >
                {title}
              </h3>
              <p className="feature-desc">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
