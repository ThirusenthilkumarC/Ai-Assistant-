<div align="center"><img src="https://capsule-render.vercel.app/api?type=waving&height=250&color=0:090979,45:6D28D9,100:00D4FF&text=NOVA%20AI&fontSize=85&fontColor=ffffff&fontAlignY=38&desc=YOUR%20INTELLIGENT%20AI%20COMPANION&descSize=17&descAlignY=60&animation=fadeIn" width="100%" alt="NOVA AI"/><img src="https://readme-typing-svg.demolab.com?font=Orbitron&weight=600&size=20&duration=2800&pause=900&color=00E5FF&center=true&vCenter=true&width=650&lines=THINK+BEYOND+LIMITS.;CODE+WITH+INTELLIGENCE.;SPEAK.+EXPLORE.+CREATE.;WELCOME+TO+NOVA+AI." alt="NOVA AI animated tagline"/><br/>A smarter way to chat, learn, code, and explore ideas.

<br/><a href="https://github.com/ThirusenthilkumarC/Ai-Assistant-">
<img src="https://img.shields.io/badge/PROJECT-NOVA%20AI-8B5CF6?style=for-the-badge&logo=probot&logoColor=white" alt="Project NOVA AI"/>
</a>
<img src="https://img.shields.io/badge/STATUS-IN%20DEVELOPMENT-00D4FF?style=for-the-badge&logo=github" alt="In development"/>
<img src="https://img.shields.io/badge/BUILT%20WITH-PASSION-FF4D8D?style=for-the-badge&logo=heart" alt="Built with passion"/><br/><br/>

"✨ Features" (#-features) • "⚡ Tech Stack" (#-tech-stack) • "🚀 Installation" (#-installation) • "🗺️ Roadmap" (#-roadmap) • "👨‍💻 Developer" (#-developer)

</div>---

🌌 "01" — About NOVA

«Your ideas. Your intelligence. Your NOVA.»

NOVA AI is a futuristic personal AI assistant built to deliver an engaging conversational experience with a modern interface, AI-powered assistance, and voice interaction.

Designed with a dark cosmic theme, glowing violet accents, and a clean chat workspace, NOVA brings together technology and creativity in one application.

<details>
<summary><b>🔭 Explore the vision</b></summary>NOVA AI aims to make AI assistance easier to access for students, developers, and everyday users.

- Ask questions and explore ideas.
- Get help understanding programming concepts.
- Practice learning and revision.
- Interact through text and supported browser voice features.
- Experience a modern, responsive AI workspace.

</details>✨ Features

<table>
<tr>
<td width="50%">🧠 AI Conversations

Ask questions, explore concepts, and receive AI-generated responses through the configured backend.

</td>
<td width="50%">🎙️ Voice Experience

Use supported browser speech APIs for voice input and spoken responses.

</td>
</tr>
<tr>
<td width="50%">💻 Coding Companion

Explore programming concepts, understand code, and get debugging assistance.

</td>
<td width="50%">📚 Study Assistant

Use NOVA to revise topics, understand technical subjects, and explore learning ideas.

</td>
</tr>
<tr>
<td width="50%">🌐 Language Support

Designed for Tamil and English interactions, including Tanglish prompts.

</td>
<td width="50%">🎨 Futuristic UI

Dark surfaces, violet and cyan accents, glowing visuals, and responsive layouts.

</td>
</tr>
</table>💎 More capabilities

- Conversation history and local browser storage.
- Assistant modes for General, Coding, and Study.
- AI orb animation and interface state feedback.
- Configurable voice settings where supported.
- Conversation export where implemented.
- Backend validation and request handling.

---

⚡ Tech Stack

<div align="center">Frontend| Backend| AI & Tools
<img src="https://skillicons.dev/icons?i=react,ts,vite,tailwind" alt="React, TypeScript, Vite, Tailwind CSS"/>| <img src="https://skillicons.dev/icons?i=nodejs,express" alt="Node.js and Express"/>| <img src="https://skillicons.dev/icons?i=git,github,vscode" alt="Git, GitHub and VS Code"/>

AI Integration: Google Gemini API, when configured

</div>---

🪄 How NOVA Works

flowchart LR
    A["👤 User"] --> B["💬 NOVA Interface"]
    B --> C["⚙️ Express API"]
    C --> D["🧠 AI Service"]
    D --> E["✨ Gemini API"]
    E --> D
    D --> C
    C --> B

1. Enter a question or use supported voice input.
2. NOVA sends the request to its backend.
3. The backend processes the request through the configured AI service.
4. The response appears in the chat interface.

---

🚀 Installation

Prerequisites

- Node.js and npm
- Git
- Visual Studio Code or another code editor
- A Google Gemini API key for live AI responses

Step 1 — Clone the repository

git clone https://github.com/ThirusenthilkumarC/Ai-Assistant-.git
cd "Ai Assistant"

Step 2 — Install dependencies

Install dependencies in the root, frontend, and backend directories as required by the existing project scripts.

npm install

If the project uses separate package files:

cd backend
npm install

cd ../frontend
npm install

Step 3 — Configure environment variables

Create "backend/.env" using the project's ".env.example" if available.

PORT=5000
FRONTEND_URL=http://localhost:5173
GEMINI_API_KEY=your_api_key_here

Use the model name and environment variable names expected by your actual backend configuration. Never commit your real API key.

Step 4 — Run NOVA AI

Start the backend in one terminal:

cd backend
npm run dev

Start the frontend in a second terminal:

cd frontend
npm run dev

<div align="center">Service| Local URL
🌐 Frontend| "http://localhost:5173"
⚙️ Backend API| "http://localhost:5000/api"

</div>---

🎨 Design Philosophy

<div align="center">Color| Hex| Purpose
<img src="https://placehold.co/18x18/070B14/070B14.png" alt=""/>| "#070B14"| Cosmic background
<img src="https://placehold.co/18x18/6D28D9/6D28D9.png" alt=""/>| "#6D28D9"| Deep violet
<img src="https://placehold.co/18x18/8B5CF6/8B5CF6.png" alt=""/>| "#8B5CF6"| Neon purple
<img src="https://placehold.co/18x18/00E5FF/00E5FF.png" alt=""/>| "#00E5FF"| Electric cyan
<img src="https://placehold.co/18x18/F8FAFC/F8FAFC.png" alt=""/>| "#F8FAFC"| Primary text

</div>UI principles: Minimal • Futuristic • Responsive • Accessible • Interactive

---

🗺️ Roadmap

- [x] React frontend foundation
- [x] Express backend structure
- [x] AI integration structure
- [x] Voice interaction support
- [x] Conversation history foundation
- [x] Tamil and English interaction support
- [ ] Further refine the cosmic UI and AI orb
- [ ] Expand file and image understanding
- [ ] Improve accessibility and automated tests
- [ ] Complete production deployment

<sub>Roadmap reflects development goals; completion should be verified against the current code.</sub>

---

🔐 Security

- Keep API keys in backend environment variables.
- Exclude ".env" files from Git.
- Validate incoming API requests.
- Configure CORS for trusted frontend origins.
- Use HTTPS in production.
- Avoid exposing sensitive information in error messages.

---

👨‍💻 Developer

<div align="center"><img src="https://capsule-render.vercel.app/api?type=soft&color=0:111827,100:312E81&height=120&text=Thirusenthilkumar%20C&fontSize=32&fontColor=FFFFFF" width="100%" alt="Developer banner"/>Thirusenthilkumar C

Full Stack Developer | UI/UX Enthusiast

Building modern web experiences and exploring AI-powered applications.

<a href="https://github.com/ThirusenthilkumarC">
<img src="https://img.shields.io/badge/GitHub-Follow%20My%20Journey-181717?style=for-the-badge&logo=github" alt="GitHub profile"/>
</a></div>---

🤝 Contributing

Ideas and improvements are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Implement your changes.
4. Test the application.
5. Submit a pull request.

---

📄 License

Add a "LICENSE" file to the repository to specify the project's license.

<div align="center"><img src="https://readme-typing-svg.demolab.com?font=Orbitron&weight=600&size=19&duration=3000&pause=1000&color=8B5CF6&center=true&vCenter=true&width=500&lines=THANKS+FOR+VISITING+NOVA+AI.;KEEP+BUILDING.+KEEP+EXPLORING." alt="Thank you"/>⭐ If you like the project, consider giving the repository a star!

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:00D4FF,50:6D28D9,100:090979&height=120&section=footer" width="100%" alt="Footer banner"/></div>
