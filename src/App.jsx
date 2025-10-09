import React from "react";
import RoutesMap from "./routes";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="px-4 md:px-15 lg:px-20">
        <Home />
      <div className="container py-6">
        <RoutesMap />
      </div>
      </div>
      
    </div>
  );
}
