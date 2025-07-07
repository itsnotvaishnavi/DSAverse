
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface QuickSortGameProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const QuickSortGame: React.FC<QuickSortGameProps> = ({ onComplete, onClose }) => {
  const [elements, setElements] = useState<number[]>([]);
  const [pivot, setPivot] = useState<number | null>(null);
  const [leftPartition, setLeftPartition] = useState<number[]>([]);
  const [rightPartition, setRightPartition] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    if (!showInstructions) {
      generateLevel();
    }
  }, [level, showInstructions]);

  const generateLevel = () => {
    const newElements = Array.from({ length: 6 }, () => Math.floor(Math.random() * 50) + 1);
    setElements(newElements);
    setPivot(null);
    setLeftPartition([]);
    setRightPartition([]);
  };

  const selectPivot = (value: number) => {
    setPivot(value);
    setElements(prev => prev.filter(el => el !== value));
  };

  const addToPartition = (value: number, isLeft: boolean) => {
    if (!pivot) return;
    
    const isCorrect = isLeft ? value <= pivot : value > pivot;
    
    if (isCorrect) {
      setScore(prev => prev + 10);
      if (isLeft) {
        setLeftPartition(prev => [...prev, value]);
      } else {
        setRightPartition(prev => [...prev, value]);
      }
      setElements(prev => prev.filter(el => el !== value));
    } else {
      setScore(prev => Math.max(0, prev - 5));
    }

    if (elements.length === 1) {
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
        <Card className="bg-gradient-to-br from-orange-900/30 to-yellow-900/30 backdrop-blur-md border-orange-400/50 p-8 max-w-lg w-full mx-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent mb-4">
              ⚡ Quick Pivot Challenge
            </h2>
            <div className="space-y-4 text-orange-200 mb-6">
              <div className="bg-orange-900/20 rounded-lg p-4">
                <h3 className="font-semibold text-orange-300 mb-2">How to Play:</h3>
                <ol className="text-left space-y-2 text-sm">
                  <li>1. Click any number to select it as your pivot</li>
                  <li>2. Drag numbers ≤ pivot to the LEFT partition</li>
                  <li>3. Drag numbers &gt; pivot to the RIGHT partition</li>
                </ol>
              </div>
            </div>
            <Button
              onClick={() => setShowInstructions(false)}
              className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold"
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
      <Card className="bg-gradient-to-br from-orange-900/30 to-yellow-900/30 backdrop-blur-md border-orange-400/50 p-8 max-w-4xl w-full mx-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent mb-2">
            ⚡ Quick Pivot Challenge
          </h2>
          <p className="text-orange-200">Select a pivot, then sort elements to left (≤) or right (&gt;)</p>
          <p className="text-orange-300 text-sm mt-2">Level: {level}/3 | Score: {score}</p>
        </div>

        <div className="grid grid-cols-3 gap-8 mb-6">
          {/* Left Partition */}
          <div className="text-center">
            <h3 className="text-orange-300 font-semibold mb-3">Left (≤ pivot)</h3>
            <div 
              className="bg-orange-900/20 rounded-lg p-4 min-h-32 border-2 border-orange-400/30 transition-all duration-300 hover:border-orange-400/60"
              onDrop={(e) => {
                e.preventDefault();
                const value = parseInt(e.dataTransfer.getData('text/plain'));
                addToPartition(value, true);
              }}
              onDragOver={(e) => e.preventDefault()}
            >
              <div className="flex flex-wrap justify-center">
                {leftPartition.map((value, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-orange-400 to-red-400 rounded-lg w-12 h-12 flex items-center justify-center text-white font-bold m-1 animate-bounce"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {value}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pivot */}
          <div className="text-center">
            <h3 className="text-yellow-300 font-semibold mb-3">Pivot</h3>
            <div className="bg-yellow-900/20 rounded-lg p-4 min-h-32 border-2 border-yellow-400/30 flex items-center justify-center">
              {pivot && (
                <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full w-16 h-16 flex items-center justify-center text-white font-bold text-xl animate-pulse">
                  {pivot}
                </div>
              )}
            </div>
          </div>

          {/* Right Partition */}
          <div className="text-center">
            <h3 className="text-orange-300 font-semibold mb-3">Right (&gt; pivot)</h3>
            <div 
              className="bg-orange-900/20 rounded-lg p-4 min-h-32 border-2 border-orange-400/30 transition-all duration-300 hover:border-orange-400/60"
              onDrop={(e) => {
                e.preventDefault();
                const value = parseInt(e.dataTransfer.getData('text/plain'));
                addToPartition(value, false);
              }}
              onDragOver={(e) => e.preventDefault()}
            >
              <div className="flex flex-wrap justify-center">
                {rightPartition.map((value, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-orange-400 to-red-400 rounded-lg w-12 h-12 flex items-center justify-center text-white font-bold m-1 animate-bounce"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {value}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Unsorted Elements */}
        <div className="text-center mb-6">
          <h3 className="text-orange-300 font-semibold mb-3">Unsorted Elements</h3>
          <div className="flex justify-center flex-wrap gap-2">
            {elements.map((value, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-gray-400 to-gray-500 rounded-lg w-14 h-14 flex items-center justify-center text-white font-bold cursor-pointer hover:scale-110 transition-transform"
                draggable
                onDragStart={(e) => e.dataTransfer.setData('text/plain', value.toString())}
                onClick={() => !pivot && selectPivot(value)}
              >
                {value}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <Button
            onClick={generateLevel}
            className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
          >
            🎲 New Level
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="border-orange-400/50 text-orange-300 hover:bg-orange-900/20"
          >
            ← Back to Realm
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default QuickSortGame;
