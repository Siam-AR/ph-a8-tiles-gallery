"use client";

import {
  FaGem,
  FaLeaf,
  FaShieldAlt,
  FaTruck,
} from "react-icons/fa";

const WhyChooseTiles = () => {
  const features = [
    {
      id: 1,
      icon: <FaGem size={30} />,
      title: "Premium Quality",
      description:
        "Crafted with durable materials and elegant finishes for long-lasting beauty.",
    },
    {
      id: 2,
      icon: <FaLeaf size={30} />,
      title: "Eco Friendly",
      description:
        "Sustainable tile collections designed with environmentally friendly processes.",
    },
    {
      id: 3,
      icon: <FaShieldAlt size={30} />,
      title: "Water Resistant",
      description:
        "Perfect for kitchens and bathrooms with high durability and moisture protection.",
    },
    {
      id: 4,
      icon: <FaTruck size={30} />,
      title: "Fast Delivery",
      description:
        "Quick and secure delivery service for all your interior design projects.",
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose Our Tiles
          </h2>

          <p className="text-gray-500 max-w-2xl mx-auto">
            Discover premium tile collections designed for modern interiors,
            combining durability, elegance, and timeless aesthetics.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="border rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white"
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center mb-6">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseTiles;