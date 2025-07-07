
import React, { useState } from 'react';
import LandingPage from '@/components/LandingPage';
import UniverseMap from '@/components/UniverseMap';
import SortingRealm from '@/components/SortingRealm';
import GraphGalaxy from '@/components/GraphGalaxy';
import ForestOfRecursion from '@/components/ForestOfRecursion';
import PuzzlePeaks from '@/components/PuzzlePeaks';

type AppState = 'landing' | 'universe' | 'sorting' | 'recursion' | 'graphs' | 'puzzles';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [totalScore, setTotalScore] = useState(0);
  const [realmsCompleted, setRealmsCompleted] = useState(0);

  const handleEnterUniverse = () => {
    setCurrentState('universe');
  };

  const handleWorldSelect = (worldId: string) => {
    switch (worldId) {
      case 'sorting':
        setCurrentState('sorting');
        break;
      case 'recursion':
        setCurrentState('recursion');
        break;
      case 'graphs':
        setCurrentState('graphs');
        break;
      case 'puzzles':
        setCurrentState('puzzles');
        break;
      default:
        setCurrentState('universe');
    }
  };

  const handleBackToUniverse = () => {
    setCurrentState('universe');
  };

  const renderCurrentState = () => {
    switch (currentState) {
      case 'landing':
        return <LandingPage onEnterUniverse={handleEnterUniverse} />;
      case 'universe':
        return <UniverseMap onWorldSelect={handleWorldSelect} totalScore={totalScore} realmsCompleted={realmsCompleted} />;
      case 'sorting':
        return <SortingRealm onBackToUniverse={handleBackToUniverse} />;
      case 'recursion':
        return <ForestOfRecursion onBackToUniverse={handleBackToUniverse} />;
      case 'graphs':
        return <GraphGalaxy onBackToUniverse={handleBackToUniverse} />;
      case 'puzzles':
        return <PuzzlePeaks onBackToUniverse={handleBackToUniverse} />;
      default:
        return <LandingPage onEnterUniverse={handleEnterUniverse} />;
    }
  };

  return <div className="w-full">{renderCurrentState()}</div>;
};

export default Index;
