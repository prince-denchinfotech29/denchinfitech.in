import { servicesFeatures } from "@/data/mockData";

const WhyChooseUsSection = () => {
  if (!servicesFeatures?.length) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">WHY CHOOSE US</h2>
          <p className="text-gray-600 text-base sm:text-lg">
            We have some special products which can help you
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {servicesFeatures.map(({ icon: Icon, title, desc }, index) => (
            <div
              key={index}
              className="bg-white shadow-sm rounded-lg p-6 text-center border border-gray-200 hover:shadow-md transition-all"
              role="region"
              aria-labelledby={`feature-title-${index}`}
            >
              <Icon
                className="h-10 w-10 text-blue-600 mx-auto mb-4"
                aria-hidden="true"
              />
              <h3
                id={`feature-title-${index}`}
                className="text-lg font-semibold mb-2"
              >
                {title}
              </h3>
              <p className="text-gray-600 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
