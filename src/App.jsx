import React, { useState } from 'react';
import './App.css';
import './components/GlobalReset.css'; // Add this import
import './components/ThemeOverrides.css';
import Header from './components/Header';
import WelcomePage from './components/WelcomePage';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import BackgroundAnimation from './components/BackgroundAnimation';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [activeModule, setActiveModule] = useState(null);
  
  const closeModule = () => {
    setActiveModule(null);
  };
  
  return (
    <ThemeProvider>
      <div className="app">
        <BackgroundAnimation />
        
        <main className="main-content">
          <Header setActiveModule={setActiveModule} />
          
          {activeModule === null && (
            <WelcomePage setActiveModule={setActiveModule} />
          )}
          
          {activeModule === 'about' && (
            <About closeModule={closeModule} />
          )}
          
          {activeModule === 'skills' && (
            <Skills closeModule={closeModule} />
          )}
          
          {activeModule === 'projects' && (
            <Projects closeModule={closeModule} />
          )}
          
          {activeModule === 'contact' && (
            <Contact closeModule={closeModule} />
          )}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
