import React from "react";

const Step = ({ title, children, Illustration }) => (
  <div className="flex flex-col md:flex-row items-center gap-6 py-8">
    <div className="flex-1">
      <h3 className="text-sm font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-xs text-gray-600 leading-relaxed max-w-md">{children}</p>
    </div>
    <div className="flex-1 flex justify-center">
      <div className="w-64 h-40 md:w-72 md:h-48">
        <Illustration />
      </div>
    </div>
  </div>
);

const PeopleIllustration = () => (
  <svg viewBox="0 0 200 130" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="190" height="120" rx="12" className="fill-purple-50" />
    <circle cx="70" cy="70" r="20" className="fill-purple-200" />
    <circle cx="130" cy="70" r="20" className="fill-purple-300" />
    <path d="M60 95c8-6 20-6 28 0" className="stroke-purple-400" strokeWidth="3" />
    <path d="M120 95c8-6 20-6 28 0" className="stroke-purple-500" strokeWidth="3" />
  </svg>
);

const CraftIllustration = () => (
  <svg viewBox="0 0 200 130" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="190" height="120" rx="12" className="fill-purple-50" />
    <rect x="70" y="40" width="60" height="50" rx="6" className="fill-purple-200" />
    <path d="M70 80h60" className="stroke-purple-400" strokeWidth="3" />
    <circle cx="100" cy="65" r="10" className="fill-purple-400" />
  </svg>
);

const DeliverIllustration = () => (
  <svg viewBox="0 0 200 130" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="190" height="120" rx="12" className="fill-purple-50" />
    <rect x="40" y="65" width="120" height="25" rx="6" className="fill-purple-300" />
    <circle cx="70" cy="95" r="8" className="fill-purple-500" />
    <circle cx="140" cy="95" r="8" className="fill-purple-500" />
  </svg>
);

export default function HowCustomizationWorks() {
  return (
    <section className="px-4 md:px-15 lg:px-20 py-10">
      <div className="container mx-auto text-center">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900">How Customization Works</h2>
        <p className="text-[11px] text-gray-500 mt-1">From concept to creation, we guide you through every step of bringing your idea to life.</p>
      </div>

      <div className="container mx-auto mt-8">
        <Step title="Design & Consult" Illustration={PeopleIllustration}>
          Share your concept, work with our design experts, we provide detailed material suggestions, and a clear consultation to align your desired artwork.
        </Step>
        <Step title="Craft & Create" Illustration={CraftIllustration}>
          Master artisans bring your design to life. We use premium materials, hand-finishing, and care to sculpt your statue from your personalized instructions.
        </Step>
        <Step title="Quality & Deliver" Illustration={DeliverIllustration}>
          Every piece undergoes rigorous quality checks. Your finished artwork is carefully packed for safe, reliable delivery right to your doorstep, nationwide.
        </Step>
      </div>
    </section>
  );
}
