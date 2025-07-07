
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface GameInstructionsProps {
  title: string;
  instructions: string[];
  onStart: () => void;
  gameIcon: string;
  color: string;
}

const GameInstructions: React.FC<GameInstructionsProps> = ({ 
  title, 
  instructions, 
  onStart, 
  gameIcon, 
  color 
}) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
      <Card className={`bg-gradient-to-br ${color} backdrop-blur-md border-white/20 p-8 max-w-lg w-full mx-4`}>
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">{gameIcon}</div>
          <h2 className="text-3xl font-bold text-white mb-4">
            {title}
          </h2>
          <div className="space-y-3 text-white/90 mb-6">
            <h3 className="font-semibold text-lg">How to Play:</h3>
            <ol className="text-left space-y-2">
              {instructions.map((instruction, index) => (
                <li key={index} className="flex items-start">
                  <span className="font-bold mr-2">{index + 1}.</span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ol>
          </div>
          <Button
            onClick={onStart}
            className="bg-white/20 hover:bg-white/30 text-white font-semibold px-8 py-3 text-lg"
          >
            🚀 Start Game
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default GameInstructions;
