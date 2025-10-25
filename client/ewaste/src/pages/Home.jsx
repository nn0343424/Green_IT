import React, { useState } from "react";
import heroImage from "../assets/electronic.png";

const Home = () => {
  // 1. STATE: 'value' field is removed. 'image' field holds the Base64 string.
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    product: "",
    condition: "",
    location: "",
    image: "",
    message: "",
  });

  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form inputs (for all text fields)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // NEW FUNCTION: Handles file upload and conversion to Base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Set the Base64 string to the image field
        setFormData({ ...formData, image: reader.result });
      };
      // Read the file as a Base64 encoded string
      reader.readAsDataURL(file);
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to submit");

      const data = await res.json();
      alert("✅ Your e-waste product has been submitted!");
      console.log("Saved item:", data);

      // UPDATED RESET: Only resets the existing fields
      setFormData({
        name: "",
        email: "",
        product: "",
        condition: "",
        location: "",
        image: "",
        message: "",
      });
      setSuggestion("");
    } catch (err) {
      console.error(err);
      alert("❌ Error submitting your form. Please try again.");
    }
  };

  // AI Description generator (API call to backend - logic remains the same)
  const generateAIDescription = async () => {
    if (!formData.product || !formData.condition) {
      alert("Please fill in product name and condition first.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        "http://localhost:5000/api/ai/generate-description",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            product: formData.product,
            condition: formData.condition,
            location: formData.location,
            message: formData.message,
          }),
        }
      );
      const data = await res.json();
      if (res.ok && data.description) {
        setFormData({ ...formData, message: data.description });
      } else {
        alert(data.message || "No AI description received.");
      }
    } catch (error) {
      console.error("Error generating AI description:", error);
      alert("Failed to generate AI suggestion.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center text-center">
      {/* HERO SECTION - JSX is unchanged */}
      <section className="w-full bg-green-50 py-12 px-6 md:px-20 flex flex-col md:flex-row items-center justify-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-4">
            Recycle. Reuse. Rebuild.
          </h1>
          <p className="text-gray-700 text-lg mb-6">
            Join our E-Waste Community Exchange — donate, exchange, or recycle
            electronics responsibly with the help of smart AI suggestions.
          </p>
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition">
            Learn More
          </button>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img
            src={heroImage}
            alt="E-waste Recycling"
            // ✅ CHANGED: Reduced the width classes
            // w-1/2 means 50% width on small screens
            // md:w-1/3 means 33.3% width on medium screens and up
            className="rounded-lg shadow-lg w-1/2 md:w-1/3"
          />
        </div>
      </section>

      {/* HOW IT WORKS - JSX is unchanged */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-green-700 mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-green-600">
              1️⃣ Post Your Item
            </h3>
            <p className="text-gray-600">
              Upload details about your unused or broken electronic items that
              you want to recycle or donate.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-green-600">
              2️⃣ Get AI Suggestions
            </h3>
            <p className="text-gray-600">
              Our AI helper will suggest eco-friendly disposal or reuse options
              for your e-waste item.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-green-600">
              3️⃣ Recycle & Earn
            </h3>
            <p className="text-gray-600">
              Recycle responsibly and earn community points or recognition for
              contributing to a greener planet.
            </p>
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="py-16 px-6 w-full bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-green-700 mb-2">
            Submit Your E-Waste ♻️
          </h2>
          <p className="text-gray-600 mb-6">
            Enter your product details below.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            {/* Name & Email - JSX is unchanged */}
            <div className="grid md:grid-cols-2 gap-5">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="peer w-full border-b-2 border-gray-300 py-2 placeholder-transparent focus:outline-none focus:border-green-500"
                  placeholder="Your Name"
                />
                <label className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-green-700">
                  Your Name
                </label>
              </div>

              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="peer w-full border-b-2 border-gray-300 py-2 placeholder-transparent focus:outline-none focus:border-green-500"
                  placeholder="Your Email"
                />
                <label className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-green-700">
                  Your Email
                </label>
              </div>
            </div>

            {/* Product Name - JSX is unchanged */}
            <div className="relative mb-5">
              <input
                type="text"
                name="product"
                value={formData.product}
                onChange={handleChange}
                required
                className="peer w-full border-b-2 border-gray-300 py-2 placeholder-transparent focus:outline-none focus:border-green-500"
                placeholder="Product Name / Type"
              />
              <label className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-green-700">
                Product Name / Type
              </label>
            </div>

            {/* ✅ ONLY FILE INPUT REMAINS */}
            <div className="mt-5">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Image (Browse File)
              </label>
              <input
                type="file"
                name="imageFile"
                onChange={handleImageChange}
                accept="image/*"
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
              />
            </div>
            {/* END OF IMAGE FILE INPUT */}

            {suggestion && (
              <p className="mt-3 bg-green-100 p-3 rounded text-green-800 text-sm border border-green-200">
                {suggestion}
              </p>
            )}

            {/* Condition + Location - JSX is unchanged */}
            <div className="grid md:grid-cols-2 gap-5 mt-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Condition
                </label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select condition</option>
                  <option value="working">Working</option>
                  <option value="partially working">Partially Working</option>
                  <option value="not working">Not Working</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Your City / Area"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Message / AI Buttons - JSX is unchanged */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 mt-4">
                Additional Details
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Describe your item or pickup instructions..."
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>
              {/* AI Buttons */}
              <div className="grid md:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={generateAIDescription}
                  className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
                >
                  {loading ? "Generating..." : "Generate AI Description 🤖"}
                </button>
              </div>
            </div>

            {/* Submit - JSX is unchanged */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition"
            >
              Submit E-Waste
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
