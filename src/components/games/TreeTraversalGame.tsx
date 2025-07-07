
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import GameInstructions from '../shared/GameInstructions';
import TheoryRecap from '../shared/TheoryRecap';

interface TreeNode {
  id: string;
  value: number;
  x: number;
  y: number;
  visited: boolean;
}

interface TreeTraversalGameProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const TreeTraversalGame: React.FC<TreeTraversalGameProps> = ({ onComplete, onClose }) => {
  const [nodes, setNodes] = useState<TreeNode[]>([]);
  const [traversalType, setTraversalType] = useState<'inorder' | 'preorder' | 'postorder'>('inorder');
  const [expectedOrder, setExpectedOrder] = useState<number[]>([]);
  const [userOrder, setUserOrder] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);
  const [showTheory, setShowTheory] = useState(false);

  useEffect(() => {
    if (!showInstructions) {
      generateTree();
    }
  }, [showInstructions, traversalType]);

  const generateTree = () => {
    // Simple binary tree structure
    const treeNodes: TreeNode[] = [
      { id: '1', value: 4, x: 200, y: 50, visited: false },
      { id: '2', value: 2, x: 100, y: 130, visited: false },
      { id: '3', value: 6, x: 300, y: 130, visited: false },
      { id: '4', value: 1, x: 50, y: 210, visited: false },
      { id: '5', value: 3, x: 150, y: 210, visited: false },
      { id: '6', value: 5, x: 250, y: 210, visited: false },
      { id: '7', value: 7, x: 350, y: 210, visited: false }
    ];
    
    setNodes(treeNodes);
    setUserOrder([]);
    
    // Calculate expected traversal order
    let expected: number[] = [];
    switch (traversalType) {
      case 'inorder':
        expected = [1, 2, 3, 4, 5, 6, 7];
        break;
      case 'preorder':
        expected = [4, 2, 1, 3, 6, 5, 7];
        break;
      case 'postorder':
        expected = [1, 3, 2, 5, 7, 6, 4];
        break;
    }
    setExpectedOrder(expected);
  };

  const visitNode = (nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node || node.visited) return;

    const newNodes = nodes.map(n => 
      n.id === nodeId ? { ...n, visited: true } : n
    );
    setNodes(newNodes);
    
    const newUserOrder = [...userOrder, node.value];
    setUserOrder(newUserOrder);
    
    // Check if correct so far
    const isCorrect = newUserOrder.every((val, idx) => val === expectedOrder[idx]);
    if (isCorrect) {
      setScore(prev => prev + 10);
    } else {
      setScore(prev => Math.max(0, prev - 5));
    }
    
    // Check if complete
    if (newUserOrder.length === expectedOrder.length) {
      if (isCorrect) {
        setScore(prev => prev + 50);
        setTimeout(() => setShowTheory(true), 1000);
      }
    }
  };

  if (showInstructions) {
    return (
      <GameInstructions
        title="Tree Traversal Challenge"
        instructions={[
          "Click nodes in the correct traversal order",
          "Inorder: Left → Root → Right",
          "Preorder: Root → Left → Right",
          "Postorder: Left → Right → Root"
        ]}
        onStart={() => setShowInstructions(false)}
        gameIcon="🌳"
        color="from-green-900/30 to-emerald-900/30"
      />
    );
  }

  if (showTheory) {
    return (
      <TheoryRecap
        title="Tree Traversal Mastered!"
        algorithm={`${traversalType.charAt(0).toUpperCase() + traversalType.slice(1)} Traversal: Systematic way to visit all nodes in a binary tree following a specific order.`}
        timeComplexity="O(n) - visits each node exactly once"
        spaceComplexity="O(h) - where h is height of tree (recursive stack)"
        useCases={[
          "Expression tree evaluation",
          "File system directory traversal",
          "Binary search tree operations"
        ]}
        onContinue={() => onComplete(score)}
        color="from-green-900/30 to-emerald-900/30"
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
      <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 backdrop-blur-md border-green-400/50 p-8 max-w-4xl w-full mx-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
            🌳 Tree Traversal Challenge
          </h2>
          <p className="text-green-200">Click nodes in {traversalType} order</p>
          <p className="text-green-300 text-sm mt-2">Score: {score}</p>
        </div>

        <div className="mb-4 flex justify-center space-x-4">
          {(['inorder', 'preorder', 'postorder'] as const).map((type) => (
            <Button
              key={type}
              onClick={() => setTraversalType(type)}
              className={`${traversalType === type ? 'bg-green-600' : 'bg-green-800'} hover:bg-green-700`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
          ))}
        </div>

        <div className="bg-green-900/10 rounded-lg p-4 mb-6 overflow-x-auto">
          <svg width="100%" height="280" viewBox="0 0 400 280">
            {/* Tree edges */}
            <line x1="200" y1="70" x2="100" y2="150" stroke="#10B981" strokeWidth="2" />
            <line x1="200" y1="70" x2="300" y2="150" stroke="#10B981" strokeWidth="2" />
            <line x1="100" y1="150" x2="50" y2="230" stroke="#10B981" strokeWidth="2" />
            <line x1="100" y1="150" x2="150" y2="230" stroke="#10B981" strokeWidth="2" />
            <line x1="300" y1="150" x2="250" y2="230" stroke="#10B981" strokeWidth="2" />
            <line x1="300" y1="150" x2="350" y2="230" stroke="#10B981" strokeWidth="2" />
            
            {/* Tree nodes */}
            {nodes.map((node) => (
              <g key={node.id}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="25"
                  fill={node.visited ? "#059669" : "#10B981"}
                  stroke="#047857"
                  strokeWidth="2"
                  className="cursor-pointer hover:stroke-4 transition-all"
                  onClick={() => visitNode(node.id)}
                />
                <text
                  x={node.x}
                  y={node.y + 5}
                  textAnchor="middle"
                  fill="white"
                  fontSize="16"
                  fontWeight="bold"
                  className="pointer-events-none"
                >
                  {node.value}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="text-center mb-4">
          <p className="text-green-300">
            Expected: [{expectedOrder.join(', ')}]
          </p>
          <p className="text-green-300">
            Your order: [{userOrder.join(', ')}]
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          <Button
            onClick={generateTree}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
          >
            🎲 Reset Tree
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

export default TreeTraversalGame;
