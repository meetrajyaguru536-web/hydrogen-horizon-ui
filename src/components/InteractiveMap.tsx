import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Zap, Factory } from 'lucide-react';
import { existingSites, potentialSites, type HydrogenSite } from '@/data/hydrogenSites';

interface InteractiveMapProps {
  activeTab: 'potential' | 'existing';
}

const InteractiveMap = ({ activeTab }: InteractiveMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedSite, setSelectedSite] = useState<HydrogenSite | null>(null);
  
  const sitesToShow = activeTab === 'potential' ? potentialSites : existingSites;
  const markerColor = activeTab === 'potential' ? 'bg-emerald-500' : 'bg-red-500';
  const markerIcon = activeTab === 'potential' ? Zap : Factory;

  // India bounds for the map view
  const indiaBounds = {
    north: 37.6,
    south: 6.4,
    east: 97.25,
    west: 68.7
  };

  const getMarkerPosition = (site: HydrogenSite) => {
    // Convert lat/lng to percentage position within India bounds
    const x = ((site.longitude - indiaBounds.west) / (indiaBounds.east - indiaBounds.west)) * 100;
    const y = ((indiaBounds.north - site.latitude) / (indiaBounds.north - indiaBounds.south)) * 100;
    
    // Clamp values to ensure markers stay within bounds
    return {
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y))
    };
  };

  return (
    <motion.div
      className="w-full max-w-6xl h-[600px] rounded-2xl
                 bg-gradient-glass backdrop-blur-xl border border-white/20
                 shadow-glass relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Map Background - India Outline */}
      <div 
        ref={mapRef}
        className="w-full h-full relative bg-gradient-to-br from-blue-900/20 to-green-900/20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M20,20 L80,20 L80,80 L20,80 Z' fill='none' stroke='%23ffffff20' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '50px 50px'
        }}
      >
        {/* India Map Silhouette */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-80 h-96 relative">
            {/* Simplified India shape */}
            <div className="absolute inset-0 bg-white/5 rounded-lg border border-white/10" 
                 style={{
                   clipPath: 'polygon(30% 10%, 70% 15%, 85% 30%, 90% 60%, 80% 85%, 60% 90%, 40% 85%, 20% 70%, 15% 40%, 25% 20%)'
                 }}>
            </div>
          </div>
        </div>

        {/* Site Markers */}
        {sitesToShow.map((site, index) => {
          const position = getMarkerPosition(site);
          const Icon = markerIcon;
          
          return (
            <motion.div
              key={site.id}
              className="absolute cursor-pointer group"
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.05,
                type: "spring",
                stiffness: 200
              }}
              whileHover={{ scale: 1.2 }}
              onClick={() => setSelectedSite(site)}
            >
              {/* Marker */}
              <div className={`w-4 h-4 ${markerColor} rounded-full border-2 border-white shadow-lg
                              group-hover:shadow-glow transition-all duration-300
                              flex items-center justify-center`}>
                <Icon size={8} className="text-white" />
              </div>
              
              {/* Pulse Animation */}
              <div className={`absolute inset-0 ${markerColor} rounded-full opacity-30 
                              animate-ping group-hover:animate-none`} />
              
              {/* Hover Tooltip */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2
                              bg-black/80 text-white text-xs px-2 py-1 rounded
                              opacity-0 group-hover:opacity-100 transition-opacity
                              whitespace-nowrap z-10">
                {site.name}
              </div>
            </motion.div>
          );
        })}

        {/* Legend */}
        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md rounded-lg p-4 text-white">
          <h3 className="font-semibold mb-2 text-sm">
            {activeTab === 'potential' ? 'Potential Sites' : 'Existing Projects'}
          </h3>
          <div className="flex items-center gap-2 text-xs">
            <div className={`w-3 h-3 ${markerColor} rounded-full border border-white`} />
            <span>{sitesToShow.length} sites mapped</span>
          </div>
        </div>

        {/* Stats Panel */}
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md rounded-lg p-4 text-white">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-400">
              {sitesToShow.length}
            </div>
            <div className="text-xs opacity-80">
              {activeTab === 'potential' ? 'Potential' : 'Active'} Sites
            </div>
          </div>
        </div>
      </div>

      {/* Site Details Modal */}
      {selectedSite && (
        <motion.div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedSite(null)}
        >
          <motion.div
            className="bg-white/90 backdrop-blur-md rounded-xl p-6 max-w-md mx-4
                       border border-white/20 shadow-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-3 mb-4">
              <div className={`w-8 h-8 ${markerColor} rounded-full flex items-center justify-center`}>
                <markerIcon size={16} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">{selectedSite.name}</h3>
                <p className="text-gray-600 text-sm">{selectedSite.state}</p>
              </div>
            </div>
            
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Type:</strong> {selectedSite.type === 'potential' ? 'Potential Site' : 'Existing Project'}</p>
              <p><strong>Location:</strong> {selectedSite.latitude.toFixed(3)}°N, {selectedSite.longitude.toFixed(3)}°E</p>
              {selectedSite.description && (
                <p><strong>Description:</strong> {selectedSite.description}</p>
              )}
            </div>
            
            <button
              onClick={() => setSelectedSite(null)}
              className="mt-4 w-full bg-gradient-button text-white py-2 px-4 rounded-lg
                         hover:shadow-glow transition-all duration-300"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default InteractiveMap;