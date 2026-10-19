<div align="center"><img src="https://capsule-render.vercel.app/api?type=waving&height=260&color=0:050816,35:312E81,70:7C3AED,100:06B6D4&text=NOVA%20AI&fontSize=88&fontColor=FFFFFF&fontAlignY=37&desc=INTELLIGENCE%20IN%20MOTION&descSize=18&descAlignY=58&animation=fadeIn" width="100%" alt="NOVA AI banner"/><img src="https://readme-typing-svg.demolab.com?font=Space+Grotesk&weight=700&size=21&duration=2600&pause=900&color=67E8F9&center=true&vCenter=true&width=720&lines=Your+ideas%2C+amplified.;One+assistant.+Endless+possibilities.;Ask+curiously.+Build+boldly.;Welcome+to+NOVA+AI." alt="NOVA AI tagline"/>A futuristic personal AI companion for the next generation.

<p>
  <img src="https://img.shields.io/badge/PROJECT-NOVA%20AI-7C3AED?style=for-the-badge&logo=sparkles&logoColor=white" alt="NOVA AI"/>
  <img src="https://img.shields.io/badge/STATUS-IN%20DEVELOPMENT-F59E0B?style=for-the-badge" alt="In development"/>
</p><img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=111827" alt="React"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"/>
<img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite"/>
<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js"/>
<img src="https://img.shields.io/badge/Express-111827?style=flat-square&logo=express&logoColor=white" alt="Express"/>
<img src="https://img.shields.io/badge/AI-Gemini-8E75B2?style=flat-square&logo=googlegemini&logoColor=white" alt="Gemini"/><br/>"Explore the Project" (https://github.com/ThirusenthilkumarC/Ai-Assistant-) · "Developer Profile" (https://github.com/ThirusenthilkumarC)

</div>---

✦ Welcome to NOVA

NOVA AI is a personal AI assistant project designed to make conversations, coding, learning, and creative exploration more intuitive.

Built around a futuristic cosmic aesthetic, NOVA combines a modern web interface with a backend AI integration to create an engaging digital companion.

«Think beyond limits. Create without boundaries.»

🚀 The NOVA Experience

<table>
<tr>
<td width="50%" valign="top">🧠 Intelligent Conversations

Ask questions, explore ideas, and receive AI-generated responses through the configured backend.

💻 Coding Companion

Understand programming concepts, explore code snippets, and investigate potential bugs.

📚 Study Assistant

Break down technical topics into simple explanations and revision notes.

</td>
<td width="50%" valign="top">🎙️ Voice Interaction

Use supported browser speech APIs to speak with the assistant and hear responses.

🌐 Tamil + English

Designed for English, Tamil ("தமிழ்"), and Tanglish-style prompts.

✨ Cosmic Interface

Explore a dark, futuristic interface with glowing violet accents and electric cyan highlights.

</td>
</tr>
</table>⚡ Core Capabilities

- Multiple assistant modes: General, Coding, and Study.
- Conversation history: Browser-based history management where implemented.
- Voice features: Speech recognition and speech synthesis where supported.
- Animated AI orb: Visual feedback for supported assistant states.
- Responsive UI: Adaptable layouts for desktop and mobile.
- Secure API configuration: Provider credentials managed through backend environment variables.
- Conversation export: JSON export where implemented.

<sub>NOVA AI is actively being developed. Available functionality depends on the current codebase and configuration.</sub>

---

🎨 Design Language

<div align="center">Cosmic Palette| Color| Purpose
Deep Space| "#070B14"| Main background
Cosmic Indigo| "#312E81"| Deep gradient
Nova Violet| "#8B5CF6"| Primary accent
Electric Cyan| "#06B6D4"| Highlights
Starlight| "#F8FAFC"| Main text

</div>Design principles: Minimal distractions · Futuristic visuals · Smooth interaction · Responsive layouts · Readable typography.

---

🏗️ How NOVA Works

flowchart TD
    U["👤 User"] --> UI["✨ React Interface"]
    UI --> V["🎙️ Browser Voice APIs"]
    UI --> S[("🗂️ Local Conversation Storage")]
    UI --> API["⚙️ Express API"]
    API --> VALID["🛡️ Validation Middleware"]
    VALID --> AI["🧠 AI Service"]
    AI --> GEM["✦ Gemini API"]
    GEM --> AI
    AI --> API
    API --> UI

Technology stack

Layer| Technology
Frontend| React, TypeScript, Vite
Styling| Tailwind CSS and CSS, as configured
Backend| Node.js, Express.js
AI integration| Google Gemini API
Voice| Browser Web Speech APIs
Local persistence| Browser "localStorage"
Version control| Git and GitHub

---

🚀 Get Started

Prerequisites

- Node.js and npm
- Git
- Visual Studio Code or another code editor
- Gemini API key for live AI responses

1. Clone the repository

git clone https://github.com/ThirusenthilkumarC/Ai-Assistant-.git
cd "Ai Assistant"

2. Install dependencies

If the project has separate frontend and backend packages, run:

cd backend
npm install

Open another terminal at the project root:

cd frontend
npm install

3. Configure the backend

Create "backend/.env" using the variable names required by your backend. For example:

PORT=5000
FRONTEND_URL=http://localhost:5173
GEMINI_API_KEY=your_api_key_here

Keep your real API key private. Never commit ".env" to GitHub.

4. Start the backend

cd backend
npm run dev

5. Start the frontend

In a separate terminal:

cd frontend
npm run dev

<div align="center">Application| Development URL
🌐 Frontend| "http://localhost:5173"
⚙️ Backend API| "http://localhost:5000/api"

</div><sub>These are local development addresses, not public deployment links. Follow the actual scripts and ports configured in your project.</sub>

---

📂 Project Structure

Ai Assistant/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.js
│   └── package.json
├── README.md
└── .gitignore

<sub>Illustrative structure only. Keep the folders and file names aligned with your actual repository.</sub>

🔐 Security First

- Store AI keys in backend environment variables.
- Keep ".env" out of version control.
- Validate incoming requests on the server.
- Configure CORS for trusted frontend origins.
- Apply appropriate request limits and rate limiting.
- Avoid exposing sensitive server information in error responses.
- Use HTTPS and secure environment configuration in production.

🗺️ Roadmap

- [x] React and TypeScript frontend foundation
- [x] Express backend foundation
- [x] AI integration structure
- [x] Voice interaction support
- [x] Conversation history foundation
- [x] General, Coding, and Study modes
- [ ] Further polish the animated cosmic interface
- [ ] Expand file and image workflows
- [ ] Improve automated testing and accessibility
- [ ] Complete production deployment

<sub>Roadmap items should be checked against the current implementation before marking them complete.</sub>

---

🌍 Deployment

Potential deployment options:

- Frontend: "Vercel" (https://vercel.com/)
- Backend: "Render" (https://render.com/)
- Source code: "GitHub" (https://github.com/ThirusenthilkumarC/Ai-Assistant-)

Before deployment, configure the production API URL, CORS origins, and environment variables. Never expose the Gemini API key in frontend code.

🤝 Contributing

Have an idea for NOVA?

1. Fork the repository.
2. Create a feature branch.
3. Implement your improvement.
4. Test your changes.
5. Submit a pull request with a clear description.

👨‍💻 Developer

<div align="center"><img src="https://capsule-render.vercel.app/api?type=soft&color=0:0F172A,50:312E81,100:0891B2&height=130&text=Thirusenthilkumar%20C&fontSize=34&fontColor=FFFFFF&animation=fadeIn" width="100%" alt="Developer banner"/>Thirusenthilkumar C

Full Stack Developer · UI/UX Enthusiast · AI Explorer

Building modern web applications and exploring intelligent user experiences.

<a href="https://github.com/ThirusenthilkumarC">
<img src="https://img.shields.io/badge/GitHub-Explore_My_Projects-111827?style=for-the-badge&logo=github&logoColor=white" alt="GitHub profile"/>
</a></div>---

📄 License

Add a "LICENSE" file to the repository to specify the license under which NOVA AI is distributed.

<div align="center"><img src="https://readme-typing-svg.demolab.com?font=Space+Grotesk&weight=700&size=20&duration=2800&pause=1000&color=67E8F9&center=true&vCenter=true&width=600&lines=STAY+CURIOUS.;KEEP+BUILDING.;MAKE+YOUR+IDEAS+REAL." alt="Closing tagline"/>⭐ If NOVA AI inspires you, star the repository!

<img src="https://capsule-render.vercel.app/api?type=waving&height=150&section=footer&color=0:06B6D4,45:7C3AED,100:050816" width="100%" alt="NOVA AI footer"/>NOVA AI — Intelligence in Motion.

</div>
