"use client";
import { useState } from "react";
import emailjs from "emailjs-com";

export default function Section21() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Sending...");

    emailjs
      .send(
        "YOUR_SERVICE_ID",   // from EmailJS dashboard
        "YOUR_TEMPLATE_ID",  // from EmailJS dashboard
        form,
        "YOUR_PUBLIC_KEY"    // from EmailJS account
      )
      .then(
        () => {
          setStatus("Message sent successfully ✅");
          setForm({ name: "", email: "", message: "" });
        },
        (error) => {
          console.error(error);
          setStatus("Failed to send ❌ Try again later.");
        }
      );
  };

  return (
    <section className="w-full max-w-lg mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-gray-900 p-6 rounded-2xl shadow-lg"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          value={form.name}
          onChange={handleChange}
          className="p-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none"
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          value={form.email}
          onChange={handleChange}
          className="p-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none"
        />

        <textarea
          name="message"
          rows="5"
          placeholder="Your Message"
          required
          value={form.message}
          onChange={handleChange}
          className="p-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition"
        >
          Send Message
        </button>

        {status && (
          <p className="text-center text-sm text-gray-300 mt-2">{status}</p>
        )}
      </form>
    </section>
  );
}
