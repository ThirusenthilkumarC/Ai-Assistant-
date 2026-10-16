import type { AssistantMode, BackendStatus, ChatMessage, Language } from '../types';

const API_BASE = '/api';

export interface SendChatParams {
  message: string;
  conversationHistory: ChatMessage[];
  mode: AssistantMode;
  language: Language;
}

export interface ChatApiResponse {
  response: string;
  isDemo: boolean;
  provider: string;
  model: string;
  mode: AssistantMode;
  language: Language;
  timestamp: string;
}

/**
 * Fetch backend status and AI configuration
 */
export const checkBackendStatus = async (): Promise<BackendStatus> => {
  try {
    const res = await fetch(`${API_BASE}/chat/status`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(5000)
    });

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }

    const data = await res.json();
    return {
      configured: Boolean(data?.data?.configured),
      provider: data?.data?.provider || 'Unknown',
      model: data?.data?.model || 'Unknown',
      message: data?.data?.message || 'Connected to backend.',
      connected: true
    };
  } catch {
    return {
      configured: false,
      provider: 'Offline',
      model: 'None',
      message: 'Backend server is unreachable. Ensure the Express server is running on port 5000.',
      connected: false
    };
  }
};

/**
 * Send a chat message to the backend
 */
export const sendChatMessage = async ({
  message,
  conversationHistory,
  mode,
  language
}: SendChatParams): Promise<ChatApiResponse> => {
  const payload = {
    message,
    conversationHistory: conversationHistory.map(m => ({
      sender: m.sender,
      content: m.content,
      isError: m.isError
    })),
    mode,
    language
  };

  try {
    const res = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(45000) // 45s timeout for AI generation
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.error || `Server responded with status ${res.status}`);
    }

    return data.data;
  } catch (err: any) {
    if (err.name === 'TimeoutError' || err.message?.includes('timeout')) {
      throw new Error('Request timed out while waiting for AI response. Please try again.');
    }
    if (err.message?.includes('Failed to fetch') || err.message?.includes('NetworkError')) {
      throw new Error('Unable to connect to NOVA backend. Please ensure server is running at http://localhost:5000');
    }
    throw err;
  }
};

/**
 * Auto-generate a brief title for a conversation
 */
export const fetchSuggestedTitle = async (message: string, language: Language): Promise<string> => {
  try {
    const res = await fetch(`${API_BASE}/chat/title`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, language }),
      signal: AbortSignal.timeout(3000)
    });
    if (res.ok) {
      const data = await res.json();
      if (data.title) return data.title;
    }
  } catch {
    // Fallback to local snippet
  }

  const clean = message.replace(/[^\w\s\u0B80-\u0BFF]/g, '').trim();
  const words = clean.split(/\s+/).slice(0, 5).join(' ');
  return words.length > 30 ? words.slice(0, 30) + '...' : words || (language === 'ta' ? 'புதிய உரையாடல்' : 'New Chat');
};
