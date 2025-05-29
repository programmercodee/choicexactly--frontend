import React from 'react';

const AboutUs2 = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Image Background */}
      <div className="relative bg-blue-500 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 opacity-90"></div>
        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Our Journey
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              From a small idea to a thriving t-shirt community
            </p>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-blue-600 text-center mb-16">Our Timeline</h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>

              {/* Timeline Items */}
              <div className="space-y-12">
                <div className="relative flex items-center">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500"></div>
                  <div className="w-1/2 pr-12 text-right">
                    <h3 className="text-xl font-semibold text-blue-600">2020</h3>
                    <p className="text-gray-600">ChoiceXactly was born from a passion for quality t-shirts</p>
                  </div>
                </div>
                <div className="relative flex items-center">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500"></div>
                  <div className="w-1/2 pl-12">
                    <h3 className="text-xl font-semibold text-blue-600">2021</h3>
                    <p className="text-gray-600">Launched our first sustainable collection</p>
                  </div>
                </div>
                <div className="relative flex items-center">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500"></div>
                  <div className="w-1/2 pr-12 text-right">
                    <h3 className="text-xl font-semibold text-blue-600">2022</h3>
                    <p className="text-gray-600">Expanded to international markets</p>
                  </div>
                </div>
                <div className="relative flex items-center">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500"></div>
                  <div className="w-1/2 pl-12">
                    <h3 className="text-xl font-semibold text-blue-600">2023</h3>
                    <p className="text-gray-600">Achieved 100% sustainable production</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-blue-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-blue-600 text-center mb-16">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-blue-200 flex items-center justify-center text-4xl">👨‍💼</div>
              <h3 className="text-xl font-semibold text-blue-600 mb-2">John Smith</h3>
              <p className="text-gray-600 mb-2">Founder & CEO</p>
              <p className="text-gray-500 text-sm">Passionate about sustainable fashion</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-blue-200 flex items-center justify-center text-4xl">👩‍💼</div>
              <h3 className="text-xl font-semibold text-blue-600 mb-2">Sarah Johnson</h3>
              <p className="text-gray-600 mb-2">Creative Director</p>
              <p className="text-gray-500 text-sm">Design enthusiast with 10+ years experience</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-blue-200 flex items-center justify-center text-4xl">👨‍🔬</div>
              <h3 className="text-xl font-semibold text-blue-600 mb-2">Mike Chen</h3>
              <p className="text-gray-600 mb-2">Sustainability Lead</p>
              <p className="text-gray-500 text-sm">Expert in eco-friendly materials</p>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-blue-600 text-center mb-16">Our Impact</h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-500 mb-2">50K+</div>
              <p className="text-gray-600">Happy Customers</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-500 mb-2">100%</div>
              <p className="text-gray-600">Sustainable Materials</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-500 mb-2">15+</div>
              <p className="text-gray-600">Countries Served</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-500 mb-2">1000+</div>
              <p className="text-gray-600">Unique Designs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Join Us Section */}
      <div className="bg-blue-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Join Our Journey</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Be part of a community that values quality, sustainability, and style
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-blue-500 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors duration-300 shadow-lg">
              Shop Now
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-white/10 transition-colors duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs2; 