
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface GraphMazeGameProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const GraphMazeGame: React.FC<GraphMazeGameProps> = ({ onComplete, onClose }) => {
  const [maze, setMaze] = useState<string[][]>([]);
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const [targetPos, setTargetPos] = useState({ x: 4, y: 4 });
  const [path, setPath] = useState<{x: number, y: number}[]>([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    generateMaze();
  }, [level]);

  const generateMaze = () => {
    const size = 5;
    const newMaze = Array(size).fill(null).map(() => Array(size).fill('empty'));
    
    // Add some walls randomly
    for (let i = 0; i < size * size * 0.2; i++) {
      const x = Math.floor(Math.random() * size);
      const y = Math.floor(Math.random() * size);
      if ((x !== 0 || y !== 0) && (x !== size-1 || y !== size-1)) {
        newMaze[y][x] = 'wall';
      }
    }
    
    setMaze(newMaze);
    setPlayerPos({ x: 0, y: 0 });
    setTargetPos({ x: size-1, y: size-1 });
    setPath([{ x: 0, y: 0 }]);
    setMoves(0);
  };

  const movePlayer = (direction: string) => {
    let newX = playerPos.x;
    let newY = playerPos.y;
    
    switch (direction) {
      case 'up': newY = Math.max(0, newY - 1); break;
      case 'down': newY = Math.min(maze.length - 1, newY + 1); break;
      case 'left': newX = Math.max(0, newX - 1); break;
      case 'right': newX = Math.min(maze[0].length - 1, newX + 1); break;
    }
    
    if (maze[newY][newX] !== 'wall') {
      setPlayerPos({ x: newX, y: newY });
      setPath(prev => [...prev, { x: newX, y: newY }]);
      setMoves(prev => prev + 1);
      
      if (newX === targetPos.x && newY === targetPos.y) {
        const levelScore = Math.max(50 - moves, 10);
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

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
      <Card className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 backdrop-blur-md border-purple-400/50 p-8 max-w-2xl w-full mx-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-2">
            🌌 Cosmic Maze Navigator
          </h2>
          <p className="text-purple-200">Navigate through the cosmic maze to reach the target</p>
          <p className="text-purple-300 text-sm mt-2">Level: {level}/3 | Score: {score} | Moves: {moves}</p>
        </div>

        <div className="mb-6">
          <div className="grid grid-cols-5 gap-1 justify-center max-w-xs mx-auto">
            {maze.map((row, y) =>
              row.map((cell, x) => (
                <div
                  key={`${x}-${y}`}
                  className={`w-12 h-12 border border-purple-400/30 flex items-center justify-center text-lg ${
                    cell === 'wall' ? 'bg-purple-800 text-purple-200' : 'bg-purple-900/20'
                  } ${
                    playerPos.x === x && playerPos.y === y ? 'bg-yellow-400 animate-pulse' : ''
                  } ${
                    targetPos.x === x && targetPos.y === y ? 'bg-green-400 animate-bounce' : ''
                  } ${
                    path.some(p => p.x === x && p.y === y) && !(playerPos.x === x && playerPos.y === y) ? 'bg-blue-400/30' : ''
                  }`}
                >
                  {cell === 'wall' && '🪨'}
                  {playerPos.x === x && playerPos.y === y && '🚀'}
                  {targetPos.x === x && targetPos.y === y && '🎯'}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 max-w-48 mx-auto mb-6">
          <div></div>
          <Button
            onClick={() => movePlayer('up')}
            className="bg-purple-600 hover:bg-purple-700 text-white h-12"
          >
            ↑
          </Button>
          <div></div>
          <Button
            onClick={() => movePlayer('left')}
            className="bg-purple-600 hover:bg-purple-700 text-white h-12"
          >
            ←
          </Button>
          <div></div>
          <Button
            onClick={() => movePlayer('right')}
            className="bg-purple-600 hover:bg-purple-700 text-white h-12"
          >
            →
          </Button>
          <div></div>
          <Button
            onClick={() => movePlayer('down')}
            className="bg-purple-600 hover:bg-purple-700 text-white h-12"
          >
            ↓
          </Button>
          <div></div>
        </div>

        <div className="flex justify-center space-x-4">
          <Button
            onClick={generateMaze}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
          >
            🎲 New Maze
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

export default GraphMazeGame;
