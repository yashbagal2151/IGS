import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#651A9E] text-white mt-16">
      <div className="px-4 md:px-15 lg:px-20">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 py-14">
          <div>
            <div className="text-2xl font-semibold">ISHITA
              <span className="ml-2 font-normal">GALLERY</span>
            </div>
            <p className="mt-6 text-base leading-7 max-w-xl opacity-90">
              Crafting beautiful, meaningful statues that bring art and spirituality into your life. Over 15 years of traditional craftsmanship with modern excellence
            </p>
            <div className="mt-8 space-y-3 text-sm opacity-90">
              <div className="flex items-center gap-3"><span>📍</span> Andheri West, Mumbai, Maharashtra</div>
              <div className="flex items-center gap-3"><span>📞</span> +91 987 654 3210</div>
              <div className="flex items-center gap-3"><span>✉️</span> info@ishitagallery.com</div>
            </div>
          </div>
          <div>
            <div className="font-semibold text-lg mb-4">Company</div>
            <ul className="space-y-3 text-sm opacity-90">
              <li>About Us</li>
              <li>Corporate Gifting</li>
              <li>Customization</li>
              <li>Blog</li>
              <li>FAQ</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-lg mb-4">Categories</div>
            <ul className="space-y-3 text-sm opacity-90">
              <li>God Statues</li>
              <li>Motivational Statues</li>
              <li>Custom Orders</li>
              <li>Corporate Gifts</li>
              <li>Home Decor</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-lg mb-4">Support</div>
            <ul className="space-y-3 text-sm opacity-90">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Shipping Policy</li>
              <li>Return Policy</li>
              <li>Help Center</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/20">
        <div className="px-4 md:px-15 lg:px-20">
          <div className="container mx-auto py-4 flex items-center justify-between text-sm opacity-90">
            <div>© 2024 Ishita Gallery. All rights reserved.</div>
            <div className="flex items-center gap-3 text-lg">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-white/40">f</span>
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-white/40">◎</span>
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-white/40">𝕏</span>
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-white/40">in</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
