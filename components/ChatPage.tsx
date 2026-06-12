var { useState } = React;
var { motion, AnimatePresence } = window.Motion;

window.ChatPage = ({ onNavigate, matches, activeChatId, setActiveChatId, messages, setMessages }) => {
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // View: Matches List (Inbox)
  if (!activeChatId) {
    return (
      <div className="min-h-screen bg-black flex flex-col font-body selection:bg-white/20 selection:text-white pb-24">
        {/* Top Nav */}
        <nav className="w-full px-8 py-6 flex justify-between items-center bg-black/80 backdrop-blur-md sticky top-0 z-50">
          <div 
            className="w-10 h-10 liquid-glass rounded-full flex items-center justify-center cursor-pointer hover:bg-white/10 transition"
            onClick={() => onNavigate('discover')}
          >
            <span className="font-heading italic text-xl text-white mt-1">←</span>
          </div>
          <div className="text-white font-heading italic text-2xl tracking-tight">Transmissions</div>
          <div className="w-10 h-10"></div>
        </nav>

        <div className="flex-1 px-4 sm:px-8 pt-4">
          <h2 className="text-white/60 text-xs tracking-[0.2em] uppercase mb-6 pl-2">Neural Matches</h2>
          
          {matches.length === 0 ? (
            <div className="liquid-glass rounded-3xl p-10 flex flex-col items-center justify-center text-center mt-10">
              <span className="font-heading italic text-4xl text-white/50 mb-4">?</span>
              <p className="text-white/80 font-body text-sm">No transmissions established yet.</p>
              <button 
                onClick={() => onNavigate('discover')}
                className="mt-6 bg-white text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-white/90 transition"
              >
                Return to Discover
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {matches.map(match => (
                <motion.div 
                  key={match.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveChatId(match.id)}
                  className="liquid-glass-strong rounded-[1.5rem] p-4 flex items-center gap-4 cursor-pointer hover:bg-white/5 transition"
                >
                  <img src={match.image} alt={match.name} className="w-16 h-16 rounded-full object-cover shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-end mb-1">
                      <h3 className="font-heading italic text-2xl text-white truncate">{match.name}</h3>
                      <span className="text-[10px] text-white/40 uppercase tracking-widest whitespace-nowrap">Online</span>
                    </div>
                    <p className="text-sm text-white/60 truncate font-light">
                      {(messages[match.id] && messages[match.id].length > 0) 
                        ? messages[match.id][messages[match.id].length - 1].text 
                        : "Neural link established. Say hello."}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // View: Active Chat
  const activeMatch = matches.find(m => m.id === activeChatId);
  const currentMessages = messages[activeChatId] || [];

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    // Add user message
    const newMsg = {
      id: Date.now(),
      text: inputText,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), newMsg]
    }));
    setInputText("");
    
    // Simulate partner typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => ({
        ...prev,
        [activeChatId]: [...(prev[activeChatId] || []), {
          id: Date.now() + 1,
          text: `My neural pathways align completely. Let's explore the outer rim together. 🚀`,
          sender: 'them',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]
      }));
    }, 2500);
  };

  const handleAICopilot = () => {
    setInputText(`My warp drive is fully charged. When are we launching, ${activeMatch?.name}?`);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center">
      {/* Top Bar */}
      <nav className="w-full px-4 py-4 flex items-center justify-between z-50 border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0">
        <div 
          className="w-10 h-10 liquid-glass rounded-full flex items-center justify-center cursor-pointer hover:bg-white/10 transition"
          onClick={() => setActiveChatId(null)}
        >
          <span className="font-heading italic text-xl text-white mt-1">←</span>
        </div>
        <div className="flex items-center gap-3">
          <img src={activeMatch?.image} alt={activeMatch?.name} className="w-10 h-10 rounded-full object-cover border border-white/20" />
          <div className="flex flex-col">
            <span className="font-heading italic text-white text-xl leading-none pt-1">{activeMatch?.name}</span>
            <span className="text-white/50 text-[10px] font-body tracking-wider uppercase">{activeMatch?.distance}</span>
          </div>
        </div>
        <div className="w-10 h-10 liquid-glass rounded-full flex items-center justify-center cursor-pointer">
          <span className="text-white/50 text-xl font-heading mb-2">...</span>
        </div>
      </nav>

      {/* Chat Area */}
      <div className="flex-1 w-full max-w-2xl px-4 py-6 flex flex-col gap-4 overflow-y-auto pb-24">
        {currentMessages.length === 0 && (
          <div className="text-center text-white/40 text-xs tracking-widest uppercase my-4">
            Quantum Secure Channel Established
          </div>
        )}
        
        {currentMessages.map((msg, i) => {
          const isMe = msg.sender === 'me';
          return (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`flex flex-col max-w-[75%] group ${isMe ? 'self-end items-end' : 'self-start items-start'}`}
            >
              <div className={`px-4 py-3 rounded-2xl text-sm font-body relative ${isMe ? 'bg-white text-black rounded-br-sm' : 'liquid-glass-strong text-white/90 rounded-bl-sm'}`}>
                {msg.text}
              </div>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-white/40 text-[10px] font-light uppercase tracking-wider">{msg.time}</span>
                {isMe && <span className="text-emerald-400 text-[10px]">✓✓</span>}
              </div>
            </motion.div>
          );
        })}

        {/* Typing Indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
              className="self-start liquid-glass px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1.5"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-white/60"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-white/80"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="w-full max-w-2xl p-4 sticky bottom-0 bg-gradient-to-t from-black via-black/90 to-transparent">
        <form onSubmit={handleSend} className="liquid-glass-strong rounded-full flex items-center p-1 pl-4 gap-2 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] border border-white/10">
          <button 
            type="button" 
            onClick={handleAICopilot}
            className="text-white/40 hover:text-sky-400 transition cursor-pointer flex-shrink-0"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          </button>
          
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Transmit message..."
            className="flex-1 bg-transparent border-none text-white font-body text-sm outline-none placeholder:text-white/30 min-w-0 py-3"
          />

          <button 
            type="submit"
            disabled={!inputText.trim() && !isTyping}
            className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center disabled:opacity-50 transition-opacity flex-shrink-0"
          >
            ↑
          </button>
        </form>
      </div>
    </div>
  );
};
