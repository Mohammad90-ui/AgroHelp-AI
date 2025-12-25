import { Menu, Plus, Search, MessageSquare, X, Settings, HelpCircle } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";

export default function Sidebar({ isOpen, setIsOpen, chatHistory, onLoadChat, onNewChat, activeChatId }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const { t } = useTranslation();

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`
          flex flex-col bg-white border-r border-gray-200 transition-all duration-300
          fixed top-0 left-0 h-full z-40 lg:relative lg:translate-x-0 shadow-lg lg:shadow-none
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          ${isExpanded ? "w-72" : "w-20"}
        `}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-100">
          <div className={`flex items-center gap-3 ${!isExpanded && "justify-center w-full"}`}>
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white shrink-0">
              <span className="font-bold text-lg">A</span>
            </div>
            {isExpanded && <span className="font-heading font-bold text-xl text-gray-800 tracking-tight">AgroHelp</span>}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="ml-auto p-1.5 hover:bg-gray-100 text-gray-500 rounded-lg hidden lg:block transition-colors"
            >
              <Menu size={18} />
            </button>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 text-gray-500 rounded-lg lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          <button
            onClick={onNewChat}
            className={`
              flex items-center gap-3 p-3 rounded-xl bg-green-600 text-white hover:bg-green-700 
              transition-all shadow-md hover:shadow-lg w-full
              ${!isExpanded && "justify-center px-0"}
            `}
          >
            <Plus size={20} />
            {isExpanded && <span className="font-semibold">{t("newChat")}</span>}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          {isExpanded && <p className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t("history") || "History"}</p>}

          {chatHistory && chatHistory.length > 0 ? (
            chatHistory.map((chat) => (
              <button
                key={chat.id}
                onClick={() => onLoadChat(chat)}
                className={`
                  flex items-center gap-3 p-3 rounded-xl transition-colors w-full text-left
                  ${activeChatId === chat.id ? "bg-green-50 text-green-700 font-medium" : "hover:bg-gray-50 text-gray-700 hover:text-green-800"}
                  ${!isExpanded && "justify-center"}
                `}
              >
                <MessageSquare size={18} className="shrink-0" />
                {isExpanded && <span className="truncate text-sm">{chat.title}</span>}
              </button>
            ))
          ) : (
            isExpanded && <p className="text-gray-400 text-sm px-3 italic">No history yet</p>
          )}
        </div>

        <div className="p-4 border-t border-green-100 bg-green-50/50 space-y-2">
          {isExpanded ? (
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-3 text-sm text-gray-600 px-2 cursor-pointer hover:text-green-700 transition-colors">
                <Settings size={18} /> <span>Settings</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 px-2 cursor-pointer hover:text-green-700 transition-colors">
                <HelpCircle size={18} /> <span>Help & Support</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <Settings size={20} className="text-gray-500" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

