
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface DFSGameProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const DFSGame: React.FC<DFSGameProps> = ({ onComplete, onClose }) => {
  const [grid, setGrid] = useState<string[][]>([]);
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const [treasurePos, setTreasurePos] = useState({ x: 4, y: 4 });
  const [visited, setVisited] = useState<{x: number, y: number}[]>([]);
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
    const newGrid = Array(size).fill(null).map(() => Array(size).fill('empty'));
    
    // Add some walls
    for (let i = 0; i < size * size * 0.3; i++) {
      const x = Math.floor(Math.random() * size);
      const y = Math.floor(Math.random() * size);
      if ((x !== 0 || y !== 0) && (x !== size-1 || y !== size-1)) {
        newGrid[y][x] = 'wall';
      }
    }
    
    setGrid(newGrid);
    setPlayerPos({ x: 0, y: 0 });
    setTreasurePos({ x: size-1, y: size-1 });
    setVisited([{ x: 0, y: 0 }]);
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
    
    if (grid[newY][newX] !== 'wall') {
      setPlayerPos({ x: newX, y: newY });
      
      if (!visited.some(v => v.x === newX && v.y === newY)) {
        setVisited(prev => [...prev, { x: newX, y: newY }]);
        setScore(prev => prev + 10);
      }
      
      if (newX === treasurePos.x && newY === treasurePos.y) {
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
  };

  if (showInstructions) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
        <Card className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 backdrop-blur-md border-purple-400/50 p-8 max-w-lg w-full mx-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-4">
              🕳️ DFS Cave Explorer
            </h2>
            <div className="space-y-4 text-purple-200 mb-6">
              <div className="bg-purple-900/20 rounded-lg p-4">
                <h3 className="font-semibold text-purple-300 mb-2">How to Play:</h3>
                <ol className="text-left space-y-2 text-sm">
                  <li>1. Navigate deep into the cave using DFS strategy</li>
                  <li>2. Explore as far as possible before backtracking</li>
                  <li>3. Find the treasure hidden in the deepest corner!</li>
                </ol>
              </div>
            </div>
            <Button
              onClick={() => setShowInstructions(false)}
              className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold"
            >
              🚀 Start Exploring
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
      <Card className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 backdrop-blur-md border-purple-400/50 p-8 max-w-2xl w-full mx-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-2">
            🕳️ DFS Cave Explorer
          </h2>
          <p className="text-purple-200">Navigate deep into the cave to find the treasure</p>
          <p className="text-purple-300 text-sm mt-2">Level: {level}/3 | Score: {score}</p>
        </div>

        <div className="mb-6">
          <div className="grid grid-cols-5 gap-1 justify-center max-w-xs mx-auto">
            {grid.map((row, y) =>
              row.map((cell, x) => (
                <div
                  key={`${x}-${y}`}
                  className={`w-12 h-12 border border-purple-400/30 flex items-center justify-center text-lg ${
                    cell === 'wall' ? 'bg-purple-800 text-purple-200' : 'bg-purple-900/20'
                  } ${
                    playerPos.x === x && playerPos.y === y ? 'bg-yellow-400 animate-pulse' : ''
                  } ${
                    treasurePos.x === x && treasurePos.y === y ? 'bg-green-400 animate-bounce' : ''
                  } ${
                    visited.some(v => v.x === x && v.y === y) && !(playerPos.x === x && playerPos.y === y) ? 'bg-blue-400/50' : ''
                  }`}
                >
                  {cell === 'wall' && '🪨'}
                  {playerPos.x === x && playerPos.y === y && '🧗'}
                  {treasurePos.x === x && treasurePos.y === y && '💎'}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 max-w-48 mx-auto mb-6">
          <div></div>
          <Button onClick={() => movePlayer('up')} className="bg-purple-600 hover:bg-purple-700 text-white h-12">↑</Button>
          <div></div>
          <Button onClick={() => movePlayer('left')} className="bg-purple-600 hover:bg-purple-700 text-white h-12">←</Button>
          <div></div>
          <Button onClick={() => movePlayer('right')} className="bg-purple-600 hover:bg-purple-700 text-white h-12">→</Button>
          <div></div>
          <Button onClick={() => movePlayer('down')} className="bg-purple-600 hover:bg-purple-700 text-white h-12">↓</Button>
          <div></div>
        </div>

        <div className="flex justify-center space-x-4">
          <Button
            onClick={generateLevel}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
          >
            🎲 New Cave
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="border-purple-400/50 text-purple-300 hover:bg-purple-900/20"
          >
            ← Back to Galaxy
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default DFSGame;
