import React from "react";
import { motion } from "framer-motion";
import { HeartHandshake, Hospital, ShieldCheck } from "lucide-react";

const impacts = [
  {
    icon: HeartHandshake,
    title: "Lives Connected",
    desc: "Thousands of donors and patients have been connected through RedHope during critical moments.",
  },
  {
    icon: Hospital,
    title: "Hospitals Supported",
    desc: "We collaborate with hospitals and volunteers to ensure blood reaches those who need it most.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Verified",
    desc: "Every request and donor goes through verification to maintain safety and trust across the platform.",
  },
];

const Impact = () => {
  return (
    <section className="relative py-16 bg-base-100 overflow-hidden">
      
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(248,113,113,0.12),transparent_60%)]" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-4xl font-bold text-primary text-center mb-4"
        >
          Our Impact in the Community
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center text-base-content/70 max-w-2xl mx-auto mb-12"
        >
          RedHope is more than a platform. It is a growing community built to
          respond fast, act responsibly, and save lives together.
        </motion.p>

        <div className="grid gap-8 md:grid-cols-3">
          {impacts.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 15px 35px rgba(248,113,113,0.25)",
              }}
              className="relative bg-base-200/70 backdrop-blur-md border border-base-300 rounded-3xl p-8 text-center shadow-sm hover:bg-base-200/90 transition-all"
            >
              
              <div className="flex justify-center mb-4">
                <div className="bg-base-100 p-4 rounded-full border border-base-300 shadow-md">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
              </div>

              <h3 className="text-xl font-semibold text-primary mb-3">
                {item.title}
              </h3>

              <p className="text-base-content/70 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

       
        <div className="mt-20 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>
    </section>
  );
};

export default Impact;
