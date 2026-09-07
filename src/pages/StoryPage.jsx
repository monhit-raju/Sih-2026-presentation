import { useState, useEffect, useCallback, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { AnimatePresence, motion } from 'framer-motion';

import EarthGlobe from '../components/three/EarthGlobe';
import { SatelliteSystem } from '../components/three/SatelliteOrbit';
import StarField from '../components/three/StarField';

import SceneNavigation, { TopNav, ProgressIndicator } from '../components/navigation/SceneNavigation';
import ResearchPanel from '../components/panels/ResearchPanel';

import Scene01_Opening from '../scenes/Scene01_Opening';
import Scene02_Satellites from '../scenes/Scene02_Satellites';
import Scene03_FIRMS from '../scenes/Scene03_FIRMS';
import Scene04_LandCover from '../scenes/Scene04_LandCover';
import Scene05_Industrial from '../scenes/Scene05_Industrial';
import Scene06_Temporal from '../scenes/Scene06_Temporal';
import Scene07_Features from '../scenes/Scene07_Features';
import Scene08_Rules from '../scenes/Scene08_Rules';
import Scene09_RandomForest from '../scenes/Scene09_RandomForest';
import Scene10_Results from '../scenes/Scene10_Results';
import Scene11_Pipeline from '../scenes/Scene11_Pipeline';
import Scene12_Dashboard from '../scenes/Scene12_Dashboard';

const TOTAL_SCENES = 12;

export default function StoryPage() {
  const [currentScene, setCurrentScene] = useState(0);
  const [selectedSat, setSelectedSat] = useState(null);
  const [isResearchOpen, setIsResearchOpen] = useState(false);
  const wheelLockRef = useRef(false);
  const touchStartRef = useRef(null);

  const goToScene = useCallback((target) => {
    setCurrentScene((prev) => Math.max(0, Math.min(TOTAL_SCENES - 1, target)));
  }, []);

  const nextScene = useCallback(() => {
    setCurrentScene((prev) => Math.min(TOTAL_SCENES - 1, prev + 1));
  }, []);

  const prevScene = useCallback(() => {
    setCurrentScene((prev) => Math.max(0, prev - 1));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isResearchOpen) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        nextScene();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        prevScene();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextScene, prevScene, isResearchOpen]);

  // Scroll wheel navigation with debounce
  useEffect(() => {
    const handleWheel = (e) => {
      if (isResearchOpen) return;
      if (wheelLockRef.current) return;

      if (Math.abs(e.deltaY) > 30) {
        wheelLockRef.current = true;
        if (e.deltaY > 0) {
          nextScene();
        } else {
          prevScene();
        }
        setTimeout(() => {
          wheelLockRef.current = false;
        }, 650);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [nextScene, prevScene, isResearchOpen]);

  // Mobile Touch Navigation
  const handleTouchStart = (e) => {
    touchStartRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartRef.current === null) return;
    const diff = touchStartRef.current - e.changedTouches[0].clientY;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        nextScene();
      } else {
        prevScene();
      }
    }
    touchStartRef.current = null;
  };

  // Render Scene component by index
  const renderCurrentScene = () => {
    switch (currentScene) {
      case 0:
        return <Scene01_Opening active={true} />;
      case 1:
        return <Scene02_Satellites active={true} />;
      case 2:
        return <Scene03_FIRMS active={true} />;
      case 3:
        return <Scene04_LandCover active={true} />;
      case 4:
        return <Scene05_Industrial active={true} />;
      case 5:
        return <Scene06_Temporal active={true} />;
      case 6:
        return <Scene07_Features active={true} />;
      case 7:
        return <Scene08_Rules active={true} />;
      case 8:
        return <Scene09_RandomForest active={true} />;
      case 9:
        return <Scene10_Results active={true} />;
      case 10:
        return <Scene11_Pipeline active={true} />;
      case 11:
        return <Scene12_Dashboard active={true} />;
      default:
        return null;
    }
  };

  return (
    <div 
      className="story-container"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#020817',
        color: '#f8fafc',
      }}
    >
      {/* Top progress bar */}
      <ProgressIndicator current={currentScene} total={TOTAL_SCENES} />

      {/* Top navigation header */}
      <TopNav
        current={currentScene}
        total={TOTAL_SCENES}
        onResearch={() => setIsResearchOpen(true)}
      />

      {/* 3D Background Canvas */}
      <div
        className="canvas-container"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          pointerEvents: currentScene === 1 ? 'auto' : 'none',
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 3.5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
        >
          <StarField count={4000} />
          <EarthGlobe sceneIndex={currentScene} />
          <SatelliteSystem
            sceneIndex={currentScene}
            selectedSat={selectedSat}
            onSelectSat={(id) => setSelectedSat(id)}
          />
        </Canvas>
      </div>

      {/* Foreground Scene Layer */}
      <main
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          height: '100%',
          pointerEvents: 'auto',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            style={{ width: '100%', height: '100%' }}
          >
            {renderCurrentScene()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <SceneNavigation
        current={currentScene}
        total={TOTAL_SCENES}
        onPrev={prevScene}
        onNext={nextScene}
        onSelect={goToScene}
      />

      {/* Slide-out Research Panel */}
      <ResearchPanel
        open={isResearchOpen}
        onClose={() => setIsResearchOpen(false)}
      />
    </div>
  );
}
