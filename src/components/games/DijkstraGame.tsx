
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface DijkstraGameProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const DijkstraGame: React.FC<DijkstraGameProps> = ({ onComplete, onClose }) => {
  const [grid, setGrid] = useState<number[][]>([]);
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const [targetPos, setTargetPos] = useState({ x: 4, y: 4 });
  const [totalCost, setTotalCost] = useState(0);
  const [path, setPath] = useState<{x: number, y: number}[]>([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    if (!showInstructions) {
      generateLevel();
    }
  }, [level, showInstructions]);

  const generateLevel = () => {
    const size = 5;
    const newGrid = Array(size).fill(null).map(() => 
      Array(size).fill(null).map(() => Math.floor(Math.random() * 9) + 1)
    );
    
    setGrid(newGrid);
    setPlayerPos({ x: 0, y: 0 });
    setTargetPos({ x: size-1, y: size-1 });
    setTotalCost(0);
    setPath([{ x: 0, y: 0 }]);
  };

  const movePlayer = (direction: string) => {
    let newX = playerPos.x;
    let newY = playerPos.y;
    
    switch (direction) {
      case 'up': newY = Math.max(0, newY - 1); break;
      case 'down': newY = Math.min(grid.length - 1, newY + 1); break;
      case 'left': newX = Math.max(0, newX - 1); break;
      case 'right': newX = Math.min(grid[0].length - 1, newX + 1); break;
    }
    
    if (newX !== playerPos.x || newY !== playerPos.y) {
      const moveCost = grid[newY][newX];
      setPlayerPos({ x: newX, y: newY });
      setTotalCost(prev => prev + moveCost);
      setPath(prev => [...prev, { x: newX, y: newY }]);
      
      if (newX === targetPos.x && newY === targetPos.y) {
        const efficiency = Math.max(200 - totalCost, 50);
        setScore(prev => prev + efficiency);
        
        setTimeout(() => {
          if (level < 3) {
            setLevel(prev => prev + 1);
          } else {
            onComplete(score + efficiency);
          }
        }, 1000);
      }
    }
  };

  if (showInstructions) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
        <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 backdrop-blur-md border-green-400/50 p-8 max-w-lg w-full mx-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-4">
              🛣️ Dijkstra's Path Finder
            </h2>
            <div className="space-y-4 text-green-200 mb-6">
              <div className="bg-green-900/20 rounded-lg p-4">
                <h3 className="font-semibold text-green-300 mb-2">How to Play:</h3>
                <ol className="text-left space-y-2 text-sm">
                  <li>1. Find the lowest-cost path to the target</li>
                  <li>2. Each cell has a movement cost (1-9)</li>
                  <li>3. Plan your route carefully to minimize total cost!</li>
                </ol>
              </div>
            </div>
            <Button
              onClick={() => setShowInstructions(false)}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold"
            >
              🚀 Start Navigation
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
      <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 backdrop-blur-md border-green-400/50 p-8 max-w-2xl w-full mx-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
            🛣️ Dijkstra's Path Finder
          </h2>
          <p className="text-green-200">Find the shortest weighted path to the target</p>
          <p className="text-green-300 text-sm mt-2">Level: {level}/3 | Total Cost: {totalCost} | Score: {score}</p>
        </div>

        <div className="mb-6">
          <div className="grid grid-cols-5 gap-1 justify-center max-w-xs mx-auto">
            {grid.map((row, y) =>
              row.map((cost, x) => (
                <div
                  key={`${x}-${y}`}
                  className={`w-12 h-12 border border-green-400/30 flex items-center justify-center text-sm font-bold ${
                    playerPos.x === x && playerPos.y === y ? 'bg-blue-400 text-white animate-pulse' : 
                    targetPos.x === x && targetPos.y === y ? 'bg-yellow-400 text-black animate-bounce' :
                    path.some(p => p.x === x && p.y === y) ? 'bg-green-400/50 text-white' :
                    'bg-gray-700 text-gray-300'
                  }`}
                >
                  {playerPos.x === x && playerPos.y === y ? '🚗' :
                   targetPos.x === x && targetPos.y === y ? '🎯' :
                   cost}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 max-w-48 mx-auto mb-6">
          <div></div>
          <Button onClick={() => movePlayer('up')} className="bg-green-600 hover:bg-green-700 text-white h-12">↑</Button>
          <div></div>
          <Button onClick={() => movePlayer('left')} className="bg-green-600 hover:bg-green-700 text-white h-12">←</Button>
          <div></div>
          <Button onClick={() => movePlayer('right')} className="bg-green-600 hover:bg-green-700 text-white h-12">→</Button>
          <div></div>
          <Button onClick={() => movePlayer('down')} className="bg-green-600 hover:bg-green-700 text-white h-12">↓</Button>
          <div></div>
        </div>

        <div className="flex justify-center space-x-4">
          <Button
            onClick={generateLevel}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
          >
            🎲 New Route
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="border-green-400/50 text-green-300 hover:bg-green-900/20"
          >
            ← Back to Galaxy
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default DijkstraGame;
