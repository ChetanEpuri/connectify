var { useState, useMemo } = React;

const INITIAL_PROFILES = [
  {
    id: 1,
    name: "Elena",
    age: 28,
    role: "Astro-Botanist",
    distance: "0.2 Lightyears Away",
    matchScore: 94,
    bio: "Looking for a co-pilot to explore the outer rim. I bring the space-snacks.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    tags: ["Mars Base 4", "Zero-G Yoga", "Sci-Fi"]
  },
  {
    id: 2,
    name: "Marcus",
    age: 32,
    role: "Quantum Engineer",
    distance: "Orbital Station Alpha",
    matchScore: 88,
    bio: "If we match, it's basically quantum entanglement.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    tags: ["Engineering", "Stargazing", "Tech"]
  },
  {
    id: 3,
    name: "Sarah",
    age: 26,
    role: "Orbital Navigator",
    distance: "12,000 km Away",
    matchScore: 97,
    bio: "I know all the best views in the galaxy. Let's go for a spin.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    tags: ["Navigation", "Thrill Seeker"]
  }
];

// Messages are now keyed by profile ID
const INITIAL_MESSAGES = {
  1: [
    { id: 1, text: "Hey! Saw you're heading to Mars Base 4.", sender: 'them', time: '10:24 AM' },
    { id: 2, text: "Yeah! It's my first deployment. Have you been?", sender: 'me', time: '10:26 AM' },
  ]
};

const App = () => {
  // Suppress specific framer-motion key warnings
  useMemo(() => {
    const originalError = console.error;
    console.error = (...args) => {
      if (typeof args[0] === 'string' && args[0].includes('Each child in a list should have a unique "key" prop')) return;
      originalError.call(console, ...args);
    };
  }, []);

  // Routing State
  const [currentView, setCurrentView] = useState('landing');
  const [activeChatId, setActiveChatId] = useState(null); // Which profile we are chatting with
  
  // Auth State
  const [currentUser, setCurrentUser] = useState(null);

  // App Data State
  const [profiles, setProfiles] = useState(INITIAL_PROFILES);
  const [matches, setMatches] = useState([]); // Array of matched profile objects
  const [messages, setMessages] = useState(INITIAL_MESSAGES);

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setCurrentView('discover');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('landing');
  };

  const handleNavigate = (view, data = null) => {
    // Protected routes
    if (['discover', 'chat', 'profile'].includes(view) && !currentUser) {
      setCurrentView('login');
      return;
    }
    
    if (view === 'chat' && data?.profileId) {
      setActiveChatId(data.profileId);
    }
    
    setCurrentView(view);
  };

  const handleMatch = (profile) => {
    setMatches(prev => [...prev, profile]);
    // Initialize empty message thread if it doesn't exist
    if (!messages[profile.id]) {
      setMessages(prev => ({ ...prev, [profile.id]: [] }));
    }
  };

  let ViewComponent;
  switch (currentView) {
    case 'landing':
      ViewComponent = <window.LandingPage onNavigate={handleNavigate} />;
      break;
    case 'login':
      ViewComponent = <window.LoginPage onLogin={handleLogin} onNavigate={handleNavigate} />;
      break;
    case 'discover':
    case 'voyages':
      ViewComponent = <window.DiscoverPage 
        onNavigate={handleNavigate} 
        profiles={profiles} 
        setProfiles={setProfiles}
        onMatch={handleMatch}
      />;
      break;
    case 'chat':
      ViewComponent = <window.ChatPage 
        onNavigate={handleNavigate} 
        matches={matches}
        activeChatId={activeChatId}
        setActiveChatId={setActiveChatId}
        messages={messages} 
        setMessages={setMessages} 
      />;
      break;
    case 'profile':
      ViewComponent = <window.ProfilePage 
        onNavigate={handleNavigate} 
        currentUser={currentUser}
        onLogout={handleLogout}
      />;
      break;
    default:
      ViewComponent = <window.LandingPage onNavigate={handleNavigate} />;
  }

  return (
    <div className="bg-black min-h-screen">
      {ViewComponent}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
