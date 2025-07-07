
import React from 'react';
import { Button } from '@/components/ui/button';

interface LandingPageProps {
  onEnterUniverse: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnterUniverse }) => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0e0b1f] via-[#25143a] to-[#141e30]">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Floating particles */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
        
        {/* Sparkle effects */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute w-2 h-2 bg-cosmic-teal rounded-full animate-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${1 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="space-y-8 animate-float">
          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cosmic-teal via-cosmic-purple to-cosmic-gold bg-clip-text text-transparent">
            Welcome to DSAverse 🌌
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Your journey through the universe of Data Structures & Algorithms begins now!
          </p>
          
          {/* Enter Button */}
          <div className="pt-8">
            <Button
              onClick={onEnterUniverse}
              className="bg-gradient-to-r from-cosmic-teal to-cosmic-purple hover:from-cosmic-purple hover:to-cosmic-gold text-white px-12 py-6 text-xl font-semibold rounded-full transition-all duration-300 transform hover:scale-110 animate-pulse-glow shadow-2xl"
            >
              Enter DSAverse 🚀
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
