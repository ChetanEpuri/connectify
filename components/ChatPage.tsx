const { useState } = React;
const { motion } = window.Motion;

window.ChatPage = ({ onNavigate, messages, setMessages }) => {
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    // Add user message
    const newMessages = [...messages, {
      id: Date.now(),
      text: inputText,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }];
    setMessages(newMessages);
    setInputText("");
    
    // Simulate partner typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, {
        id: Date.now(),
        text: "Scanning your coordinates... I'm down to meet up! 🚀",
        sender: 'them',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 2500);
  };

  const handleAICopilot = () => {
    setInputText("My warp drive is fully charged. When are we launching?");
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
      <div className="flex-1 w-full max-w-2xl px-4 py-6 flex flex-col gap-4 overflow-y-auto pb-24">
        {messages.map((msg, i) => {
          const isMe = msg.sender === 'me';
          return (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`flex flex-col max-w-[75%] group ${isMe ? 'self-end items-end' : 'self-start items-start'}`}
            >
              <div className={`px-4 py-3 rounded-2xl text-sm font-body relative ${isMe ? 'bg-white text-black rounded-br-sm' : 'liquid-glass text-white/90 rounded-bl-sm'}`}>
                {msg.text}
                {/* 2026 Micro-interaction: Hover Reaction Placeholder */}
                <div className={`absolute top-0 ${isMe ? '-left-8' : '-right-8'} opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-sm`}>
                  🤍
                </div>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-white/40 text-[10px] font-light uppercase tracking-wider">{msg.time}</span>
                {isMe && <span className="text-emerald-400 text-[10px]">✓✓</span>}
              </div>
            </motion.div>
          );
        })}

        {/* 2026 Trend: Typing Indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
              className="self-start liquid-glass px-4 py-2 rounded-2xl rounded-bl-sm flex items-center gap-1"
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
        <form onSubmit={handleSend} className="liquid-glass rounded-full flex items-center p-1 pl-4 gap-2">
          {/* AI Co-Pilot Sparkle Icon */}
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
            placeholder="Send a transmission..."
            className="flex-1 bg-transparent border-none text-white font-body text-sm outline-none placeholder:text-white/40 min-w-0"
          />

          {/* Voice Memo Icon */}
          <button type="button" className="text-white/40 hover:text-white transition cursor-pointer flex-shrink-0 px-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
            </svg>
          </button>

          <button 
            type="submit"
            disabled={!inputText.trim()}
            className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center disabled:opacity-50 transition-opacity flex-shrink-0"
          >
            ↑
          </button>
        </form>
      </div>
    </div>
  );
};
