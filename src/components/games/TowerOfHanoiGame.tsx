
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import GameInstructions from '../shared/GameInstructions';
import TheoryRecap from '../shared/TheoryRecap';

interface TowerOfHanoiGameProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const TowerOfHanoiGame: React.FC<TowerOfHanoiGameProps> = ({ onComplete, onClose }) => {
  const [towers, setTowers] = useState<number[][]>([[], [], []]);
  const [selectedTower, setSelectedTower] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [diskCount, setDiskCount] = useState(3);
  const [showInstructions, setShowInstructions] = useState(true);
  const [showTheory, setShowTheory] = useState(false);

  useEffect(() => {
    if (!showInstructions) {
      resetGame();
    }
  }, [showInstructions, diskCount]);

  const resetGame = () => {
    const initialTower = Array.from({ length: diskCount }, (_, i) => diskCount - i);
    setTowers([initialTower, [], []]);
    setSelectedTower(null);
    setMoves(0);
  };

  const selectTower = (towerIndex: number) => {
    if (selectedTower === null) {
      // Select source tower
      if (towers[towerIndex].length > 0) {
        setSelectedTower(towerIndex);
      }
    } else {
      // Move disk
      if (selectedTower === towerIndex) {
        // Deselect
        setSelectedTower(null);
      } else {
        const sourceTower = towers[selectedTower];
        const targetTower = towers[towerIndex];
        
        if (sourceTower.length > 0) {
          const disk = sourceTower[sourceTower.length - 1];
          
          // Check if move is valid
          if (targetTower.length === 0 || disk < targetTower[targetTower.length - 1]) {
            const newTowers = [...towers];
            newTowers[selectedTower] = sourceTower.slice(0, -1);
            newTowers[towerIndex] = [...targetTower, disk];
            
            setTowers(newTowers);
            setMoves(prev => prev + 1);
            setScore(prev => prev + 5);
            
            // Check if puzzle is solved
            if (newTowers[2].length === diskCount) {
              const bonus = Math.max(100 - moves * 5, 50);
              setScore(prev => prev + bonus);
              setTimeout(() => setShowTheory(true), 1000);
            }
          }
        }
        setSelectedTower(null);
      }
    }
  };

  const getDiskColor = (size: number) => {
    const colors = [
      'bg-red-500',
      'bg-blue-500', 
      'bg-green-500',
      'bg-yellow-500',
      'bg-purple-500'
    ];
    return colors[size - 1] || 'bg-gray-500';
  };

  if (showInstructions) {
    return (
      <GameInstructions
        title="Tower of Hanoi"
        instructions={[
          "Move all disks from left tower to right tower",
          "Click a tower to select, click another to move top disk",
          "Only smaller disks can be placed on larger ones"
        ]}
        onStart={() => setShowInstructions(false)}
        gameIcon="🗼"
        color="from-orange-900/30 to-red-900/30"
      />
    );
  }

  if (showTheory) {
    return (
      <TheoryRecap
        title="Tower of Hanoi Mastered!"
        algorithm="Recursive algorithm: Move n-1 disks to auxiliary rod, move largest disk to destination, move n-1 disks from auxiliary to destination."
        timeComplexity="O(2^n) - exponential growth with number of disks"
        spaceComplexity="O(n) - recursive call stack depth"
        useCases={[
          "Understanding recursion and mathematical induction",
          "Backup and restore procedures in computing",
          "Parsing nested structures"
        ]}
        onContinue={() => onComplete(score)}
        color="from-orange-900/30 to-red-900/30"
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
      <Card className="bg-gradient-to-br from-orange-900/30 to-red-900/30 backdrop-blur-md border-orange-400/50 p-8 max-w-4xl w-full mx-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
            🗼 Tower of Hanoi
          </h2>
          <p className="text-orange-200">Move all disks to the rightmost tower</p>
          <p className="text-orange-300 text-sm mt-2">Moves: {moves} | Score: {score}</p>
        </div>

        <div className="flex justify-center space-x-8 mb-6">
          {towers.map((tower, towerIndex) => (
            <div
              key={towerIndex}
              className={`w-32 h-48 border-4 rounded-lg cursor-pointer transition-all duration-300 ${
                selectedTower === towerIndex 
                  ? 'border-yellow-400 bg-yellow-400/20' 
                  : 'border-orange-400/50 hover:border-orange-400'
              }`}
              onClick={() => selectTower(towerIndex)}
            >
              <div className="h-full flex flex-col-reverse items-center justify-start p-2">
                {tower.map((disk, diskIndex) => (
                  <div
                    key={diskIndex}
                    className={`h-6 rounded mb-1 ${getDiskColor(disk)} transition-all duration-300`}
                    style={{ width: `${20 + disk * 15}px` }}
                  />
                ))}
              </div>
              <div className="text-center text-orange-300 text-sm mt-2">
                Tower {towerIndex + 1}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mb-4">
          <p className="text-orange-300 text-sm">
            Target: {Math.pow(2, diskCount) - 1} moves | Current: {moves}
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          <Button
            onClick={() => setDiskCount(3)}
            className={`${diskCount === 3 ? 'bg-orange-600' : 'bg-orange-800'} hover:bg-orange-700`}
          >
            3 Disks
          </Button>
          <Button
            onClick={() => setDiskCount(4)}
            className={`${diskCount === 4 ? 'bg-orange-600' : 'bg-orange-800'} hover:bg-orange-700`}
          >
            4 Disks
          </Button>
          <Button
            onClick={resetGame}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
          >
            🎲 Reset
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="border-orange-400/50 text-orange-300 hover:bg-orange-900/20"
          >
            ← Back to Forest
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default TowerOfHanoiGame;
