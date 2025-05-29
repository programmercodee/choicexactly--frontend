import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section - Blue Background with Animated Pattern */}
      <div className="relative bg-blue-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 opacity-90"></div>
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-6 gap-4 h-full">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="flex items-center justify-center"
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                <span className="text-4xl">👕</span>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div
          className="relative container mx-auto px-4 py-16"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-6"
            >
              <span className="text-6xl">👕</span>
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
              About ChoiceXactly
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Where Style Meets Comfort: Crafting Premium T-Shirts for Every Occasion
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Main Content - White Background */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-16">
          {/* Story Section */}
          <motion.div
            className="bg-blue-50 rounded-2xl p-8 mb-12 shadow-lg transform hover:scale-[1.02] transition-transform duration-300"
            whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-semibold text-blue-600 mb-6 flex items-center">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="mr-3"
              >
                ✨
              </motion.span>
              Our Story
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Founded with a passion for quality and style, ChoiceXactly emerged from a simple idea:
              to create t-shirts that people love to wear every day. We believe that the perfect t-shirt
              should combine exceptional comfort, sustainable materials, and timeless design. Our journey
              began with a small collection of premium basics and has grown into a beloved brand that
              celebrates individuality and quality craftsmanship.
            </p>
          </motion.div>

          {/* Mission & Values */}
          <motion.div
            className="grid md:grid-cols-2 gap-8 mb-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-blue-50 rounded-2xl p-8 shadow-lg transform hover:scale-[1.02] transition-transform duration-300"
              variants={fadeInUp}
              whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              <h2 className="text-3xl font-semibold text-blue-600 mb-6">Our Mission</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                To revolutionize the t-shirt industry by creating sustainable, high-quality apparel
                that empowers self-expression while maintaining ethical production practices. We strive
                to be the go-to choice for conscious consumers who value both style and sustainability.
              </p>
            </motion.div>
            <motion.div
              className="bg-blue-50 rounded-2xl p-8 shadow-lg transform hover:scale-[1.02] transition-transform duration-300"
              variants={fadeInUp}
              whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              <h2 className="text-3xl font-semibold text-blue-600 mb-6">Our Values</h2>
              <ul className="space-y-4 text-gray-700 text-lg">
                {[
                  { icon: "✨", text: "Quality First" },
                  { icon: "🌱", text: "Sustainable Practices" },
                  { icon: "🤝", text: "Ethical Production" },
                  { icon: "💡", text: "Innovation" },
                  { icon: "❤️", text: "Customer Satisfaction" }
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <motion.span
                      className="mr-2 text-blue-500"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                    >
                      {item.icon}
                    </motion.span>
                    {item.text}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Timeline Section */}
          <motion.div
            className="bg-white py-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold text-blue-600 text-center mb-16">Our Timeline</h2>
              <div className="max-w-4xl mx-auto">
                <div className="relative">
                  <motion.div
                    className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"
                    initial={{ height: 0 }}
                    whileInView={{ height: "100%" }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                  />

                  {/* Timeline Items */}
                  <div className="space-y-12">
                    {[
                      { year: "2020", text: "ChoiceXactly was born from a passion for quality t-shirts", position: "right" },
                      { year: "2021", text: "Launched our first sustainable collection", position: "left" },
                      { year: "2022", text: "Expanded to international markets", position: "right" },
                      { year: "2023", text: "Achieved 100% sustainable production", position: "left" }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="relative flex items-center"
                        initial={{ opacity: 0, x: item.position === "left" ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                        viewport={{ once: true }}
                      >
                        <motion.div
                          className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500"
                          whileHover={{ scale: 1.5 }}
                        />
                        <div className={`w-1/2 ${item.position === "left" ? "pl-12" : "pr-12 text-right"}`}>
                          <h3 className="text-xl font-semibold text-blue-600">{item.year}</h3>
                          <p className="text-gray-600">{item.text}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Why Choose Us */}
          <motion.div
            className="bg-blue-50 rounded-2xl p-8 mb-12 shadow-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-semibold text-blue-600 mb-6">Why Choose ChoiceXactly?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: "👕", title: "Premium Quality", text: "Crafted from the finest materials for unmatched comfort and durability" },
                { icon: "🌍", title: "Eco-Friendly", text: "Sustainable practices and materials that respect our planet" },
                { icon: "🎨", title: "Unique Designs", text: "Stand out with our exclusive, trend-setting designs" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 bg-white rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300"
                  whileHover={{ y: -10 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="text-4xl mb-4 text-blue-500"
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    {item.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold text-blue-600 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="bg-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.4), 0 10px 10px -5px rgba(59, 130, 246, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Our Collection
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;