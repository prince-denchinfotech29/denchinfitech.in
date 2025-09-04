import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Shield,
  Globe,
  Gem,
  // Add more icons here if needed
} from "lucide-react";

interface Pricing {
  icon?: string;
  title: string;
  price: string | number;
  subtitle?: string;
  features: string; // raw HTML string
  button_text?: string;
  buttonText?: string;
}

interface PricingSectionProps {
  pricings?: Pricing[];
}

// Map icon names to Lucide React components
const iconMap: Record<string, React.ElementType> = {
  shield: Shield,
  globe: Globe,
  gem: Gem,
};

const PricingSection: React.FC<PricingSectionProps> = ({ pricings = [] }) => {
  if (!pricings.length) return null;

  return (
  <section id="pricing" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-6xl lg:text-4xl font-bold py-4">PRICING TABLE</h1>
          <h6 className="text-lg text-gray-600">
            Our detailed consulting service prices are listed below
          </h6>
        </div>

         <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricings.map(
            (
              { icon, title, price, subtitle, features, button_text, buttonText },
              index
            ) => {
              const IconComponent = icon ? iconMap[icon.toLowerCase()] : null;

              return (
                <Card
                  key={index}
                  className="text-center p-6 hover:shadow-lg transition-shadow"
                  role="region"
                  aria-labelledby={`pricing-title-${index}`}
                >
                  <div className="space-y-4">
                    {/* Icon */}
                    <div
                      className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mx-auto"
                      aria-hidden="true"
                    >
                      {IconComponent && (
                        <IconComponent  className="w-16 h-16 text-white" />
                      )}
                    </div>

                    {/* Title & Price */}
                    <h1
                      id={`pricing-title-${index}`}
                      className="text-2xl"
                    >
                      {title}
                    </h1>
                    <div className="text-3xl font-bold">₹{price}</div>
                    <p className="text-gray-600">{subtitle}</p>

                    {/* Features as raw HTML */}
                    <div
                      className="space-y-2 [&_p]:text-gray-700 [&_p]:mb-2 [&_hr]:my-2 mb-4"
                      dangerouslySetInnerHTML={{ __html: features }}
                    />

                    {/* Call to Action Button */}
                    <div>
                      <Link href="/contact" passHref legacyBehavior>
                        <a className="w-full">
                          <Button
                            className="bg-brand-50 hover:bg-brand-50"
                            aria-label={`Select plan: ${title}`}
                          >
                            {(button_text || buttonText) ?? "Select"}
                            <ChevronRight className="h-4 w-4 ml-2" />
                          </Button>
                        </a>
                      </Link>
                    </div>
                  </div>
                </Card>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
