import React from 'react';
import { Navigation } from 'lucide-react';

const Map: React.FC = () => {
  const handleNavigate = () => {
    window.open('https://maps.google.com/?q=Garden+Kale+Termal+Otel+Afyonkarahisar', '_blank');
  };

  return (
    <div className="w-full max-w-4xl mt-16 space-y-4">
      <div className="rounded-xl overflow-hidden shadow-lg opacity-90 hover:opacity-100 transition-opacity duration-300">
        <iframe
          title="Nişan Lokasyonu"
          src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Garden+Kale+Termal+Otel,Hürriyet,+İzmir+Yolu+6.Km,+03140+Erkmen/Afyonkarahisar+Merkez/Afyonkarahisar&center=38.783533,30.473955"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="border-0"
        ></iframe>
      </div>
      
      <button
        onClick={handleNavigate}
        className="w-full sm:w-auto mx-auto flex items-center justify-center gap-2 px-6 py-3
                 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg
                 text-white font-medium transition-all duration-300
                 border border-white/20 hover:border-white/40"
      >
        <Navigation className="w-5 h-5" />
        Yol Tarifi Al
      </button>
    </div>
  );
};

export default Map;