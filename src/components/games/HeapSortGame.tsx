
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface HeapSortGameProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const HeapSortGame: React.FC<HeapSortGameProps> = ({ onComplete, onClose }) => {
  const [treasures, setTreasures] = useState<number[]>([]);
  const [heap, setHeap] = useState<number[]>([]);
  const [sortedTreasures, setSortedTreasures] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    if (!showInstructions) {
      generateLevel();
    }
  }, [level, showInstructions]);

  const generateLevel = () => {
    const newTreasures = Array.from({ length: 6 }, () => Math.floor(Math.random() * 50) + 1);
    setTreasures(newTreasures);
    setHeap([]);
    setSortedTreasures([]);
  };

  const addToHeap = (treasure: number) => {
    const newHeap = [...heap, treasure];
    // Simulate heap property by sorting
    newHeap.sort((a, b) => b - a);
    setHeap(newHeap);
    setTreasures(prev => prev.filter(t => t !== treasure));
    setScore(prev => prev + 5);
  };

  const extractMax = () => {
    if (heap.length === 0) return;
    
    const max = heap[0];
    setSortedTreasures(prev => [...prev, max]);
    setHeap(prev => prev.slice(1));
    setScore(prev => prev + 10);
    
    if (heap.length === 1 && treasures.length === 0) {
      setTimeout(() => {
        if (level < 3) {
          setLevel(prev => prev + 1);
        } else {
          onComplete(score + 100);
        }
      }, 1000);
    }
  };

  if (showInstructions) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
        <Card className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 backdrop-blur-md border-amber-400/50 p-8 max-w-lg w-full mx-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent mb-4">
              💎 Treasure Heap Challenge
            </h2>
            <div className="space-y-4 text-amber-200 mb-6">
              <div className="bg-amber-900/20 rounded-lg p-4">
                <h3 className="font-semibold text-amber-300 mb-2">How to Play:</h3>
                <ol className="text-left space-y-2 text-sm">
                  <li>1. Add treasures to the magical heap (largest stays on top)</li>
                  <li>2. Extract the maximum treasure to sort them</li>
                  <li>3. Continue until all treasures are sorted!</li>
                </ol>
              </div>
            </div>
            <Button
              onClick={() => setShowInstructions(false)}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold"
            >
              🚀 Start Game
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
      <Card className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 backdrop-blur-md border-amber-400/50 p-8 max-w-4xl w-full mx-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent mb-2">
            💎 Treasure Heap Challenge
          </h2>
          <p className="text-amber-200">Build a heap, then extract treasures in sorted order</p>
          <p className="text-amber-300 text-sm mt-2">Level: {level}/3 | Score: {score}</p>
        </div>

        <div className="grid grid-cols-3 gap-8 mb-6">
          {/* Unsorted Treasures */}
          <div className="text-center">
            <h3 className="text-amber-300 font-semibold mb-3">Unsorted Treasures 💰</h3>
            <div className="bg-amber-900/20 rounded-lg p-4 min-h-32 border-2 border-amber-400/30">
              <div className="flex flex-wrap justify-center gap-2">
                {treasures.map((treasure, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-amber-400 to-orange-400 rounded-lg w-12 h-12 flex items-center justify-center text-white font-bold cursor-pointer hover:scale-110 transition-transform"
                    onClick={() => addToHeap(treasure)}
                  >
                    {treasure}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Max Heap */}
          <div className="text-center">
            <h3 className="text-amber-300 font-semibold mb-3">Max Heap 🏔️</h3>
            <div className="bg-amber-900/20 rounded-lg p-4 min-h-32 border-2 border-amber-400/30">
              <div className="flex flex-wrap justify-center gap-2">
                {heap.map((treasure, index) => (
                  <div
                    key={index}
                    className={`bg-gradient-to-r from-yellow-400 to-amber-400 rounded-lg w-12 h-12 flex items-center justify-center text-white font-bold ${
                      index === 0 ? 'animate-pulse cursor-pointer hover:scale-110' : ''
                    }`}
                    onClick={() => index === 0 && extractMax()}
                  >
                    {treasure}
                  </div>
                ))}
              </div>
              {heap.length > 0 && (
                <Button
                  onClick={extractMax}
                  className="mt-3 bg-amber-600 hover:bg-amber-700 text-sm"
                >
                  Extract Max
                </Button>
              )}
            </div>
          </div>

          {/* Sorted Treasures */}
          <div className="text-center">
            <h3 className="text-amber-300 font-semibold mb-3">Sorted Collection 🏆</h3>
            <div className="bg-green-900/20 rounded-lg p-4 min-h-32 border-2 border-green-400/30">
              <div className="flex flex-wrap justify-center gap-2">
                {sortedTreasures.map((treasure, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-green-400 to-emerald-400 rounded-lg w-12 h-12 flex items-center justify-center text-white font-bold animate-bounce"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {treasure}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <Button
            onClick={generateLevel}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
          >
            🎲 New Level
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="border-amber-400/50 text-amber-300 hover:bg-amber-900/20"
          >
            ← Back to Realm
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default HeapSortGame;
