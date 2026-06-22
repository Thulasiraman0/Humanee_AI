# ✨ Humanaee AI

> A premium AI-powered text transformation tool built with Next.js and Google Gemini. Summarize, rewrite, translate, and humanize your content with elegant precision.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8?style=flat-square&logo=tailwindcss)

---

## 🌟 Overview

**Humanee AI** is a beautifully designed, premium text transformation web application that helps writers, students, professionals, and content creators refine their text in seconds. Whether you need to summarize long articles, rewrite content in a different tone, translate between languages, or humanize AI-generated text, Humanaee AI delivers high-quality results through an elegant, intuitive interface.

---

## ✨ Features

### 🎯 Four Powerful Modes

| Mode | Description |
|------|-------------|
| 📋 **Summarize** | Extract key points from long text into concise bullet points |
| ✏️ **Rewrite** | Rephrase content while preserving meaning, with customizable tone |
| 🌐 **Translate** | Translate text into 12+ languages with native fluency |
| 💬 **Humanize** | Transform AI-generated text into natural, human-like writing |

### 🎨 Premium UI/UX

- 🌗 **Dark / Light Mode** — Seamless theme toggle with persistent preference
- 🔮 **Glassmorphism Design** — Frosted glass cards with backdrop blur
- ✨ **Ambient Background** — Animated gradient orbs for visual depth
- 🎭 **Smooth Animations** — Entrance animations, shimmer loading, and pulse dots
- 📱 **Fully Responsive** — Optimized for desktop, tablet, and mobile
- 🎯 **Custom Dropdowns** — Beautifully styled with gradient selection and check indicators

### 🛠️ Smart Functionality

- 📝 **Live Character Counter** — Real-time count for input and output
- 📋 **One-Click Copy** — Copy results with animated feedback
- 🎬 **Load Sample Text** — Quick demo with prebuilt sample
- 🗑️ **Clear All** — Reset input and output instantly
- ⚡ **Loading States** — Elegant shimmer animation while processing

### 🎨 Customization Options

- **6 Tone Styles**: Simple, Professional, Friendly, Funny, Academic, Poetic
- **12 Languages**: Tamil, English, Spanish, French, German, Japanese, Korean, Hindi, Chinese, Arabic, Portuguese, Russian

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router) |
| **Frontend** | [React 19](https://react.dev/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **AI Engine** | [Google Gemini 2.5 Flash](https://ai.google.dev/) |
| **Language** | JavaScript (ES6+) |
| **Icons** | Inline SVG (custom) |

---

## 📦 Installation

### Prerequisites

- **Node.js** v18 or higher
- **npm**, **yarn**, or **pnpm**
- A **Google Gemini API key** ([Get yours here](https://aistudio.google.com/app/apikey))

### Step 1: Clone the Repository

```bash
git clone https://github.com/Thulasiraman0/Humanee_AI.git
cd Humanaee_AI
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Step 3: Set Up Environment Variables

Create a `.env.local` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

> ⚠️ **Never commit your `.env.local` file.** It's already included in `.gitignore`.

### Step 4: Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. 🎉

---

## 📁 Project Structure

```
textcraft-ai/
├── app/
│   ├── api/
│   │   └── transform/
│   │       └── route.js          # API endpoint for AI text transformation
│   ├── globals.css                # Global styles, themes, animations
│   ├── layout.js                  # Root layout
│   └── page.js                    # Main application page
├── public/                        # Static assets
├── .env.local                     # Environment variables (not in repo)
├── .gitignore
├── next.config.mjs
├── package.json
├── tailwind.config.js
└── README.md
```

---

## 🚀 Usage

1. **Select a Mode** — Choose between Summarize, Rewrite, Translate, or Humanize.
2. **Enter Your Text** — Paste or type your content in the input box (or click *Load Sample*).
3. **Choose Options** — Select tone (for Rewrite/Humanize) or target language (for Translate).
4. **Click Transform** — Hit the Transform button and watch the magic happen.
5. **Copy the Result** — Use the Copy button to copy the output to your clipboard.

---

## ⚙️ API Endpoint

### `POST /api/transform`

Transforms input text based on the selected mode.

#### Request Body

```json
{
  "input": "Your text here...",
  "mode": "summarize | rewrite | translate | humanize",
  "tone": "Simple | Professional | Friendly | Funny | Academic | Poetic",
  "target": "Tamil | English | Spanish | ..."
}
```

#### Response

```json
{
  "output": "Transformed text result..."
}
```

#### Error Response

```json
{
  "error": "Error message describing the issue"
}
```

---

## 🎨 Theming

Humanaee AI uses CSS custom properties for full theme control. To customize colors, edit the variables in `app/globals.css`:

```css
:root {
  --accent: #6366f1;
  --gradient-start: #6366f1;
  --gradient-end: #a855f7;
  /* ... more variables */
}

.dark {
  --accent: #818cf8;
  /* ... dark mode overrides */
}
```

---

## 🌐 Deployment

### Deploy on Vercel (Recommended)

1. Push your code to GitHub
2. Import the project on [Vercel](https://vercel.com/new)
3. Add the `GEMINI_API_KEY` environment variable in project settings
4. Click **Deploy**

### Deploy on Other Platforms

The app works on any platform that supports Next.js:
- [Netlify](https://www.netlify.com/)
- [Railway](https://railway.app/)
- [Render](https://render.com/)
- [AWS Amplify](https://aws.amazon.com/amplify/)

Make sure to set the `GEMINI_API_KEY` environment variable on your hosting platform.

---

## 🧪 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Build the app for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

---

## 🎯 Roadmap

-  Add export options (PDF, TXT, Markdown)
-  Add history/saved transformations
-  Add user authentication
-  Add more languages
-  Add voice input
-  Add browser extension
-  Add mobile app (React Native)
-  Add team collaboration features

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---


---

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/) — The React framework for production
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [Google AI Studio](https://aistudio.google.com/) — For the AI capabilities
- All the amazing open-source contributors out there 💖

---

## 📬 Contact

**Your Name**
- GitHub: [thulasiraman0](https://github.com/thulasiraman0)
- Email: thulasiramanat763@gmail.com
- LinkedIn: [Thulasiraman](www.linkedin.com/in/thulasiraman09)

---



### ⭐ If you found this project helpful, please give it a star!

**Crafted with precision · Built for modern writers**

