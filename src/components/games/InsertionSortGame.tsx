import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface InsertionSortGameProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const InsertionSortGame: React.FC<InsertionSortGameProps> = ({ onComplete, onClose }) => {
  const [cookies, setCookies] = useState<number[]>([]);
  const [sortedCookies, setSortedCookies] = useState<number[]>([]);
  const [currentCookie, setCurrentCookie] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    if (!showInstructions) {
      generateLevel();
    }
  }, [level, showInstructions]);

  const generateLevel = () => {
    const newCookies = Array.from({ length: 6 }, () => Math.floor(Math.random() * 20) + 1);
    setCookies(newCookies);
    setSortedCookies([]);
    setCurrentCookie(null);
  };

  const takeCookie = () => {
    if (cookies.length > 0) {
      const cookie = cookies[0];
      setCurrentCookie(cookie);
      setCookies(prev => prev.slice(1));
    }
  };

  const insertCookie = (position: number) => {
    if (currentCookie === null) return;

    const newSorted = [...sortedCookies];
    newSorted.splice(position, 0, currentCookie);
    
    // Check if insertion is correct
    const isCorrect = newSorted.every((val, i) => i === 0 || val >= newSorted[i - 1]);
    
    if (isCorrect) {
      setScore(prev => prev + 10);
      setSortedCookies(newSorted);
    } else {
      setScore(prev => Math.max(0, prev - 5));
      setSortedCookies(newSorted); // Allow incorrect placement for learning
    }
    
    setCurrentCookie(null);
    
    if (cookies.length === 0 && currentCookie !== null) {
      setTimeout(() => {
        if (level < 3) {
          setLevel(prev => prev + 1);
        } else {
          onComplete(score + 50);
        }
      }, 1000);
    }
  };

  if (showInstructions) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
        <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-md border-blue-400/50 p-8 max-w-lg w-full mx-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              🍪 Cookie Insertion Bakery
            </h2>
            <div className="space-y-4 text-blue-200 mb-6">
              <div className="bg-blue-900/20 rounded-lg p-4">
                <h3 className="font-semibold text-blue-300 mb-2">How to Play:</h3>
                <ol className="text-left space-y-2 text-sm">
                  <li>1. Take one cookie from the unsorted batch</li>
                  <li>2. Find the correct position in the sorted tray</li>
                  <li>3. Insert it to keep cookies in ascending order</li>
                </ol>
              </div>
            </div>
            <Button
              onClick={() => setShowInstructions(false)}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold"
            >
              🚀 Start Baking
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
      <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-md border-blue-400/50 p-8 max-w-4xl w-full mx-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            🍪 Cookie Insertion Bakery
          </h2>
          <p className="text-blue-200">Insert each cookie in the right position to keep them sorted</p>
          <p className="text-blue-300 text-sm mt-2">Level: {level}/3 | Score: {score}</p>
        </div>

        <div className="space-y-6">
          {/* Unsorted Cookies */}
          <div className="text-center">
            <h3 className="text-blue-300 font-semibold mb-3">Unsorted Batch 🥧</h3>
            <div className="bg-blue-900/20 rounded-lg p-4 border-2 border-blue-400/30">
              <div className="flex justify-center gap-2">
                {cookies.map((cookie, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg w-12 h-12 flex items-center justify-center text-white font-bold"
                  >
                    {cookie}
                  </div>
                ))}
              </div>
              <Button
                onClick={takeCookie}
                disabled={cookies.length === 0 || currentCookie !== null}
                className="mt-3 bg-blue-600 hover:bg-blue-700"
              >
                Take Next Cookie
              </Button>
            </div>
          </div>

          {/* Current Cookie */}
          {currentCookie && (
            <div className="text-center">
              <h3 className="text-cyan-300 font-semibold mb-3">Current Cookie 🍪</h3>
              <div className="bg-cyan-900/20 rounded-lg p-4 border-2 border-cyan-400/30">
                <div className="bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full w-16 h-16 flex items-center justify-center text-white font-bold text-xl mx-auto animate-pulse">
                  {currentCookie}
                </div>
              </div>
            </div>
          )}

          {/* Sorted Tray */}
          <div className="text-center">
            <h3 className="text-cyan-300 font-semibold mb-3">Sorted Tray 🏆</h3>
            <div className="bg-yellow-900/20 rounded-lg p-4 border-2 border-yellow-400/30 min-h-20">
              <div className="flex justify-center gap-2 items-center">
                {sortedCookies.map((cookie, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {currentCookie && (
                      <Button
                        onClick={() => insertCookie(index)}
                        className="w-8 h-8 bg-green-500 hover:bg-green-600 text-white text-xs p-0"
                      >
                        +
                      </Button>
                    )}
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg w-12 h-12 flex items-center justify-center text-white font-bold">
                      {cookie}
                    </div>
                  </div>
                ))}
                {currentCookie && (
                  <Button
                    onClick={() => insertCookie(sortedCookies.length)}
                    className="w-8 h-8 bg-green-500 hover:bg-green-600 text-white text-xs p-0"
                  >
                    +
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mt-6">
          <Button
            onClick={generateLevel}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
          >
            🎲 New Batch
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="border-blue-400/50 text-blue-300 hover:bg-blue-900/20"
          >
            ← Back to Realm
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default InsertionSortGame;
