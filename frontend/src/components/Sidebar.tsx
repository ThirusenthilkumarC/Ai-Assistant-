import React, { useState } from 'react';
import {
  MessageSquare,
  Clock,
  Settings,
  HelpCircle,
  ChevronRight,
  ChevronDown,
  Edit2,
  Trash2,
  Check,
  X,
  Hexagon,
  Diamond
} from 'lucide-react';
import type { AssistantMode, Conversation, Language } from '../types';

interface SidebarProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelectConversation: (id: string) => void;
  onNewChat: (mode?: AssistantMode) => void;
  onDeleteConversation: (id: string) => void;
  onRenameConversation: (id: string, newTitle: string) => void;
  onOpenSettings: () => void;
  currentMode: AssistantMode;
  onSelectMode: (mode: AssistantMode) => void;
  language: Language;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  conversations,
  activeId,
  onSelectConversation,
  onNewChat,
  onDeleteConversation,
  onRenameConversation,
  onOpenSettings,
  currentMode,
  language,
  isOpenMobile,
  onCloseMobile
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [showAllRecent, setShowAllRecent] = useState(false);

  // Suggested default history placeholders if fresh installation (clicking starts new chat with prompt)
  const defaultRecent = [
    { title: 'Explain this Code', prompt: 'Explain how async/await and promises work in JavaScript.' },
    { title: 'Project Ideas', prompt: 'Give me 3 innovative AI startup project ideas.' },
    { title: 'Debugging JavaScript', prompt: 'Help me debug: TypeError cannot read properties of undefined.' },
    { title: 'Learn React', prompt: 'Teach me the core principles of React 19 hooks and state.' },
    { title: 'Study Assistant', prompt: 'Explain the Transformer attention mechanism in simple terms.' }
  ];

  const handleStartRename = (convo: Conversation, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(convo.id);
    setEditTitle(convo.title);
  };

  const handleSaveRename = (id: string, e: React.MouseEvent | React.FormEvent) => {
    e.stopPropagation();
    if (editTitle.trim()) {
      onRenameConversation(id, editTitle.trim());
    }
    setEditingId(null);
  };

  const handleCancelRename = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(null);
  };

  // Limit shown conversations unless expanded
  const displayedConversations = showAllRecent
    ? conversations
    : conversations.slice(0, 5);

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 md:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar - exactly 25-26% width on desktop */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 flex flex-col bg-[#0D1020] border-r border-white/[0.08] transition-all duration-300 ease-in-out ${
          isOpenMobile ? 'translate-x-0 w-72' : '-translate-x-full md:translate-x-0'
        } md:w-[26%] min-w-[240px] max-w-[320px] h-full p-4 select-none justify-between overflow-y-auto`}
      >
        <div className="space-y-5">
          {/* A. NOVA AI LOGO */}
          <div className="flex items-center justify-between pt-1 px-1">
            <div className="flex items-center gap-2.5">
              {/* Purple Futuristic Geometric Polygon Logo */}
              <div className="relative w-8 h-8 rounded-xl bg-gradient-to-tr from-[#6D28D9] via-[#8B5CF6] to-[#A855F7] p-[1.5px] shadow-[0_0_20px_rgba(139,92,246,0.6)]">
                <div className="w-full h-full rounded-[10px] bg-[#0D1020] flex items-center justify-center">
                  <Hexagon size={18} className="text-[#A855F7] fill-purple-900/40" />
                </div>
              </div>
              <span className="font-extrabold text-lg tracking-wider font-mono bg-gradient-to-r from-white via-slate-100 to-purple-300 bg-clip-text text-transparent">
                NOVA
              </span>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={onCloseMobile}
              type="button"
              className="md:hidden p-1 text-slate-400 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* B. NEW CHAT BUTTON */}
          <div>
            <button
              onClick={() => {
                onNewChat(currentMode);
                if (isOpenMobile) onCloseMobile();
              }}
              type="button"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-[#5B21B6] via-[#6D28D9] to-[#7C3AED] hover:from-[#6D28D9] hover:to-[#8B5CF6] border border-purple-400/30 text-white font-medium text-sm transition-all duration-200 shadow-[0_4px_20px_rgba(109,40,217,0.35)] hover:shadow-[0_6px_25px_rgba(139,92,246,0.5)] active:scale-[0.98] group"
              title="Start a new conversation"
            >
              <MessageSquare size={17} className="text-white group-hover:scale-110 transition-transform" />
              <span className="tracking-wide">
                {language === 'ta' ? 'புதிய உரையாடல்' : 'New Chat'}
              </span>
            </button>
          </div>

          {/* C. RECENT CONVERSATIONS */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center gap-2 px-1 text-xs text-slate-400 font-medium tracking-wide">
              <Clock size={13} className="text-slate-400" />
              <span>{language === 'ta' ? 'சமீபத்தியவை' : 'Recent'}</span>
            </div>

            {/* Vertical timeline accent list */}
            <div className="relative pl-3 ml-2 border-l border-white/[0.08] space-y-1">
              {conversations.length === 0 ? (
                // Sample initial placeholders if user has no chats yet
                defaultRecent.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onNewChat(currentMode)}
                    className="w-full text-left py-1.5 px-2 rounded-lg text-xs text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] transition-colors truncate block"
                  >
                    {item.title}
                  </button>
                ))
              ) : (
                // Real conversation history
                displayedConversations.map(convo => {
                  const isActive = convo.id === activeId;
                  const isEditing = editingId === convo.id;

                  return (
                    <div
                      key={convo.id}
                      onClick={() => {
                        onSelectConversation(convo.id);
                        if (isOpenMobile) onCloseMobile();
                      }}
                      className={`group relative flex items-center justify-between py-1.5 px-2 rounded-lg text-xs cursor-pointer transition-all ${
                        isActive
                          ? 'bg-purple-950/40 text-purple-200 border-l-2 border-purple-500 font-medium shadow-sm'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                      }`}
                      title={convo.title}
                    >
                      {isEditing ? (
                        <div
                          className="flex items-center gap-1 w-full"
                          onClick={e => e.stopPropagation()}
                        >
                          <input
                            type="text"
                            value={editTitle}
                            onChange={e => setEditTitle(e.target.value)}
                            onKeyDown={e => {
                              if (e.key === 'Enter') handleSaveRename(convo.id, e);
                              if (e.key === 'Escape') handleCancelRename(e as any);
                            }}
                            autoFocus
                            className="w-full bg-[#171A2A] px-2 py-0.5 rounded border border-purple-500 text-xs text-white focus:outline-none"
                          />
                          <button
                            onClick={e => handleSaveRename(convo.id, e)}
                            type="button"
                            className="text-emerald-400 hover:text-emerald-300 p-0.5"
                          >
                            <Check size={12} />
                          </button>
                          <button
                            onClick={handleCancelRename}
                            type="button"
                            className="text-slate-400 hover:text-slate-300 p-0.5"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <span className="truncate pr-1">{convo.title}</span>
                          <div className="hidden group-hover:flex items-center gap-1 flex-shrink-0">
                            <button
                              onClick={e => handleStartRename(convo, e)}
                              type="button"
                              className="text-slate-400 hover:text-purple-300 p-0.5"
                              title="Rename"
                            >
                              <Edit2 size={11} />
                            </button>
                            <button
                              onClick={e => {
                                e.stopPropagation();
                                onDeleteConversation(convo.id);
                              }}
                              type="button"
                              className="text-slate-400 hover:text-red-400 p-0.5"
                              title="Delete"
                            >
                              <Trash2 size={11} />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })
              )}

              {/* "More v" toggle */}
              {conversations.length > 5 && (
                <button
                  type="button"
                  onClick={() => setShowAllRecent(prev => !prev)}
                  className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-purple-300 pt-1 px-2 transition-colors font-medium"
                >
                  <span>{showAllRecent ? 'Less' : 'More'}</span>
                  <ChevronDown
                    size={12}
                    className={`transition-transform duration-200 ${showAllRecent ? 'rotate-180' : ''}`}
                  />
                </button>
              )}
            </div>
          </div>

          {/* D. SETTINGS AND HELP */}
          <div className="space-y-1 pt-1 border-t border-white/[0.06]">
            <button
              onClick={onOpenSettings}
              type="button"
              className="w-full flex items-center gap-3 px-2 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-white/[0.04] transition-colors"
            >
              <Settings size={15} className="text-slate-400" />
              <span>{language === 'ta' ? 'அமைப்புகள்' : 'Settings'}</span>
            </button>

            <button
              onClick={onOpenSettings}
              type="button"
              className="w-full flex items-center gap-3 px-2 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-white/[0.04] transition-colors"
            >
              <HelpCircle size={15} className="text-slate-400" />
              <span>{language === 'ta' ? 'உதவி & விவரங்கள்' : 'Help & Updates'}</span>
            </button>
          </div>
        </div>

        {/* Bottom Section: E. Upgrade Card + F. User Profile */}
        <div className="pt-4 space-y-3">
          {/* E. UPGRADE TO PRO / UNLOCK CARD */}
          <div className="rounded-2xl p-4 bg-gradient-to-b from-[#141728]/90 to-[#101322]/90 border border-white/[0.09] shadow-lg relative overflow-hidden group">
            {/* Ambient Purple Flare */}
            <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-purple-600/15 blur-xl pointer-events-none" />

            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-lg bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300">
                <Diamond size={13} />
              </div>
              <h4 className="text-xs font-semibold text-white tracking-wide">
                Unlock NOVA AI
              </h4>
            </div>

            <p className="text-[11px] leading-relaxed text-slate-400 mb-3">
              Explore a smarter way to create, learn, and build with NOVA's cognitive co-pilot.
            </p>

            <button
              onClick={onOpenSettings}
              type="button"
              className="w-full py-2 rounded-xl bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] hover:from-[#5B21B6] hover:to-[#7C3AED] text-white text-xs font-semibold transition-all shadow-md shadow-purple-900/30 active:scale-98"
            >
              Explore Features
            </button>
          </div>

          {/* F. USER PROFILE */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-purple-900/40 border border-purple-400/40 flex-shrink-0">
                NU
              </div>
              <div className="flex flex-col min-w-0 text-left">
                <span className="text-xs font-medium text-slate-200 truncate">
                  NOVA User
                </span>
                <span className="text-[10px] text-slate-500 truncate">
                  Personal AI Assistant
                </span>
              </div>
            </div>

            <button
              onClick={onOpenSettings}
              type="button"
              className="p-1 rounded-lg text-slate-500 hover:text-purple-300 hover:bg-white/5 transition-colors"
              title="Open Settings"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
