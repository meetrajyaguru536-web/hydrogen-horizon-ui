import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TabButtonProps {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

const TabButton = ({ children, isActive, onClick, className }: TabButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "relative px-8 py-4 rounded-full font-semibold transition-all duration-300",
        "backdrop-blur-md border border-white/20",
        "text-white hover:scale-105 hover:shadow-glow",
        isActive 
          ? "bg-gradient-button shadow-button" 
          : "bg-white/10 hover:bg-white/20",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-button -z-10"
          layoutId="activeTab"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </motion.button>
  );
};

export default TabButton;