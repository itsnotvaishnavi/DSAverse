
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PuzzlePeaksGameProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const PuzzlePeaksGame: React.FC<PuzzlePeaksGameProps> = ({ onComplete, onClose }) => {
  const [coins, setCoins] = useState<number[]>([]);
  const [dp, setDp] = useState<number[]>([]);
  const [selectedCoins, setSelectedCoins] = useState<boolean[]>([]);
  const [maxValue, setMaxValue] = useState(0);
  const [playerValue, setPlayerValue] = useState(0);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    generateLevel();
  }, [level]);

  const generateLevel = () => {
    const newCoins = Array.from({ length: 6 }, () => Math.floor(Math.random() * 20) + 5);
    setCoins(newCoins);
    
    // Calculate optimal solution using DP
    const n = newCoins.length;
    const dpArray = new Array(n).fill(0);
    
    dpArray[0] = newCoins[0];
    if (n > 1) dpArray[1] = Math.max(newCoins[0], newCoins[1]);
    
    for (let i = 2; i < n; i++) {
      dpArray[i] = Math.max(dpArray[i-1], dpArray[i-2] + newCoins[i]);
    }
    
    setDp(dpArray);
    setMaxValue(dpArray[n-1]);
    setSelectedCoins(new Array(n).fill(false));
    setPlayerValue(0);
  };

  const toggleCoin = (index: number) => {
    const newSelected = [...selectedCoins];
    
    // Check if adjacent coins are selected
    const leftAdjacent = index > 0 && selectedCoins[index - 1];
    const rightAdjacent = index < coins.length - 1 && selectedCoins[index + 1];
    
    if (!selectedCoins[index] && (leftAdjacent || rightAdjacent)) {
      return; // Can't select adjacent coins
    }
    
    newSelected[index] = !newSelected[index];
    setSelectedCoins(newSelected);
    
    const newValue = coins.reduce((sum, coin, i) => 
      newSelected[i] ? sum + coin : sum, 0
    );
    setPlayerValue(newValue);
    
    if (newValue === maxValue) {
      setScore(prev => prev + 100);
      setTimeout(() => {
        if (level < 3) {
          setLevel(prev => prev + 1);
        } else {
          onComplete(score + 100);
        }
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
      <Card className="bg-gradient-to-br from-orange-900/30 to-yellow-900/30 backdrop-blur-md border-orange-400/50 p-8 max-w-3xl w-full mx-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent mb-2">
            🏔️ Treasure Peak Challenge
          </h2>
          <p className="text-orange-200">Collect treasures without taking adjacent ones</p>
          <p className="text-orange-300 text-sm mt-2">
            Level: {level}/3 | Score: {score} | Target: {maxValue} | Your: {playerValue}
          </p>
        </div>

        <div className="mb-6">
          <div className="flex justify-center space-x-4 mb-4">
            {coins.map((coin, index) => (
              <div
                key={index}
                className={`relative w-16 h-16 rounded-full border-2 cursor-pointer transition-all duration-300 ${
                  selectedCoins[index] 
                    ? 'bg-gradient-to-br from-yellow-400 to-orange-400 border-yellow-300 transform scale-110 animate-pulse' 
                    : 'bg-gradient-to-br from-orange-600 to-red-600 border-orange-400 hover:scale-105'
                }`}
                onClick={() => toggleCoin(index)}
              >
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
                  {coin}
                </div>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-orange-300 text-xs">
                  Peak {index + 1}
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center text-orange-300 text-sm">
            Rule: You cannot select adjacent treasures!
          </div>
        </div>

        <div className="bg-orange-900/20 rounded-lg p-4 mb-6">
          <h3 className="text-orange-300 font-semibold mb-2">Dynamic Programming Hint:</h3>
          <div className="flex justify-center space-x-2">
            {dp.map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-orange-700/50 rounded px-2 py-1 text-orange-200 text-xs">
                  DP[{index}] = {value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mb-4">
          {playerValue === maxValue ? (
            <div className="text-yellow-400 font-bold text-xl animate-bounce">
              🎉 Optimal Solution Found! 🎉
            </div>
          ) : (
            <div className="text-orange-300">
              Can you reach the maximum value of {maxValue}?
            </div>
          )}
        </div>

        <div className="flex justify-center space-x-4">
          <Button
            onClick={generateLevel}
            className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
          >
            🎲 New Challenge
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="border-orange-400/50 text-orange-300 hover:bg-orange-900/20"
          >
            ← Back to Peaks
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PuzzlePeaksGame;
