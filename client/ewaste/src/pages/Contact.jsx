import React, { useState } from 'react';
import Swal from 'sweetalert2'; // ✅ IMPORT SWEETALERT FOR POPUP MESSAGES

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  // Removed [messageStatus, setMessageStatus] state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Basic client-side validation
    if (!formData.name || !formData.email || !formData.message) {
      // ✅ SWEETALERT FOR VALIDATION ERROR
      Swal.fire({
          icon: 'warning',
          title: 'Validation Failed',
          text: 'Please fill in all fields.',
          confirmButtonColor: '#FBBF24' // Tailwind Yellow-400 equivalent
      });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/contact', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        // If the backend returns a non-200 status (even if data saved, email failed)
        throw new Error(data.message || 'Failed to process message (Check server logs for details).');
      }

      // ✅ SWEETALERT FOR SUCCESS
      Swal.fire({
          icon: 'success',
          title: 'Message Sent!',
          text: 'Your message has been saved to the database. We will get back to you soon.',
          confirmButtonColor: '#10B981' // Tailwind Green-500 equivalent
      });
      
      // Reset form on success
      setFormData({ name: '', email: '', message: '' });

    } catch (err) {
      console.error('Submission error:', err);
      // ✅ SWEETALERT FOR API FAILURE
      Swal.fire({
          icon: 'error',
          title: 'Submission Error',
          text: `Failed to send message: ${err.message}`,
          confirmButtonColor: '#EF4444' // Tailwind Red-500 equivalent
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <h2 className="text-4xl font-bold text-green-700 mb-4 text-center">
        Get In Touch
      </h2>
      <p className="text-gray-600 mb-10 text-center">
        We're here to help with any questions about e-waste disposal, community exchange, or technical support.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Contact Information Section (Unchanged) */}
        <div className="p-6 bg-green-50 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-green-800 mb-4">
            Our Details
          </h3>
          <div className="space-y-4 text-left">
            <p className="flex items-center text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              **Email:** support@ewasteexchange.com
            </p>
            <p className="flex items-center text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              **Phone:** +91 98765 43210
            </p>
            <p className="flex items-start text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              **Address:** 123 Green Lane, Eco-City, Bengaluru, India
            </p>
          </div>
        </div>

        {/* Contact Form Section (Updated with functionality) */}
        <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200">
          <h3 className="text-2xl font-semibold text-green-700 mb-4">
            Send Us a Message
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              type="text" 
              name="name"
              placeholder="Your Name" 
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input 
              type="email" 
              name="email"
              placeholder="Your Email" 
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>

            {/* REMOVED: The old {messageStatus && ...} block is removed */}

            <button 
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-md font-semibold transition ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {loading ? "Sending..." : "Submit Message"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;