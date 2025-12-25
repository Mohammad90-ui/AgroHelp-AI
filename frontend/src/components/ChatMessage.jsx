import { User, Sparkles, Volume2, Play, Pause, Copy, Check } from "lucide-react";
import { useAudio } from "../context/AudioContext";
import { useTranslation } from "react-i18next";
import { useTyping } from "../hooks/useTyping";
import ReactMarkdown from "react-markdown";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ChatMessage({ message }) {
  const isUser = message.sender === "user";
  const { isPlaying, currentTrackSrc, playPause } = useAudio();
  const { t } = useTranslation();
  const [isCopied, setIsCopied] = useState(false);

  const typedText = useTyping(isUser ? "" : message.text, 30);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    if (typedText.length === message.text.length && message.text.length > 0) {
      setIsTypingComplete(true);
    } else {
      setIsTypingComplete(false);
    }
  }, [typedText, message.text]);

  const isThisMessagePlaying = isPlaying && currentTrackSrc === message.audio;

  const handlePlayPauseClick = () => {
    if (message.audio) {
      playPause(message.audio);
    }
  };

  const handleCopy = () => {
    if (message.text) {
      navigator.clipboard.writeText(message.text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-start gap-3 my-6 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${isUser
          ? "bg-gradient-to-br from-green-500 to-green-600 text-white"
          : "bg-white border text-green-600"
          }`}
      >
        {isUser ? <User size={20} /> : <Sparkles size={20} />}
      </div>

      {/* Message Bubble */}
      <div
        className={`flex flex-col max-w-[85%] md:max-w-2xl shadow-sm ${isUser
          ? "bg-green-600 text-white rounded-2xl rounded-tr-sm p-4"
          : "bg-white border border-gray-100 rounded-2xl rounded-tl-sm p-5 shadow-sm"
          }`}
      >
        {message.image && (
          <div className="mb-3 overflow-hidden rounded-xl border border-white/20">
            <img
              src={message.image}
              alt="user upload"
              className="w-full max-w-sm object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        <div className={`prose prose-sm max-w-none ${isUser ? "prose-invert text-white" : "text-gray-800"}`}>
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => <h1 className="text-xl font-bold mb-2 mt-4 text-green-800" {...props} />,
              h2: ({ node, ...props }) => <h2 className="text-lg font-semibold mb-2 mt-3 text-green-700" {...props} />,
              li: ({ node, ...props }) => <li className="mb-1" {...props} />,
              strong: ({ node, ...props }) => <strong className="font-bold text-green-900" {...props} />,
            }}
          >
            {isUser ? message.text : typedText}
          </ReactMarkdown>
        </div>

        {/* Footer Actions (Bot only) */}
        {!isUser && message.text && (
          <div className={`mt-4 pt-3 flex items-center gap-3 border-t border-gray-100 transition-opacity duration-300 ${isTypingComplete ? "opacity-100" : "opacity-0"}`}>
            {message.audio && (
              <button
                onClick={handlePlayPauseClick}
                className={`flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full transition-all ${isThisMessagePlaying
                  ? "bg-green-100 text-green-700 ring-2 ring-green-200"
                  : "bg-gray-50 text-gray-600 hover:bg-green-50 hover:text-green-700"
                  }`}
              >
                {isThisMessagePlaying ? <Pause size={14} className="fill-current" /> : <Play size={14} className="fill-current" />}
                <span>{isThisMessagePlaying ? t("pause") : t("readAloud")}</span>
              </button>
            )}

            <button
              onClick={handleCopy}
              className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 transition-all"
            >
              {isCopied ? <Check size={14} /> : <Copy size={14} />}
              <span>{isCopied ? t("copied") : t("copy")}</span>
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

