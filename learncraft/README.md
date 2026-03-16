# LearnCraft — AI Textbook Generator

Generate personalized textbooks from learning objectives using Claude AI.

## Deploy to Vercel in 5 steps

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
gh repo create learncraft --public --push
```

### 2. Go to vercel.com
- Sign in with GitHub
- Click "Add New Project"
- Import your `learncraft` repo

### 3. Add your API key
In Vercel project settings → Environment Variables:
```
ANTHROPIC_API_KEY = sk-ant-...your key here...
```
Get your key from: https://console.anthropic.com

### 4. Deploy
Click Deploy. Vercel builds and deploys automatically.

### 5. Done
Your app is live at `https://learncraft.vercel.app` (or your custom domain).

## Local development
```bash
cp .env.local.example .env.local
# Add your ANTHROPIC_API_KEY to .env.local
npm install
npm run dev
# Open http://localhost:3000
```

## How it works
- Frontend: Next.js React app
- Backend: Next.js API route at `/api/generate-textbook`
- The API route calls Anthropic server-side (API key never exposed to browser)
- PDF generation happens client-side using jsPDF
