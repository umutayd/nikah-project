import React from 'react';
import { Heart } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <div className="text-center relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full">
        <div className="flex justify-center items-center gap-2 text-pink-300/80">
          <div className="h-px w-12 sm:w-24 bg-current"></div>
          <Heart className="w-6 h-6 animate-pulse" />
          <div className="h-px w-12 sm:w-24 bg-current"></div>
        </div>
      </div>
      
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif mb-4 mt-20 tracking-wide animate-fade-in">
        Nur & Umut
      </h1>
      
      <p className="text-lg md:text-xl text-white/90 font-light italic animate-fade-in-slow">
        Mutluluğumuza ortak olmanız dileğiyle...
      </p>
    </div>
  );
};

export default Header;