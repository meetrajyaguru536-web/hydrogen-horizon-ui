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
      {/* Map Background with India Outline */}
      <div 
        ref={mapRef}
        className="w-full h-full relative bg-gradient-to-br from-blue-900/20 to-green-900/20"
      >
        {/* Detailed India Map SVG */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg 
            viewBox="0 0 800 600" 
            className="w-full h-full opacity-30"
            style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.1))' }}
          >
            {/* India Outline - Detailed Path */}
            <path
              d="M200,150 L220,140 L250,135 L280,140 L320,145 L360,150 L400,160 L440,170 L480,180 L520,190 L550,200 L580,220 L600,250 L610,280 L615,320 L610,360 L600,400 L580,440 L550,470 L520,490 L480,500 L440,505 L400,500 L360,490 L320,480 L280,470 L250,450 L220,420 L200,380 L190,340 L185,300 L190,260 L195,220 L200,180 Z"
              fill="rgba(255,255,255,0.1)"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="2"
            />
            
            {/* Major States Boundaries */}
            <g stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none">
              {/* Rajasthan */}
              <path d="M200,200 L280,190 L290,250 L270,300 L220,290 L200,250 Z" />
              {/* Gujarat */}
              <path d="M220,290 L270,300 L280,350 L250,380 L220,370 L210,330 Z" />
              {/* Maharashtra */}
              <path d="M280,350 L350,360 L370,400 L340,430 L300,420 L280,380 Z" />
              {/* Madhya Pradesh */}
              <path d="M280,250 L380,260 L390,320 L350,330 L290,320 L280,280 Z" />
              {/* Uttar Pradesh */}
              <path d="M350,200 L450,210 L460,260 L420,270 L380,260 L350,230 Z" />
              {/* Karnataka */}
              <path d="M340,430 L400,440 L420,480 L390,500 L360,490 L340,460 Z" />
              {/* Tamil Nadu */}
              <path d="M390,500 L450,510 L470,540 L440,560 L410,550 L390,520 Z" />
              {/* Andhra Pradesh */}
              <path d="M400,440 L480,450 L490,490 L460,510 L420,500 L400,470 Z" />
              {/* West Bengal */}
              <path d="M520,280 L570,290 L580,330 L560,360 L530,350 L520,310 Z" />
              {/* Odisha */}
              <path d="M480,350 L530,360 L540,400 L510,420 L480,410 L480,380 Z" />
            </g>
            
            {/* Coastal Lines */}
            <path
              d="M220,370 Q250,390 280,380 Q320,385 360,390 Q400,395 440,400 Q480,405 520,410 Q550,415 580,420"
              stroke="rgba(100,200,255,0.4)"
              strokeWidth="3"
              fill="none"
            />
            
            {/* Major Rivers */}
            <g stroke="rgba(100,200,255,0.2)" strokeWidth="2" fill="none">
              {/* Ganges */}
              <path d="M350,220 Q400,230 450,240 Q500,250 550,270" />
              {/* Yamuna */}
              <path d="M380,200 Q390,230 400,260 Q410,290 420,320" />
              {/* Narmada */}
              <path d="M300,280 Q340,290 380,300 Q420,310 460,320" />
              {/* Godavari */}
              <path d="M400,360 Q440,370 480,380 Q520,390 560,400" />
            </g>
          </svg>
        </div>

        {/* Grid Overlay for Geographic Reference */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" 
               style={{
                 backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                 backgroundSize: '50px 50px'
               }}>
          </div>
        </div>

        {/* Site Markers */}
        {sitesToShow.map((site, index) => {
          const position = getMarkerPosition(site);
          const Icon = markerIcon;
          
          return (
            <motion.div
              key={site.id}
              className="absolute cursor-pointer group z-10"
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
              whileHover={{ scale: 1.3 }}
              onClick={() => setSelectedSite(site)}
            >
              {/* Marker */}
              <div className={`w-5 h-5 ${markerColor} rounded-full border-2 border-white shadow-lg
                              group-hover:shadow-glow transition-all duration-300
                              flex items-center justify-center relative z-20`}>
                <Icon size={10} className="text-white" />
              </div>
              
              {/* Pulse Animation */}
              <div className={`absolute inset-0 ${markerColor} rounded-full opacity-30 
                              animate-ping group-hover:animate-none`} />
              
              {/* Ripple Effect */}
              <div className={`absolute inset-0 ${markerColor} rounded-full opacity-20 
                              scale-150 animate-pulse`} />
              
              {/* Hover Tooltip */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2
                              bg-black/90 text-white text-xs px-3 py-2 rounded-lg
                              opacity-0 group-hover:opacity-100 transition-all duration-300
                              whitespace-nowrap z-30 shadow-xl border border-white/20">
                <div className="font-semibold">{site.name}</div>
                <div className="text-gray-300 text-[10px]">{site.state}</div>
                {/* Tooltip Arrow */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 
                               border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
              </div>
            </motion.div>
          );
        })}

        {/* Legend */}
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md rounded-xl p-4 text-white border border-white/20">
          <h3 className="font-semibold mb-3 text-sm flex items-center gap-2">
            <MapPin size={16} />
            {activeTab === 'potential' ? 'Potential Sites' : 'Existing Projects'}
          </h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-xs">
              <div className={`w-4 h-4 ${markerColor} rounded-full border border-white shadow-sm`} />
              <span>{sitesToShow.length} sites mapped</span>
            </div>
            <div className="text-[10px] text-gray-300">
              Click markers for details
            </div>
          </div>
        </div>

        {/* Stats Panel */}
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md rounded-xl p-4 text-white border border-white/20">
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-400 mb-1">
              {sitesToShow.length}
            </div>
            <div className="text-xs opacity-80 mb-2">
              {activeTab === 'potential' ? 'Potential' : 'Active'} Sites
            </div>
            <div className="text-[10px] text-gray-300">
              Across {new Set(sitesToShow.map(s => s.state)).size} states
            </div>
          </div>
        </div>

        {/* Geographic Labels */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Major Cities Labels */}
          <div className="absolute" style={{ left: '45%', top: '25%' }}>
            <span className="text-white/40 text-xs font-medium">Delhi</span>
          </div>
          <div className="absolute" style={{ left: '25%', top: '85%' }}>
            <span className="text-white/40 text-xs font-medium">Mumbai</span>
          </div>
          <div className="absolute" style={{ left: '75%', top: '85%' }}>
            <span className="text-white/40 text-xs font-medium">Chennai</span>
          </div>
          <div className="absolute" style={{ left: '70%', top: '75%' }}>
            <span className="text-white/40 text-xs font-medium">Bangalore</span>
          </div>
          <div className="absolute" style={{ left: '80%', top: '45%' }}>
            <span className="text-white/40 text-xs font-medium">Kolkata</span>
          </div>
        </div>
      </div>

      {/* Site Details Modal */}
      {selectedSite && (
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedSite(null)}
        >
          <motion.div
            className="bg-white/95 backdrop-blur-md rounded-2xl p-6 max-w-md mx-4
                       border border-white/30 shadow-2xl"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className={`w-10 h-10 ${markerColor} rounded-full flex items-center justify-center shadow-lg`}>
                <markerIcon size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 text-xl mb-1">{selectedSite.name}</h3>
                <p className="text-gray-600 text-sm font-medium">{selectedSite.state}</p>
              </div>
            </div>
            
            <div className="space-y-3 text-sm text-gray-700 mb-6">
              <div className="flex justify-between">
                <span className="font-medium">Type:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  selectedSite.type === 'potential' 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {selectedSite.type === 'potential' ? 'Potential Site' : 'Existing Project'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Coordinates:</span>
                <span className="font-mono text-xs">
                  {selectedSite.latitude.toFixed(3)}°N, {selectedSite.longitude.toFixed(3)}°E
                </span>
              </div>
              {selectedSite.description && (
                <div>
                  <span className="font-medium block mb-1">Description:</span>
                  <p className="text-gray-600 text-xs leading-relaxed">{selectedSite.description}</p>
                </div>
              )}
            </div>
            
            <button
              onClick={() => setSelectedSite(null)}
              className="w-full bg-gradient-button text-white py-3 px-4 rounded-xl font-medium
                         hover:shadow-glow transition-all duration-300 transform hover:scale-[1.02]"
            >
              Close Details
            </button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default InteractiveMap;