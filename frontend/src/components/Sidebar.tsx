import React, { useState } from 'react';
import {
  MessageSquare,
  Plus,
  Search,
  Code2,
  GraduationCap,
  Sparkles,
  Settings,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Edit2,
  Check,
  X,
  Bot
} from 'lucide-react';
import type { AssistantMode, Conversation, Language } from '../types';

interface SidebarProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelectConversation: (id: string) => void;
  onNewChat: (mode?: AssistantMode) => void;
  onDeleteConversation: (id: string) => void;
  onRenameConversation: (id: string, newTitle: string) => void;
  onClearAll: () => void;
  onOpenSettings: () => void;
  currentMode: AssistantMode;
  onSelectMode: (mode: AssistantMode) => void;
  language: Language;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  isCollapsedDesktop: boolean;
  onToggleCollapseDesktop: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  conversations,
  activeId,
  onSelectConversation,
  onNewChat,
  onDeleteConversation,
  onRenameConversation,
  onClearAll,
  onOpenSettings,
  currentMode,
  onSelectMode,
  language,
  isOpenMobile,
  onCloseMobile,
  isCollapsedDesktop,
  onToggleCollapseDesktop
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  // Filter conversations by search term
  const filteredConversations = conversations.filter(convo => {
    const q = searchQuery.toLowerCase();
    const titleMatch = convo.title.toLowerCase().includes(q);
    const contentMatch = convo.messages.some(m => m.content.toLowerCase().includes(q));
    return titleMatch || contentMatch;
  });

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

  const modes: { id: AssistantMode; labelEn: string; labelTa: string; icon: React.ReactNode; desc: string }[] = [
    {
      id: 'general',
      labelEn: 'AI Assistant',
      labelTa: 'பொது AI உதவியாளர்',
      icon: <Sparkles size={18} />,
      desc: 'Smart general assistant'
    },
    {
      id: 'coding',
      labelEn: 'Coding Assistant',
      labelTa: 'நிரலாக்க உதவியாளர்',
      icon: <Code2 size={18} />,
      desc: 'Debug & build software'
    },
    {
      id: 'study',
      labelEn: 'Study Assistant',
      labelTa: 'கல்வி உதவியாளர்',
      icon: <GraduationCap size={18} />,
      desc: 'Learn concepts & exams'
    }
  ];

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar Element */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 flex flex-col bg-[#0B1220]/95 backdrop-blur-2xl border-r border-cyan-500/15 transition-all duration-300 ease-in-out ${
          isOpenMobile ? 'translate-x-0 w-72' : '-translate-x-full md:translate-x-0'
        } ${isCollapsedDesktop ? 'md:w-20' : 'md:w-72'}`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between p-4 border-b border-cyan-500/15">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-violet-600 flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.4)] flex-shrink-0">
              <Bot size={22} className="text-white" />
            </div>
            {!isCollapsedDesktop && (
              <div className="flex flex-col min-w-0">
                <span className="font-extrabold text-base tracking-wider bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent truncate font-mono">
                  NOVA AI
                </span>
                <span className="text-[10px] text-slate-400 tracking-tight truncate">
                  {language === 'ta' ? 'நுண்ணறிவு குரல் உதவியாளர்' : 'Intelligent Assistant'}
                </span>
              </div>
            )}
          </div>

          {/* Desktop collapse toggle button */}
          <button
            onClick={onToggleCollapseDesktop}
            type="button"
            className="hidden md:flex p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800/80 transition-colors"
            title={isCollapsedDesktop ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsedDesktop ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>

          {/* Mobile close button */}
          <button
            onClick={onCloseMobile}
            type="button"
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-3">
          <button
            onClick={() => {
              onNewChat(currentMode);
              if (isOpenMobile) onCloseMobile();
            }}
            type="button"
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-violet-500/20 hover:from-cyan-500/30 hover:to-violet-500/30 border border-cyan-500/30 hover:border-cyan-400/60 text-cyan-200 hover:text-white transition-all shadow-lg shadow-cyan-950/20 group font-medium text-sm"
            title="Start a new conversation"
          >
            <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300 text-cyan-400" />
            {!isCollapsedDesktop && (
              <span>{language === 'ta' ? 'புதிய உரையாடல்' : 'New Chat'}</span>
            )}
          </button>
        </div>

        {/* Mode Selector Tabs */}
        {!isCollapsedDesktop ? (
          <div className="px-3 py-2 border-b border-cyan-500/10">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 px-2 block mb-1.5">
              {language === 'ta' ? 'உதவியாளர் பயன்முறை' : 'Assistant Modes'}
            </span>
            <div className="space-y-1">
              {modes.map(mode => (
                <button
                  key={mode.id}
                  onClick={() => onSelectMode(mode.id)}
                  type="button"
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    currentMode === mode.id
                      ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,229,255,0.15)]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <span className={currentMode === mode.id ? 'text-cyan-400' : 'text-slate-400'}>
                    {mode.icon}
                  </span>
                  <div className="flex flex-col text-left">
                    <span>{language === 'ta' ? mode.labelTa : mode.labelEn}</span>
                    <span className="text-[10px] text-slate-500">{mode.desc}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 py-2 border-b border-cyan-500/10">
            {modes.map(mode => (
              <button
                key={mode.id}
                onClick={() => onSelectMode(mode.id)}
                title={language === 'ta' ? mode.labelTa : mode.labelEn}
                type="button"
                className={`p-2.5 rounded-xl transition-all ${
                  currentMode === mode.id
                    ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {mode.icon}
              </button>
            ))}
          </div>
        )}

        {/* Conversation Search (when expanded) */}
        {!isCollapsedDesktop && (
          <div className="px-3 pt-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={language === 'ta' ? 'உரையாடலைத் தேடு...' : 'Search chats...'}
                className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/60 focus:border-cyan-500/50 text-xs text-slate-200 placeholder-slate-500 focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  type="button"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
          {!isCollapsedDesktop && (
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 px-3 block mb-1">
              {language === 'ta' ? 'முந்தைய உரையாடல்கள்' : 'Recent Chats'}
            </span>
          )}

          {filteredConversations.length === 0 ? (
            !isCollapsedDesktop && (
              <div className="text-center py-8 px-4 text-xs text-slate-400">
                {searchQuery ? 'No matching conversations found.' : 'No conversations yet. Start one above!'}
              </div>
            )
          ) : (
            filteredConversations.map(convo => {
              const isActive = convo.id === activeId;
              const isEditing = editingId === convo.id;

              return (
                <div
                  key={convo.id}
                  onClick={() => {
                    onSelectConversation(convo.id);
                    if (isOpenMobile) onCloseMobile();
                  }}
                  className={`group relative flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer text-xs transition-all ${
                    isActive
                      ? 'bg-slate-800/90 text-cyan-300 border border-cyan-500/30 shadow-md shadow-cyan-950/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                  title={convo.title}
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <MessageSquare
                      size={15}
                      className={isActive ? 'text-cyan-400 flex-shrink-0' : 'text-slate-400 flex-shrink-0'}
                    />
                    {!isCollapsedDesktop && (
                      <div className="flex-1 min-w-0">
                        {isEditing ? (
                          <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                            <input
                              type="text"
                              value={editTitle}
                              onChange={e => setEditTitle(e.target.value)}
                              onKeyDown={e => {
                                if (e.key === 'Enter') handleSaveRename(convo.id, e);
                                if (e.key === 'Escape') handleCancelRename(e as any);
                              }}
                              autoFocus
                              className="w-full bg-slate-950 px-2 py-0.5 rounded border border-cyan-500 text-xs text-white focus:outline-none"
                            />
                            <button
                              onClick={e => handleSaveRename(convo.id, e)}
                              type="button"
                              className="text-emerald-400 hover:text-emerald-300 p-1"
                            >
                              <Check size={14} />
                            </button>
                            <button
                              onClick={handleCancelRename}
                              type="button"
                              className="text-slate-400 hover:text-slate-300 p-1"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <p className="truncate font-medium text-slate-200 group-hover:text-cyan-200">
                            {convo.title}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions (Rename / Delete) */}
                  {!isCollapsedDesktop && !isEditing && (
                    <div className="hidden group-hover:flex items-center gap-1">
                      <button
                        onClick={e => handleStartRename(convo, e)}
                        type="button"
                        className="p-1 text-slate-400 hover:text-cyan-300 hover:bg-slate-700/60 rounded"
                        title="Rename conversation"
                      >
                        <Edit2 size={12} />
                      </button>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          onDeleteConversation(convo.id);
                        }}
                        type="button"
                        className="p-1 text-slate-400 hover:text-red-400 hover:bg-slate-700/60 rounded"
                        title="Delete conversation"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer Area */}
        <div className="p-3 border-t border-cyan-500/15 space-y-1">
          {conversations.length > 0 && !isCollapsedDesktop && (
            <button
              onClick={onClearAll}
              type="button"
              className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950/20 text-xs transition-colors"
            >
              <Trash2 size={14} />
              <span>{language === 'ta' ? 'அனைத்து வரலாற்றையும் அழி' : 'Clear all chats'}</span>
            </button>
          )}

          <button
            onClick={onOpenSettings}
            type="button"
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:text-cyan-300 hover:bg-slate-800/60 text-xs font-medium transition-colors ${
              isCollapsedDesktop ? 'justify-center' : ''
            }`}
            title="Settings"
          >
            <Settings size={16} className="text-cyan-400" />
            {!isCollapsedDesktop && (
              <span>{language === 'ta' ? 'அமைப்புகள்' : 'Settings'}</span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};
