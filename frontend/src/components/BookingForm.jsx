import React, { useState } from "react";
import axios from "axios";

export default function BookingForm({ destinationSlug, destinationName }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    try {
      // If your backend expects a tour name or ID, adjust 'tour' accordingly
      await axios.post("http://localhost:5000/api/bookings", {
        name: form.name,
        email: form.email,
        bookingDate: form.date,
        tour: destinationName, // Or pass an ID if that's what your backend expects
      });
      setStatus("Booking successful! We'll contact you soon.");
      setForm({ name: "", email: "", date: "" });
    } catch (err) {
      setStatus(
        err.response?.data?.msg ||
          "Booking failed. Please check your info and try again."
      );
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-xl max-w-lg mx-auto p-8 flex flex-col gap-6 mt-10"
    >
      <h2 className="text-2xl font-bold text-blue-700 mb-2 text-center">
        Book {destinationName}
      </h2>
      <div className="flex flex-col gap-2">
        <label className="font-medium text-gray-700">Full Name</label>
        <input
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-medium text-gray-700">Email Address</label>
        <input
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-medium text-gray-700">Travel Date</label>
        <input
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-700 hover:bg-blue-800 transition text-white font-semibold px-6 py-3 rounded shadow mt-2"
      >
        {loading ? "Booking..." : `Book ${destinationName}`}
      </button>
      {status && (
        <div
          className={`text-center text-sm mt-2 ${
            status.includes("successful") ? "text-green-600" : "text-red-600"
          }`}
        >
          {status}
        </div>
      )}
    </form>
  );
}