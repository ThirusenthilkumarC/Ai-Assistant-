import { useState, useEffect, useCallback } from 'react';
import type { AssistantMode, ChatMessage, Conversation, Language } from '../types';

const STORAGE_KEY = 'nova_ai_conversations_v1';
const ACTIVE_CONVO_KEY = 'nova_ai_active_convo_id';

export const useConversations = (defaultMode: AssistantMode = 'general', defaultLanguage: Language = 'en') => {
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn('[useConversations] Failed to parse stored conversations, initializing fresh:', e);
    }
    return [];
  });

  const [activeId, setActiveId] = useState<string | null>(() => {
    return localStorage.getItem(ACTIVE_CONVO_KEY) || null;
  });

  // Save conversations to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
    } catch (e) {
      console.error('[useConversations] Failed to persist conversations to localStorage:', e);
    }
  }, [conversations]);

  // Save activeId to localStorage
  useEffect(() => {
    if (activeId) {
      localStorage.setItem(ACTIVE_CONVO_KEY, activeId);
    } else {
      localStorage.removeItem(ACTIVE_CONVO_KEY);
    }
  }, [activeId]);

  // Current active conversation object
  const activeConversation = conversations.find(c => c.id === activeId) || null;

  /**
   * Create a new conversation and set it as active
   */
  const createNewConversation = useCallback((mode: AssistantMode = defaultMode, language: Language = defaultLanguage) => {
    const newConvo: Conversation = {
      id: 'convo_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      title: language === 'ta' ? 'புதிய உரையாடல்' : 'New Chat',
      messages: [],
      mode,
      language,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setConversations(prev => [newConvo, ...prev]);
    setActiveId(newConvo.id);
    return newConvo;
  }, [defaultMode, defaultLanguage]);

  /**
   * Add a message to the active conversation (or auto-create one if none exists)
   */
  const addMessage = useCallback((message: ChatMessage, autoTitle?: string) => {
    setConversations(prev => {
      const targetId = activeId;
      const updatedList = [...prev];

      // If no active conversation exists, create one
      if (!targetId || !updatedList.some(c => c.id === targetId)) {
        const newConvo: Conversation = {
          id: 'convo_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
          title: autoTitle || (message.language === 'ta' ? 'புதிய உரையாடல்' : 'New Chat'),
          messages: [message],
          mode: message.mode || defaultMode,
          language: message.language || defaultLanguage,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        setActiveId(newConvo.id);
        return [newConvo, ...updatedList];
      }

      // Add message to active conversation
      return updatedList.map(convo => {
        if (convo.id === targetId) {
          const shouldUpdateTitle = convo.messages.length === 0 && autoTitle;
          return {
            ...convo,
            title: shouldUpdateTitle ? autoTitle : convo.title,
            messages: [...convo.messages, message],
            updatedAt: new Date().toISOString()
          };
        }
        return convo;
      });
    });
  }, [activeId, defaultMode, defaultLanguage]);

  /**
   * Update a specific message (e.g. for retrying or editing)
   */
  const updateMessage = useCallback((messageId: string, updates: Partial<ChatMessage>) => {
    if (!activeId) return;
    setConversations(prev =>
      prev.map(convo => {
        if (convo.id === activeId) {
          return {
            ...convo,
            messages: convo.messages.map(m => (m.id === messageId ? { ...m, ...updates } : m)),
            updatedAt: new Date().toISOString()
          };
        }
        return convo;
      })
    );
  }, [activeId]);

  /**
   * Rename a conversation
   */
  const renameConversation = useCallback((id: string, newTitle: string) => {
    if (!newTitle.trim()) return;
    setConversations(prev =>
      prev.map(c => (c.id === id ? { ...c, title: newTitle.trim(), updatedAt: new Date().toISOString() } : c))
    );
  }, []);

  /**
   * Delete an individual conversation
   */
  const deleteConversation = useCallback((id: string) => {
    setConversations(prev => {
      const filtered = prev.filter(c => c.id !== id);
      if (activeId === id) {
        setActiveId(filtered.length > 0 ? filtered[0].id : null);
      }
      return filtered;
    });
  }, [activeId]);

  /**
   * Clear all conversation history
   */
  const clearAllConversations = useCallback(() => {
    setConversations([]);
    setActiveId(null);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(ACTIVE_CONVO_KEY);
  }, []);

  /**
   * Export all conversations as JSON string
   */
  const exportConversationsJson = useCallback(() => {
    return JSON.stringify(conversations, null, 2);
  }, [conversations]);

  return {
    conversations,
    activeConversation,
    activeId,
    setActiveId,
    createNewConversation,
    addMessage,
    updateMessage,
    renameConversation,
    deleteConversation,
    clearAllConversations,
    exportConversationsJson
  };
};
