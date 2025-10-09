import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import art1 from "../assets/art1.jpg";
import art2 from "../assets/art2.jpg";
import art3 from "../assets/art3.jpg";

const stripePromise = loadStripe("YOUR_STRIPE_PUBLIC_KEY");

const SlideshowStripe = () => {
  const slides = [
    {
      id: 1,
      title: "Timeless Figures",
      description: "Inspiring art to drive ambition and focus.",
      price: 5000, // in cents ($50)
      image: art1,
    },
    {
      id: 2,
      title: "Visionary Art",
      description: "Boost creativity and focus.",
      price: 4000, // $40
      image: art2,
    },
    {
      id: 3,
      title: "Motivational Sculpture",
      description: "A piece to keep you inspired.",
      price: 6000, // $60
      image: art3,
    },
  ];

  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handleCheckout = async (slide) => {
    const stripe = await stripePromise;

    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product: slide }),
    });

    const session = await response.json();
    await stripe.redirectToCheckout({ sessionId: session.id });
  };

  // ✅ Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000); // change every 3 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, [slides.length]);

  const slide = slides[current];

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg max-w-dvw max-h-dvh mx-auto">
      <img
        src={slide.image}
        alt={slide.title}
        className="w-full h-full object-cover transition-all duration-700 ease-in-out"
      />
      <div className="absolute top-6 left-6 text-white">
        <h4 className="text-lg font-semibold drop-shadow">{slide.title}</h4>
        <p className="text-sm opacity-90 drop-shadow">{slide.description}</p>

      </div>

      {/* Slider Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
      >
        ←
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
      >
        →
      </button>
    </div>
  );
};

export default SlideshowStripe;
