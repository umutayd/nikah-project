import React, { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown: React.FC = () => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date('2025-07-14T19:00:00') - +new Date();
    let timeLeft: Partial<TimeLeft> = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return timeLeft as TimeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number): string => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  const isToday = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  if (isToday) {
    return (
      <div className="flex justify-center items-center mt-8">
        <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 rounded-2xl p-8 backdrop-blur-sm shadow-2xl transform hover:scale-105 transition-all duration-500">
          <div className="text-center">
            <div className="text-6xl mb-4">💕</div>
            <h2 className="text-4xl font-serif font-bold text-white mb-2 animate-pulse">
              Nişanımız Bugün!
            </h2>
            <p className="text-xl text-white/90 font-light">
              Mutlu günümüz geldi
            </p>
            <div className="mt-4 flex justify-center space-x-2">
              <span className="text-2xl animate-bounce">✨</span>
              <span className="text-2xl animate-bounce delay-100">💖</span>
              <span className="text-2xl animate-bounce delay-200">✨</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center mt-8">
      <div className="bg-black bg-opacity-40 rounded-lg p-6 backdrop-blur-sm">
        <div className="grid grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-light">{formatNumber(timeLeft.days)}</div>
            <div className="text-sm uppercase tracking-wider mt-1">Gün</div>
          </div>
          <div>
            <div className="text-3xl font-light">{formatNumber(timeLeft.hours)}</div>
            <div className="text-sm uppercase tracking-wider mt-1">Saat</div>
          </div>
          <div>
            <div className="text-3xl font-light">{formatNumber(timeLeft.minutes)}</div>
            <div className="text-sm uppercase tracking-wider mt-1">Dakika</div>
          </div>
          <div>
            <div className="text-3xl font-light">{formatNumber(timeLeft.seconds)}</div>
            <div className="text-sm uppercase tracking-wider mt-1">Saniye</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;