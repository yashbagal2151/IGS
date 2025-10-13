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
  <img src={new URL("../assets/how-people.svg", import.meta.url).href} alt="Design & Consult" className="w-full h-full object-contain" />
);

const CraftIllustration = () => (
  <img src={new URL("../assets/how-craft.svg", import.meta.url).href} alt="Craft & Create" className="w-full h-full object-contain" />
);

const DeliverIllustration = () => (
  <img src={new URL("../assets/how-deliver.svg", import.meta.url).href} alt="Quality & Deliver" className="w-full h-full object-contain" />
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
