
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CoinChangeGameProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const CoinChangeGame: React.FC<CoinChangeGameProps> = ({ onComplete, onClose }) => {
  const [targetAmount, setTargetAmount] = useState(0);
  const [coins] = useState([1, 5, 10, 25]);
  const [selectedCoins, setSelectedCoins] = useState<number[]>([]);
  const [currentAmount, setCurrentAmount] = useState(0);
  const [minCoins, setMinCoins] = useState(0);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    if (!showInstructions) {
      generateLevel();
    }
  }, [level, showInstructions]);

  const generateLevel = () => {
    const target = Math.floor(Math.random() * 50) + 20 + (level * 10);
    setTargetAmount(target);
    setSelectedCoins([]);
    setCurrentAmount(0);
    
    // Calculate minimum coins needed using DP
    const minCoinsNeeded = calculateMinCoins(target, coins);
    setMinCoins(minCoinsNeeded);
  };

  const calculateMinCoins = (amount: number, coins: number[]): number => {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    
    for (let i = 1; i <= amount; i++) {
      for (const coin of coins) {
        if (coin <= i) {
          dp[i] = Math.min(dp[i], dp[i - coin] + 1);
        }
      }
    }
    
    return dp[amount] === Infinity ? -1 : dp[amount];
  };

  const addCoin = (coinValue: number) => {
    if (currentAmount + coinValue <= targetAmount) {
      setSelectedCoins(prev => [...prev, coinValue]);
      setCurrentAmount(prev => prev + coinValue);
      
      if (currentAmount + coinValue === targetAmount) {
        if (selectedCoins.length + 1 === minCoins) {
          setScore(prev => prev + 150);
          setTimeout(() => {
            if (level < 3) {
              setLevel(prev => prev + 1);
            } else {
              onComplete(score + 150);
            }
          }, 1000);
        } else {
          setScore(prev => prev + 50);
        }
      }
    }
  };

  const removeCoin = (index: number) => {
    const coinValue = selectedCoins[index];
    setSelectedCoins(prev => prev.filter((_, i) => i !== index));
    setCurrentAmount(prev => prev - coinValue);
  };

  if (showInstructions) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
        <Card className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 backdrop-blur-md border-yellow-400/50 p-8 max-w-lg w-full mx-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-4">
              🪙 Cosmic Coin Exchange
            </h2>
            <div className="space-y-4 text-yellow-200 mb-6">
              <div className="game-instructions">
                <h3 className="font-semibold text-yellow-300 mb-2">How to Play:</h3>
                <ol className="text-left space-y-2 text-sm">
                  <li>1. Make change for the target amount</li>
                  <li>2. Use minimum number of coins possible</li>
                  <li>3. Available coins: 1¢, 5¢, 10¢, 25¢</li>
                  <li>4. Click coins to add them, click selected coins to remove</li>
                </ol>
              </div>
            </div>
            <Button
              onClick={() => setShowInstructions(false)}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold"
            >
              🚀 Start Exchange
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
      <Card className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 backdrop-blur-md border-yellow-400/50 p-8 max-w-4xl w-full mx-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">
            🪙 Cosmic Coin Exchange
          </h2>
          <p className="text-yellow-200 game-text">Make change using minimum coins</p>
          <div className="game-score mt-2">
            Level: {level}/3 | Score: {score} | Target: {targetAmount}¢ | Current: {currentAmount}¢ | Min Coins: {minCoins}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-yellow-300 text-center mb-4 game-text">Available Coins:</h3>
          <div className="flex justify-center space-x-4">
            {coins.map((coin) => (
              <div
                key={coin}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 border-2 border-yellow-300 cursor-pointer hover:scale-110 transition-transform flex items-center justify-center text-white font-bold text-lg shadow-lg"
                onClick={() => addCoin(coin)}
              >
                {coin}¢
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-yellow-300 text-center mb-4 game-text">Selected Coins:</h3>
          <div className="min-h-20 bg-yellow-900/20 rounded-lg p-4 flex flex-wrap justify-center gap-2">
            {selectedCoins.map((coin, index) => (
              <div
                key={index}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-600 to-orange-600 border border-yellow-400 cursor-pointer hover:scale-105 transition-transform flex items-center justify-center text-white font-bold shadow-md"
                onClick={() => removeCoin(index)}
              >
                {coin}¢
              </div>
            ))}
            {selectedCoins.length === 0 && (
              <div className="game-text text-yellow-400 flex items-center">
                Click coins above to select them
              </div>
            )}
          </div>
          <div className="text-center mt-2 game-text text-yellow-300">
            Coins used: {selectedCoins.length} | Click selected coins to remove them
          </div>
        </div>

        <div className="text-center mb-4">
          {currentAmount === targetAmount ? (
            selectedCoins.length === minCoins ? (
              <div className="text-yellow-400 font-bold text-xl animate-bounce game-score">
                🎉 Perfect! Minimum coins used! 🎉
              </div>
            ) : (
              <div className="text-orange-400 font-bold text-lg game-score">
                ✅ Target reached! But try with fewer coins.
              </div>
            )
          ) : currentAmount > targetAmount ? (
            <div className="text-red-400 font-bold game-score">
              ❌ Amount exceeded! Remove some coins.
            </div>
          ) : (
            <div className="text-yellow-300 game-text">
              Need {targetAmount - currentAmount}¢ more to reach target
            </div>
          )}
        </div>

        <div className="flex justify-center space-x-4">
          <Button
            onClick={generateLevel}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
          >
            🎲 New Target
          </Button>
          <Button
            onClick={() => {setSelectedCoins([]); setCurrentAmount(0);}}
            className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700"
          >
            🔄 Reset
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="border-yellow-400/50 text-yellow-300 hover:bg-yellow-900/20"
          >
            ← Back to Peaks
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CoinChangeGame;
