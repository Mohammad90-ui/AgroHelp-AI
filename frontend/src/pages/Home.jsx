import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import ChatInput from "../components/ChatInput";
import ChatMessage from "../components/ChatMessage";
import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "react-i18next";
import { Menu, Leaf } from "lucide-react";
import { useAudio } from "../context/AudioContext";
import AudioToggle from "../components/AudioToggle";
import LocationDisplay from "../components/LocationDisplay";

export default function Home() {
  // State for chat history
  // State for chat history
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const { t, i18n } = useTranslation();
  const { isAutoplayEnabled, playPause } = useAudio();
  const messagesEndRef = useRef(null);

  const [chatHistory, setChatHistory] = useState(() => {
    try {
      const saved = localStorage.getItem("agro_chat_history");
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error("Failed to parse chat history:", e);
      return [];
    }
  });
  const [currentChatId, setCurrentChatId] = useState(Date.now().toString());

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  // Save specific chat to history
  const saveChatToHistory = (msgs, id) => {
    if (msgs.length === 0) return;

    setChatHistory(prev => {
      const existingIndex = prev.findIndex(chat => chat.id === id);
      const title = msgs[0].text.substring(0, 30) + (msgs[0].text.length > 30 ? "..." : "") || "New Chat";
      const updatedChat = { id, title, messages: msgs, timestamp: new Date().toISOString() };

      let newHistory;
      if (existingIndex >= 0) {
        newHistory = [...prev];
        newHistory[existingIndex] = updatedChat;
      } else {
        newHistory = [updatedChat, ...prev].slice(0, 10); // Keep last 10 chats
      }

      localStorage.setItem("agro_chat_history", JSON.stringify(newHistory));
      return newHistory;
    });
  };

  // Auto-save current chat when messages change
  useEffect(() => {
    if (messages.length > 0) {
      saveChatToHistory(messages, currentChatId);
    }
  }, [messages, currentChatId]);

  const loadChat = (chat) => {
    setMessages(chat.messages);
    setCurrentChatId(chat.id);
    setSidebarOpen(false); // Close mobile sidebar on selection
  };

  const createNewChat = () => {
    setMessages([]);
    setCurrentChatId(Date.now().toString());
    setSidebarOpen(false);
  };

  const handleSend = async (message) => {
    const userMessage = { sender: "user", text: message.text, image: message.image ? URL.createObjectURL(message.image) : null };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);
    setError("");
    const formData = new FormData();
    if (message.image) { formData.append("file", message.image); }
    else { const emptyFile = new Blob([""], { type: "image/png" }); formData.append("file", emptyFile, "empty.png"); }
    formData.append("text", message.text);
    formData.append("language", language);
    const savedCoords = localStorage.getItem("agro_coords");
    if (savedCoords) {
      try { const coords = JSON.parse(savedCoords); formData.append("lat", coords.latitude); formData.append("lon", coords.longitude); }
      catch (e) { console.error("Could not parse coordinates from localStorage:", e); }
    }
    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
      // Ensure no double slashes if the env var has a trailing slash
      const apiUrl = `${API_BASE_URL.replace(/\/$/, "")}/predict`;

      const response = await axios.post(apiUrl, formData);
      const aiResponseText = response.data.analysis || response.data.error || "Sorry, I couldn't get a response.";
      const audioContent = response.data.audioContent;
      const aiMessage = { sender: "ai", text: aiResponseText, audio: audioContent ? "data:audio/mp3;base64," + audioContent : null };
      setMessages((prev) => [...prev, aiMessage]);
      if (isAutoplayEnabled && aiMessage.audio) { playPause(aiMessage.audio); }
    } catch (err) {
      const errorMessage = "Connection Error: Could not reach the backend. Is it running?";
      setError(errorMessage);
      setMessages((prev) => [...prev, { sender: "ai", text: errorMessage, audio: null }]);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-dvh bg-gray-50 font-body overflow-hidden">
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setSidebarOpen}
        chatHistory={chatHistory}
        onLoadChat={loadChat}
        onNewChat={createNewChat}
        activeChatId={currentChatId}
      />

      <div className="flex flex-col flex-1 h-full min-w-0 relative bg-gradient-to-br from-white via-green-50/30 to-green-100/50">
        {/* Header - Fixed Height, No Sticky */}
        <header className="flex-none flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 z-10">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-xl hover:bg-gray-100 text-gray-600 transition-colors">
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white shadow-sm">
                <Leaf size={18} fill="currentColor" />
              </div>
              <span className="font-heading font-bold text-lg text-green-900 hidden sm:block tracking-tight">{t("appTitle")}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full py-1.5 px-3">
            <div className="flex items-center max-w-[120px] sm:max-w-[200px] truncate">
              <LocationDisplay />
            </div>
            <div className="h-4 w-px bg-gray-300 mx-1 hidden sm:block"></div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-sm font-bold text-gray-700 focus:outline-none cursor-pointer uppercase border-none ring-0 focus:ring-0 w-12"
            >
              <option value="en">EN</option>
              <option value="hi">HI</option>
              <option value="te">TE</option>
              <option value="kn">KN</option>
            </select>
            <div className="h-4 w-px bg-gray-300 mx-1 hidden sm:block"></div>
            <div className="flex items-center">
              <AudioToggle />
            </div>
          </div>
        </header>

        {/* Main Content - Flex Grow, Scrolls Internally */}
        <main className="flex-1 overflow-y-auto scroll-smooth p-4 md:p-6 pb-0 relative scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          <div className="w-full max-w-4xl mx-auto min-h-full flex flex-col">
            {messages.length > 0 ? (
              <div className="flex flex-col flex-1">
                {messages.map((msg, index) => (
                  <ChatMessage key={index} message={msg} />
                ))}

                {isLoading && (
                  <div className="flex justify-start my-4 px-2">
                    <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-sm border border-gray-100 shadow-sm flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: '0s' }}></span>
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                      <span className="text-sm text-gray-500 ml-2 font-medium">{t("aiIsThinking") || "Analyzing..."}</span>
                    </div>
                  </div>
                )}

                {error && !isLoading && (
                  <div className="p-4 mx-auto my-4 text-center bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm max-w-md">
                    {error}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-4 md:p-8 animate-in fade-in zoom-in-95 duration-500">
                <div className="w-24 h-24 bg-gradient-to-br from-green-50 to-green-100 rounded-3xl flex items-center justify-center mb-8 shadow-sm border border-green-200">
                  <Leaf size={48} className="text-green-600 drop-shadow-sm" />
                </div>
                <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-3">{t("welcomeMessage") || "Welcome to AgroHelp"}</h1>
                <p className="text-gray-500 max-w-md mb-10 text-lg">{t("appSubtitle") || "Your personal AI agriculture assistant."}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                  {[
                    t("sugg_healthy") || "Is my crop looking healthy?",
                    t("sugg_weather") || "Weather forecast for tomorrow?",
                    t("sugg_disease") || "Identify this plant disease",
                    t("sugg_tips") || "Tips for tomato farming"
                  ].map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend({ text: suggestion })}
                      className="text-left p-4 rounded-xl bg-white border border-gray-200 hover:border-green-400 hover:bg-green-50 hover:shadow-md transition-all text-gray-700 shadow-sm group"
                    >
                      <span className="font-medium group-hover:text-green-700 transition-colors">"{suggestion}"</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} className="h-2" />
          </div>
        </main>

        {/* Input Area - Fixed Height */}
        <div className="flex-none p-4 md:p-6 bg-transparent z-20">
          <div className="max-w-4xl mx-auto">
            <ChatInput onSend={handleSend} />
          </div>
        </div>
      </div>
    </div>
  );
}
