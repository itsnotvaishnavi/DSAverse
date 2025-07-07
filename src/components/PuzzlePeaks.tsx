
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PuzzlePeaksGame from './games/PuzzlePeaksGame';
import KnapsackGame from './games/KnapsackGame';
import CoinChangeGame from './games/CoinChangeGame';
import ClimbingStairsGame from './games/ClimbingStairsGame';

interface PuzzlePeaksProps {
  onBackToUniverse: () => void;
}

const algorithms = [
  {
    name: 'Knapsack Problem',
    description: 'Pack your cosmic backpack optimally',
    color: 'from-orange-400 to-red-400',
    icon: '🎒'
  },
  {
    name: 'Coin Change',
    description: 'Make change with minimum cosmic coins',
    color: 'from-yellow-400 to-orange-400',
    icon: '🪙'
  },
  {
    name: 'Climbing Stairs',
    description: 'Reach the summit in optimal steps',
    color: 'from-purple-400 to-pink-400',
    icon: '🪜'
  },
  {
    name: 'Treasure Hunt',
    description: 'Collect treasures without adjacent picks',
    color: 'from-green-400 to-blue-400',
    icon: '💎'
  }
];

const PuzzlePeaks: React.FC<PuzzlePeaksProps> = ({ onBackToUniverse }) => {
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const startGame = (gameName: string) => {
    setCurrentGame(gameName);
  };

  const handleGameComplete = (gameScore: number) => {
    setScore(prev => prev + gameScore);
    setCurrentGame(null);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0e0b1f] via-[#25143a] to-[#141e30]">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {Array.from({ length: 60 }).map((_, i) => (
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
        
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={`gem-${i}`}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${1 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="flex justify-between items-center">
          <Button
            onClick={onBackToUniverse}
            className="bg-cosmic-teal/20 hover:bg-cosmic-teal/40 text-cosmic-teal border-cosmic-teal/50"
          >
            ← Back to Universe
          </Button>
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              🏔️ Puzzle Peaks
            </h1>
            <p className="text-cosmic-purple game-score">Score: {score} Cosmic Stars</p>
          </div>
          <div className="w-32" />
        </div>
      </div>

      {/* Algorithm Cards */}
      <div className="relative z-10 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {algorithms.map((algorithm) => (
              <Card
                key={algorithm.name}
                className="bg-black/30 backdrop-blur-md border-orange-400/30 p-6 hover:border-orange-400/60 transition-all duration-300 transform hover:scale-105 cursor-pointer group"
              >
                <div className={`w-full h-3 rounded-full bg-gradient-to-r ${algorithm.color} mb-4 animate-pulse-glow`} />
                
                <div className="text-center mb-4">
                  <div className="text-6xl mb-2 animate-float">{algorithm.icon}</div>
                  <h3 className="text-xl font-bold text-cosmic-gold mb-2">{algorithm.name}</h3>
                  <p className="text-gray-300 text-sm game-text">{algorithm.description}</p>
                </div>

                <Button
                  className={`w-full bg-gradient-to-r ${algorithm.color} hover:scale-105 transition-transform text-white font-semibold py-3`}
                  onClick={() => startGame(algorithm.name)}
                >
                  ✨ Solve {algorithm.name === 'Treasure Hunt' ? 'Puzzle' : 'Challenge'}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Game Modals */}
      {currentGame === 'Treasure Hunt' && (
        <PuzzlePeaksGame
          onComplete={handleGameComplete}
          onClose={() => setCurrentGame(null)}
        />
      )}
      {currentGame === 'Knapsack Problem' && (
        <KnapsackGame
          onComplete={handleGameComplete}
          onClose={() => setCurrentGame(null)}
        />
      )}
      {currentGame === 'Coin Change' && (
        <CoinChangeGame
          onComplete={handleGameComplete}
          onClose={() => setCurrentGame(null)}
        />
      )}
      {currentGame === 'Climbing Stairs' && (
        <ClimbingStairsGame
          onComplete={handleGameComplete}
          onClose={() => setCurrentGame(null)}
        />
      )}
    </div>
  );
};

export default PuzzlePeaks;
