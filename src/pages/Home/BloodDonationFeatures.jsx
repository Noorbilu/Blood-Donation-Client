import React, { useState } from "react";
import { Link } from "react-router";

const featuresData = [
  {
    question: "How does blood donation work?",
    answer:
      "Blood donation involves a simple process where a donor's blood is collected safely and stored for patients in need. The process is quick, and the entire experience is designed to be comfortable and safe for donors.",
  },
  {
    question: "Is it safe to donate blood?",
    answer:
      "Yes, donating blood is a safe procedure. All equipment is sterile and used once. Trained medical professionals ensure your safety throughout the process.",
  },
  {
    question: "Who can donate blood?",
    answer:
      "Generally, healthy adults aged 18-65 can donate blood. Donors must meet certain health criteria and weight requirements to ensure safety.",
  },
  {
    question: "How often can I donate blood?",
    answer:
      "Most donors can donate whole blood every 8 weeks. Plasma and platelet donations have different intervals. It’s important to follow guidelines for safe donation frequency.",
  },
  {
    question: "What are the benefits of donating blood?",
    answer:
      "Donating blood helps save lives, supports community health, and can provide health benefits for the donor, such as improved cardiovascular health.",
  },
];

const BloodDonationFeatures = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFeature = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-20 px-6 bg-base-200">
      <div className="max-w-6xl mx-auto text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          Blood Donation Features
        </h2>
        <p className="text-base-content/70 max-w-2xl mx-auto">
          Learn more about the key aspects and benefits of blood donation.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {featuresData.map((feature, index) => (
          <div
            key={index}
            className="bg-base-100 rounded-2xl shadow-md border border-base-300"
          >
            <button
              onClick={() => toggleFeature(index)}
              className="w-full flex justify-between items-center p-4 focus:outline-none"
            >
              <span className="text-base-content font-medium">
                {feature.question}
              </span>

              <span
                className={`text-xl font-bold text-primary transition-transform ${
                  openIndex === index ? "rotate-0" : "rotate-0"
                }`}
              >
                {openIndex === index ? "−" : "+"}
              </span>
            </button>

            {openIndex === index && (
              <div className="p-4 pt-0 text-base-content/70 border-t border-base-300">
                {feature.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link to='/about'>
        <button className="btn btn-primary rounded-3xl px-6">
          See More About Us
        </button>
        </Link>
      </div>
    </section>
  );
};

export default BloodDonationFeatures;