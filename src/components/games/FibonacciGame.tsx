
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FibonacciGameProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const FibonacciGame: React.FC<FibonacciGameProps> = ({ onComplete, onClose }) => {
  const [sequence, setSequence] = useState<number[]>([1, 1]);
  const [targetLength, setTargetLength] = useState(8);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    if (!showInstructions) {
      generateLevel();
    }
  }, [level, showInstructions]);

  const generateLevel = () => {
    setSequence([1, 1]);
    setTargetLength(6 + level);
    setUserInput('');
  };

  const addNumber = () => {
    const num = parseInt(userInput);
    if (isNaN(num)) return;

    const expectedNext = sequence[sequence.length - 1] + sequence[sequence.length - 2];
    
    if (num === expectedNext) {
      setSequence(prev => [...prev, num]);
      setScore(prev => prev + 10);
      setUserInput('');
      
      if (sequence.length + 1 >= targetLength) {
        setTimeout(() => {
          if (level < 3) {
            setLevel(prev => prev + 1);
          } else {
            onComplete(score + 100);
          }
        }, 1000);
      }
    } else {
      setScore(prev => Math.max(0, prev - 5));
      setUserInput('');
    }
  };

  if (showInstructions) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
        <Card className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 backdrop-blur-md border-yellow-400/50 p-8 max-w-lg w-full mx-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-4">
              🌀 Fibonacci Quest
            </h2>
            <div className="space-y-4 text-yellow-200 mb-6">
              <div className="bg-yellow-900/20 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-300 mb-2">How to Play:</h3>
                <ol className="text-left space-y-2 text-sm">
                  <li>1. Continue the Fibonacci sequence</li>
                  <li>2. Each number = sum of the previous two numbers</li>
                  <li>3. Complete the sequence to win!</li>
                </ol>
              </div>
            </div>
            <Button
              onClick={() => setShowInstructions(false)}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold"
            >
              🚀 Start Quest
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
      <Card className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 backdrop-blur-md border-yellow-400/50 p-8 max-w-3xl w-full mx-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">
            🌀 Fibonacci Quest
          </h2>
          <p className="text-yellow-200">Continue the sequence by adding the next Fibonacci number</p>
          <p className="text-yellow-300 text-sm mt-2">
            Level: {level}/3 | Target: {targetLength} numbers | Score: {score}
          </p>
        </div>

        <div className="bg-yellow-900/20 rounded-lg p-6 mb-6">
          <h3 className="text-yellow-300 font-semibold mb-4 text-center">Current Sequence:</h3>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {sequence.map((num, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg w-16 h-16 flex items-center justify-center text-white font-bold text-lg animate-pulse"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {num}
              </div>
            ))}
            {sequence.length < targetLength && (
              <div className="border-2 border-dashed border-yellow-400 rounded-lg w-16 h-16 flex items-center justify-center text-yellow-400 font-bold text-2xl">
                ?
              </div>
            )}
          </div>
          
          {sequence.length < targetLength && (
            <div className="text-center">
              <p className="text-yellow-300 mb-2">
                Next number: {sequence[sequence.length - 2]} + {sequence[sequence.length - 1]} = ?
              </p>
              <div className="flex justify-center space-x-2">
                <input
                  type="number"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="bg-yellow-900/30 border border-yellow-400/50 rounded px-3 py-2 text-yellow-200 w-24 text-center"
                  placeholder="?"
                />
                <Button
                  onClick={addNumber}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                >
                  Add
                </Button>
              </div>
            </div>
          )}
        </div>

        {sequence.length >= targetLength && (
          <div className="text-center mb-4">
            <div className="text-yellow-400 font-bold text-xl animate-bounce">
              🎉 Sequence Complete! Moving to next level... 🎉
            </div>
          </div>
        )}

        <div className="flex justify-center space-x-4">
          <Button
            onClick={generateLevel}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
          >
            🎲 New Sequence
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="border-yellow-400/50 text-yellow-300 hover:bg-yellow-900/20"
          >
            ← Back to Forest
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default FibonacciGame;
