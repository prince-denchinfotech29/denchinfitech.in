import React from "react";
import { useCounter } from "@/hooks/useCounter";
import { counters } from "@/data/mockData";

const contactback = "/imges/counter.webp";

const CounterSection: React.FC = () => {
  const countersWithHooks = counters.map(({ icon: Icon, label, target }, index) => {
    const { count, ref } = useCounter(target);
    return { index, Icon, label, count, ref };
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {countersWithHooks.map(({ index, Icon, count, ref, label }) => (
            <div
              key={index}
              ref={ref}
              className="border-t border-b border-white/40 rounded-lg p-6 cursor-default transition-all duration-300 hover:border-t-4 hover:border-b-4 hover:scale-[1.02]"
            >
              <Icon className="h-8 w-8 mx-auto mb-3 text-white" aria-hidden="true" />
              <h2 className="text-3xl font-bold mb-1">{count.toLocaleString()}</h2>
              <p className="text-white/90 text-base">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CounterSection;
