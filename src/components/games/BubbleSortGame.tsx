
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import GameInstructions from '../shared/GameInstructions';
import TheoryRecap from '../shared/TheoryRecap';

interface BubbleSortGameProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const BubbleSortGame: React.FC<BubbleSortGameProps> = ({ onComplete, onClose }) => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [comparing, setComparing] = useState<number[]>([]);
  const [sorted, setSorted] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);
  const [showTheory, setShowTheory] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!showInstructions) {
      generateNumbers();
    }
  }, [showInstructions]);

  const generateNumbers = () => {
    const newNumbers = Array.from({ length: 6 }, () => Math.floor(Math.random() * 50) + 1);
    setNumbers(newNumbers);
    setComparing([]);
    setSorted([]);
    setSwaps(0);
    setIsComplete(false);
  };

  const compareAndSwap = (index: number) => {
    if (index >= numbers.length - 1 || sorted.includes(index)) return;
    
    const newNumbers = [...numbers];
    setComparing([index, index + 1]);
    
    setTimeout(() => {
      if (newNumbers[index] > newNumbers[index + 1]) {
        // Swap elements
        [newNumbers[index], newNumbers[index + 1]] = [newNumbers[index + 1], newNumbers[index]];
        setNumbers(newNumbers);
        setSwaps(prev => prev + 1);
        setScore(prev => prev + 10);
      }
      
      setComparing([]);
      
      // Check if array is sorted
      const isSorted = newNumbers.every((num, i) => i === 0 || num >= newNumbers[i - 1]);
      if (isSorted) {
        setIsComplete(true);
        setScore(prev => prev + 50);
        setTimeout(() => setShowTheory(true), 1000);
      }
    }, 1000);
  };

  if (showInstructions) {
    return (
      <GameInstructions
        title="Bubble Sort Algorithm"
        instructions={[
          "Compare adjacent elements by clicking between them",
          "If left > right, they will automatically swap",
          "Continue until the entire array is sorted"
        ]}
        onStart={() => setShowInstructions(false)}
        gameIcon="🫧"
        color="from-pink-900/30 to-rose-900/30"
      />
    );
  }

  if (showTheory) {
    return (
      <TheoryRecap
        title="Bubble Sort Mastered!"
        algorithm="Compare adjacent elements and swap them if they are in wrong order. Continue this process until no more swaps are needed."
        timeComplexity="O(n²) - nested loops for comparisons"
        spaceComplexity="O(1) - only uses constant extra space"
        useCases={[
          "Educational purposes to understand sorting",
          "Small datasets where simplicity matters",
          "Detecting if array is already sorted"
        ]}
        onContinue={() => onComplete(score)}
        color="from-pink-900/30 to-rose-900/30"
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
      <Card className="bg-gradient-to-br from-pink-900/30 to-rose-900/30 backdrop-blur-md border-pink-400/50 p-8 max-w-3xl w-full mx-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent mb-2">
            🫧 Bubble Sort Algorithm
          </h2>
          <p className="text-pink-200">Click between adjacent elements to compare and swap them</p>
          <p className="text-pink-300 text-sm mt-2">Score: {score} | Swaps: {swaps}</p>
        </div>

        <div className="flex justify-center items-center space-x-2 mb-6">
          {numbers.map((num, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold text-lg transition-all duration-300 ${
                  comparing.includes(index) ? 'bg-yellow-500 animate-pulse scale-110' :
                  sorted.includes(index) ? 'bg-green-500' :
                  'bg-gradient-to-br from-pink-400 to-rose-400'
                }`}
              >
                {num}
              </div>
              {index < numbers.length - 1 && (
                <Button
                  onClick={() => compareAndSwap(index)}
                  disabled={comparing.length > 0 || isComplete}
                  className="mx-2 w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white p-0"
                >
                  vs
                </Button>
              )}
            </div>
          ))}
        </div>

        {isComplete && (
          <div className="text-center text-green-400 font-bold text-xl mb-4 animate-bounce">
            🎉 Array Sorted! Great job! 🎉
          </div>
        )}

        <div className="flex justify-center space-x-4">
          <Button
            onClick={generateNumbers}
            className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
          >
            🎲 New Array
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="border-pink-400/50 text-pink-300 hover:bg-pink-900/20"
          >
            ← Back to Realm
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default BubbleSortGame;
