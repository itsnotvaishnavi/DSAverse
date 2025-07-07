
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import GameInstructions from '../shared/GameInstructions';
import TheoryRecap from '../shared/TheoryRecap';

interface NQueensGameProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const NQueensGame: React.FC<NQueensGameProps> = ({ onComplete, onClose }) => {
  const [boardSize, setBoardSize] = useState(4);
  const [board, setBoard] = useState<boolean[][]>([]);
  const [queens, setQueens] = useState<{row: number, col: number}[]>([]);
  const [score, setScore] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);
  const [showTheory, setShowTheory] = useState(false);

  useEffect(() => {
    if (!showInstructions) {
      resetBoard();
    }
  }, [showInstructions, boardSize]);

  const resetBoard = () => {
    const newBoard = Array(boardSize).fill(null).map(() => Array(boardSize).fill(false));
    setBoard(newBoard);
    setQueens([]);
  };

  const isValidPlacement = (row: number, col: number, currentQueens: {row: number, col: number}[]) => {
    for (const queen of currentQueens) {
      // Check row and column
      if (queen.row === row || queen.col === col) return false;
      
      // Check diagonals
      if (Math.abs(queen.row - row) === Math.abs(queen.col - col)) return false;
    }
    return true;
  };

  const placeQueen = (row: number, col: number) => {
    if (board[row][col]) {
      // Remove queen
      const newQueens = queens.filter(q => !(q.row === row && q.col === col));
      const newBoard = [...board];
      newBoard[row][col] = false;
      setQueens(newQueens);
      setBoard(newBoard);
      setScore(prev => Math.max(0, prev - 10));
    } else {
      // Add queen if valid
      if (isValidPlacement(row, col, queens)) {
        const newQueens = [...queens, { row, col }];
        const newBoard = [...board];
        newBoard[row][col] = true;
        setQueens(newQueens);
        setBoard(newBoard);
        setScore(prev => prev + 20);
        
        // Check if puzzle is solved
        if (newQueens.length === boardSize) {
          setScore(prev => prev + 100);
          setTimeout(() => setShowTheory(true), 1000);
        }
      } else {
        setScore(prev => Math.max(0, prev - 5));
      }
    }
  };

  if (showInstructions) {
    return (
      <GameInstructions
        title="N-Queens Challenge"
        instructions={[
          "Place queens on the board so none can attack each other",
          "Queens attack horizontally, vertically, and diagonally",
          "Click squares to place/remove queens"
        ]}
        onStart={() => setShowInstructions(false)}
        gameIcon="👑"
        color="from-purple-900/30 to-pink-900/30"
      />
    );
  }

  if (showTheory) {
    return (
      <TheoryRecap
        title="N-Queens Challenge Solved!"
        algorithm="Backtracking algorithm that tries placing queens one by one and backtracks when no valid placement is found."
        timeComplexity="O(N!) - factorial time in worst case"
        spaceComplexity="O(N) - storing queen positions"
        useCases={[
          "Constraint satisfaction problems",
          "Game AI and puzzle solving",
          "Resource allocation with conflicts"
        ]}
        onContinue={() => onComplete(score)}
        color="from-purple-900/30 to-pink-900/30"
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
      <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-md border-purple-400/50 p-8 max-w-3xl w-full mx-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            👑 N-Queens Challenge
          </h2>
          <p className="text-purple-200">Place {boardSize} queens without conflicts</p>
          <p className="text-purple-300 text-sm mt-2">Queens placed: {queens.length}/{boardSize} | Score: {score}</p>
        </div>

        <div className="flex justify-center mb-6">
          <div 
            className="grid gap-1 bg-purple-900/20 p-4 rounded-lg"
            style={{ gridTemplateColumns: `repeat(${boardSize}, 1fr)` }}
          >
            {board.map((row, rowIndex) =>
              row.map((hasQueen, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`w-12 h-12 border border-purple-400/30 cursor-pointer transition-all duration-300 flex items-center justify-center ${
                    (rowIndex + colIndex) % 2 === 0 ? 'bg-purple-800/50' : 'bg-purple-700/50'
                  } hover:bg-purple-600/70`}
                  onClick={() => placeQueen(rowIndex, colIndex)}
                >
                  {hasQueen && <span className="text-2xl">👑</span>}
                </div>
              ))
            )}
          </div>
        </div>

        {queens.length === boardSize && (
          <div className="text-center text-yellow-400 font-bold text-xl mb-4 animate-bounce">
            🎉 All Queens Placed Successfully! 🎉
          </div>
        )}

        <div className="flex justify-center space-x-4 mb-4">
          <Button
            onClick={() => setBoardSize(4)}
            className={`${boardSize === 4 ? 'bg-purple-600' : 'bg-purple-800'} hover:bg-purple-700`}
          >
            4×4
          </Button>
          <Button
            onClick={() => setBoardSize(6)}
            className={`${boardSize === 6 ? 'bg-purple-600' : 'bg-purple-800'} hover:bg-purple-700`}
          >
            6×6
          </Button>
          <Button
            onClick={() => setBoardSize(8)}
            className={`${boardSize === 8 ? 'bg-purple-600' : 'bg-purple-800'} hover:bg-purple-700`}
          >
            8×8
          </Button>
        </div>

        <div className="flex justify-center space-x-4">
          <Button
            onClick={resetBoard}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            🎲 Reset Board
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="border-purple-400/50 text-purple-300 hover:bg-purple-900/20"
          >
            ← Back to Forest
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default NQueensGame;
