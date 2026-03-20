import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const PHOTO_PAIN = "https://cdn.poehali.dev/projects/611beea1-0c09-41ad-beca-ec9b6d98adde/files/d5c7f3d2-e770-4e24-b36d-21be3bd4d338.jpg";
const PHOTO_RECOVERY = "https://cdn.poehali.dev/projects/611beea1-0c09-41ad-beca-ec9b6d98adde/files/c9e9afc3-5fdf-44bf-bee3-eb3dcf28117f.jpg";
const PHOTO_RESULT = "https://cdn.poehali.dev/projects/611beea1-0c09-41ad-beca-ec9b6d98adde/files/8fc322f4-2480-4795-a6a1-489268448e02.jpg";

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
    photo: PHOTO_PAIN,
    gradient: "linear-gradient(135deg, #1a0533 0%, #3d0066 30%, #7b00cc 60%, #cc0044 100%)",
    accentColor: "#ff1a6e",
    labelBg: "#ff1a6e",
    labelTextColor: "#fff",
    photoSide: "right" as const,
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
    photo: PHOTO_RECOVERY,
    gradient: "linear-gradient(135deg, #001f3f 0%, #003d7a 30%, #0066cc 65%, #00cc88 100%)",
    accentColor: "#00e5ff",
    labelBg: "#00cc88",
    labelTextColor: "#fff",
    photoSide: "left" as const,
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
    photo: PHOTO_RESULT,
    gradient: "linear-gradient(135deg, #1a2e00 0%, #2d5200 30%, #4a8700 60%, #cc9200 100%)",
    accentColor: "#ffb800",
    labelBg: "#ffb800",
    labelTextColor: "#1a2e00",
    photoSide: "right" as const,
    cta: "Хочу так же",
  },
];

export default function Index() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [dir, setDir] = useState<"left" | "right">("right");
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const goTo = (idx: number) => {
    if (animating || idx === active) return;
    setDir(idx > active ? "right" : "left");
    setAnimating(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActive(idx);
      setAnimating(false);
    }, 320);
  };

  const card = cards[active];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ background: "linear-gradient(160deg, #080010 0%, #100020 50%, #080010 100%)" }}
    >
      {/* Header badge */}
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(-16px)",
          transition: "opacity 0.55s ease, transform 0.55s ease",
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "5px 14px",
            borderRadius: 20,
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.45)",
            fontFamily: "Montserrat, sans-serif",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.16em",
          }}
        >
          <span style={{ fontSize: 12 }}>🏥</span>
          ПРАКТИКУМ · ЗДОРОВАЯ СПИНА
        </div>
      </div>

      {/* Main card */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 600,
          minHeight: 480,
          borderRadius: 28,
          overflow: "hidden",
          background: card.gradient,
          boxShadow: `0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)`,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)",
          transitionProperty: "opacity, transform",
          transitionDuration: "0.55s",
          transitionTimingFunction: "ease",
          transitionDelay: "0.12s",
        }}
      >
        {/* Background glow blobs */}
        <div style={{
          position: "absolute",
          width: 280,
          height: 280,
          borderRadius: "50%",
          background: card.accentColor,
          opacity: 0.1,
          top: -80,
          right: card.photoSide === "right" ? -60 : "auto",
          left: card.photoSide === "left" ? -60 : "auto",
          filter: "blur(70px)",
          pointerEvents: "none",
          transition: "background 0.5s",
        }} />
        <div style={{
          position: "absolute",
          width: 160,
          height: 160,
          borderRadius: "50%",
          background: "#fff",
          opacity: 0.03,
          bottom: -30,
          left: card.photoSide === "right" ? 30 : "auto",
          right: card.photoSide === "left" ? 30 : "auto",
          filter: "blur(50px)",
          pointerEvents: "none",
        }} />

        {/* Diagonal divider accent */}
        <div style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: card.photoSide === "right" ? "56%" : "auto",
          right: card.photoSide === "left" ? "56%" : "auto",
          width: 2,
          background: `linear-gradient(to bottom, transparent 0%, ${card.accentColor}44 50%, transparent 100%)`,
          transform: "skewX(-6deg)",
          pointerEvents: "none",
        }} />

        {/* Content row */}
        <div
          style={{
            display: "flex",
            flexDirection: card.photoSide === "right" ? "row" : "row-reverse",
            minHeight: 480,
            opacity: animating ? 0 : 1,
            transform: animating
              ? `translateX(${dir === "right" ? "-24px" : "24px"})`
              : "translateX(0)",
            transition: "opacity 0.28s ease, transform 0.28s ease",
          }}
        >
          {/* Text block */}
          <div style={{
            flex: "0 0 58%",
            display: "flex",
            flexDirection: "column",
            padding: "28px 24px 28px 28px",
            position: "relative",
            zIndex: 2,
          }}>

            {/* Label */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                padding: "4px 10px",
                borderRadius: 12,
                background: card.labelBg,
                color: card.labelTextColor,
                fontFamily: "Montserrat, sans-serif",
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.14em",
              }}>
                <Icon name={card.labelIcon} size={10} fallback="Star" />
                {card.label}
              </div>
              <div style={{
                flex: 1,
                height: 1,
                background: `linear-gradient(to right, ${card.accentColor}55, transparent)`,
              }} />
            </div>

            {/* Headline */}
            <div style={{ marginBottom: 14 }}>
              <h1 style={{
                fontFamily: "Oswald, sans-serif",
                fontSize: "clamp(20px, 4vw, 27px)",
                fontWeight: 700,
                color: "#ffffff",
                lineHeight: 1.1,
                textTransform: "uppercase",
                letterSpacing: "-0.01em",
                margin: 0,
              }}>
                {card.headline}
              </h1>
              <h1 style={{
                fontFamily: "Oswald, sans-serif",
                fontSize: "clamp(20px, 4vw, 27px)",
                fontWeight: 700,
                color: card.accentColor,
                lineHeight: 1.1,
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
                fontSize: 12,
                color: "rgba(255,255,255,0.68)",
                lineHeight: 1.55,
                marginBottom: 14,
                margin: "0 0 14px 0",
              }}>
                {card.subtext}
              </p>
            )}

            {/* Badges */}
            {"badges" in card && card.badges && (
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
                {card.badges.map((b, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: card.accentColor,
                      flexShrink: 0,
                    }} />
                    <span style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: 12,
                      color: "rgba(255,255,255,0.82)",
                      fontWeight: 500,
                    }}>
                      {b}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Icons row */}
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
              {card.icons.map((ic, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: "rgba(255,255,255,0.09)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.13)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <Icon name={ic.name} size={17} style={{ color: card.accentColor }} fallback="Circle" />
                  </div>
                  <span style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: 8,
                    color: "rgba(255,255,255,0.45)",
                    textAlign: "center",
                    lineHeight: 1.2,
                    maxWidth: 44,
                  }}>
                    {ic.text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            {"cta" in card && card.cta && (
              <button
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 22px",
                  borderRadius: 16,
                  background: card.accentColor,
                  color: "#1a2e00",
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  letterSpacing: "0.02em",
                  boxShadow: `0 8px 28px ${card.accentColor}55`,
                  alignSelf: "flex-start",
                  transition: "transform 0.15s, box-shadow 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.04)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 12px 36px ${card.accentColor}77`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 8px 28px ${card.accentColor}55`;
                }}
              >
                {card.cta}
                <Icon name="ArrowRight" size={15} fallback="ChevronRight" />
              </button>
            )}

            {/* Big card number watermark */}
            <div style={{
              position: "absolute",
              bottom: 12,
              left: card.photoSide === "right" ? 20 : "auto",
              right: card.photoSide === "left" ? 20 : "auto",
              fontFamily: "Oswald, sans-serif",
              fontSize: 88,
              fontWeight: 700,
              color: "rgba(255,255,255,0.035)",
              lineHeight: 1,
              userSelect: "none",
              pointerEvents: "none",
              zIndex: 0,
            }}>
              0{card.id}
            </div>
          </div>

          {/* Photo block */}
          <div style={{ flex: "0 0 42%", position: "relative", overflow: "hidden" }}>
            <img
              src={card.photo}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
              }}
            />
            {/* Side gradient mask */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: card.photoSide === "right"
                ? "linear-gradient(to right, rgba(0,0,0,0.55) 0%, transparent 55%)"
                : "linear-gradient(to left, rgba(0,0,0,0.55) 0%, transparent 55%)",
            }} />
            {/* Bottom fade */}
            <div style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 90,
              background: "linear-gradient(to top, rgba(0,0,0,0.45), transparent)",
            }} />
          </div>
        </div>

        {/* Noise overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: 0.025,
          pointerEvents: "none",
          borderRadius: "inherit",
        }} />
      </div>

      {/* Navigation */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        marginTop: 20,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.6s ease 0.4s",
      }}>
        {/* Dots */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {cards.map((c, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === active ? 32 : 8,
                height: 8,
                borderRadius: 4,
                background: i === active ? cards[active].accentColor : "rgba(255,255,255,0.18)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "width 0.35s ease, background 0.35s ease",
                boxShadow: i === active ? `0 0 14px ${cards[active].accentColor}88` : "none",
              }}
            />
          ))}
        </div>

        {/* Arrow row */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={() => goTo(active > 0 ? active - 1 : cards.length - 1)}
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.1)",
              cursor: "pointer",
              color: "rgba(255,255,255,0.55)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.14)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.07)"; }}
          >
            <Icon name="ChevronLeft" size={16} />
          </button>

          <span style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: 11,
            color: "rgba(255,255,255,0.28)",
            minWidth: 36,
            textAlign: "center",
          }}>
            {active + 1} / {cards.length}
          </span>

          <button
            onClick={() => goTo(active < cards.length - 1 ? active + 1 : 0)}
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.1)",
              cursor: "pointer",
              color: "rgba(255,255,255,0.55)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.14)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.07)"; }}
          >
            <Icon name="ChevronRight" size={16} />
          </button>
        </div>

        {/* Card labels */}
        <div style={{ display: "flex", gap: 16 }}>
          {cards.map((c, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: 9,
                fontWeight: i === active ? 700 : 400,
                color: i === active ? c.accentColor : "rgba(255,255,255,0.22)",
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
    </div>
  );
}