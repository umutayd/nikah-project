import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';

const LocationInfo: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-4 mt-12">
      <div className="bg-white/10 backdrop-blur-md px-8 py-6 rounded-2xl shadow-xl 
                    transform hover:scale-105 transition-all duration-500
                    flex flex-col md:flex-row md:items-center md:gap-8 
                    text-center border border-white/20">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <Calendar className="w-5 h-5 text-pink-300" />
          <div className="text-lg font-medium">14 Temmuz 2025</div>
        </div>
        
        <div className="hidden md:block w-px h-8 bg-white/20"></div>
        
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <Clock className="w-5 h-5 text-pink-300" />
          <div className="text-lg font-medium">19:00</div>
        </div>
        
        <div className="hidden md:block w-px h-8 bg-white/20"></div>
        
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-pink-300" />
          <div className="text-lg font-medium">Garden Kale Termal Otel, Afyonkarahisar</div>
        </div>
      </div>
    </div>
  );
};

export default LocationInfo;