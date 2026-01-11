import { motion } from "framer-motion";

const News = () => {
  return (
    <div className="w-full bg-primary overflow-hidden p-1 mb-3">
      <motion.div
        className="whitespace-nowrap text-primary-content font-semibold text-lg"
        animate={{ x: ["100%", "-100%"] }}
        transition={{
          repeat: Infinity,
          duration: 15,
          ease: "linear",
        }}
      >
        🩸 Donate blood, save lives | Emergency donors needed | Become a hero
        today | Your blood can give someone tomorrow
      </motion.div>
    </div>
  );
};

export default News;