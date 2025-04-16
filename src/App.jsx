import React, { useState, useEffect, createContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import LoadingScreen from './components/LoadingScreen';
import WelcomePage from './components/WelcomePage';
import Footer from './components/Footer'; // Import Footer

// Create transition context for shared animations
export const TransitionContext = createContext({
  inTransition: false,
  setInTransition: () => {},
  transitionType: null,
  setTransitionType: () => {}
});

function App() {
  const [activeModule, setActiveModule] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [inTransition, setInTransition] = useState(false);
  const [transitionType, setTransitionType] = useState(null);

  // Simulate loading time
  useEffect(() => {
    const loadTime = 2500; // Total time including animation (e.g., 2s typing + 0.5s buffer)
    const fadeOutTime = 500; // Duration of fade-out animation

    const timer = setTimeout(() => {
      setIsFadingOut(true); // Start fade-out
      setTimeout(() => {
        setIsLoading(false); // Remove loading screen after fade-out
      }, fadeOutTime);
    }, loadTime - fadeOutTime); // Start fade-out slightly before total time

    return () => clearTimeout(timer); // Cleanup timer
  }, []); // Run only once on mount


  // Panel slide-in/out variants
  const panelVariants = {
    hidden: { x: '100%', opacity: 0 }, // Start off-screen to the right
    visible: { x: 0, opacity: 1, transition: { type: 'tween', duration: 0.4, ease: 'easeOut' } },
    exit: { x: '100%', opacity: 0, transition: { type: 'tween', duration: 0.3, ease: 'easeIn' } },
  };

  // Backdrop variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  // New variants for content transition *within* the panel
  const contentVariants = {
    initial: { opacity: 0, y: 20 }, // Start slightly down and faded out
    animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } }, // Fade in and slide up
    exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: 'easeIn' } }, // Fade out and slide up
  };

  // Wrap rendered module content with motion.div using contentVariants
  const renderModule = () => {
    let ModuleComponent;
    switch (activeModule) {
      case 'about':
        ModuleComponent = About;
        break;
      case 'skills':
        ModuleComponent = Skills;
        break;
      case 'projects':
        ModuleComponent = Projects;
        break;
      case 'contact':
        ModuleComponent = Contact;
        break;
      default:
        return null;
    }
    // Important: Use the activeModule string as the key for the inner motion.div
    // This tells AnimatePresence to treat content changes as enter/exit
    return (
      <motion.div
        key={activeModule} // Key change triggers animation
        variants={contentVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="module-content-wrapper" // Optional class for styling
      >
        <ModuleComponent closeModule={() => setActiveModule(null)} />
      </motion.div>
    );
  };


  if (isLoading) {
    return <LoadingScreen className={isFadingOut ? 'fade-out' : ''} />;
  }

  return (
    <TransitionContext.Provider value={{ 
      inTransition, 
      setInTransition,
      transitionType,
      setTransitionType
    }}>
      <div className="App">
        <Header setActiveModule={setActiveModule} />

        <main className="dashboard-main">
          {/* Render WelcomePage when no module is active */}
          {!activeModule && <WelcomePage setActiveModule={setActiveModule} />}

          <AnimatePresence>
            {activeModule && (
              <>
                {/* Backdrop */}
                <motion.div
                  className="backdrop"
                  variants={backdropVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={() => setActiveModule(null)} // Close module on backdrop click
                />

                {/* Module Panel (uses panelVariants) */}
                <motion.div
                  className="module-panel" // Changed class name
                  variants={panelVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  key="panel" // Add a fixed key to the panel itself
                >
                  {/* Render the module content with its own animation */}
                  {/* AnimatePresence needed here if not wrapping the whole panel */}
                  <AnimatePresence mode="wait">
                     {renderModule()}
                  </AnimatePresence>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </main>

        <Footer /> {/* Render Footer */}
      </div>
    </TransitionContext.Provider>
  );
}

export default App;
