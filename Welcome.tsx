import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Welcome() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-6 relative overflow-hidden bg-[#0F172A]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 text-center flex flex-col items-center"
      >
        <div className="w-24 h-24 bg-gradient-to-tr from-[#F97316] to-[#EA580C] rounded-3xl rotate-12 flex items-center justify-center mb-8 shadow-2xl">
          <span className="text-[#F1F5F9] font-bold text-4xl -rotate-12">S2C</span>
        </div>
        <h1 className="text-4xl font-black text-[#F1F5F9] tracking-tight mb-3">
          S2C Connect
        </h1>
        <p className="text-[#94A3B8] text-lg mb-12 italic font-serif">
          Match. Play. Connect.
        </p>
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 p-6 z-10 w-full max-w-md mx-auto bg-gradient-to-t from-[#0F172A] to-transparent pt-20">
        <Link
          to="/onboarding"
          className="w-full flex items-center justify-center bg-[#F97316] text-[#F1F5F9] font-bold py-4 rounded-full transition-colors hover:bg-[#EA580C] active:scale-95"
        >
          Bắt đầu ngay
        </Link>
      </div>
    </div>
  );
}
