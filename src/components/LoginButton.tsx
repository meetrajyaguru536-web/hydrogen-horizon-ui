import { motion } from 'framer-motion';
import { User } from 'lucide-react';

const LoginButton = () => {
  return (
    <motion.button
      className="fixed top-6 right-6 z-50 px-6 py-3 rounded-full font-semibold
                 bg-gradient-button text-white shadow-button
                 backdrop-blur-md border border-white/20
                 hover:shadow-glow transition-all duration-300
                 flex items-center gap-2"
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 0 30px hsl(var(--hydrogen-primary) / 0.4)"
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <User size={18} />
      Login
    </motion.button>
  );
};

export default LoginButton;