
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Item {
  id: number;
  name: string;
  weight: number;
  value: number;
}

interface KnapsackGameProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const KnapsackGame: React.FC<KnapsackGameProps> = ({ onComplete, onClose }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [capacity, setCapacity] = useState(50);
  const [currentWeight, setCurrentWeight] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [optimalValue, setOptimalValue] = useState(0);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    if (!showInstructions) {
      generateLevel();
    }
  }, [level, showInstructions]);

  const generateLevel = () => {
    const itemNames = ['💎 Diamond', '⚱️ Vase', '📚 Book', '🗝️ Key', '🏺 Artifact', '💰 Gold'];
    const newItems: Item[] = [];
    
    for (let i = 0; i < 6; i++) {
      newItems.push({
        id: i,
        name: itemNames[i],
        weight: Math.floor(Math.random() * 15) + 5,
        value: Math.floor(Math.random() * 30) + 10
      });
    }
    
    setItems(newItems);
    setCapacity(40 + level * 10);
    setSelectedItems([]);
    setCurrentWeight(0);
    setCurrentValue(0);
    
    // Calculate optimal solution using DP
    const optimal = solveKnapsack(newItems, 40 + level * 10);
    setOptimalValue(optimal);
  };

  const solveKnapsack = (items: Item[], capacity: number): number => {
    const n = items.length;
    const dp = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(0));
    
    for (let i = 1; i <= n; i++) {
      for (let w = 1; w <= capacity; w++) {
        if (items[i - 1].weight <= w) {
          dp[i][w] = Math.max(
            dp[i - 1][w],
            dp[i - 1][w - items[i - 1].weight] + items[i - 1].value
          );
        } else {
          dp[i][w] = dp[i - 1][w];
        }
      }
    }
    
    return dp[n][capacity];
  };

  const toggleItem = (itemId: number) => {
    const item = items[itemId];
    const isSelected = selectedItems.includes(itemId);
    
    if (isSelected) {
      setSelectedItems(prev => prev.filter(id => id !== itemId));
      setCurrentWeight(prev => prev - item.weight);
      setCurrentValue(prev => prev - item.value);
    } else {
      if (currentWeight + item.weight <= capacity) {
        setSelectedItems(prev => [...prev, itemId]);
        setCurrentWeight(prev => prev + item.weight);
        setCurrentValue(prev => prev + item.value);
        
        if (currentValue + item.value >= optimalValue * 0.9) {
          setScore(prev => prev + 100);
          setTimeout(() => {
            if (level < 3) {
              setLevel(prev => prev + 1);
            } else {
              onComplete(score + 100);
            }
          }, 1000);
        }
      }
    }
  };

  if (showInstructions) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
        <Card className="bg-gradient-to-br from-orange-900/30 to-red-900/30 backdrop-blur-md border-orange-400/50 p-8 max-w-lg w-full mx-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-4">
              🎒 Cosmic Knapsack
            </h2>
            <div className="space-y-4 text-orange-200 mb-6">
              <div className="game-instructions">
                <h3 className="font-semibold text-orange-300 mb-2">How to Play:</h3>
                <ol className="text-left space-y-2 text-sm">
                  <li>1. Select items to pack in your cosmic backpack</li>
                  <li>2. Each item has weight and value</li>
                  <li>3. Don't exceed the weight capacity</li>
                  <li>4. Maximize the total value of selected items</li>
                </ol>
              </div>
            </div>
            <Button
              onClick={() => setShowInstructions(false)}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold"
            >
              🚀 Start Packing
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
      <Card className="bg-gradient-to-br from-orange-900/30 to-red-900/30 backdrop-blur-md border-orange-400/50 p-8 max-w-4xl w-full mx-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
            🎒 Cosmic Knapsack Challenge
          </h2>
          <p className="text-orange-200 game-text">Pack items optimally within weight limit</p>
          <div className="game-score mt-2">
            Level: {level}/3 | Score: {score} | Capacity: {capacity}kg | Weight: {currentWeight}kg | Value: {currentValue}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {items.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                selectedItems.includes(item.id)
                  ? 'bg-gradient-to-br from-orange-500/30 to-red-500/30 border-orange-400 transform scale-105'
                  : 'bg-gradient-to-br from-orange-900/20 to-red-900/20 border-orange-600/50 hover:scale-105'
              } ${currentWeight + item.weight > capacity && !selectedItems.includes(item.id) ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => toggleItem(item.id)}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">{item.name}</div>
                <div className="game-text">
                  <div className="text-orange-300 text-sm">Weight: {item.weight}kg</div>
                  <div className="text-yellow-300 text-sm font-bold">Value: {item.value}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mb-4">
          {currentValue >= optimalValue * 0.9 ? (
            <div className="text-yellow-400 font-bold text-xl animate-bounce game-score">
              🎉 Excellent Packing! 🎉
            </div>
          ) : (
            <div className="game-text text-orange-300">
              Try to reach the optimal value! Target: ~{Math.floor(optimalValue * 0.9)}+
            </div>
          )}
        </div>

        <div className="flex justify-center space-x-4">
          <Button
            onClick={generateLevel}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
          >
            🎲 New Items
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

export default KnapsackGame;
