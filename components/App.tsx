const { useState, useMemo } = React;
const { LandingPage } = window;

const App = () => {
  // Suppress specific framer-motion key warnings
  useMemo(() => {
    const originalError = console.error;
    console.error = (...args) => {
      if (typeof args[0] === 'string' && args[0].includes('Each child in a list should have a unique "key" prop')) return;
      originalError.call(console, ...args);
    };
  }, []);

  const [currentView, setCurrentView] = useState('landing');

  // Simple Router
  let ViewComponent;
  switch (currentView) {
    case 'landing':
      ViewComponent = <LandingPage onNavigate={setCurrentView} />;
      break;
    case 'discover':
    case 'voyages':
      ViewComponent = <window.DiscoverPage onNavigate={setCurrentView} />;
      break;
    case 'chat':
      ViewComponent = <window.ChatPage onNavigate={setCurrentView} />;
      break;
    case 'profile':
      ViewComponent = <window.ProfilePage onNavigate={setCurrentView} />;
      break;
    default:
      ViewComponent = <LandingPage onNavigate={setCurrentView} />;
  }

  return (
    <div className="bg-black min-h-screen">
      {ViewComponent}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
