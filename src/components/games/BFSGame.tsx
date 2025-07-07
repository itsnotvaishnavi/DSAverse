
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface BFSGameProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const BFSGame: React.FC<BFSGameProps> = ({ onComplete, onClose }) => {
  const [grid, setGrid] = useState<string[][]>([]);
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const [exitPos, setExitPos] = useState({ x: 4, y: 4 });
  const [firePositions, setFirePositions] = useState<{x: number, y: number}[]>([]);
  const [moves, setMoves] = useState(0);
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
    
    // Add some obstacles
    for (let i = 0; i < size * size * 0.2; i++) {
      const x = Math.floor(Math.random() * size);
      const y = Math.floor(Math.random() * size);
      if ((x !== 0 || y !== 0) && (x !== size-1 || y !== size-1)) {
        newGrid[y][x] = 'wall';
      }
    }
    
    // Add fire positions
    const fires = [];
    for (let i = 0; i < 3; i++) {
      const x = Math.floor(Math.random() * size);
      const y = Math.floor(Math.random() * size);
      if ((x !== 0 || y !== 0) && (x !== size-1 || y !== size-1) && newGrid[y][x] !== 'wall') {
        fires.push({ x, y });
      }
    }
    
    setGrid(newGrid);
    setPlayerPos({ x: 0, y: 0 });
    setExitPos({ x: size-1, y: size-1 });
    setFirePositions(fires);
    setMoves(0);
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
    
    if (grid[newY][newX] !== 'wall' && !firePositions.some(f => f.x === newX && f.y === newY)) {
      setPlayerPos({ x: newX, y: newY });
      setMoves(prev => prev + 1);
      
      if (newX === exitPos.x && newY === exitPos.y) {
        const levelScore = Math.max(100 - moves * 5, 20);
        setScore(prev => prev + levelScore);
        
        setTimeout(() => {
          if (level < 3) {
            setLevel(prev => prev + 1);
          } else {
            onComplete(score + levelScore);
          }
        }, 1000);
      }
    }
  };

  if (showInstructions) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
        <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-md border-blue-400/50 p-8 max-w-lg w-full mx-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              🌊 BFS Fire Escape
            </h2>
            <div className="space-y-4 text-blue-200 mb-6">
              <div className="bg-blue-900/20 rounded-lg p-4">
                <h3 className="font-semibold text-blue-300 mb-2">How to Play:</h3>
                <ol className="text-left space-y-2 text-sm">
                  <li>1. Find the shortest path to the exit</li>
                  <li>2. Avoid fire zones (they'll block your path)</li>
                  <li>3. Use BFS strategy - explore level by level!</li>
                </ol>
              </div>
            </div>
            <Button
              onClick={() => setShowInstructions(false)}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold"
            >
              🚀 Start Escaping
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
      <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-md border-blue-400/50 p-8 max-w-2xl w-full mx-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            🌊 BFS Fire Escape
          </h2>
          <p className="text-blue-200">Find the shortest path to escape the fire</p>
          <p className="text-blue-300 text-sm mt-2">Level: {level}/3 | Moves: {moves} | Score: {score}</p>
        </div>

        <div className="mb-6">
          <div className="grid grid-cols-5 gap-1 justify-center max-w-xs mx-auto">
            {grid.map((row, y) =>
              row.map((cell, x) => (
                <div
                  key={`${x}-${y}`}
                  className={`w-12 h-12 border border-blue-400/30 flex items-center justify-center text-lg ${
                    cell === 'wall' ? 'bg-gray-800 text-gray-200' : 'bg-blue-900/20'
                  } ${
                    playerPos.x === x && playerPos.y === y ? 'bg-green-400 animate-pulse' : ''
                  } ${
                    exitPos.x === x && exitPos.y === y ? 'bg-yellow-400 animate-bounce' : ''
                  } ${
                    firePositions.some(f => f.x === x && f.y === y) ? 'bg-red-500 animate-pulse' : ''
                  }`}
                >
                  {cell === 'wall' && '🧱'}
                  {playerPos.x === x && playerPos.y === y && '🏃'}
                  {exitPos.x === x && exitPos.y === y && '🚪'}
                  {firePositions.some(f => f.x === x && f.y === y) && '🔥'}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 max-w-48 mx-auto mb-6">
          <div></div>
          <Button onClick={() => movePlayer('up')} className="bg-blue-600 hover:bg-blue-700 text-white h-12">↑</Button>
          <div></div>
          <Button onClick={() => movePlayer('left')} className="bg-blue-600 hover:bg-blue-700 text-white h-12">←</Button>
          <div></div>
          <Button onClick={() => movePlayer('right')} className="bg-blue-600 hover:bg-blue-700 text-white h-12">→</Button>
          <div></div>
          <Button onClick={() => movePlayer('down')} className="bg-blue-600 hover:bg-blue-700 text-white h-12">↓</Button>
          <div></div>
        </div>

        <div className="flex justify-center space-x-4">
          <Button
            onClick={generateLevel}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
          >
            🎲 New Escape
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="border-blue-400/50 text-blue-300 hover:bg-blue-900/20"
          >
            ← Back to Galaxy
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default BFSGame;
