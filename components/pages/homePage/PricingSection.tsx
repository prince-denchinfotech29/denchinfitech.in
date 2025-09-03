import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Shield,
  Globe,
  Gem,
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

const iconMap: Record<string, React.ElementType> = {
  shield: Shield,
  globe: Globe,
  gem: Gem,
};

const PricingSection: React.FC<PricingSectionProps> = ({ pricings = [] }) => {
  if (!pricings.length) return null;

  return (
    <section id="pricing" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-6xl lg:text-4xl font-bold mb-2">PRICING TABLE</h1>
          <p className="text-lg text-gray-600">
            Our detailed consulting service prices are listed below
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {pricings.map(({ icon, title, price, subtitle, features, button_text, buttonText }, index) => {
            const IconComponent = icon ? iconMap[icon.toLowerCase()] : null;

            return (
              <Card
                key={index}
                className="text-center p-6 hover:shadow-lg transition-shadow"
                role="region"
                aria-labelledby={`pricing-title-${index}`}
              >
                <div className="space-y-4">
                  <div
                    className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto"
                    aria-hidden="true"
                  >
                    {IconComponent && (
                      <IconComponent className="w-12 h-12 text-white" />
                    )}
                  </div>

                  <h2 id={`pricing-title-${index}`} className="text-2xl font-bold">
                    {title}
                  </h2>
                  <div className="text-3xl font-bold">₹{price}</div>
                  {subtitle && <p className="text-gray-600">{subtitle}</p>}

                  <div
                    className="text-left text-sm [&_p]:text-gray-700 [&_p]:mb-1 [&_hr]:my-2"
                    dangerouslySetInnerHTML={{ __html: features }}
                  />

                  <Link href="/contact" passHref legacyBehavior>
                    <a aria-label={`Choose pricing plan: ${title}`}>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        {(button_text || buttonText) ?? "Select"}
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </a>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
