const { useState, useMemo } = React;
const { LandingPage } = window;

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

const INITIAL_MESSAGES = [
  { id: 1, text: "Hey! Saw you're heading to Mars Base 4.", sender: 'them', time: '10:24 AM' },
  { id: 2, text: "Yeah! It's my first deployment. Have you been?", sender: 'me', time: '10:26 AM' },
  { id: 3, text: "Twice. The view of Olympus Mons at sunrise is incredible.", sender: 'them', time: '10:28 AM' },
  { id: 4, text: "That sounds amazing. We should grab a space-coffee when I arrive.", sender: 'me', time: '10:30 AM' },
];

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
  
  // Global State
  const [profiles, setProfiles] = useState(INITIAL_PROFILES);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);

  // Simple Router
  let ViewComponent;
  switch (currentView) {
    case 'landing':
      ViewComponent = <LandingPage onNavigate={setCurrentView} />;
      break;
    case 'discover':
    case 'voyages':
      ViewComponent = <window.DiscoverPage onNavigate={setCurrentView} profiles={profiles} setProfiles={setProfiles} />;
      break;
    case 'chat':
      ViewComponent = <window.ChatPage onNavigate={setCurrentView} messages={messages} setMessages={setMessages} />;
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
