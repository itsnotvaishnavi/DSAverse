
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import BubbleSortGame from './games/BubbleSortGame';
import SelectionSortGame from './games/SelectionSortGame';
import InsertionSortGame from './games/InsertionSortGame';
import MergeSortGame from './games/MergeSortGame';
import QuickSortGame from './games/QuickSortGame';

interface SortingAlgorithm {
  name: string;
  timeComplexity: string;
  spaceComplexity: string;
  description: string;
  color: string;
  icon: string;
  realWorldUse: string;
}

interface SortingRealmProps {
  onBackToUniverse: () => void;
}

const algorithms: SortingAlgorithm[] = [
  {
    name: 'Bubble Sort',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    description: 'Compare adjacent elements and swap',
    color: 'from-pink-400 to-rose-400',
    icon: '🫧',
    realWorldUse: 'Educational tool for understanding sorting fundamentals'
  },
  {
    name: 'Selection Sort',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    description: 'Find minimum and place in position',
    color: 'from-purple-400 to-indigo-400',
    icon: '🎯',
    realWorldUse: 'Memory-constrained systems where writes are expensive'
  },
  {
    name: 'Insertion Sort',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    description: 'Insert each element in correct position',
    color: 'from-blue-400 to-cyan-400',
    icon: '🍪',
    realWorldUse: 'Small datasets and nearly sorted arrays'
  },
  {
    name: 'Merge Sort',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    description: 'Divide, sort, and merge arrays',
    color: 'from-green-400 to-emerald-400',
    icon: '🍯',
    realWorldUse: 'External sorting and stable sort requirements'
  },
  {
    name: 'Quick Sort',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(log n)',
    description: 'Partition around pivot element',
    color: 'from-orange-400 to-yellow-400',
    icon: '⚡',
    realWorldUse: 'Most programming language standard library sorting'
  }
];

const SortingRealm: React.FC<SortingRealmProps> = ({ onBackToUniverse }) => {
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const startGame = (algorithmName: string) => {
    setCurrentGame(algorithmName);
  };

  const handleGameComplete = (gameScore: number) => {
    setScore(prev => prev + gameScore);
    setCurrentGame(null);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0e0b1f] via-[#25143a] to-[#141e30]">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {Array.from({ length: 100 }).map((_, i) => (
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
        
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute w-2 h-2 bg-cosmic-gold rounded-full animate-sparkle"
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
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cosmic-gold to-cosmic-purple bg-clip-text text-transparent">
              🏰 Sorting Realm
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
                className="bg-black/30 backdrop-blur-md border-cosmic-gold/30 p-6 hover:border-cosmic-gold/60 transition-all duration-300 transform hover:scale-105 cursor-pointer group relative"
              >
                <div className={`w-full h-3 rounded-full bg-gradient-to-r ${algorithm.color} mb-4 animate-pulse-glow`} />
                
                <div className="text-center mb-4">
                  <div className="text-6xl mb-2 animate-float">{algorithm.icon}</div>
                  <h3 className="text-xl font-bold text-cosmic-gold mb-2">{algorithm.name}</h3>
                  <p className="text-gray-300 text-sm mb-3">{algorithm.description}</p>
                  
                  {/* Complexity tooltips */}
                  <div className="text-xs text-gray-400 space-y-1">
                    <div>Time: {algorithm.timeComplexity}</div>
                    <div>Space: {algorithm.spaceComplexity}</div>
                  </div>
                </div>

                <Button
                  className={`w-full bg-gradient-to-r ${algorithm.color} hover:scale-105 transition-transform text-white font-semibold py-3`}
                  onClick={() => startGame(algorithm.name)}
                >
                  ✨ Cast Sort Spell
                </Button>
                
                {/* Hover tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="bg-black/80 text-white text-xs rounded-lg p-2 w-48">
                    {algorithm.realWorldUse}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Game Modals */}
      {currentGame === 'Bubble Sort' && (
        <BubbleSortGame
          onComplete={handleGameComplete}
          onClose={() => setCurrentGame(null)}
        />
      )}
      {currentGame === 'Selection Sort' && (
        <SelectionSortGame
          onComplete={handleGameComplete}
          onClose={() => setCurrentGame(null)}
        />
      )}
      {currentGame === 'Insertion Sort' && (
        <InsertionSortGame
          onComplete={handleGameComplete}
          onClose={() => setCurrentGame(null)}
        />
      )}
      {currentGame === 'Merge Sort' && (
        <MergeSortGame
          onComplete={handleGameComplete}
          onClose={() => setCurrentGame(null)}
        />
      )}
      {currentGame === 'Quick Sort' && (
        <QuickSortGame
          onComplete={handleGameComplete}
          onClose={() => setCurrentGame(null)}
        />
      )}
    </div>
  );
};

export default SortingRealm;
