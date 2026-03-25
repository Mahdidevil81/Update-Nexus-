# Nexus - AI Neural Assistant

An AI-powered interactive assistant built with React 19 + TypeScript + Vite, integrating Google Gemini models for multi-modal interactions.

## Features
- Text-based AI chat using Google Gemini
- Image generation via Gemini models
- Live voice assistant (real-time audio streaming)
- Bilingual support (English and Persian)
- Multiple visual themes (Cyberpunk Glow, Deep Space, etc.)
- Interaction history and personalized prompts

## Tech Stack
- **Frontend:** React 19, TypeScript, Tailwind CSS, Framer Motion
- **AI:** Google Generative AI SDK (`@google/genai`)
- **Build Tool:** Vite 6
- **Package Manager:** npm

## Project Structure
- `App.tsx` — Main application entry point and state coordinator
- `components/` — UI components (AiResponsePanel, LiveVoiceAssistant, HistoryDrawer, ProfileDrawer, QuantumBackground)
- `services/geminiService.ts` — Google Gemini API integration
- `utils/audioManager.ts` — Audio processing utilities
- `types.ts` — TypeScript interfaces
- `constants.ts` — Global constants

## Environment Variables
- `GEMINI_API_KEY` — Google Gemini API key (required for AI features)

## Development
- Runs on port 5000 via Vite dev server
- `npm run dev` — Start development server
- `npm run build` — Build for production

## Deployment
- Configured as a **static** deployment
- Build command: `npm run build`
- Output directory: `dist`
