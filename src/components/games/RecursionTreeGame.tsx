
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface TreeNode {
  id: string;
  value: number;
  children: TreeNode[];
  cut: boolean;
  x: number;
  y: number;
}

interface RecursionTreeGameProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const RecursionTreeGame: React.FC<RecursionTreeGameProps> = ({ onComplete, onClose }) => {
  const [tree, setTree] = useState<TreeNode | null>(null);
  const [targetSum, setTargetSum] = useState(0);
  const [currentSum, setCurrentSum] = useState(0);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    if (!showInstructions) {
      generateTree();
    }
  }, [level, showInstructions]);

  const generateTree = () => {
    const createNode = (depth: number, maxDepth: number, nodeX: number, nodeY: number): TreeNode => {
      const value = Math.floor(Math.random() * 10) + 1;
      const children: TreeNode[] = [];
      
      if (depth < maxDepth) {
        const numChildren = Math.floor(Math.random() * 3) + 1;
        const spacing = 100 / (numChildren + 1);
        
        for (let i = 0; i < numChildren; i++) {
          const childX = nodeX + (i - (numChildren - 1) / 2) * spacing;
          const childY = nodeY + 80;
          children.push(createNode(depth + 1, maxDepth, childX, childY));
        }
      }
      
      return {
        id: Math.random().toString(36).substr(2, 9),
        value,
        children,
        cut: false,
        x: nodeX,
        y: nodeY
      };
    };

    const newTree = createNode(0, 3, 200, 50);
    const sum = calculateTreeSum(newTree);
    
    setTree(newTree);
    setTargetSum(Math.floor(sum * 0.6));
    setCurrentSum(sum);
  };

  const calculateTreeSum = (node: TreeNode): number => {
    if (node.cut) return 0;
    return node.value + node.children.reduce((sum, child) => sum + calculateTreeSum(child), 0);
  };

  const cutBranch = (nodeId: string) => {
    const cutNode = (node: TreeNode): TreeNode => {
      if (node.id === nodeId) {
        return { ...node, cut: true };
      }
      return {
        ...node,
        children: node.children.map(child => cutNode(child))
      };
    };

    if (tree) {
      const newTree = cutNode(tree);
      const newSum = calculateTreeSum(newTree);
      setTree(newTree);
      setCurrentSum(newSum);
      
      if (Math.abs(newSum - targetSum) <= 2) {
        setScore(prev => prev + 50);
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

  const renderTree = (node: TreeNode): React.ReactNode => {
    if (!node) return null;
    
    return (
      <g key={node.id}>
        {/* Branches to children */}
        {node.children.map((child) => (
          <line
            key={`line-${child.id}`}
            x1={node.x}
            y1={node.y + 20}
            x2={child.x}
            y2={child.y - 20}
            stroke={node.cut || child.cut ? "#666" : "#10B981"}
            strokeWidth="2"
          />
        ))}
        
        {/* Node */}
        <circle
          cx={node.x}
          cy={node.y}
          r="20"
          fill={node.cut ? "#666" : "#10B981"}
          stroke="#059669"
          strokeWidth="2"
          className="cursor-pointer hover:stroke-4 transition-all"
          onClick={() => !node.cut && cutBranch(node.id)}
        />
        <text
          x={node.x}
          y={node.y + 5}
          textAnchor="middle"
          fill="white"
          fontSize="12"
          fontWeight="bold"
          className="pointer-events-none"
        >
          {node.value}
        </text>
        
        {/* Render children */}
        {node.children.map(child => renderTree(child))}
      </g>
    );
  };

  if (showInstructions) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
        <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 backdrop-blur-md border-green-400/50 p-8 max-w-lg w-full mx-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-4">
              🌲 Recursive Tree Pruning
            </h2>
            <div className="space-y-4 text-green-200 mb-6">
              <div className="game-instructions">
                <h3 className="font-semibold text-green-300 mb-2">How to Play:</h3>
                <ol className="text-left space-y-2 text-sm">
                  <li>1. Cut branches (nodes) to reduce the tree's total sum</li>
                  <li>2. Try to get as close to the target sum as possible</li>
                  <li>3. Cutting a node removes it and all its children</li>
                </ol>
              </div>
            </div>
            <Button
              onClick={() => setShowInstructions(false)}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold"
            >
              🚀 Start Pruning
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
      <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 backdrop-blur-md border-green-400/50 p-8 max-w-4xl w-full mx-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
            🌲 Recursive Tree Pruning
          </h2>
          <p className="text-green-200 game-text">Cut branches to get as close to the target sum as possible</p>
          <div className="game-score mt-2">
            Level: {level}/3 | Score: {score} | Target: {targetSum} | Current: {currentSum}
          </div>
        </div>

        <div className="bg-green-900/10 rounded-lg p-4 mb-6 overflow-x-auto">
          <svg width="100%" height="300" viewBox="0 0 400 300">
            {tree && renderTree(tree)}
          </svg>
        </div>

        <div className="text-center mb-4">
          <div className="game-text">
            {Math.abs(currentSum - targetSum) <= 2 ? (
              <span className="text-yellow-400 font-bold game-score">🎉 Perfect! Moving to next level...</span>
            ) : (
              <span className="text-green-300">Difference: {Math.abs(currentSum - targetSum)}</span>
            )}
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <Button
            onClick={generateTree}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
          >
            🎲 New Tree
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="border-green-400/50 text-green-300 hover:bg-green-900/20"
          >
            ← Back to Forest
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default RecursionTreeGame;
