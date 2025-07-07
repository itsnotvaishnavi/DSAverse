
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface TheoryRecapProps {
  title: string;
  algorithm: string;
  timeComplexity: string;
  spaceComplexity: string;
  useCases: string[];
  onContinue: () => void;
  color: string;
}

const TheoryRecap: React.FC<TheoryRecapProps> = ({ 
  title, 
  algorithm, 
  timeComplexity, 
  spaceComplexity, 
  useCases, 
  onContinue, 
  color 
}) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
      <Card className={`bg-gradient-to-br ${color} backdrop-blur-md border-white/20 p-8 max-w-2xl w-full mx-4`}>
        <div className="text-center">
          <div className="text-4xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-white mb-2">
            🌠 Yay! You Completed the Level!
          </h2>
          <h3 className="text-xl text-white/90 mb-6">{title}</h3>
          
          <div className="bg-black/20 rounded-lg p-6 mb-6 text-left">
            <h4 className="text-white font-bold text-lg mb-4">Algorithm Theory:</h4>
            <div className="space-y-3 text-white/90">
              <div>
                <span className="font-semibold">Algorithm:</span> {algorithm}
              </div>
              <div>
                <span className="font-semibold">Time Complexity:</span> {timeComplexity}
              </div>
              <div>
                <span className="font-semibold">Space Complexity:</span> {spaceComplexity}
              </div>
              <div>
                <span className="font-semibold">Real-world Use Cases:</span>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  {useCases.map((useCase, index) => (
                    <li key={index}>{useCase}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <Button
            onClick={onContinue}
            className="bg-white/20 hover:bg-white/30 text-white font-semibold px-8 py-3 text-lg"
          >
            ✨ Continue Learning
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default TheoryRecap;
