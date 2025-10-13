import React from "react";

export default function Footer() {
  return (
    <footer className="bg-purple-800 text-white mt-10">
      <div className="px-4 md:px-15 lg:px-20">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 py-10">
          <div>
            <div className="text-sm leading-relaxed opacity-90">
              Crafting beautiful art that brings joy and spirituality into your life. Over 15 years of traditional craftsmanship with meticulous attention.
            </div>
            <div className="mt-4 space-y-1 text-sm opacity-90">
              <div>Ahmednagar, Maharashtra, India</div>
              <div>+91 888 888 8888</div>
              <div>igs@example.com</div>
            </div>
          </div>
          <div>
            <div className="font-semibold mb-2">Company</div>
            <ul className="space-y-1 text-sm opacity-90">
              <li>About us</li>
              <li>Customization</li>
              <li>Corporate Gifting</li>
              <li>Blog</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2">Categories</div>
            <ul className="space-y-1 text-sm opacity-90">
              <li>God Statues</li>
              <li>Motivational Statues</li>
              <li>Corporate Gifts</li>
              <li>Home Decor</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2">Support</div>
            <ul className="space-y-1 text-sm opacity-90">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Shipping Policy</li>
              <li>Refund Policy</li>
              <li>Help Center</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-purple-700">
        <div className="px-4 md:px-15 lg:px-20">
          <div className="container mx-auto py-3 text-xs opacity-80">© 2024 Ishita Gallery, all rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
