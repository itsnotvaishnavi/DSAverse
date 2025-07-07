
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface MergeSortGameProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const MergeSortGame: React.FC<MergeSortGameProps> = ({ onComplete, onClose }) => {
  const [leftJar, setLeftJar] = useState<number[]>([]);
  const [rightJar, setRightJar] = useState<number[]>([]);
  const [mergedJar, setMergedJar] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [gameLevel, setGameLevel] = useState(1);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    generateLevel();
  }, [gameLevel]);

  const generateLevel = () => {
    const leftArray = Array.from({ length: 4 }, () => Math.floor(Math.random() * 20) + 1).sort((a, b) => a - b);
    const rightArray = Array.from({ length: 4 }, () => Math.floor(Math.random() * 20) + 1).sort((a, b) => a - b);
    
    setLeftJar(leftArray);
    setRightJar(rightArray);
    setMergedJar([]);
    setIsComplete(false);
  };

  const addToMerged = (value: number, fromLeft: boolean) => {
    const newMerged = [...mergedJar, value];
    setMergedJar(newMerged);
    
    if (fromLeft) {
      setLeftJar(prev => prev.filter((_, i) => i !== 0));
    } else {
      setRightJar(prev => prev.filter((_, i) => i !== 0));
    }

    // Check if correctly sorted
    const isCorrect = newMerged.every((val, i) => i === 0 || val >= newMerged[i - 1]);
    if (!isCorrect) {
      setScore(prev => Math.max(0, prev - 10));
    } else {
      setScore(prev => prev + 5);
    }

    if (leftJar.length === 1 && rightJar.length === 1) {
      setIsComplete(true);
      setScore(prev => prev + 25);
      setTimeout(() => {
        if (gameLevel < 3) {
          setGameLevel(prev => prev + 1);
        } else {
          onComplete(score + 100);
        }
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
      <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 backdrop-blur-md border-green-400/50 p-8 max-w-4xl w-full mx-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
            🍯 Candy Merge Challenge
          </h2>
          <p className="text-green-200">Merge two sorted candy jars into one sorted jar</p>
          <p className="text-green-300 text-sm mt-2">Level: {gameLevel}/3 | Score: {score}</p>
        </div>

        <div className="grid grid-cols-3 gap-8 mb-6">
          {/* Left Jar */}
          <div className="text-center">
            <h3 className="text-green-300 font-semibold mb-3">Left Jar 🍭</h3>
            <div className="bg-green-900/20 rounded-lg p-4 min-h-32 border-2 border-green-400/30">
              {leftJar.map((candy, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-r from-green-400 to-emerald-400 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold m-1 cursor-pointer hover:scale-110 transition-transform ${
                    index === 0 ? 'animate-pulse' : 'opacity-70'
                  }`}
                  onClick={() => index === 0 && addToMerged(candy, true)}
                >
                  {candy}
                </div>
              ))}
            </div>
          </div>

          {/* Merged Jar */}
          <div className="text-center">
            <h3 className="text-green-300 font-semibold mb-3">Merged Jar 🏺</h3>
            <div className="bg-yellow-900/20 rounded-lg p-4 min-h-32 border-2 border-yellow-400/30">
              <div className="flex flex-wrap justify-center">
                {mergedJar.map((candy, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold m-1 animate-bounce"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {candy}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Jar */}
          <div className="text-center">
            <h3 className="text-green-300 font-semibold mb-3">Right Jar 🍬</h3>
            <div className="bg-green-900/20 rounded-lg p-4 min-h-32 border-2 border-green-400/30">
              {rightJar.map((candy, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-r from-green-400 to-emerald-400 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold m-1 cursor-pointer hover:scale-110 transition-transform ${
                    index === 0 ? 'animate-pulse' : 'opacity-70'
                  }`}
                  onClick={() => index === 0 && addToMerged(candy, false)}
                >
                  {candy}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <Button
            onClick={generateLevel}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
          >
            🎲 New Level
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="border-green-400/50 text-green-300 hover:bg-green-900/20"
          >
            ← Back to Realm
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default MergeSortGame;
