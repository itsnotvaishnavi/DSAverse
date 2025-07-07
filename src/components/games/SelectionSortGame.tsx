
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import GameInstructions from '../shared/GameInstructions';
import TheoryRecap from '../shared/TheoryRecap';

interface SelectionSortGameProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const SelectionSortGame: React.FC<SelectionSortGameProps> = ({ onComplete, onClose }) => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [sortedNumbers, setSortedNumbers] = useState<number[]>([]);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [showInstructions, setShowInstructions] = useState(true);
  const [showTheory, setShowTheory] = useState(false);

  useEffect(() => {
    if (!showInstructions) {
      generateLevel();
    }
  }, [level, showInstructions]);

  const generateLevel = () => {
    const newNumbers = Array.from({ length: 6 }, () => Math.floor(Math.random() * 50) + 1);
    setNumbers(newNumbers);
    setSortedNumbers([]);
    setSelectedNumber(null);
  };

  const selectNumber = (value: number) => {
    const minValue = Math.min(...numbers);
    if (value === minValue) {
      setScore(prev => prev + 10);
      setSortedNumbers(prev => [...prev, value]);
      setNumbers(prev => prev.filter(num => num !== value));
      setSelectedNumber(null);
      
      if (numbers.length === 1) {
        setScore(prev => prev + 50);
        setTimeout(() => setShowTheory(true), 1000);
      }
    } else {
      setScore(prev => Math.max(0, prev - 5));
      setSelectedNumber(value);
      setTimeout(() => setSelectedNumber(null), 1000);
    }
  };

  if (showInstructions) {
    return (
      <GameInstructions
        title="Selection Sort Algorithm"
        instructions={[
          "Find and select the smallest number from the unsorted array",
          "The selected number will move to the sorted section",
          "Repeat until all numbers are sorted"
        ]}
        onStart={() => setShowInstructions(false)}
        gameIcon="🎯"
        color="from-purple-900/30 to-indigo-900/30"
      />
    );
  }

  if (showTheory) {
    return (
      <TheoryRecap
        title="Selection Sort Mastered!"
        algorithm="Find the minimum element from unsorted part and place it at the beginning. Repeat for remaining unsorted portion."
        timeComplexity="O(n²) - nested loops to find minimum"
        spaceComplexity="O(1) - sorts in-place with constant space"
        useCases={[
          "Small arrays where simplicity is preferred",
          "When memory writes are costly (minimizes swaps)",
          "Embedded systems with limited memory"
        ]}
        onContinue={() => onComplete(score)}
        color="from-purple-900/30 to-indigo-900/30"
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
      <Card className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 backdrop-blur-md border-purple-400/50 p-8 max-w-3xl w-full mx-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-2">
            🎯 Selection Sort Algorithm
          </h2>
          <p className="text-purple-200">Always select the smallest number from the unsorted array</p>
          <p className="text-purple-300 text-sm mt-2">Score: {score}</p>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-6">
          {/* Unsorted Numbers */}
          <div className="text-center">
            <h3 className="text-purple-300 font-semibold mb-3">Unsorted Array 📊</h3>
            <div className="bg-purple-900/20 rounded-lg p-4 min-h-32 border-2 border-purple-400/30">
              <div className="flex flex-wrap justify-center gap-2">
                {numbers.map((num, index) => (
                  <div
                    key={index}
                    className={`rounded-lg w-14 h-14 flex items-center justify-center text-white font-bold cursor-pointer transition-all duration-300 ${
                      selectedNumber === num 
                        ? 'bg-red-500 animate-shake' 
                        : 'bg-gradient-to-r from-purple-400 to-indigo-400 hover:scale-110'
                    }`}
                    onClick={() => selectNumber(num)}
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>
            <p className="text-purple-400 text-sm mt-2">
              Hint: Smallest number is {numbers.length > 0 ? Math.min(...numbers) : 'none'}
            </p>
          </div>

          {/* Sorted Numbers */}
          <div className="text-center">
            <h3 className="text-purple-300 font-semibold mb-3">Sorted Array 🏆</h3>
            <div className="bg-green-900/20 rounded-lg p-4 min-h-32 border-2 border-green-400/30">
              <div className="flex flex-wrap justify-center gap-2">
                {sortedNumbers.map((num, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-green-400 to-emerald-400 rounded-lg w-12 h-12 flex items-center justify-center text-white font-bold animate-bounce"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <Button
            onClick={generateLevel}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
          >
            🎲 New Array
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="border-purple-400/50 text-purple-300 hover:bg-purple-900/20"
          >
            ← Back to Realm
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SelectionSortGame;
