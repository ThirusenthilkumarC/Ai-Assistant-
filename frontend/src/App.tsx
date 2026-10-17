import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type {
  AiState,
  AppSettings,
  AssistantMode,
  BackendStatus,
  ChatMessage,
  Language
} from './types';
import { checkBackendStatus, sendChatMessage, fetchSuggestedTitle } from './services/api.service';
import { useConversations } from './hooks/useConversations';
import { useVoice } from './hooks/useVoice';
import { WindowFrame } from './components/WindowFrame';
import { Sidebar } from './components/Sidebar';
import { ChatArea } from './components/ChatArea';
import { MessageInput } from './components/MessageInput';
import { SettingsModal } from './components/SettingsModal';
import { ConfirmModal } from './components/ConfirmModal';
import { Toast } from './components/Toast';
import type { ToastMessage } from './components/Toast';

const SETTINGS_STORAGE_KEY = 'nova_ai_app_settings_v1';

export const App: React.FC = () => {
  // 1. App Configuration & Settings
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return {
      language: 'en',
      mode: 'general',
      reducedMotion: false,
      voice: {
        enabled: true,
        voiceURI: '',
        pitch: 1.0,
        rate: 1.0,
        autoPlay: true
      }
    };
  });

  // Current session mode and language
  const [currentMode, setCurrentMode] = useState<AssistantMode>(settings.mode);
  const [currentLanguage, setCurrentLanguage] = useState<Language>(settings.language);

  // Sync settings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // ignore
    }
  }, [settings]);

  // 2. Backend & AI Provider Status
  const [backendStatus, setBackendStatus] = useState<BackendStatus>({
    configured: false,
    provider: 'Checking...',
    model: 'Checking...',
    message: 'Connecting to backend...',
    connected: false
  });

  const refreshBackendStatus = useCallback(async () => {
    const status = await checkBackendStatus();
    setBackendStatus(status);
  }, []);

  useEffect(() => {
    refreshBackendStatus();
    const interval = setInterval(refreshBackendStatus, 30000);
    return () => clearInterval(interval);
  }, [refreshBackendStatus]);

  // 3. Toasts Management
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((type: 'success' | 'warning' | 'info' | 'error', text: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev.slice(-3), { id, type, text }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // 4. Conversation History Hook
  const {
    conversations,
    activeConversation,
    activeId,
    setActiveId,
    createNewConversation,
    addMessage,
    renameConversation,
    deleteConversation,
    clearAllConversations,
    exportConversationsJson
  } = useConversations(currentMode, currentLanguage);

  // Sync mode and language with active conversation if it has preferences
  useEffect(() => {
    if (activeConversation) {
      if (activeConversation.mode) setCurrentMode(activeConversation.mode);
      if (activeConversation.language) setCurrentLanguage(activeConversation.language);
    }
  }, [activeConversation?.id]);

  // 5. Voice Input & Output Hook
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const {
    isListening,
    isSpeaking,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    recognitionError,
    availableVoices,
    isSpeechRecognitionSupported
  } = useVoice({
    language: currentLanguage,
    settings: settings.voice,
    onTranscriptResult: (text, isFinal) => {
      setVoiceTranscript(text);
      if (isFinal) {
        setTimeout(() => {
          handleSendMessage(text);
          setVoiceTranscript('');
        }, 300);
      }
    }
  });

  // Alert on recognition error
  useEffect(() => {
    if (recognitionError) {
      addToast('warning', recognitionError);
    }
  }, [recognitionError, addToast]);

  // 6. Dynamic AI State for Orb
  const aiState: AiState = useMemo(() => {
    if (isListening) return 'listening';
    if (isGenerating) return 'thinking';
    if (isSpeaking) return 'speaking';
    return 'idle';
  }, [isListening, isGenerating, isSpeaking]);

  // 7. Modals & UI Layout State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isClearAllModalOpen, setIsClearAllModalOpen] = useState(false);
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  // 8. Send Chat Message Workflow
  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isGenerating) return;

    // Halt any ongoing voice reading
    stopSpeaking();

    const userMsgId = 'msg_' + Date.now();
    const userMessage: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      content: text.trim(),
      timestamp: new Date().toISOString(),
      mode: currentMode,
      language: currentLanguage
    };

    const currentMessages = activeConversation?.messages || [];
    const isFirstMessage = currentMessages.length === 0;

    // Add user message to state
    addMessage(userMessage);

    // Enter Thinking state
    setIsGenerating(true);

    try {
      const result = await sendChatMessage({
        message: text.trim(),
        conversationHistory: [...currentMessages, userMessage],
        mode: currentMode,
        language: currentLanguage
      });

      const assistantMsgId = 'msg_' + (Date.now() + 1);
      const assistantMessage: ChatMessage = {
        id: assistantMsgId,
        sender: 'assistant',
        content: result.response,
        timestamp: result.timestamp || new Date().toISOString(),
        isDemo: result.isDemo,
        provider: result.provider,
        model: result.model,
        mode: result.mode || currentMode,
        language: result.language || currentLanguage
      };

      let titleToSet: string | undefined;
      if (isFirstMessage) {
        titleToSet = await fetchSuggestedTitle(text.trim(), currentLanguage);
      }

      addMessage(assistantMessage, titleToSet);

      // Spoken response if enabled
      if (settings.voice.enabled) {
        speak(result.response);
      }

      if (result.isDemo && !backendStatus.configured) {
        addToast(
          'info',
          currentLanguage === 'ta'
            ? 'டெமோ பயன்முறை: முழுமையான AI பதில்களுக்கு Settings-ல் API சாவியைச் சேர்க்கவும்.'
            : 'Running in Demo Mode. Add GEMINI_API_KEY in backend/.env for live AI.'
        );
      }
    } catch (err: any) {
      console.error('[App] Error in chat response:', err);

      const errorMsgId = 'err_' + Date.now();
      const errorMessage: ChatMessage = {
        id: errorMsgId,
        sender: 'assistant',
        content: `⚠️ ${err.message || 'Failed to receive response from NOVA AI.'}`,
        timestamp: new Date().toISOString(),
        isError: true,
        mode: currentMode,
        language: currentLanguage
      };

      addMessage(errorMessage);
      addToast('error', err.message || 'Error communicating with AI service');
    } finally {
      setIsGenerating(false);
    }
  };

  // Retry a failed or previous prompt
  const handleRetry = (content: string) => {
    const msgs = activeConversation?.messages || [];
    const lastUserMsg = [...msgs].reverse().find(m => m.sender === 'user');
    if (lastUserMsg) {
      handleSendMessage(lastUserMsg.content);
    } else {
      handleSendMessage(content);
    }
  };

  // Handle clicking a suggestion card
  const handleSelectSuggestion = (prompt: string, mode?: AssistantMode, lang?: Language) => {
    if (mode) setCurrentMode(mode);
    if (lang) setCurrentLanguage(lang);
    handleSendMessage(prompt);
  };

  // Update Settings handler
  const handleUpdateSettings = (updates: Partial<AppSettings>) => {
    setSettings(prev => ({
      ...prev,
      ...updates,
      voice: updates.voice ? { ...prev.voice, ...updates.voice } : prev.voice
    }));
    if (updates.language) setCurrentLanguage(updates.language);
    if (updates.mode) setCurrentMode(updates.mode);
  };

  // Clear all chats
  const handleConfirmClearAll = () => {
    clearAllConversations();
    createNewConversation(currentMode, currentLanguage);
    setIsClearAllModalOpen(false);
    addToast('info', 'All conversation history has been cleared.');
  };

  // Export data
  const handleExportData = () => {
    try {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(exportConversationsJson());
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `nova_ai_chats_${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      addToast('success', 'Conversations exported successfully!');
    } catch {
      addToast('error', 'Failed to export conversation data.');
    }
  };

  return (
    <WindowFrame url="nova.ai" onRefresh={refreshBackendStatus}>
      {/* 1. LEFT SIDEBAR MATCHING REFERENCE IMAGE */}
      <Sidebar
        conversations={conversations}
        activeId={activeId}
        onSelectConversation={id => setActiveId(id)}
        onNewChat={mode => createNewConversation(mode || currentMode, currentLanguage)}
        onDeleteConversation={id => deleteConversation(id)}
        onRenameConversation={(id, newTitle) => renameConversation(id, newTitle)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        currentMode={currentMode}
        onSelectMode={mode => {
          setCurrentMode(mode);
          addToast('info', `Switched to ${mode.toUpperCase()} Mode`);
        }}
        language={currentLanguage}
        isOpenMobile={isOpenMobile}
        onCloseMobile={() => setIsOpenMobile(false)}
      />

      {/* 2. MAIN CONTENT AREA: CHAT PANEL + BOTTOM COMPOSER */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden relative">
        {/* Main Panel with Model Selector, Cosmic Orb, Hero, and Message Stream */}
        <ChatArea
          messages={activeConversation?.messages || []}
          aiState={aiState}
          currentMode={currentMode}
          onSelectMode={mode => {
            setCurrentMode(mode);
            addToast('info', `Switched to ${mode.toUpperCase()} Mode`);
          }}
          language={currentLanguage}
          onSelectSuggestion={handleSelectSuggestion}
          onRetryMessage={handleRetry}
          onSpeakMessage={text => speak(text)}
          isSpeaking={isSpeaking}
          onStopSpeaking={stopSpeaking}
          reducedMotion={settings.reducedMotion}
          onOrbClick={() => {
            if (isSpeaking) {
              stopSpeaking();
            } else if (isListening) {
              stopListening();
            } else {
              startListening();
            }
          }}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenMobileMenu={() => setIsOpenMobile(true)}
          backendStatus={backendStatus}
        />

        {/* Bottom Chat Composer Matching Reference Image */}
        <MessageInput
          onSendMessage={handleSendMessage}
          onStartListening={startListening}
          onStopListening={stopListening}
          onStopGenerating={() => {
            setIsGenerating(false);
            stopSpeaking();
          }}
          isListening={isListening}
          isGenerating={isGenerating}
          isSpeaking={isSpeaking}
          currentMode={currentMode}
          onSelectMode={mode => {
            setCurrentMode(mode);
            addToast('info', `Mode: ${mode.toUpperCase()}`);
          }}
          language={currentLanguage}
          transcript={voiceTranscript}
          isSpeechRecognitionSupported={isSpeechRecognitionSupported}
        />
      </div>

      {/* 3. MODALS & TOASTS */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        onClearHistory={() => {
          setIsSettingsOpen(false);
          setIsClearAllModalOpen(true);
        }}
        backendStatus={backendStatus}
        onRefreshBackendStatus={refreshBackendStatus}
        availableVoices={availableVoices}
        totalConversations={conversations.length}
        onExportData={handleExportData}
      />

      <ConfirmModal
        isOpen={isClearAllModalOpen}
        title="Clear All Conversations"
        message="Are you sure you want to permanently delete all conversation history from your browser? This action cannot be undone."
        confirmLabel="Clear All"
        onConfirm={handleConfirmClearAll}
        onCancel={() => setIsClearAllModalOpen(false)}
      />

      <Toast toasts={toasts} onDismiss={dismissToast} />
    </WindowFrame>
  );
};

export default App;
