const { useState } = React;
const { motion } = window.Motion;

const MESSAGES = [
  { id: 1, text: "Hey! Saw you're heading to Mars Base 4.", sender: 'them', time: '10:24 AM' },
  { id: 2, text: "Yeah! It's my first deployment. Have you been?", sender: 'me', time: '10:26 AM' },
  { id: 3, text: "Twice. The view of Olympus Mons at sunrise is incredible.", sender: 'them', time: '10:28 AM' },
  { id: 4, text: "That sounds amazing. We should grab a space-coffee when I arrive.", sender: 'me', time: '10:30 AM' },
];

window.ChatPage = ({ onNavigate }) => {
  const [messages, setMessages] = useState(MESSAGES);
  const [inputText, setInputText] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    setMessages([...messages, {
      id: Date.now(),
      text: inputText,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setInputText("");
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center">
      {/* Top Bar */}
      <nav className="w-full px-6 py-4 flex items-center justify-between z-50 border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0">
        <div 
          className="w-10 h-10 liquid-glass rounded-full flex items-center justify-center cursor-pointer hover:bg-white/10 transition"
          onClick={() => onNavigate('discover')}
        >
          <span className="font-heading italic text-xl text-white mt-1">←</span>
        </div>
        <div className="flex items-center gap-3">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Elena" className="w-10 h-10 rounded-full object-cover border border-white/20" />
          <div className="flex flex-col">
            <span className="font-heading italic text-white text-xl leading-none pt-1">Elena</span>
            <span className="text-white/50 text-[10px] font-body tracking-wider uppercase">0.2 LY Away</span>
          </div>
        </div>
        <div className="w-10 h-10"></div>
      </nav>

      {/* Chat Area */}
      <div className="flex-1 w-full max-w-2xl px-4 py-6 flex flex-col gap-4 overflow-y-auto">
        {messages.map((msg, i) => {
          const isMe = msg.sender === 'me';
          return (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`flex flex-col max-w-[75%] ${isMe ? 'self-end items-end' : 'self-start items-start'}`}
            >
              <div className={`px-4 py-3 rounded-2xl text-sm font-body ${isMe ? 'bg-white text-black rounded-br-sm' : 'liquid-glass text-white/90 rounded-bl-sm'}`}>
                {msg.text}
              </div>
              <span className="text-white/40 text-xs mt-1 font-light">{msg.time}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Input Area */}
      <div className="w-full max-w-2xl p-4 sticky bottom-0 bg-gradient-to-t from-black via-black/90 to-transparent">
        <form onSubmit={handleSend} className="liquid-glass rounded-full flex items-center p-1 pl-4">
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Send a transmission..."
            className="flex-1 bg-transparent border-none text-white font-body text-sm outline-none placeholder:text-white/40"
          />
          <button 
            type="submit"
            disabled={!inputText.trim()}
            className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center disabled:opacity-50 transition-opacity ml-2"
          >
            ↑
          </button>
        </form>
      </div>
    </div>
  );
};
