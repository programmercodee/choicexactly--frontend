import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    favoriteStyle: 'casual' // New field for t-shirt style preference
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with T-shirt Pattern Background */}
      <div className="relative bg-blue-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 opacity-90"></div>
        {/* T-shirt Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-6 gap-4 h-full">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="flex items-center justify-center">
                <span className="text-4xl">👕</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6 animate-bounce">
              <span className="text-6xl">👕</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Let's Style Together
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              Share your t-shirt dreams with us. We're here to make them real!
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information Section with Fashion Icons */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Contact Card 1 */}
            <div className="bg-blue-50 rounded-xl p-8 text-center shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl mb-4 animate-pulse">🏪</div>
              <h3 className="text-xl font-semibold text-blue-600 mb-2">Visit Our Store</h3>
              <p className="text-gray-600">
                123 Fashion Street<br />
                New York, NY 10001<br />
                <span className="text-blue-500 font-medium">Open for Try-ons!</span>
              </p>
            </div>

            {/* Contact Card 2 */}
            <div className="bg-blue-50 rounded-xl p-8 text-center shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl mb-4 animate-bounce">📱</div>
              <h3 className="text-xl font-semibold text-blue-600 mb-2">Chat With Us</h3>
              <p className="text-gray-600">
                Style Support: +1 (555) 123-4567<br />
                <span className="text-blue-500">style@choicexactly.com</span><br />
                <span className="text-sm text-gray-500">(We respond within 24 hours!)</span>
              </p>
            </div>

            {/* Contact Card 3 */}
            <div className="bg-blue-50 rounded-xl p-8 text-center shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl mb-4 animate-spin">⏰</div>
              <h3 className="text-xl font-semibold text-blue-600 mb-2">Style Hours</h3>
              <p className="text-gray-600">
                Monday - Friday: 9AM - 6PM<br />
                Saturday: 10AM - 4PM<br />
                <span className="text-blue-500">Sunday: Online Only</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section with Style Preferences */}
      <div className="bg-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-center mb-8">
                <span className="text-4xl mb-4 block">🎨</span>
                <h2 className="text-3xl font-bold text-blue-600">Share Your Style</h2>
                <p className="text-gray-600 mt-2">Tell us about your t-shirt dreams!</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-300"
                      placeholder="Style Enthusiast"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-300"
                      placeholder="style@example.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="favoriteStyle" className="block text-gray-700 font-medium mb-2">Your Favorite T-shirt Style</label>
                  <select
                    id="favoriteStyle"
                    name="favoriteStyle"
                    value={formData.favoriteStyle}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-300"
                  >
                    <option value="casual">Casual Classic</option>
                    <option value="graphic">Graphic Tees</option>
                    <option value="vintage">Vintage Style</option>
                    <option value="sustainable">Sustainable Collection</option>
                    <option value="custom">Custom Design</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">What's on your mind?</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-300"
                    placeholder="e.g., Custom Design Inquiry"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-300"
                    placeholder="Tell us about your style vision..."
                    required
                  ></textarea>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Send Your Style Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Style Gallery Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-600 text-center mb-8">Our Style Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {['👕', '🎨', '🌟', '💫'].map((emoji, index) => (
              <div key={index} className="bg-blue-50 rounded-xl p-6 text-center shadow-lg transform hover:scale-105 transition-transform duration-300">
                <div className="text-5xl mb-2">{emoji}</div>
                <p className="text-blue-600 font-medium">Style {index + 1}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Social Media Section with Style Icons */}
      <div className="bg-blue-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Style Community</h2>
          <p className="text-xl text-white/90 mb-8">Follow us for daily style inspiration and exclusive offers!</p>
          <div className="flex justify-center space-x-8">
            <a href="#" className="text-4xl hover:text-blue-200 transition-colors duration-300 transform hover:scale-110">📸</a>
            <a href="#" className="text-4xl hover:text-blue-200 transition-colors duration-300 transform hover:scale-110">👕</a>
            <a href="#" className="text-4xl hover:text-blue-200 transition-colors duration-300 transform hover:scale-110">🎨</a>
            <a href="#" className="text-4xl hover:text-blue-200 transition-colors duration-300 transform hover:scale-110">💫</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;