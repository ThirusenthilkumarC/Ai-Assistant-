import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY?.trim() || '';
const defaultModelName = process.env.GEMINI_MODEL?.trim() || 'gemini-2.5-flash';

let genAI = null;
if (apiKey && apiKey !== 'your_gemini_api_key_here' && apiKey.length > 5) {
  try {
    genAI = new GoogleGenerativeAI(apiKey);
  } catch (err) {
    console.error('[AI Service] Failed to initialize GoogleGenerativeAI client:', err.message);
  }
}

/**
 * Returns the current AI provider configuration status
 */
export const getAiStatus = () => {
  const isConfigured = Boolean(genAI && apiKey && apiKey !== 'your_gemini_api_key_here');
  return {
    configured: isConfigured,
    provider: 'Google Gemini',
    model: defaultModelName,
    message: isConfigured
      ? 'Gemini AI provider connected and active.'
      : 'Demo Mode: GEMINI_API_KEY is not configured in backend/.env. Using contextual demo responses.'
  };
};

/**
 * Builds the system instruction tailored to the selected assistant mode and language
 */
const buildSystemInstruction = (mode = 'general', language = 'en') => {
  const baseIdentity = `You are NOVA AI, a futuristic, ultra-intelligent personal AI assistant. Tagline: "Your Voice. Your Intelligence. Your Assistant."
You are helpful, precise, friendly, and articulate. You provide structured answers using markdown formatting, bullet points, and code blocks where applicable.`;

  let modeSpecific = '';
  switch (mode) {
    case 'coding':
      modeSpecific = `
[MODE: CODING ASSISTANT]
You are an expert Senior Software Engineer and Code Debugger.
- Provide clean, robust, well-documented code with syntax formatting in standard markdown code blocks (\`\`\`language ... \`\`\`).
- When debugging, explain: 1) What caused the bug, 2) The exact fix, 3) Best practices to prevent it.
- Never execute code or claim code was live-tested on server unless verifiable.
- Keep technical keywords and code syntax in English even when speaking other languages.
- Include time/space complexity notes for algorithms when relevant.`;
      break;

    case 'study':
      modeSpecific = `
[MODE: STUDY ASSISTANT]
You are a master Academic Tutor and Computer Science Professor.
- Break down difficult, abstract concepts into simple, intuitive mental models and real-world analogies.
- Provide structured revision summaries, key takeaways, and flashcard-style bullet points.
- When requested or appropriate, generate 2-3 quick self-check practice questions with answers.
- Tailor explanations to be engaging, encouraging, and clear.`;
      break;

    case 'general':
    default:
      modeSpecific = `
[MODE: GENERAL AI ASSISTANT]
- Answer user queries comprehensively yet concisely.
- For voice-friendly interactions, keep introductory responses clear and easily readable by text-to-speech engines.
- Adapt tone to be helpful, confident, and professional.`;
      break;
  }

  let languageInstruction = '';
  if (language === 'ta') {
    languageInstruction = `
[LANGUAGE: TAMIL (தமிழ்)]
- The user has selected Tamil. Respond primarily in natural, clear, grammatically sound Tamil script (தமிழ்).
- If the user communicates in Tanglish (Tamil written in English alphabet), understand their intent and reply in clear Tamil script (or smooth Tanglish if requested).
- CRITICAL: Keep programming code, syntax, function names, keywords (like 'import', 'const', 'async', 'return'), and core tech terminology in English code blocks so the code remains executable and readable.`;
  } else {
    languageInstruction = `
[LANGUAGE: ENGLISH]
- Respond in fluent, clear, natural English.`;
  }

  return `${baseIdentity}\n${modeSpecific}\n${languageInstruction}`;
};

/**
 * Generate an intelligent, transparent demo response when API key is not configured
 */
const generateDemoResponse = (prompt, mode = 'general', language = 'ta') => {
  const lower = prompt.toLowerCase();
  const isTamil = language === 'ta' || /[\u0B80-\u0BFF]/.test(prompt) || lower.includes('tamil') || lower.includes('vanakkam');

  if (isTamil) {
    if (mode === 'coding') {
      return `> ⚙️ **டெமோ பயன்முறை (Demo Mode)**: Gemini API Key இன்னும் \`backend/.env\` கோப்பில் அமைக்கப்படவில்லை. முழுமையான AI பதில்களைப் பெற உங்கள் API சாவியை சேர்க்கவும்.

வணக்கம்! நான் உங்கள் **NOVA AI Coding Assistant**.

நிரலாக்கக் கருத்து (Programming Concept) விளக்கம்:
\`\`\`javascript
// JavaScript Example: Async/Await
async function fetchNovaData() {
  try {
    const response = await fetch('/api/chat');
    const data = await response.json();
    console.log("NOVA Response:", data);
  } catch (error) {
    console.error("Error occurred:", error);
  }
}
\`\`\`
- **விளக்கம்**: \`async/await\` என்பது JavaScript-ல் asynchronous பணிகளை எளிதாக கையாள உதவும் ஒரு நேர்த்தியான வழிமுறை ஆகும்.
- ஏதேனும் குறிப்பிட்ட குறியீட்டைப் பிழைதிருத்த (debug) விரும்பினால், உங்கள் code-ஐ உள்ளிடுங்கள்!`;
    }

    if (mode === 'study') {
      return `> ⚙️ **டெமோ பயன்முறை (Demo Mode)**: Gemini API Key இன்னும் \`backend/.env\` கோப்பில் அமைக்கப்படவில்லை.

வணக்கம்! நான் உங்கள் **NOVA AI Study Assistant**.

📚 **கணினி அறிவியல் தலைப்பு: பைனரி தேடல் (Binary Search)**
- **எளிய உதாரணம்**: அகராதியில் (Dictionary) ஒரு சொல்லைத் தேடும்போது, புத்தகத்தின் நடுப்பகுதியைத் திறந்து இரு பகுதிகளாகப் பிரித்து விரைவாகத் தேடுவதைப் போன்றது.
- **நேர சிக்கல்தன்மை (Time Complexity)**: $O(\\log n)$
- **பயிற்சி வினா**: வரிசைப்படுத்தப்படாத (unsorted) அணியில் (array) பைனரி தேடலைப் பயன்படுத்த முடியுமா? ஏன்?`;
    }

    return `> ⚙️ **டெமோ பயன்முறை (Demo Mode)**: Gemini API Key இன்னும் \`backend/.env\` கோப்பில் அமைக்கப்படவில்லை. 

வணக்கம்! நான் **NOVA AI**, உங்கள் எதிர்கால குரல் மற்றும் நுண்ணறிவு தனிநபர் உதவியாளர். 

நான் உங்களுக்கு தமிழ் மற்றும் ஆங்கிலத்தில் உதவ தயாராக உள்ளேன். நீங்கள் என்னிடம்:
1. நிரலாக்கக் குறியீடுகளை விளக்கக் கேட்கலாம் (Coding Help).
2. கல்வி மற்றும் பாடக் கருத்துக்களைக் கற்கலாம் (Study Assistant).
3. குரல் வழி கட்டளைகள் மூலம் உரையாடலாம் (Voice Interaction).

உண்மையான Gemini AI சக்தியை இயக்க, \`backend/.env\` கோப்பில் \`GEMINI_API_KEY\`-ஐ உள்ளிடவும்.`;
  }

  // English Demo Responses
  if (mode === 'coding') {
    return `> ⚙️ **Demo Mode Notice**: Gemini API Key is not yet configured in \`backend/.env\`. This is an interactive demo response showcasing NOVA's formatting and voice engine.

Here is an example of how NOVA AI structures programming explanations and code solutions:

### Understanding Binary Search vs Linear Search

\`\`\`typescript
// Efficient Binary Search Implementation in TypeScript
function binarySearch(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);

    if (arr[mid] === target) {
      return mid; // Target found at index mid
    }
    if (arr[mid] < target) {
      left = mid + 1; // Search right half
    } else {
      right = mid - 1; // Search left half
    }
  }

  return -1; // Target not present
}
\`\`\`

#### Key Highlights:
- **Time Complexity:** $O(\\log n)$ compared to Linear Search's $O(n)$.
- **Prerequisite:** The input array must be sorted.
- **Edge Case Protection:** Using \`left + (right - left) / 2\` prevents potential integer overflow in languages with fixed integer sizes.

To unleash live Gemini AI responses for any custom code or bug, add your \`GEMINI_API_KEY\` in \`backend/.env\`!`;
  }

  if (mode === 'study') {
    return `> ⚙️ **Demo Mode Notice**: Gemini API Key is not yet configured in \`backend/.env\`. This is an interactive preview of NOVA's Study Mode.

### 🧠 Concept Spotlight: How Does Neural Attention Work?

In modern Artificial Intelligence, the **Attention Mechanism** allows a model to focus on the most relevant parts of an input sequence when generating each token of output.

#### 1. Intuitive Analogy
Imagine reading a complex paragraph. Instead of memorizing every word with equal weight, your eyes and brain naturally emphasize the key nouns and active verbs that carry the core meaning.

#### 2. Key Formula
$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$$

- **Q (Query):** What am I looking for?
- **K (Key):** What information does each word offer?
- **V (Value):** What is the actual content of that information?

#### 3. Quick Self-Test Question
*Why do we scale the dot product by $\\frac{1}{\\sqrt{d_k}}$ in Transformer attention?*
*(Answer: To prevent the dot product from growing excessively large for large dimensions, which would push the softmax into regions with vanishing gradients!)*

Configure your \`GEMINI_API_KEY\` in \`backend/.env\` to ask NOVA about any academic subject or exam topic!`;
  }

  // General Mode Default Demo
  return `> ⚙️ **Demo Mode Notice**: Gemini API Key is not yet configured in \`backend/.env\`. You can test all UI animations, voice recognition, text-to-speech, and conversation history right now!

Hello! I am **NOVA AI**, your futuristic voice and intelligence personal assistant.

Here is what I can do for you:
- 🎙️ **Voice Interaction**: Click the microphone icon to speak directly to me in English or Tamil.
- 💻 **Coding Assistant Mode**: Debug errors, review logic, and explain complex algorithms.
- 🎓 **Study Assistant Mode**: Learn complex topics with crystal-clear analogies and revision notes.
- 🌐 **Bilingual Capabilities**: Switch effortlessly between English and Tamil (தமிழ்).

To connect real-time generative intelligence, grab a free API key from [Google AI Studio](https://aistudio.google.com/) and paste it into \`backend/.env\` as \`GEMINI_API_KEY\`.`;
};

/**
 * Main chat generation service method
 *
 * @param {Object} options
 * @param {string} options.message - User prompt
 * @param {Array} options.conversationHistory - Previous conversation turns
 * @param {string} options.mode - 'general' | 'coding' | 'study'
 * @param {string} options.language - 'en' | 'ta'
 * @returns {Promise<Object>} - { text, isDemo, provider, model }
 */
export const generateChatResponse = async ({
  message,
  conversationHistory = [],
  mode = 'general',
  language = 'en'
}) => {
  // If no Gemini client is initialized, return the graceful Demo Mode response
  if (!genAI || !apiKey || apiKey === 'your_gemini_api_key_here') {
    return {
      text: generateDemoResponse(message, mode, language),
      isDemo: true,
      provider: 'NOVA Demo Engine',
      model: 'demo-local',
      statusMessage: 'Gemini API key not configured. Running in Demo Mode.'
    };
  }

  const systemInstruction = buildSystemInstruction(mode, language);

  try {
    // Attempt with selected model (gemini-2.5-flash or gemini-1.5-flash)
    const model = genAI.getGenerativeModel({
      model: defaultModelName,
      systemInstruction: systemInstruction,
    });

    // Format conversation history for Gemini chat API
    // Gemini SDK expects history with role: 'user' | 'model' and parts: [{ text }]
    const formattedHistory = [];
    
    // Take the last 10 messages for context safety
    const recentHistory = conversationHistory.slice(-10);
    for (const msg of recentHistory) {
      if (!msg.content || typeof msg.content !== 'string') continue;
      // Skip error messages or system notifications
      if (msg.isError) continue;

      const role = msg.sender === 'user' ? 'user' : 'model';
      formattedHistory.push({
        role,
        parts: [{ text: msg.content }]
      });
    }

    // Ensure alternating turns if required by SDK, or start chat
    let chatSession;
    try {
      chatSession = model.startChat({
        history: formattedHistory,
        generationConfig: {
          temperature: mode === 'coding' ? 0.3 : 0.7,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      });
    } catch (historyErr) {
      console.warn('[AI Service] startChat with history had issue, starting fresh chat:', historyErr.message);
      chatSession = model.startChat({
        generationConfig: {
          temperature: mode === 'coding' ? 0.3 : 0.7,
          maxOutputTokens: 2048,
        }
      });
    }

    const result = await chatSession.sendMessage(message);
    const responseText = result.response.text();

    return {
      text: responseText,
      isDemo: false,
      provider: 'Google Gemini',
      model: defaultModelName
    };
  } catch (error) {
    console.error('[AI Service Error]:', error);

    // If gemini-2.5-flash fails due to model availability, try fallback to gemini-1.5-flash
    if (defaultModelName !== 'gemini-1.5-flash' && (error.message?.includes('not found') || error.message?.includes('unsupported'))) {
      try {
        console.log('[AI Service] Falling back to gemini-1.5-flash...');
        const fallbackModel = genAI.getGenerativeModel({
          model: 'gemini-1.5-flash',
          systemInstruction: systemInstruction,
        });
        const result = await fallbackModel.generateContent(message);
        return {
          text: result.response.text(),
          isDemo: false,
          provider: 'Google Gemini',
          model: 'gemini-1.5-flash'
        };
      } catch (fallbackErr) {
        console.error('[AI Service Fallback Error]:', fallbackErr);
      }
    }

    // Friendly specific error messages
    if (error.status === 429 || error.message?.includes('429') || error.message?.includes('RESOURCE_EXHAUSTED')) {
      throw new Error('AI rate limit reached. Please wait a few moments before sending another request.');
    }

    if (error.status === 400 || error.message?.includes('API_KEY_INVALID') || error.message?.includes('403')) {
      throw new Error('The configured Gemini API key is invalid or unauthorized. Please verify your GEMINI_API_KEY in backend/.env.');
    }

    throw new Error(`AI Provider error: ${error.message || 'Failed to generate response'}`);
  }
};
