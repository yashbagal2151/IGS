import React from "react";

export default function Testimonials({ items = [] }) {
  // simple horizontal scroll (snap) - 4/2/1 per viewport
  return (
    <section className="bg-purple-50 py-10">
      <div className="px-4 md:px-15 lg:px-20">
        <div className="container mx-auto">
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Experiences Shared by Our Clients</h2>
              <p className="text-xs text-gray-600">Hear from satisfied customers who have trusted Ishita Gallery. Real stories with real details.</p>
            </div>
            <a href="#" className="text-xs bg-purple-700 text-white px-3 py-1 rounded">view all</a>
          </div>
          <div className="overflow-x-auto snap-x snap-mandatory flex gap-4 pb-4">
            {items.map((t, idx) => (
              <div key={idx} className="snap-start min-w-[85%] sm:min-w-[48%] lg:min-w-[23%] bg-white rounded-lg shadow p-4">
                <div className="flex items-center gap-2 mb-2">
                  <img src={t.avatar} alt={t.name} className="w-6 h-6 rounded-full" />
                  <div className="text-sm font-medium">{t.name}</div>
                </div>
                <p className="text-xs text-gray-600 line-clamp-5 mb-3">{t.text}</p>
                <div className="text-yellow-500 text-sm">{"★".repeat(t.stars || 5)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
