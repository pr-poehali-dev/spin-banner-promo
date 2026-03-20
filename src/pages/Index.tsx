import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const ACCENT = "#e8001c";
const ACCENT_DIM = "#a50013";
const BG_CARD = "linear-gradient(135deg, #0d0000 0%, #1a0005 40%, #2a0008 70%, #1a0005 100%)";
const BG_PAGE = "linear-gradient(160deg, #050000 0%, #0f0002 50%, #050000 100%)";

const cards = [
  {
    id: 1,
    label: "БОЛЬ",
    labelIcon: "Zap",
    headline: "Спина болит каждый день —",
    headline2: "а вы всё ещё терпите?",
    subtext: "Каждое утро просыпаетесь с ощущением, что спина вас предала?",
    icons: [
      { name: "BedDouble", text: "Боль по утрам" },
      { name: "Frown", text: "Раздражение" },
      { name: "Clock", text: "Годами терпите" },
    ],
  },
  {
    id: 2,
    label: "ИСТОРИЯ",
    labelIcon: "Star",
    headline: "6 грыж. Компрессионный перелом.",
    headline2: "Восстановился без операции.",
    subtext: null,
    badges: ["без операций", "без сложных упражнений", "без дорогого оборудования"],
    icons: [
      { name: "ShieldCheck", text: "Безопасно" },
      { name: "Dumbbell", text: "Просто" },
      { name: "Wallet", text: "Доступно" },
    ],
  },
  {
    id: 3,
    label: "РЕЗУЛЬТАТ",
    labelIcon: "Trophy",
    headline: "21 день —",
    headline2: "и спина перестаёт мешать жить.",
    subtext: "Более 3 000 человек уже прошли практикум и забыли о боли",
    icons: [
      { name: "CalendarCheck", text: "21 день" },
      { name: "Users", text: "3 000+ человек" },
      { name: "TrendingUp", text: "Навсегда" },
    ],
    cta: "Хочу так же",
    ctaUrl: "https://school.sbadyuk.com/zdorovayaspina",
  },
];

const AUTO_INTERVAL = 4500;

export default function Index() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [dir, setDir] = useState<"left" | "right">("right");
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const transitionRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (paused) return;
    autoRef.current = setInterval(() => {
      goTo((prev) => (prev + 1) % cards.length, "right");
    }, AUTO_INTERVAL);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [paused, active]);

  const goTo = (idxOrFn: number | ((prev: number) => number), forcedDir?: "left" | "right") => {
    setActive((prev) => {
      const next = typeof idxOrFn === "function" ? idxOrFn(prev) : idxOrFn;
      if (next === prev) return prev;
      const d = forcedDir ?? (next > prev ? "right" : "left");
      setDir(d);
      setAnimating(true);
      if (transitionRef.current) clearTimeout(transitionRef.current);
      transitionRef.current = setTimeout(() => setAnimating(false), 320);
      return next;
    });
  };

  const handlePrev = () => {
    setPaused(true);
    goTo((p) => (p - 1 + cards.length) % cards.length, "left");
  };

  const handleNext = () => {
    setPaused(true);
    goTo((p) => (p + 1) % cards.length, "right");
  };

  const handleDot = (i: number) => {
    setPaused(true);
    goTo(i);
  };

  const card = cards[active];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ background: BG_PAGE }}
    >
      {/* Header */}
      <div style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-14px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
        marginBottom: 20,
        textAlign: "center",
      }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "5px 14px",
          borderRadius: 20,
          background: "rgba(232,0,28,0.1)",
          border: "1px solid rgba(232,0,28,0.25)",
          color: "rgba(255,180,180,0.7)",
          fontFamily: "Montserrat, sans-serif",
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.16em",
        }}>
          🏥 ПРАКТИКУМ · ЗДОРОВАЯ СПИНА
        </div>
      </div>

      {/* Card + side arrows wrapper */}
      <div style={{
        position: "relative",
        width: "100%",
        maxWidth: 640,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(22px) scale(0.97)",
        transition: "opacity 0.55s ease 0.1s, transform 0.55s ease 0.1s",
      }}>
        {/* Left arrow */}
        <button
          onClick={handlePrev}
          style={{
            position: "absolute",
            left: -52,
            top: "50%",
            transform: "translateY(-50%)",
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "rgba(232,0,28,0.12)",
            border: "1px solid rgba(232,0,28,0.3)",
            color: "#e8001c",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "background 0.2s, transform 0.15s",
            zIndex: 10,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(232,0,28,0.25)";
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-50%) scale(1.08)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(232,0,28,0.12)";
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-50%) scale(1)";
          }}
        >
          <Icon name="ChevronLeft" size={20} />
        </button>

        {/* Right arrow */}
        <button
          onClick={handleNext}
          style={{
            position: "absolute",
            right: -52,
            top: "50%",
            transform: "translateY(-50%)",
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "rgba(232,0,28,0.12)",
            border: "1px solid rgba(232,0,28,0.3)",
            color: "#e8001c",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "background 0.2s, transform 0.15s",
            zIndex: 10,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(232,0,28,0.25)";
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-50%) scale(1.08)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(232,0,28,0.12)";
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-50%) scale(1)";
          }}
        >
          <Icon name="ChevronRight" size={20} />
        </button>

        {/* Main card */}
        <div style={{
          position: "relative",
          borderRadius: 28,
          overflow: "hidden",
          background: BG_CARD,
          boxShadow: `0 0 0 1px rgba(232,0,28,0.15), 0 32px 80px rgba(0,0,0,0.7), 0 0 60px rgba(232,0,28,0.08)`,
          minHeight: 460,
        }}>
          {/* Glow top-right */}
          <div style={{
            position: "absolute",
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: ACCENT,
            opacity: 0.07,
            top: -100,
            right: -80,
            filter: "blur(80px)",
            pointerEvents: "none",
          }} />
          {/* Glow bottom-left */}
          <div style={{
            position: "absolute",
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: ACCENT_DIM,
            opacity: 0.06,
            bottom: -60,
            left: -40,
            filter: "blur(60px)",
            pointerEvents: "none",
          }} />

          {/* Red diagonal stripe */}
          <div style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            width: "38%",
            background: "linear-gradient(to right, transparent 0%, rgba(232,0,28,0.04) 100%)",
            borderLeft: "1px solid rgba(232,0,28,0.1)",
            transform: "skewX(-4deg) translateX(10px)",
            pointerEvents: "none",
          }} />

          {/* Red top bar */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: `linear-gradient(to right, transparent, ${ACCENT}, transparent)`,
            opacity: 0.8,
          }} />

          {/* Animated content */}
          <div style={{
            padding: "36px 40px 36px 40px",
            minHeight: 460,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            opacity: animating ? 0 : 1,
            transform: animating
              ? `translateX(${dir === "right" ? "-20px" : "20px"})`
              : "translateX(0)",
            transition: "opacity 0.28s ease, transform 0.28s ease",
          }}>
            {/* Top: label + card number */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "5px 12px",
                  borderRadius: 20,
                  background: ACCENT,
                  color: "#fff",
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                }}>
                  <Icon name={card.labelIcon} size={10} fallback="Star" />
                  {card.label}
                </div>
                <div style={{
                  width: 60,
                  height: 1,
                  background: `linear-gradient(to right, ${ACCENT}66, transparent)`,
                }} />
              </div>
              <div style={{
                fontFamily: "Oswald, sans-serif",
                fontSize: 80,
                fontWeight: 700,
                color: "rgba(232,0,28,0.07)",
                lineHeight: 1,
                userSelect: "none",
                marginTop: -10,
              }}>
                0{card.id}
              </div>
            </div>

            {/* Headline */}
            <div style={{ marginBottom: 20 }}>
              <h1 style={{
                fontFamily: "Oswald, sans-serif",
                fontSize: "clamp(26px, 5vw, 40px)",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.05,
                textTransform: "uppercase",
                letterSpacing: "-0.01em",
                margin: "0 0 4px 0",
              }}>
                {card.headline}
              </h1>
              <h1 style={{
                fontFamily: "Oswald, sans-serif",
                fontSize: "clamp(26px, 5vw, 40px)",
                fontWeight: 700,
                color: ACCENT,
                lineHeight: 1.05,
                textTransform: "uppercase",
                letterSpacing: "-0.01em",
                margin: 0,
              }}>
                {card.headline2}
              </h1>
            </div>

            {/* Subtext */}
            {card.subtext && (
              <p style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: 13,
                color: "rgba(255,255,255,0.62)",
                lineHeight: 1.55,
                margin: "0 0 20px 0",
              }}>
                {card.subtext}
              </p>
            )}

            {/* Badges */}
            {"badges" in card && card.badges && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                {card.badges.map((b, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      background: "rgba(232,0,28,0.15)",
                      border: `1px solid ${ACCENT}55`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <Icon name="Check" size={10} style={{ color: ACCENT }} fallback="Check" />
                    </div>
                    <span style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: 13,
                      color: "rgba(255,255,255,0.8)",
                      fontWeight: 500,
                    }}>
                      {b}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Icons row */}
            <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
              {card.icons.map((ic, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: "rgba(232,0,28,0.1)",
                    border: `1px solid rgba(232,0,28,0.2)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <Icon name={ic.name} size={20} style={{ color: ACCENT }} fallback="Circle" />
                  </div>
                  <span style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: 9,
                    color: "rgba(255,255,255,0.4)",
                    textAlign: "center",
                    lineHeight: 1.2,
                    maxWidth: 52,
                  }}>
                    {ic.text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            {"cta" in card && card.cta && (
              <div style={{ position: "relative", alignSelf: "flex-start" }}>
                {/* Flash ring */}
                <div className="cta-flash-ring" />
                <a
                  href={card.ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-btn"
                  style={{
                    position: "relative",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "14px 28px",
                    borderRadius: 16,
                    background: ACCENT,
                    color: "#fff",
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: 15,
                    fontWeight: 700,
                    textDecoration: "none",
                    letterSpacing: "0.02em",
                    boxShadow: `0 8px 32px rgba(232,0,28,0.4)`,
                    overflow: "hidden",
                    zIndex: 1,
                  }}
                >
                  {/* Shine sweep */}
                  <span className="cta-shine" />
                  {card.cta}
                  <Icon name="ArrowRight" size={16} />
                </a>
              </div>
            )}
          </div>

          {/* Noise texture */}
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            opacity: 0.025,
            pointerEvents: "none",
            borderRadius: "inherit",
          }} />
        </div>
      </div>

      {/* Progress bar + dots */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        marginTop: 20,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.6s ease 0.4s",
      }}>
        {/* Auto-progress bar */}
        <div style={{
          width: 200,
          height: 2,
          borderRadius: 2,
          background: "rgba(232,0,28,0.15)",
          overflow: "hidden",
        }}>
          <div
            key={`${active}-${paused}`}
            style={{
              height: "100%",
              borderRadius: 2,
              background: ACCENT,
              animation: paused ? "none" : `progressBar ${AUTO_INTERVAL}ms linear`,
              width: paused ? "0%" : undefined,
            }}
          />
        </div>

        {/* Dots */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDot(i)}
              style={{
                width: i === active ? 28 : 7,
                height: 7,
                borderRadius: 4,
                background: i === active ? ACCENT : "rgba(232,0,28,0.25)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "width 0.35s ease, background 0.35s ease",
                boxShadow: i === active ? `0 0 12px rgba(232,0,28,0.6)` : "none",
              }}
            />
          ))}
        </div>

        {/* Labels */}
        <div style={{ display: "flex", gap: 20 }}>
          {cards.map((c, i) => (
            <button
              key={i}
              onClick={() => handleDot(i)}
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: 9,
                fontWeight: i === active ? 700 : 400,
                color: i === active ? ACCENT : "rgba(255,255,255,0.2)",
                background: "none",
                border: "none",
                cursor: "pointer",
                letterSpacing: "0.12em",
                transition: "color 0.35s ease",
                padding: "2px 0",
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes progressBar {
          from { width: 0% }
          to { width: 100% }
        }

        /* Flash ring — pulse around button */
        .cta-flash-ring {
          position: absolute;
          inset: -4px;
          border-radius: 20px;
          border: 2px solid rgba(232,0,28,0.7);
          animation: flashRing 1.6s ease-out infinite;
          pointer-events: none;
          z-index: 0;
        }
        @keyframes flashRing {
          0%   { transform: scale(1);    opacity: 0.9; }
          60%  { transform: scale(1.12); opacity: 0; }
          100% { transform: scale(1.12); opacity: 0; }
        }

        /* Shine sweep across button */
        .cta-shine {
          position: absolute;
          top: 0;
          left: -75%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            120deg,
            transparent 0%,
            rgba(255,255,255,0.35) 50%,
            transparent 100%
          );
          animation: shineSweep 2.2s ease-in-out infinite;
          pointer-events: none;
          border-radius: inherit;
        }
        @keyframes shineSweep {
          0%   { left: -75%; opacity: 0; }
          10%  { opacity: 1; }
          50%  { left: 130%; opacity: 1; }
          51%  { opacity: 0; }
          100% { left: 130%; opacity: 0; }
        }

        /* Subtle scale pulse on button */
        .cta-btn {
          animation: ctaPulse 2.2s ease-in-out infinite;
        }
        @keyframes ctaPulse {
          0%,100% { transform: scale(1);    box-shadow: 0 8px 32px rgba(232,0,28,0.4); }
          50%      { transform: scale(1.03); box-shadow: 0 12px 44px rgba(232,0,28,0.6); }
        }
        .cta-btn:hover {
          animation: none;
          transform: scale(1.05) !important;
          box-shadow: 0 14px 48px rgba(232,0,28,0.65) !important;
        }
      `}</style>
    </div>
  );
}