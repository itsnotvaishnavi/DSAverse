
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import RecursionTreeGame from './games/RecursionTreeGame';
import TowerOfHanoiGame from './games/TowerOfHanoiGame';
import FibonacciGame from './games/FibonacciGame';
import NQueensGame from './games/NQueensGame';
import TreeTraversalGame from './games/TreeTraversalGame';

interface ForestOfRecursionProps {
  onBackToUniverse: () => void;
}

const algorithms = [
  {
    name: 'Tree Pruning',
    description: 'Cut branches to solve recursive puzzles',
    color: 'from-green-400 to-emerald-400',
    icon: '✂️'
  },
  {
    name: 'Tower of Hanoi',
    description: 'Move disks using recursive strategy',
    color: 'from-orange-400 to-red-400',
    icon: '🗼'
  },
  {
    name: 'Fibonacci Quest',
    description: 'Discover the golden sequence',
    color: 'from-yellow-400 to-orange-400',
    icon: '🌀'
  },
  {
    name: 'N-Queens Challenge',
    description: 'Place queens without conflicts',
    color: 'from-purple-400 to-pink-400',
    icon: '👑'
  },
  {
    name: 'Tree Traversal',
    description: 'Navigate through tree structures',
    color: 'from-teal-400 to-cyan-400',
    icon: '🌳'
  }
];

const ForestOfRecursion: React.FC<ForestOfRecursionProps> = ({ onBackToUniverse }) => {
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
        {Array.from({ length: 80 }).map((_, i) => (
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
        
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={`leaf-${i}`}
            className="absolute w-3 h-3 bg-green-500 rounded-full animate-float opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 3}s`
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
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              🌲 Forest of Recursion
            </h1>
            <p className="text-cosmic-purple">🌟 {score} Stars Collected | 🪐 Exploring DSAverse</p>
          </div>
          <div className="w-32" />
        </div>
      </div>

      {/* Algorithm Cards */}
      <div className="relative z-10 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {algorithms.map((algorithm) => (
              <Card
                key={algorithm.name}
                className="bg-black/30 backdrop-blur-md border-green-400/30 p-6 hover:border-green-400/60 transition-all duration-300 transform hover:scale-105 cursor-pointer group"
              >
                <div className={`w-full h-3 rounded-full bg-gradient-to-r ${algorithm.color} mb-4 animate-pulse-glow`} />
                
                <div className="text-center mb-4">
                  <div className="text-6xl mb-2 animate-float">{algorithm.icon}</div>
                  <h3 className="text-xl font-bold text-cosmic-gold mb-2">{algorithm.name}</h3>
                  <p className="text-gray-300 text-sm">{algorithm.description}</p>
                </div>

                <Button
                  className={`w-full bg-gradient-to-r ${algorithm.color} hover:scale-105 transition-transform text-white font-semibold py-3`}
                  onClick={() => startGame(algorithm.name)}
                >
                  ✨ Enter Game
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Game Modals */}
      {currentGame === 'Tree Pruning' && (
        <RecursionTreeGame
          onComplete={handleGameComplete}
          onClose={() => setCurrentGame(null)}
        />
      )}
      {currentGame === 'Tower of Hanoi' && (
        <TowerOfHanoiGame
          onComplete={handleGameComplete}
          onClose={() => setCurrentGame(null)}
        />
      )}
      {currentGame === 'Fibonacci Quest' && (
        <FibonacciGame
          onComplete={handleGameComplete}
          onClose={() => setCurrentGame(null)}
        />
      )}
      {currentGame === 'N-Queens Challenge' && (
        <NQueensGame
          onComplete={handleGameComplete}
          onClose={() => setCurrentGame(null)}
        />
      )}
      {currentGame === 'Tree Traversal' && (
        <TreeTraversalGame
          onComplete={handleGameComplete}
          onClose={() => setCurrentGame(null)}
        />
      )}
    </div>
  );
};

export default ForestOfRecursion;
