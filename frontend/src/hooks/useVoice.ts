import { useState, useEffect, useRef, useCallback } from 'react';
import type { Language, VoiceSettings } from '../types';

// Declare types for Web Speech Recognition API
interface IWindow extends Window {
  SpeechRecognition?: any;
  webkitSpeechRecognition?: any;
}

export interface UseVoiceProps {
  language: Language;
  settings: VoiceSettings;
  onTranscriptResult?: (text: string, isFinal: boolean) => void;
  onSpeechEnd?: () => void;
}

export const useVoice = ({ language, settings, onTranscriptResult, onSpeechEnd }: UseVoiceProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recognitionError, setRecognitionError] = useState<string | null>(null);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isSpeechRecognitionSupported, setIsSpeechRecognitionSupported] = useState(true);
  const [isSpeechSynthesisSupported, setIsSpeechSynthesisSupported] = useState(true);

  const recognitionRef = useRef<any>(null);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize SpeechSynthesis Voices
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSpeechSynthesisSupported(false);
      return;
    }

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setAvailableVoices(voices);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  // Initialize SpeechRecognition
  useEffect(() => {
    const win = window as unknown as IWindow;
    const SpeechRecognitionClass = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      setIsSpeechRecognitionSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognitionClass();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      // Set recognition language based on app language
      recognition.lang = language === 'ta' ? 'ta-IN' : 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setRecognitionError(null);
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        let isFinal = false;

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const item = event.results[i];
          transcript += item[0].transcript;
          if (item.isFinal) {
            isFinal = true;
          }
        }

        if (onTranscriptResult && transcript.trim()) {
          onTranscriptResult(transcript, isFinal);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('[useVoice] Speech recognition error:', event.error);
        let errorMsg = 'Speech recognition error occurred.';
        if (event.error === 'not-allowed') {
          errorMsg = 'Microphone permission was denied. Please allow microphone access in your browser settings.';
        } else if (event.error === 'no-speech') {
          errorMsg = 'No speech was detected. Please try speaking again.';
        } else if (event.error === 'network') {
          errorMsg = 'Network error during speech recognition.';
        }
        setRecognitionError(errorMsg);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        if (onSpeechEnd) {
          onSpeechEnd();
        }
      };

      recognitionRef.current = recognition;
    } catch (err) {
      console.error('[useVoice] Could not initialize SpeechRecognition:', err);
      setIsSpeechRecognitionSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
    };
  }, [language, onTranscriptResult, onSpeechEnd]);

  /**
   * Start listening for voice input
   */
  const startListening = useCallback(() => {
    if (!isSpeechRecognitionSupported) {
      setRecognitionError('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    // Stop speaking if NOVA is currently reading something
    stopSpeaking();

    if (recognitionRef.current) {
      try {
        // Set language dynamically
        recognitionRef.current.lang = language === 'ta' ? 'ta-IN' : 'en-US';
        recognitionRef.current.start();
        setRecognitionError(null);
      } catch (err: any) {
        // If already started or busy, restart cleanly
        console.warn('[useVoice] start error, aborting and retrying:', err);
        try {
          recognitionRef.current.abort();
          setTimeout(() => {
            try {
              recognitionRef.current.start();
            } catch {
              setRecognitionError('Microphone is busy. Please try again.');
            }
          }, 150);
        } catch {
          setRecognitionError('Unable to start speech recognition.');
        }
      }
    }
  }, [isSpeechRecognitionSupported, language]);

  /**
   * Stop listening
   */
  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
    setIsListening(false);
  }, [isListening]);

  /**
   * Cleans text before passing to SpeechSynthesis so it reads naturally
   */
  const cleanTextForSpeech = (markdown: string): string => {
    return markdown
      // Remove code blocks entirely or replace with descriptive phrase
      .replace(/```[\s\S]*?```/g, ' [Code snippet provided in chat] ')
      // Remove inline code
      .replace(/`([^`]+)`/g, '$1')
      // Remove markdown links, keep label
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      // Remove markdown headings & formatting
      .replace(/[#*_~>]/g, '')
      // Remove multiple line breaks and whitespace
      .replace(/\s+/g, ' ')
      .trim();
  };

  /**
   * Speak response aloud using SpeechSynthesis
   */
  const speak = useCallback((rawText: string) => {
    if (!isSpeechSynthesisSupported || !settings.enabled) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const cleanText = cleanTextForSpeech(rawText);
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = settings.rate || 1.0;
    utterance.pitch = settings.pitch || 1.0;

    // Pick best matching voice
    if (settings.voiceURI) {
      const selectedVoice = availableVoices.find(v => v.voiceURI === settings.voiceURI);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
    } else {
      // Auto select appropriate voice by language
      if (language === 'ta') {
        const tamilVoice = availableVoices.find(v => v.lang.startsWith('ta'));
        if (tamilVoice) utterance.voice = tamilVoice;
      } else {
        const engVoice = availableVoices.find(v => v.lang === 'en-US' || v.lang === 'en-IN' || v.lang.startsWith('en'));
        if (engVoice) utterance.voice = engVoice;
      }
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      currentUtteranceRef.current = null;
    };

    utterance.onerror = (e) => {
      console.warn('[useVoice] SpeechSynthesis error:', e);
      setIsSpeaking(false);
      currentUtteranceRef.current = null;
    };

    currentUtteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [isSpeechSynthesisSupported, settings, availableVoices, language]);

  /**
   * Stop speaking immediately
   */
  const stopSpeaking = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      currentUtteranceRef.current = null;
    }
  }, []);

  return {
    isListening,
    isSpeaking,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    recognitionError,
    availableVoices,
    isSpeechRecognitionSupported,
    isSpeechSynthesisSupported
  };
};
