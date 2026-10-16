export type AssistantMode = 'general' | 'coding' | 'study';

export type Language = 'en' | 'ta';

export type AiState = 'idle' | 'listening' | 'thinking' | 'speaking';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isError?: boolean;
  isDemo?: boolean;
  provider?: string;
  model?: string;
  mode?: AssistantMode;
  language?: Language;
}

export interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  mode: AssistantMode;
  language: Language;
  createdAt: string;
  updatedAt: string;
}

export interface VoiceSettings {
  enabled: boolean;
  voiceURI: string;
  pitch: number;
  rate: number;
  autoPlay: boolean;
}

export interface AppSettings {
  language: Language;
  mode: AssistantMode;
  reducedMotion: boolean;
  voice: VoiceSettings;
}

export interface BackendStatus {
  configured: boolean;
  provider: string;
  model: string;
  message: string;
  connected: boolean;
}
