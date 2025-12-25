import { useState, useRef, useEffect } from "react";
import { Image, Mic, Send, X, Camera, Paperclip } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../context/LanguageContext";

export default function ChatInput({ onSend }) {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [text]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleMicClick = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert(t("alertNoMicSupport"));
      return;
    }

    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const langMap = { en: "en-IN", hi: "hi-IN", te: "te-IN", kn: "kn-IN" };
    const recognition = new window.webkitSpeechRecognition();
    recognitionRef.current = recognition;

    recognition.lang = langMap[language] || 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      setText(spokenText);
      if (event.results[0].isFinal) {
        // Optional: auto-send on final result? Maybe better to let user review.
        // For now, just stop listening.
        setListening(false);
      }
    };

    recognition.onerror = (err) => console.error("Speech recognition error", err);
    recognition.onend = () => setListening(false);

    recognition.start();
    setListening(true);
  };

  const handleSend = () => {
    if (!text.trim() && !image) return;
    onSend({ text, image });
    setText("");
    setImage(null);
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full px-2 md:px-0">
      {/* Preview Area */}
      {image && (
        <div className="mb-2 relative inline-block animate-in fade-in zoom-in duration-200">
          <div className="relative rounded-2xl overflow-hidden shadow-md border border-gray-100">
            <img src={URL.createObjectURL(image)} alt="preview" className="h-24 w-auto object-cover bg-gray-100" />
            <button
              onClick={() => setImage(null)}
              className="absolute top-1 right-1 bg-black/50 hover:bg-red-500 text-white rounded-full p-1 transition-colors backdrop-blur-sm"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Main Input Capsule */}
      <div className={`
        relative flex items-end gap-2 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg rounded-3xl p-2 transition-all duration-300
        ${listening ? "ring-2 ring-red-400 shadow-red-100" : "focus-within:ring-2 focus-within:ring-green-400 focus-within:shadow-green-100"}
      `}>

        {/* Left Actions */}
        <div className="flex items-center gap-1 pb-1 pl-1">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors flex-shrink-0"
            title={t("uploadPhoto")}
          >
            <Camera size={22} />
          </button>
          <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageChange} />
        </div>

        {/* Text Area */}
        <div className="flex-1 min-w-0 py-2">
          <textarea
            ref={textareaRef}
            rows={1}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={listening ? "Listening..." : t("chatPlaceholder")}
            className="w-full bg-transparent border-none p-0 text-gray-800 placeholder:text-gray-400 focus:ring-0 focus:outline-none resize-none max-h-32 text-[16px]"
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 pb-1 pr-1">
          {/* Mic Button */}
          <button
            onClick={handleMicClick}
            className={`
                p-2 rounded-full transition-all duration-200 flex-shrink-0
                ${listening ? "bg-red-100 text-red-500 animate-pulse scale-110" : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"}
                ${text.trim() || image ? "hidden md:block" : ""}
              `}
            title={t("askWithVoice")}
          >
            <Mic size={22} />
          </button>

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={!text.trim() && !image}
            className={`
                p-2 rounded-full transition-all duration-200 flex-shrink-0
                ${(text.trim() || image)
                ? "bg-green-600 text-white shadow-md hover:bg-green-700 hover:scale-105 active:scale-95"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"}
              `}
            title="Send"
          >
            <Send size={20} className={text.trim() || image ? "ml-0.5" : ""} />
          </button>
        </div>
      </div>

      {listening && (
        <div className="text-center text-xs text-red-400 mt-2 font-medium animate-pulse">
          Listening to your voice... ({language.toUpperCase()})
        </div>
      )}
    </div>
  );
}

