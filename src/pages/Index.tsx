import { useState } from 'react';
import { motion } from 'framer-motion';
import TabButton from '@/components/TabButton';
import LoginButton from '@/components/LoginButton';
import MapPlaceholder from '@/components/MapPlaceholder';
import bgImage from '@/assets/green-hydrogen-bg.jpg';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'potential' | 'existing'>('potential');

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/50" />
      
      {/* Login Button */}
      <LoginButton />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            Hydroline
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
              Analytics
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto">
            Discover and analyze clean energy sites for sustainable hydrogen production
          </p>
        </motion.div>

        {/* Tab Buttons */}
        <motion.div
          className="flex gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <TabButton
            isActive={activeTab === 'potential'}
            onClick={() => setActiveTab('potential')}
          >
            Potential Sites
          </TabButton>
          <TabButton
            isActive={activeTab === 'existing'}
            onClick={() => setActiveTab('existing')}
          >
            Existing Sites
          </TabButton>
        </motion.div>

        {/* Map Placeholder */}
        <MapPlaceholder />
        
        {/* Footer */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-white/60 text-sm">
            Powered by renewable energy data and advanced analytics
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
