<div align="center"><img src="https://capsule-render.vercel.app/api?type=waving&color=0:090979,50:00D4FF,100:7B2FF7&height=230&section=header&text=NOVA%20AI&fontSize=75&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Your%20Intelligent%20Voice%20%26%20Chat%20Companion&descAlignY=60&descSize=18" width="100%" alt="NOVA AI banner"/>⚡ THINK SMARTER. SPEAK NATURALLY. DO MORE.

An intelligent AI assistant designed to make conversations, learning, and everyday digital tasks easier.

""React" (https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)" (https://react.dev/)
""TypeScript" (https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat-square&logo=typescript&logoColor=white)" (https://www.typescriptlang.org/)
""Vite" (https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)" (https://vitejs.dev/)
""Tailwind CSS" (https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)" (https://tailwindcss.com/)
""Express.js" (https://img.shields.io/badge/Express.js-Backend-000000?style=flat-square&logo=express&logoColor=white)" (https://expressjs.com/)
""Google Gemini" (https://img.shields.io/badge/Google_Gemini-AI_SDK-8E75C2?style=flat-square&logo=google&logoColor=white)" (https://aistudio.google.com/)
""License: MIT" (https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)" (LICENSE)

<br/><img src="https://img.shields.io/badge/BUILT%20BY-Thirusenthilkumar%20C-00D4FF?style=for-the-badge&logo=github&logoColor=white" alt="Built by Thirusenthilkumar C"/>
<img src="https://img.shields.io/badge/STATUS-UNDER%20DEVELOPMENT-orange?style=for-the-badge" alt="Under development"/><br/><br/>

<a href="#-overview">Overview</a> •
<a href="#-features">Features</a> •
<a href="#-technology-stack">Tech Stack</a> •
<a href="#-local-development">Local Development</a> •
<a href="#-installation">Installation</a> •
<a href="#-api-documentation">API</a> •
<a href="#-roadmap">Roadmap</a>

<br/><br/>

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=20&duration=3000&pause=1000&color=00D4FF&center=true&vCenter=true&width=650&lines=Meet+your+personal+AI+assistant.;Chat+with+intelligence.;Speak+with+technology.;Your+ideas.+Your+AI.+Your+NOVA." alt="Animated introduction"/></div>---

🌌 Overview

NOVA AI is a full-stack personal AI assistant designed to bring intelligent conversations, voice interaction, coding help, and study support into one modern application.

The project combines a React + Vite + TypeScript frontend with an Express.js backend that can connect to the Google Gemini API. Its futuristic interface uses dark surfaces, cyan and violet accents, and an animated AI orb to make the experience engaging.

«💡 Vision: Build a personal AI companion that makes technology feel natural, accessible, and useful.»

«🚧 Project status: NOVA AI is under development. Features may evolve as the project progresses.»

✨ Features

🎙️ Voice Interaction

- Voice input using the browser's Web Speech Recognition API, where supported.
- Spoken responses using the browser's SpeechSynthesis API.
- Voice settings such as available system voices, speech rate, and pitch.
- Text cleanup before speech synthesis for a more natural spoken response.

🌐 Tamil and English

- Designed for English and Tamil ("தமிழ்") conversations.
- Supports natural Tamil and Tanglish prompts.
- Technical terms and code remain in standard programming syntax.

🔮 Animated AI Orb

The interface includes a multi-state animated orb intended to reflect the assistant's current state:

- Idle: Calm pulsing glow.
- Listening: Visual response while voice input is active.
- Thinking: Spinning rings and violet effects.
- Speaking: Pulsing visual feedback while a response is spoken.

🎯 Assistant Modes

1. General Assistant — everyday questions and general help.
2. Coding Assistant — programming explanations, debugging suggestions, and code formatting.
3. Study Assistant — explanations of technical topics, revision summaries, and practice questions.

💬 Conversation Management

- Conversation history stored in browser "localStorage".
- Search, rename, and delete conversations.
- Automatic conversation titles where supported.
- Export conversation data as JSON.
- Clear-history action with a confirmation step.

🛡️ Backend and Safety

- AI provider credentials are configured on the backend using environment variables.
- Request validation and payload-size limits.
- Rate limiting to help prevent excessive requests.
- Centralized error handling.
- Demo mode can be used when an AI API key is not configured, depending on backend configuration.

---

🏛️ System Architecture

flowchart TD
    User[User] --> UI[React + TypeScript Frontend]
    UI --> Voice[Browser Speech APIs]
    UI --> Storage[(Browser localStorage)]
    UI --> Client[API Client]
    Client --> API[Express REST API]
    API --> Validation[Request Validation]
    Validation --> Controller[Chat Controller]
    Controller --> AIService[AI Service]
    AIService --> Gemini[Google Gemini API]
    Gemini --> AIService
    AIService --> Controller
    Controller --> API
    API --> UI

How it works

1. The user enters a message or uses voice input.
2. The frontend sends the request to the backend.
3. The backend validates the request.
4. The AI service communicates with the configured AI provider, when configured.
5. The backend returns a response to the frontend.
6. NOVA displays the response and can read it aloud when voice output is enabled.

---

🛠️ Technology Stack

Area| Technology| Purpose
Frontend| React 19| Component-based user interface
Language| TypeScript| Type safety and maintainable code
Build tool| Vite| Local development server and build tooling
Styling| Tailwind CSS v4 and CSS| Responsive UI and visual styling
Backend runtime| Node.js| Server-side JavaScript runtime
API server| Express.js| REST API routes and middleware
AI integration| Google Gemini SDK| AI-generated responses when configured
Voice| Web Speech API| Browser-supported speech recognition and speech synthesis
Conversation storage| Browser "localStorage"| Local conversation history
Version control| Git and GitHub| Source control and collaboration

---

📂 Project Structure

Ai Assistant/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AiOrb.tsx
│   │   │   ├── ChatArea.tsx
│   │   │   ├── ChatMessageBubble.tsx
│   │   │   ├── CodeBlock.tsx
│   │   │   ├── ConfirmModal.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── MessageInput.tsx
│   │   │   ├── SettingsModal.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Toast.tsx
│   │   ├── hooks/
│   │   │   ├── useConversations.ts
│   │   │   └── useVoice.ts
│   │   ├── services/
│   │   │   └── api.service.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.ts
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── chat.controller.js
│   │   ├── middleware/
│   │   │   ├── error.middleware.js
│   │   │   ├── rateLimit.middleware.js
│   │   │   └── validation.middleware.js
│   │   ├── routes/
│   │   │   └── chat.routes.js
│   │   ├── services/
│   │   │   └── ai.service.js
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── package.json
├── .gitignore
├── LICENSE
└── README.md

This structure documents the project layout. File names may change as development continues.

---

🚀 Local Development

<div align="center">🌐 Frontend Application

""Frontend" (https://img.shields.io/badge/Frontend-React%20%2B%20Vite-00D4FF?style=for-the-badge&logo=react&logoColor=white)" (http://localhost:5173)

Frontend URL: "http://localhost:5173" (http://localhost:5173)

⚙️ Backend API

""Backend" (https://img.shields.io/badge/Backend-Express.js-7B2FF7?style=for-the-badge&logo=express&logoColor=white)" (http://localhost:5000/api)

Backend API URL: "http://localhost:5000/api" (http://localhost:5000/api)

</div>«⚠️ These localhost links work on your computer only while the corresponding development servers are running. They are not public deployment links.»

---

⚙️ Installation

Prerequisites

- "Node.js" (https://nodejs.org/) (18 or later recommended)
- npm
- "Git" (https://git-scm.com/)
- A code editor such as "Visual Studio Code" (https://code.visualstudio.com/)

1. Clone the repository

Use the actual repository URL for this project:

git clone https://github.com/ThirusenthilkumarC/Ai-Assistant-.git
cd "Ai Assistant"

If you already have the project on your computer, open its project folder instead of cloning it again.

2. Install dependencies

If the root "package.json" includes an "install:all" script:

npm run install:all

Otherwise, install the packages separately:

cd backend
npm install
cd ../frontend
npm install

3. Configure backend environment variables

Create a ".env" file inside the "backend" folder. You can start from ".env.example" if it exists.

Example:

PORT=5000
FRONTEND_URL=http://localhost:5173
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash

Replace the placeholder API key with your own key. Keep ".env" private and never commit real credentials to GitHub.

If you do not configure a key, the application may use Demo Mode if that fallback is enabled in the backend.

4. Start the backend

Open a terminal:

cd backend
npm run dev

The backend is expected to run at:

http://localhost:5000

5. Start the frontend

Open a second terminal:

cd frontend
npm run dev

Open the local URL printed by Vite. The default configured address is:

http://localhost:5173

«💡 If your terminal reports that a port is already in use, follow the URL and port printed by the development server.»

---

📡 API Documentation

Base URL: "http://localhost:5000/api"

The endpoints below describe the backend API documented for this project. Exact responses can depend on the current implementation and environment configuration.

1. Health Check

- Method: "GET"
- Endpoint: "/api/health"
- Purpose: Check whether the backend server is running.

Example:

curl http://localhost:5000/api/health

2. AI Connection Status

- Method: "GET"
- Endpoint: "/api/chat/status"
- Purpose: Check whether the AI provider is configured.

Example:

curl http://localhost:5000/api/chat/status

3. Send a Chat Message

- Method: "POST"
- Endpoint: "/api/chat"
- Content-Type: "application/json"
- Purpose: Send a prompt and receive an assistant response.

Example request body:

{
  "message": "Explain how Dijkstra's algorithm works",
  "conversationHistory": [],
  "mode": "study",
  "language": "en"
}

4. Generate a Conversation Title

- Method: "POST"
- Endpoint: "/api/chat/title"
- Content-Type: "application/json"
- Purpose: Request a short title for a conversation.

Example request body:

{
  "message": "Can you debug my React useEffect loop?",
  "language": "en"
}

---

🎨 Design System

Token| Hex value| Use
Background primary| "#070B14"| Main dark background
Background secondary| "#0B1220"| Panels and sidebar
Primary cyan| "#00E5FF"| Highlights and glowing accents
Electric blue| "#3B82F6"| Secondary accents
Electric violet| "#8B5CF6"| Orb and mode accents
Primary text| "#F8FAFC"| Main text
Muted text| "#94A3B8"| Secondary text

Design principles

- Futuristic dark theme.
- Cyan, electric blue, and violet accents.
- Glass-inspired panels and subtle glow effects.
- Clear typography and readable contrast.
- Responsive layout for desktop and smaller screens.
- Motion effects that should remain comfortable for users.

---

🔐 Security and Privacy

- Store AI provider API keys in backend environment variables.
- Never commit ".env" files or secret credentials.
- Validate incoming requests on the server.
- Limit request sizes and apply rate limiting.
- Return safe error messages without exposing private server details.
- Configure CORS for the expected frontend origin.
- Use HTTPS and production environment variables when deploying.
- Conversation history stored in "localStorage" remains in that browser unless additional synchronization is implemented.

---

🗺️ Roadmap

- [x] React + TypeScript + Vite frontend foundation
- [x] Express.js REST API structure
- [x] Google Gemini integration structure
- [x] Browser speech input/output support
- [x] Animated AI orb interface
- [x] Tamil and English interaction support
- [x] General, Coding, and Study assistant modes
- [x] Local conversation history
- [x] Responsive dark interface
- [ ] File attachment and document analysis
- [ ] More advanced real-time voice interaction
- [ ] Optional local/offline model support
- [ ] Further testing and accessibility improvements
- [ ] Production deployment and public demo

Roadmap items are planned work and may change.

---

🚀 Deployment

NOVA AI can be deployed as a separate frontend and backend application.

Component| Possible platform
Frontend| "Vercel" (https://vercel.com/)
Backend| "Render" (https://render.com/)
Source code| "GitHub" (https://github.com/)

Before deploying:

1. Set production environment variables in the hosting dashboard.
2. Configure the frontend to call the deployed backend URL.
3. Update backend CORS settings for the deployed frontend domain.
4. Keep API keys in the backend environment only.
5. Test the API endpoints and application after deployment.

---

🤝 Contributing

Suggestions and contributions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Test the changes locally.
5. Open a pull request with a clear description.

---

👨‍💻 Author

<div align="center">Thirusenthilkumar C

Full Stack Developer | UI/UX Enthusiast

Building modern web applications and exploring AI-powered experiences.

""GitHub" (https://img.shields.io/badge/GitHub-ThirusenthilkumarC-181717?style=for-the-badge&logo=github)" (https://github.com/ThirusenthilkumarC)

</div>---

📄 License

This project is intended to use the MIT License. Check that the repository contains the appropriate "LICENSE" file before treating the project as officially licensed.

---

<div align="center">💙 THE FUTURE IS INTERACTIVE.

Meet NOVA AI — Your Voice. Your Intelligence. Your Assistant.

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:7B2FF7,50:00D4FF,100:090979&height=120&section=footer" width="100%" alt="NOVA AI footer banner"/></div>
