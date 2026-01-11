import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Rahim",
    role: "Blood Donor",
    quote:
      "RedHope made it incredibly easy to find people who needed help. I now donate regularly without hesitation.",
  },
  {
    name: "Sohana",
    role: "Blood Recipient",
    quote:
      "During an emergency, RedHope connected us with a donor within minutes. It truly saved my life.",
  },
];

const highlights = [
  { label: "Successful Matches", value: "12,000+" },
  { label: "Emergency Responses", value: "4,500+" },
  { label: "Verified Donors", value: "8,000+" },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-base-200">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-4xl font-bold text-primary mb-12"
        >
          Trusted by the Community
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Big Highlights */}
          <div className="space-y-8">
            {highlights.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="border-l-4 border-primary pl-6"
              >
                <div className="text-4xl font-extrabold text-primary">
                  {item.value}
                </div>
                <div className="text-base-content/70">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Human Stories */}
          <div className="space-y-8">
            {testimonials.map((t, i) => (
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="bg-base-100 border border-base-300 rounded-xl p-6"
              >
                <p className="text-lg italic text-base-content/80 leading-relaxed">
                  “{t.quote}”
                </p>
                <footer className="mt-4 text-sm font-medium text-primary">
                  — {t.name}, {t.role}
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
