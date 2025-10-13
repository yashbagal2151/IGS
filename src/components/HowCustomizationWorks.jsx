import React from "react";

const StepRow = ({ title, description, Illustration, reverse = false }) => (
  <div
    className={`grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-10 ${
      reverse ? "md:[&>div:first-child]:order-2" : ""
    }`}
  >
    <div>
      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed max-w-[420px]">
        {description}
      </p>
    </div>
    <div className="flex justify-center">
      <div className="w-[340px] h-[220px] md:w-[440px] md:h-[280px] bg-purple-50 rounded-2xl p-6">
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
    <section className="px-4 md:px-15 lg:px-20 py-14">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
          How Customization Works
        </h2>
        <p className="text-xs md:text-sm text-gray-500 mt-2 max-w-md mx-auto">
          From concept to creation, we guide you through every step of bringing
          your vision to life
        </p>
      </div>

      <div className="container mx-auto mt-6 md:mt-10">
        <StepRow
          title="Design & Consult"
          description="Share your unique vision with our design experts. We provide detailed sketches, material options, and a clear consultation to begin your custom artwork."
          Illustration={PeopleIllustration}
        />
        <StepRow
          reverse
          title="Craft & Create"
          description="Master artisans bring your design to life. We use premium materials and time-honored techniques to sculpt and finish your personalized masterpiece with care."
          Illustration={CraftIllustration}
        />
        <StepRow
          title="Quality & Deliver"
          description="Every piece undergoes rigorous quality checks. Your finished masterpiece is carefully packaged for safe, secure delivery right to your door, guaranteed."
          Illustration={DeliverIllustration}
        />
      </div>
    </section>
  );
}
