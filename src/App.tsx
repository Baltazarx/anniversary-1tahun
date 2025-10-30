import React, { useEffect, useRef, useState } from 'react';

// Data placeholder
const BASE = import.meta.env.BASE_URL;
const photos = [
  'photos/01.jpg',
  'photos/02.jpg',
  'photos/03.jpg',
  'photos/04.jpg',
].map((p) => BASE + p);

const softRed = '#FFC1C1';
const deepRose = '#b3002d';

// === Quiz Gate ===
type Quiz = {
  question: string;
  options: string[];
  answerIndex: number;
};

const QUIZZES: Quiz[] = [
  { question: 'Kamu sayang aku ngga?', options: ['Sayang', 'Sayang aja', 'Sayang bangey', 'Sayang buangett'], answerIndex: 3 },
  { question: 'Kalau sayang aku, tanggal berapa aku lahir?', options: ['29', '27', '26', '25'], answerIndex: 0 },
  { question: 'Aku umur berapa tahun ini', options: ['20', '21', '22', '23'], answerIndex: 3 },
  { question: 'Apa makanan favorit aku?', options: ['Bakso', 'Sate', 'Geprek', 'Mie ayam'], answerIndex: 2 },
  { question: 'Hero ML andalanku apa?', options: ['Kadita', 'Harley', 'Franco', 'Hayabusa'], answerIndex: 0 },
];

function pickThreeRandom<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, 3);
}

function QuizGate({ onPassed }: { onPassed: () => void }) {
  const [selectedSet] = useState<Quiz[]>(() => pickThreeRandom(QUIZZES));
  const [step, setStep] = useState(0);
  const [wrong, setWrong] = useState<string | null>(null);
  const [showIntro, setShowIntro] = useState(true);

  const current = selectedSet[step];

  const handleChoose = (idx: number) => {
    if (idx === current.answerIndex) {
      setWrong(null);
      if (step === selectedSet.length - 1) {
        onPassed();
      } else {
        setStep((s) => s + 1);
      }
    } else {
      const funTexts = [
        'Eits… salah nih, sepertinya kamu butuh pelukan motivasi 😁',
        'Belum tepat, tapi kamu tetap yang paling manis ✨',
        'Salah dikit gapapa, coba lagi yuk! 💕',
      ];
      setWrong(funTexts[Math.floor(Math.random() * funTexts.length)]);
    }
  };

  const resetWrong = () => setWrong(null);

  if (showIntro) {
    return (
      <div className="quiz-wrap">
        <div className="quiz-intro">
          <div className="intro-badge">Peringatan Manis</div>
          <h2>Haii Sayangkuu🫶</h2>
          <p className="intro-text">
            Sebelum kamu membuka website ini, ada beberapa pertanyaan yang harus kamu jawab dulu nih.
            Gampang gampang kok jawabannya, ga susah kaya UAS Tecnopreneur wkwkwk. kalo Salah? Tenang, ada tombol coba lagi kok.
          </p>
          <ul className="intro-list">
            <li>3 pertanyaan aja ga banyak kok</li>
            <li>Kalau benar semua → langsung masuk ke website</li>
            <li>Kalau salah → muncul pesan lucu + bisa coba lagi</li>
          </ul>
          <button className="intro-start" onClick={() => setShowIntro(false)}>Siap, Mulai!</button>
        </div>
        <style>{`
          .quiz-intro { width: 100%; max-width: 720px; background: rgba(255,245,247,.86); border: 1px solid #ffe3eb; border-radius: 24px; padding: 28px 22px; text-align: center; box-shadow: 0 26px 90px rgba(255, 179, 194, .35); }
          .intro-badge { display: inline-block; font-weight: 700; font-size: 12px; color: ${deepRose}; background: #fff; border: 1px solid #ffd6de; border-radius: 999px; padding: 6px 12px; }
          .quiz-intro h2 { margin: 12px 0 10px; color: ${deepRose}; font-family: 'Playfair Display', serif; }
          .intro-text { color: #7b2333; margin: 0 auto 10px; max-width: 540px; }
          .intro-list { list-style: none; padding: 0; margin: 8px 0 16px; color: #6b2232; }
          .intro-list li { margin: 6px 0; }
          .intro-start { border-radius: 12px; padding: 12px 16px; background: linear-gradient(135deg, #ff9db2, #ff8ba7); color: #fff; border: 1px solid #ff9db2; font-weight: 700; cursor: pointer; }
          .quiz-wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 28px 20px; background: radial-gradient(1200px 600px at 20% -10%, #ffe8ef 0%, transparent 60%), radial-gradient(1000px 500px at 100% 0%, #ffeef3 0%, transparent 55%), linear-gradient(180deg, #fff, #fff0f5 60%, #fff); }
        `}</style>
      </div>
    );
  }

  return (
    <div className="quiz-wrap">
      <div className="quiz-card">
        <div className="quiz-badge">Check-in Manis {step + 1}/3</div>
        <h2 className="quiz-q">{current.question}</h2>
        <div className="quiz-options">
          {current.options.map((opt, i) => (
            <button key={i} className="quiz-btn" onClick={() => handleChoose(i)}>{opt}</button>
          ))}
        </div>
        {wrong && (
          <div className="quiz-wrong">
            <div className="text">{wrong}</div>
            <button className="retry" onClick={resetWrong}>Coba Lagi</button>
          </div>
        )}
      </div>
      <style>{`
        .quiz-wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 28px 20px; background: radial-gradient(1200px 600px at 20% -10%, #ffe8ef 0%, transparent 60%), radial-gradient(1000px 500px at 100% 0%, #ffeef3 0%, transparent 55%), linear-gradient(180deg, #fff, #fff0f5 60%, #fff); }
        .quiz-card { width: 100%; max-width: 640px; background: rgba(255,245,247,.78); border: 1px solid #ffe3eb; border-radius: 24px; padding: 28px 22px; text-align: center; box-shadow: 0 26px 90px rgba(255, 179, 194, .35); }
        .quiz-badge { display: inline-block; font-weight: 700; font-size: 12px; color: ${deepRose}; background: #fff; border: 1px solid #ffd6de; border-radius: 999px; padding: 6px 12px; }
        .quiz-q { margin: 14px 0 16px; color: ${deepRose}; font-family: 'Playfair Display', serif; }
        .quiz-options { display: grid; grid-template-columns: 1fr; gap: 10px; max-width: 440px; margin: 0 auto; }
        .quiz-btn { border-radius: 12px; padding: 12px 14px; background: #fff; border: 1px solid #ffd6de; color: #7b2333; font-weight: 700; cursor: pointer; transition: transform .2s, box-shadow .2s, background .2s; }
        .quiz-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 34px rgba(255, 179, 194, .28); background: #fff7fa; }
        .quiz-wrong { margin-top: 14px; background: #fff; border: 1px solid #ffe3eb; border-radius: 14px; padding: 12px; color: #7b2333; }
        .quiz-wrong .text { margin-bottom: 8px; }
        .quiz-wrong .retry { border-radius: 10px; padding: 8px 12px; background: linear-gradient(135deg, #ff9db2, #ff8ba7); color: #fff; border: 1px solid #ff9db2; font-weight: 700; cursor: pointer; }
        @media (min-width: 560px) { .quiz-options { grid-template-columns: 1fr 1fr; } }
      `}</style>
    </div>
  );
}

function useAutoSlide(length: number, delayMs: number) {
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    timer.current = setTimeout(() => setIndex((i) => (i + 1) % length), delayMs);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [index, length, delayMs]);
  return index;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const closeOnEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', closeOnEsc);
    return () => document.removeEventListener('keydown', closeOnEsc);
  }, []);
  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="brand">Pasya • 21st Birthday</div>
        <div className="links desktop-only">
          <a href="#home">Home</a>
          <a href="#gallery">Gallery</a>
          <a href="#story">Our Story</a>
          <a href="#promises">Harapan & Janji</a>
        </div>
        <button className="menu-toggle" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          <span className={`bar${open ? ' open' : ''}`}></span>
          <span className={`bar${open ? ' open' : ''}`}></span>
          <span className={`bar${open ? ' open' : ''}`}></span>
        </button>
      </div>
      {open && (
        <div className="mobile-menu" onClick={() => setOpen(false)}>
          <div className="mobile-panel" onClick={(e) => e.stopPropagation()}>
            <a href="#home" onClick={() => setOpen(false)}>Home</a>
            <a href="#gallery" onClick={() => setOpen(false)}>Gallery</a>
            <a href="#story" onClick={() => setOpen(false)}>Our Story</a>
            <a href="#promises" onClick={() => setOpen(false)}>Harapan & Janji</a>
          </div>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <div className="badge">For my beautiful girlfriend</div>
        <h1>Happy birthday, <br /> Pasya Wahyu Permata Ningsih</h1>
        <p className="subtitle">30 Oktober 2004 — 30 Oktober 2025</p>
        <p className="intro">Untuk perempuan tercantik dalam hidupku. Semoga apa yang kamu inginkan selalu tercapai, doa, dan keajaiban yang menghampiri tanpa henti.</p>
        <div className="cta-row">
          <a href="#gallery" className="btn primary">Lihat Kenangan</a>
          <a href="#story" className="btn ghost">Baca Pesan</a>
        </div>
      </div>
      <div className="hero-decor" aria-hidden />
    </section>
  );
}

function GallerySlider() {
  const current = useAutoSlide(photos.length, 2600);
  return (
    <section id="gallery" className="gallery">
      <h2>Kenangan Kita</h2>
      <div className="slider">
        {photos.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`moment-${i + 1}`}
            className={`slide${i === current ? ' active' : ''}`}
          />
        ))}
        <div className="dots">
          {photos.map((_, i) => (
            <span key={i} className={`dot${i === current ? ' active' : ''}`} />)
          )}
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section id="story" className="story">
      <div className="card">
        <h3>Dear My Love</h3>
        <p>
          Di usia ke-21, Semoga kamu makin diberi kesabaran seluas samudra seperti nama terakhirku, Dilancarkan studi S1 nya tanpa aku (untuk semester ini), 
          & mimpimu tumbuh jadi kenyataan satu per satu. Terima kasih sudah menjadi rumah terindah dan ternyaman bagiku.
        </p>
        <blockquote>
          "I love you — today, tomorrow, and forever."
        </blockquote>
      </div>
      <div className="stats">
        <div className="stat">
          <div className="num">21</div>
          <div className="label">Tahun Berharga</div>
        </div>
        <div className="stat">
          <div className="num">∞</div>
          <div className="label">Rasa Sayang</div>
        </div>
        <div className="stat">
          <div className="num">2025</div>
          <div className="label">Bab Baru</div>
        </div>
      </div>
    </section>
  );
}

function Promises() {
  const cards = [
    { title: 'Menjaga & Mendengar', desc: 'Aku janji untuk selalu hadir, mendengar, dan memeluk setiap rasa.' },
    { title: 'Bertumbuh Bersama', desc: 'Kita merawat mimpi, belajar dari hari-hari, dan melangkah berdua.' },
    { title: 'Merayakan Hal Kecil', desc: 'Menjadikan momen sederhana terasa mewah dengan tawa dan syukur.' },
    { title: 'Jujur & Saling Percaya', desc: 'Kejujuran jadi bahasa kita, percaya jadi rumahnya.' },
    { title: 'Mencintai Setiap Versimu', desc: 'Bahagia, lelah, rapuh—semuanya berharga untuk kupeluk.' },
    { title: 'Selalu diberi kekuatan dan keberuntungan', desc: 'Ketika ada yang jadi api harus ada yang menjadi air.' },
  ];
  return (
    <section id="promises" className="promises">
      <h2>Harapan & Janji</h2>
      <p className="lead">Beberapa janji kecil untuk kita, agar cinta tetap hangat dan elegan.</p>
      <div className="grid">
        {cards.map((c, i) => (
          <div key={i} className="card">
            <div className="card-head">{c.title}</div>
            <p>{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const App: React.FC = () => {
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')!.slice(1);
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  if (!passed) {
    return <QuizGate onPassed={() => setPassed(true)} />;
  }

  return (
    <div className="site">
      <Navbar />
      <Hero />
      <main>
        <GallerySlider />
        <Story />
        <Promises />
      </main>
      <Footer />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;600;700&display=swap');
        :root {
          --soft-red: ${softRed};
          --deep-rose: ${deepRose};
          --rose-50: #fff5f7;
          --rose-100: #ffe3eb;
          --rose-200: #ffd6de;
          --rose-300: #ffb6c5;
          --text: #642335;
        }
        * { box-sizing: border-box; }
        html, body, #root { height: 100%; }
        body { margin: 0; font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'; background: radial-gradient(1200px 600px at 20% -10%, #ffe8ef 0%, transparent 60%), radial-gradient(1000px 500px at 100% 0%, #ffeef3 0%, transparent 55%), linear-gradient(180deg, #fff, #fff0f5 60%, #fff);
          color: var(--text);
          padding-bottom: env(safe-area-inset-bottom);
        }
        .site { position: relative; overflow-x: hidden; }

        /* Navbar */
        .nav { position: sticky; top: 0; z-index: 20; backdrop-filter: saturate(140%) blur(8px); background: rgba(255,245,247,0.7); border-bottom: 1px solid var(--rose-100); }
        .nav-inner { max-width: 1100px; margin: 0 auto; padding: 12px 12px; display: flex; align-items: center; justify-content: space-between; gap: 8px; }
        .brand { font-family: 'Playfair Display', serif; font-weight: 700; letter-spacing: .5px; color: var(--deep-rose); white-space: nowrap; }
        .links { display: flex; gap: 8px; overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
        .links::-webkit-scrollbar { display: none; }
        .links a { color: #7b2333; text-decoration: none; padding: 8px 12px; border-radius: 999px; transition: background .3s, color .3s; font-size: 13px; flex: 0 0 auto; }
        .links a:hover { background: var(--rose-100); color: var(--deep-rose); }
        .menu-toggle { position: relative; width: 36px; height: 32px; border: 1px solid var(--rose-200); border-radius: 10px; background: #fff; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; }
        .menu-toggle .bar { width: 18px; height: 2px; background: #7b2333; display: block; margin: 2px 0; transition: transform .25s ease, opacity .25s ease; }
        .menu-toggle .bar.open:nth-child(1) { transform: translateY(4px) rotate(45deg); }
        .menu-toggle .bar.open:nth-child(2) { opacity: 0; }
        .menu-toggle .bar.open:nth-child(3) { transform: translateY(-4px) rotate(-45deg); }
        .desktop-only { display: none; }
        @media (min-width: 920px) { .desktop-only { display: flex; } .menu-toggle { display: none; } }

        .mobile-menu { position: fixed; inset: 0; background: rgba(0,0,0,.18); backdrop-filter: blur(2px); z-index: 30; display: grid; place-items: start; }
        .mobile-panel { width: 86vw; max-width: 360px; background: #fff7fa; border: 1px solid var(--rose-100); border-radius: 16px; margin: 66px 12px 12px; padding: 12px; box-shadow: 0 30px 80px rgba(255,179,194,.35); display: grid; gap: 8px; }
        .mobile-panel a { color: #7b2333; text-decoration: none; padding: 12px 14px; border-radius: 10px; border: 1px solid var(--rose-100); background: #fff; font-weight: 700; }
        .mobile-panel a:active { background: #fff0f5; }

        /* Hero */
        .hero { position: relative; padding: 70px 16px 44px; display: grid; place-items: center; }
        .hero-content { text-align: center; max-width: 760px; background: rgba(255,245,247,0.75); border: 1px solid var(--rose-100); border-radius: 20px; padding: 28px 18px; box-shadow: 0 30px 80px rgba(255, 179, 194, .35); }
        .badge { display: inline-block; color: var(--deep-rose); background: #fff; border: 1px solid var(--rose-100); padding: 6px 12px; border-radius: 999px; font-size: 12px; font-weight: 600; letter-spacing: .6px; margin-bottom: 10px; }
        .hero h1 { font-family: 'Playfair Display', serif; font-size: 42px; margin: 6px 0 8px; color: var(--deep-rose); text-shadow: 0 2px 0 #fff7fa; }
        .subtitle { color: #8a2a3c; font-weight: 600; margin: 0 0 12px; }
        .intro { font-size: 15px; line-height: 1.7; margin: 0 auto 16px; max-width: 600px; color: #6b2232; }
        .cta-row { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
        .btn { border-radius: 12px; padding: 12px 16px; text-decoration: none; font-weight: 700; font-size: 14px; }
        .btn.primary { background: linear-gradient(135deg, #ff9db2, #ff8ba7); color: white; box-shadow: 0 10px 30px rgba(255, 139, 167, .35); border: 1px solid #ff9db2; }
        .btn.ghost { background: #fff; color: var(--deep-rose); border: 1px solid var(--rose-200); }

        .hero-decor { position: absolute; inset: -120px -60px auto -60px; height: 300px; background: radial-gradient(400px 150px at 15% 25%, #ffe0e9, transparent 60%), radial-gradient(600px 180px at 85% 30%, #ffd6de, transparent 60%); z-index: -1; filter: blur(10px); opacity: .8; }

        /* Gallery */
        .gallery { padding: 28px 16px 10px; max-width: 1100px; margin: 0 auto; }
        .gallery h2 { font-family: 'Playfair Display', serif; color: var(--deep-rose); font-size: 30px; margin: 0 0 14px 4px; }
        .slider { position: relative; height: 62vw; max-height: 420px; border-radius: 24px; overflow: hidden; border: 1px solid var(--rose-100); background: #fff; box-shadow: 0 16px 60px rgba(255, 179, 194, .35); }
        .slide { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transform: scale(1.04); transition: opacity 1.2s cubic-bezier(.6,.04,.4,1), transform 1.8s cubic-bezier(.47,0,.745,.715); }
        .slide.active { opacity: 1; transform: scale(1); }
        .dots { position: absolute; left: 0; right: 0; bottom: 12px; display: flex; justify-content: center; gap: 8px; }
        .dot { width: 10px; height: 10px; border-radius: 999px; background: var(--rose-200); border: 2px solid #ff9db2; opacity: .5; transition: transform .3s, opacity .3s, background .3s; }
        .dot.active { opacity: 1; background: #ff8ba7; transform: scale(1.1); }

        /* Story */
        .story { padding: 30px 16px; max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1.2fr .8fr; gap: 18px; }
        .story .card { background: linear-gradient(180deg, #fff, #fff6f8); border: 1px solid var(--rose-100); border-radius: 18px; padding: 22px; box-shadow: 0 20px 60px rgba(255, 179, 194, .25); }
        .story h3 { margin: 0 0 8px; font-family: 'Playfair Display', serif; color: var(--deep-rose); font-size: 22px; }
        .story p { margin: 0; line-height: 1.75; color: #6b2232; font-size: 15px; }
        blockquote { margin: 14px 0 0; padding-left: 14px; border-left: 3px solid var(--rose-300); color: #7b2333; font-style: italic; }
        .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .stat { background: #fff; border: 1px solid var(--rose-100); border-radius: 16px; padding: 14px; text-align: center; box-shadow: 0 10px 36px rgba(255, 179, 194, .2); }
        .num { font-family: 'Playfair Display', serif; font-size: 24px; color: var(--deep-rose); }
        .label { color: #7b2333; font-size: 11px; letter-spacing: .6px; text-transform: uppercase; }

        /* Promises */
        .promises { padding: 18px 16px 44px; max-width: 1100px; margin: 0 auto; }
        .promises h2 { font-family: 'Playfair Display', serif; color: var(--deep-rose); font-size: 30px; margin: 0 0 8px 4px; }
        .promises .lead { margin: 0 0 14px 4px; color: #7b2333; font-size: 15px; }
        .promises .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        .promises .card { background: #fff; border: 1px solid var(--rose-100); border-radius: 16px; padding: 14px 16px; box-shadow: 0 16px 40px rgba(255, 179, 194, .22); transition: transform .25s ease, box-shadow .25s ease; }
        .promises .card:hover { transform: translateY(-4px); box-shadow: 0 24px 60px rgba(255, 179, 194, .28); }
        .promises .card-head { font-weight: 700; color: #7b2333; margin-bottom: 6px; }
        .promises p { margin: 0; color: #6b2232; line-height: 1.7; font-size: 15px; }

        /* Footer */
        .footer { padding: 22px 16px 30px; background: linear-gradient(180deg, #fff7fa, #fff); border-top: 1px solid var(--rose-100); }
        .footer-inner { max-width: 1100px; margin: 0 auto; color: #7b2333; text-align: center; font-size: 14px; }
        .small { color: #a33a53; font-size: 12px; margin-top: 6px; }

        /* Responsive */
        @media (max-width: 920px) {
          .story { grid-template-columns: 1fr; }
          .promises .grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .hero h1 { font-size: 34px; }
          .intro { font-size: 14px; }
          .btn { width: 100%; text-align: center; }
          .slider { height: 66vw; }
          .promises .grid { grid-template-columns: 1fr; }
          .stats { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 400px) {
          .hero h1 { font-size: 30px; }
          .links a { font-size: 12px; padding: 6px 10px; }
          .badge { font-size: 11px; }
          .num { font-size: 22px; }
          .footer-inner { font-size: 13px; }
        }
      `}</style>
    </div>
  );
};

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>Made with love • Ajusta • 30 Oktober 2025</div>
        <div className="small">© Untuk kamu yang paling berharga.</div>
      </div>
    </footer>
  );
}

export default App;
