
import React from 'react';
import { Card } from '@/components/ui/card';

interface World {
  id: string;
  name: string;
  icon: string;
  gradient: string;
  progress: number;
  description: string;
  lore: string;
}

interface UniverseMapProps {
  onWorldSelect: (worldId: string) => void;
  totalScore?: number;
  realmsCompleted?: number;
}

const worlds: World[] = [
  {
    id: 'sorting',
    name: 'Sorting Realm',
    icon: '🍬',
    gradient: 'from-pink-400 to-rose-400',
    progress: 35,
    description: 'Master the art of arrangement in the candy-filled cosmos',
    lore: 'Legend speaks of ancient sorting spells that organize chaos into harmony...'
  },
  {
    id: 'recursion',
    name: 'Forest of Recursion',
    icon: '🌲',
    gradient: 'from-green-400 to-emerald-400',
    progress: 20,
    description: 'Navigate the infinite depths of self-calling forests',
    lore: 'Deep within these woods, every path leads back to itself...'
  },
  {
    id: 'graphs',
    name: 'Graph Galaxy',
    icon: '🌌',
    gradient: 'from-purple-400 to-indigo-400',
    progress: 45,
    description: 'Explore interconnected star systems and cosmic networks',
    lore: 'Where every star is connected to every other star in ways beyond imagination...'
  },
  {
    id: 'puzzles',
    name: 'Puzzle Peaks',
    icon: '🏔️',
    gradient: 'from-orange-400 to-yellow-400',
    progress: 60,
    description: 'Conquer algorithmic mountains and dynamic programming summits',
    lore: 'These peaks hold the secrets of optimization and elegant solutions...'
  }
];

const UniverseMap: React.FC<UniverseMapProps> = ({ onWorldSelect, totalScore = 0, realmsCompleted = 0 }) => {
  const totalStars = worlds.reduce((sum, world) => sum + Math.floor(world.progress / 10), 0) + totalScore;
  const worldsCompleted = worlds.filter(world => world.progress === 100).length + realmsCompleted;

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0e0b1f] via-[#25143a] to-[#141e30]">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Central spinning core */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-32 h-32 bg-gradient-to-r from-cosmic-teal to-cosmic-purple rounded-full animate-spin opacity-30 blur-sm" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-r from-cosmic-gold to-cosmic-teal rounded-full animate-pulse" />
        </div>

        {/* Floating nebula particles */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cosmic-purple rounded-full animate-float opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          />
        ))}

        {/* Twinkling stars */}
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Cosmic Stats Bar */}
      <div className="relative z-10 p-6">
        <Card className="bg-black/30 backdrop-blur-md border-cosmic-teal/30 text-center">
          <div className="p-4">
            <p className="text-cosmic-gold text-xl font-bold" style={{ fontFamily: 'monospace' }}>
              🌟 {totalStars} Stars Collected | {worldsCompleted}/4 Realms Mastered | 🪐 Exploring Universe
            </p>
          </div>
        </Card>
      </div>

      {/* World Portals */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-8">
        <div className="grid grid-cols-2 gap-16 max-w-4xl">
          {worlds.map((world, index) => (
            <div
              key={world.id}
              className="relative group cursor-pointer animate-float-slow"
              onClick={() => onWorldSelect(world.id)}
              style={{
                animationDelay: `${index * 0.5}s`
              }}
            >
              {/* Orbital Ring */}
              <div className="absolute inset-0 w-48 h-48 mx-auto rounded-full border-2 border-cosmic-teal/20 animate-orbit" />
              
              {/* Planet Portal with Entry Animation */}
              <Card className={`relative w-40 h-40 mx-auto bg-gradient-to-br ${world.gradient} rounded-full flex items-center justify-center text-6xl shadow-2xl transform transition-all duration-500 group-hover:scale-125 group-hover:shadow-cosmic-teal/50 hover:animate-pulse`}>
                <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm" />
                <span className="relative z-10 drop-shadow-lg animate-bounce" style={{ animationDuration: '3s' }}>
                  {world.icon}
                </span>
                
                {/* Magical Glow Effect on Hover */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cosmic-teal/20 to-cosmic-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
              </Card>

              {/* Progress Ring */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-44 h-44">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="rgba(56, 249, 215, 0.2)"
                    strokeWidth="2"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#38F9D7"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray={`${world.progress * 2.83} ${(100 - world.progress) * 2.83}`}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-cosmic-teal text-sm font-bold">
                  {world.progress}%
                </div>
              </div>

              {/* Enhanced Hover Info Card */}
              <div className="absolute -bottom-28 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 w-72 z-50">
                <Card className="bg-black/90 backdrop-blur-md border-cosmic-teal/50 p-4 text-center transform group-hover:scale-105 transition-transform duration-300">
                  <h3 className="text-cosmic-gold font-bold text-lg mb-2 animate-pulse">{world.name}</h3>
                  <p className="text-gray-300 text-sm mb-2">{world.description}</p>
                  <p className="text-cosmic-purple text-xs italic">{world.lore}</p>
                  <div className="mt-2 text-cosmic-teal text-xs font-semibold">
                    ✨ Click to Enter Realm ✨
                  </div>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DSAverse Core Label */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="text-cosmic-teal text-xl font-bold animate-pulse" style={{ fontFamily: 'monospace' }}>
          🌌 DSAverse Core 🌌
        </div>
      </div>
    </div>
  );
};

export default UniverseMap;
