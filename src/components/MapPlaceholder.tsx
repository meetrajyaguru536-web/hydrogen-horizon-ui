import { motion } from 'framer-motion';
import { Map } from 'lucide-react';

const MapPlaceholder = () => {
  return (
    <motion.div
      className="w-full max-w-4xl h-96 rounded-2xl
                 bg-gradient-glass backdrop-blur-xl border border-white/20
                 shadow-glass flex items-center justify-center
                 text-white/70"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="mb-4 inline-block"
        >
          <Map size={48} />
        </motion.div>
        <h3 className="text-xl font-semibold mb-2">Map Visualization</h3>
        <p className="text-sm opacity-70">Interactive map will be integrated here</p>
      </div>
    </motion.div>
  );
};

export default MapPlaceholder;