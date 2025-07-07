
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ClimbingStairsGameProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const ClimbingStairsGame: React.FC<ClimbingStairsGameProps> = ({ onComplete, onClose }) => {
  const [stairs, setStairs] = useState(5);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [steps, setSteps] = useState<number[]>([]);
  const [totalWays, setTotalWays] = useState(0);
  const [playerWays, setPlayerWays] = useState(0);
  const [paths, setPaths] = useState<number[][]>([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    if (!showInstructions) {
      generateLevel();
    }
  }, [level, showInstructions]);

  const generateLevel = () => {
    const numStairs = 4 + level;
    setStairs(numStairs);
    setCurrentPosition(0);
    setSteps([]);
    setPaths([]);
    setPlayerWays(0);
    
    // Calculate total ways to climb stairs
    const ways = calculateWays(numStairs);
    setTotalWays(ways);
  };

  const calculateWays = (n: number): number => {
    if (n <= 1) return 1;
    if (n === 2) return 2;
    
    const dp = new Array(n + 1);
    dp[0] = 1;
    dp[1] = 1;
    dp[2] = 2;
    
    for (let i = 3; i <= n; i++) {
      dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
  };

  const takeStep = (stepSize: 1 | 2) => {
    if (currentPosition + stepSize <= stairs) {
      const newPosition = currentPosition + stepSize;
      const newSteps = [...steps, stepSize];
      
      setCurrentPosition(newPosition);
      setSteps(newSteps);
      
      if (newPosition === stairs) {
        // Path completed
        const newPaths = [...paths, newSteps];
        setPaths(newPaths);
        setPlayerWays(newPaths.length);
        
        // Reset for next path
        setCurrentPosition(0);
        setSteps([]);
        
        if (newPaths.length === totalWays) {
          setScore(prev => prev + 200);
          setTimeout(() => {
            if (level < 3) {
              setLevel(prev => prev + 1);
            } else {
              onComplete(score + 200);
            }
          }, 1000);
        }
      }
    }
  };

  const resetPath = () => {
    setCurrentPosition(0);
    setSteps([]);
  };

  if (showInstructions) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
        <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-md border-purple-400/50 p-8 max-w-lg w-full mx-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              🪜 Cosmic Stairway
            </h2>
            <div className="space-y-4 text-purple-200 mb-6">
              <div className="game-instructions">
                <h3 className="font-semibold text-purple-300 mb-2">How to Play:</h3>
                <ol className="text-left space-y-2 text-sm">
                  <li>1. Climb stairs by taking 1 or 2 steps at a time</li>
                  <li>2. Find ALL possible ways to reach the top</li>
                  <li>3. Each path must reach exactly the top step</li>
                  <li>4. Complete all unique paths to win</li>
                </ol>
              </div>
            </div>
            <Button
              onClick={() => setShowInstructions(false)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
            >
              🚀 Start Climbing
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
      <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-md border-purple-400/50 p-8 max-w-4xl w-full mx-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            🪜 Cosmic Stairway Challenge
          </h2>
          <p className="text-purple-200 game-text">Find all unique ways to climb {stairs} stairs</p>
          <div className="game-score mt-2">
            Level: {level}/3 | Score: {score} | Found: {playerWays}/{totalWays} ways
          </div>
        </div>

        <div className="mb-6">
          <div className="bg-purple-900/20 rounded-lg p-4">
            <h3 className="text-purple-300 text-center mb-4 game-text">Stairway:</h3>
            <div className="flex flex-col-reverse items-center space-y-2">
              {Array.from({ length: stairs + 1 }, (_, i) => (
                <div
                  key={i}
                  className={`w-16 h-8 border-2 border-purple-400 rounded flex items-center justify-center font-bold ${
                    i === currentPosition 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                      : i < currentPosition 
                        ? 'bg-purple-600/50 text-purple-200' 
                        : 'bg-purple-900/30 text-purple-400'
                  }`}
                >
                  {i === 0 ? '🧑' : i}
                </div>
              ))}
            </div>
            <div className="text-center mt-4 game-text text-purple-300">
              Current Position: {currentPosition} | Target: {stairs}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-purple-300 text-center mb-4 game-text">Current Path:</h3>
          <div className="bg-purple-900/20 rounded-lg p-4 min-h-16">
            {steps.length > 0 ? (
              <div className="text-center game-text text-purple-200">
                Steps: {steps.join(' → ')} (Total: {steps.reduce((a, b) => a + b, 0)})
              </div>
            ) : (
              <div className="text-center game-text text-purple-400">
                Start climbing by taking 1 or 2 steps
              </div>
            )}
          </div>
        </div>

        <div className="text-center mb-6">
          <div className="space-x-4">
            <Button
              onClick={() => takeStep(1)}
              disabled={currentPosition + 1 > stairs}
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold px-8 py-4 text-lg"
            >
              Take 1 Step
            </Button>
            <Button
              onClick={() => takeStep(2)}
              disabled={currentPosition + 2 > stairs}
              className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold px-8 py-4 text-lg"
            >
              Take 2 Steps
            </Button>
            <Button
              onClick={resetPath}
              className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold px-6 py-4"
            >
              🔄 Reset Path
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-purple-300 text-center mb-4 game-text">Discovered Paths:</h3>
          <div className="bg-purple-900/20 rounded-lg p-4 max-h-32 overflow-y-auto">
            {paths.length > 0 ? (
              paths.map((path, index) => (
                <div key={index} className="game-text text-purple-200 text-sm">
                  Path {index + 1}: {path.join(' → ')}
                </div>
              ))
            ) : (
              <div className="text-center game-text text-purple-400">
                No paths discovered yet
              </div>
            )}
          </div>
        </div>

        <div className="text-center mb-4">
          {playerWays === totalWays ? (
            <div className="text-pink-400 font-bold text-xl animate-bounce game-score">
              🎉 All paths discovered! Perfect! 🎉
            </div>
          ) : (
            <div className="text-purple-300 game-text">
              Keep exploring! {totalWays - playerWays} more paths to find
            </div>
          )}
        </div>

        <div className="flex justify-center space-x-4">
          <Button
            onClick={generateLevel}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            🎲 New Stairway
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="border-purple-400/50 text-purple-300 hover:bg-purple-900/20"
          >
            ← Back to Peaks
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ClimbingStairsGame;
