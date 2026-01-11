import React from "react";
import { motion } from "framer-motion";
import { UserPlus, MapPin, Heart } from "lucide-react";

const steps = [
  {
    title: "Register Online",
    description:
      "Create your donor profile in minutes and join a trusted life-saving network.",
    icon: UserPlus,
  },
  {
    title: "Find Nearby Centers",
    description:
      "Locate verified blood donation centers or requests near your area.",
    icon: MapPin,
  },
  {
    title: "Save Lives",
    description:
      "Donate blood and become someone's reason to live another day.",
    icon: Heart,
  },
];

const QuickSteps = () => {
  return (
    <section className="relative py-16 px-6 bg-base-200 overflow-hidden">
     
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(248,113,113,0.15),transparent_60%)]" />

      <div className="max-w-6xl mx-auto text-center mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-primary mb-4"
        >
          Donate Blood in 3 Simple Steps
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-base-content/70 max-w-2xl mx-auto"
        >
          A simple process designed to act fast, stay safe, and save lives.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{
                scale: 1.06,
                boxShadow: "0px 20px 40px rgba(248,113,113,0.25)",
              }}
              className="relative bg-base-100 rounded-3xl p-8 border border-base-300 text-center transition-all"
            >
              
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md">
                {index + 1}
              </div>

              <div className="flex justify-center mb-5 mt-6">
                <Icon className="w-12 h-12 text-primary" />
              </div>

              <h3 className="text-xl font-semibold text-primary mb-2">
                {step.title}
              </h3>

              <p className="text-base-content/70 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default QuickSteps;
