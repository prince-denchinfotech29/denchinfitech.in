import React from "react";
import { useCounter } from "@/hooks/useCounter";
import { counters } from "@/data/mockData";

const contactback = "/imges/counter.webp";


interface CounterItem {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement> & { className?: string }>;
  label: string;
  target: number;
}

const CounterSection: React.FC = () => {
  // Map counters with hooks, typing the icon component properly
  const countersWithHooks = counters.map(({ icon: IconComponent, label, target }, index) => {
    const { count, ref } = useCounter(target);
    return { index, IconComponent, label, count, ref };
  });

  return (
    <section
      className="py-20 text-white relative"
      style={{
        backgroundImage: `linear-gradient(rgba(32, 77, 90, 0.8), rgba(32, 77, 90, 0.8)), url(${contactback})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {countersWithHooks.map(({ index, IconComponent, count, ref, label }) => (
            <div
              key={index}
              ref={ref}
              className="border-t border-b border-white rounded-lg p-6 cursor-default transition-all duration-400 hover:border-t-4 hover:border-b-4"
            >
              <IconComponent className="h-8 w-8 mx-auto mb-4" />
              <h2 className="text-4xl font-bold mb-2">{count.toLocaleString()}</h2>
              <p className="text-lg">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CounterSection;
