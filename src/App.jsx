import React from "react";
import RoutesMap from "./routes";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Home />
      <div className="container py-6">
        <RoutesMap />
      </div>
    </div>
  );
}
