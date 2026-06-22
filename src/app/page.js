"use client";

import { useState, useEffect, useRef } from "react";

/* ──────────── ICONS ──────────── */

const SunIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const CopyIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const SparkleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
  </svg>
);

const ChevronIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const TinyCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ──────────── CUSTOM DROPDOWN COMPONENT (Opens UPWARD) ──────────── */

function CustomDropdown({ value, onChange, options, dropUp = true }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="custom-dropdown" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`custom-dropdown-trigger ${open ? "open" : ""}`}
      >
        <span>{value}</span>
        <span className={`custom-dropdown-chevron ${open ? "open" : ""}`}>
          <ChevronIcon />
        </span>
      </button>

      {open && (
        <div className={`custom-dropdown-menu ${dropUp ? "dropup" : ""} custom-scrollbar`}>
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`custom-dropdown-item ${
                value === opt ? "selected" : ""
              }`}
            >
              <span>{opt}</span>
              <span className="custom-dropdown-check">
                <TinyCheck />
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ──────────── MODE CONFIG ──────────── */

const MODES = [
  { key: "summarize", label: "Summarize", icon: "📋", desc: "Extract key points" },
  { key: "rewrite", label: "Rewrite", icon: "✏️", desc: "Change tone & style" },
  { key: "translate", label: "Translate", icon: "🌐", desc: "Convert language" },
  { key: "humanize", label: "Humanize", icon: "💬", desc: "Make it natural" },
];

const TONES = ["Simple", "Professional", "Friendly", "Funny", "Academic", "Poetic"];
const LANGUAGES = [
  "Tamil", "English", "Spanish", "French", "German",
  "Japanese", "Korean", "Hindi", "Chinese", "Arabic",
  "Portuguese", "Russian",
];

const SAMPLE_TEXT = `Artificial intelligence (AI) is transforming how businesses operate across every industry. From automating routine tasks to providing deep analytical insights, AI enables organizations to make data-driven decisions faster than ever before. Machine learning algorithms can process vast datasets, identifying patterns that would be impossible for humans to detect manually. As this technology continues to evolve, companies that embrace AI will gain significant competitive advantages in efficiency, innovation, and customer experience.`;

/* ──────────── MAIN COMPONENT ──────────── */

export default function Home() {
  const [mode, setMode] = useState("summarize");
  const [tone, setTone] = useState("Simple");
  const [target, setTarget] = useState("Tamil");
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light") {
      setDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }

  function loadSample() {
    setText(SAMPLE_TEXT);
  }

  function clearAll() {
    setText("");
    setOutput("");
  }

  async function onCopy() {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function transform() {
    if (!text.trim()) return;
    setLoading(true);
    setOutput("");

    try {
      const response = await fetch("/api/transform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: text,
          mode,
          tone: mode === "rewrite" || mode === "humanize" ? tone : undefined,
          target: mode === "translate" ? target : undefined,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || `Server error: ${response.status}`);
      }
      setOutput(data.output);
    } catch (error) {
      console.error("Request failed:", error.message);
      setOutput(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  const charCount = text.length;

  return (
    <main className="relative min-h-screen overflow-hidden transition-colors duration-500">
      <div className="ambient-orb ambient-orb-1" />
      <div className="ambient-orb ambient-orb-2" />
      <div className="ambient-orb ambient-orb-3" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        {/* HEADER */}
        <header className="fade-in-up mb-10 flex items-start justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2.5">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl text-white"
                style={{
                  background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
                }}
              >
                <SparkleIcon />
              </div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: "var(--foreground)" }}>
                Humanaee
                <span style={{ color: "var(--accent)" }}> AI</span>
              </h1>
            </div>
            <p className="max-w-md text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              Premium AI-powered text transformer. Summarize, rewrite, translate, and humanize your content with precision.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span style={{ color: "var(--muted)" }} className="text-xs">
              {dark ? "Dark" : "Light"}
            </span>
            <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
              <div className="theme-toggle-knob text-white">
                {dark ? <MoonIcon /> : <SunIcon />}
              </div>
            </button>
          </div>
        </header>

        {/* MODE SELECTOR */}
        <div className="fade-in-up-delay-1 mb-6">
          <div className="flex flex-wrap gap-2.5">
            {MODES.map((m) => (
              <button
                key={m.key}
                onClick={() => setMode(m.key)}
                className={`mode-pill flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-medium ${
                  mode === m.key ? "mode-pill-active" : ""
                }`}
              >
                <span className="text-base">{m.icon}</span>
                <span>{m.label}</span>
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs" style={{ color: "var(--muted)" }}>
            {MODES.find((m) => m.key === mode)?.desc}
          </p>
        </div>

        {/* MAIN CARD */}
        <div className="fade-in-up-delay-2 glass-card rounded-3xl p-5 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* INPUT */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold tracking-wide" style={{ color: "var(--foreground)" }}>
                  Input
                </label>
                <div className="flex items-center gap-2">
                  <button onClick={loadSample} className="btn-secondary rounded-xl px-3 py-1.5 text-xs font-medium">
                    Load Sample
                  </button>
                  <button onClick={clearAll} className="btn-secondary rounded-xl px-3 py-1.5 text-xs font-medium">
                    Clear
                  </button>
                </div>
              </div>

              <div className="relative">
                <textarea
                  placeholder="Paste or type your text here…"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="premium-textarea custom-scrollbar h-72 w-full resize-none rounded-2xl p-4 text-sm leading-relaxed"
                />
                <span className="char-counter absolute bottom-3 right-4">
                  {charCount.toLocaleString()} chars
                </span>
              </div>
            </div>

            {/* OUTPUT */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold tracking-wide" style={{ color: "var(--foreground)" }}>
                  Output
                </label>
                {output && !loading && (
                  <div className="tooltip-wrapper">
                    <button
                      onClick={onCopy}
                      className="btn-secondary flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium"
                    >
                      {copied ? (
                        <>
                          <CheckIcon />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <CopyIcon />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                    <span className="tooltip-text">
                      {copied ? "Copied to clipboard" : "Copy to clipboard"}
                    </span>
                  </div>
                )}
              </div>

              <div className="output-box custom-scrollbar h-72 overflow-auto rounded-2xl p-4 text-sm leading-relaxed">
                {loading ? (
                  <div className="flex flex-col gap-3 pt-2">
                    <div className="shimmer-line w-full" />
                    <div className="shimmer-line w-5/6" />
                    <div className="shimmer-line w-4/6" />
                    <div className="shimmer-line w-full" />
                    <div className="shimmer-line w-3/6" />
                  </div>
                ) : output ? (
                  <div className="whitespace-pre-wrap">{output}</div>
                ) : (
                  <div
                    className="flex h-full flex-col items-center justify-center gap-3 text-center"
                    style={{ color: "var(--muted)" }}
                  >
                    <div className="text-3xl opacity-30">✨</div>
                    <p className="text-sm">Your transformed text will appear here</p>
                    <p className="text-xs opacity-60">
                      Select a mode, paste your text, and click Transform
                    </p>
                  </div>
                )}
              </div>

              {output && !loading && (
                <div className="flex items-center justify-between">
                  <span className="char-counter">
                    {output.length.toLocaleString()} chars
                  </span>
                  <span className="text-xs" style={{ color: "var(--muted)" }}>
                    Ready to use
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* ✨ ACTION BAR — TONE/LANGUAGE + TRANSFORM (HORIZONTAL) ✨ */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
            {/* Tone dropdown (Rewrite & Humanize modes) */}
            {(mode === "rewrite" || mode === "humanize") && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium" style={{ color: "var(--muted)" }}>
                  Tone
                </span>
                <CustomDropdown value={tone} onChange={setTone} options={TONES} dropUp={true} />
              </div>
            )}

            {/* Language dropdown (Translate mode) */}
            {mode === "translate" && (
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap text-xs font-medium" style={{ color: "var(--muted)" }}>
                  Language
                </span>
                <CustomDropdown value={target} onChange={setTarget} options={LANGUAGES} dropUp={true} />
              </div>
            )}

            {/* Transform Button */}
            <button
              onClick={transform}
              disabled={loading || !text.trim()}
              className="btn-primary flex items-center justify-center gap-2 rounded-2xl px-12 py-3.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed sm:min-w-[280px]"
            >
              {loading ? (
                <>
                  <span className="flex items-center gap-1.5">
                    <span className="pulse-dot" />
                    <span className="pulse-dot" />
                    <span className="pulse-dot" />
                  </span>
                  <span>Processing…</span>
                </>
              ) : (
                <>
                  <SparkleIcon />
                  <span>Transform</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* FOOTER */}
        <footer
          className="mt-10 flex flex-col items-center gap-2 text-center text-xs"
          style={{ color: "var(--muted)" }}
        >
          <p>
            Crafted with{" "}
            <span style={{ color: "var(--accent)" }}>precision</span>{" "}
            &middot; Built for modern writers
          </p>
        </footer>
      </div>
    </main>
  );
}