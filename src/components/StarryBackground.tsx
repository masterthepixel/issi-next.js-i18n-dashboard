import React from "react";

// Helper to generate random stars
const generateStars = (count: number) =>
  Array.from({ length: count }).map((_, i) => {
    const cx = `${Math.round(Math.random() * 10000) / 100}%`;
    const cy = `${Math.round(Math.random() * 10000) / 100}%`;
    const r = Math.round((Math.random() + 0.5) * 10) / 10;
    let opacity = 1;
    if (i % 19 === 0) opacity = 0.2;
    else if (i % 13 === 0) opacity = 0.4;
    else if (i % 7 === 0) opacity = 0.6;
    else if (i % 3 === 0) opacity = 0.8;
    return <circle key={i} cx={cx} cy={cy} r={r} fill="white" opacity={opacity} />;
  });

export const StarryBackground: React.FC = () => (
  <div
    className="absolute inset-0 w-full h-full pointer-events-none z-0"
    style={{
      background: "linear-gradient(#16161d, #1f1f3a, #3b2f4a)",
      overflow: "hidden",
    }}
  >
    {[0, 1, 2].map((s) => (
      <svg
        key={s}
        className="absolute inset-0 w-full h-full animate-twinkle"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        style={{
          animationDelay: s === 1 ? "-1.32s" : s === 2 ? "-2.64s" : undefined,
        }}
      >
        {generateStars(200)}
      </svg>
    ))}
    {/* Comets */}
    <svg className="absolute inset-0 w-full h-full" width="100%" height="100%" preserveAspectRatio="none">
      <defs>
        <radialGradient id="comet-gradient" cx="0" cy=".5" r="0.5">
          <stop offset="0%" stopColor="rgba(255,255,255,.8)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>
      <g transform="rotate(-135)">
        <ellipse
          className="comet comet-a"
          fill="url(#comet-gradient)"
          cx="0"
          cy="0"
          rx="150"
          ry="2"
        />
      </g>
      <g transform="rotate(20)">
        <ellipse
          className="comet comet-b"
          fill="url(#comet-gradient)"
          cx="100%"
          cy="0"
          rx="150"
          ry="2"
        />
      </g>
      <g transform="rotate(300)">
        <ellipse
          className="comet comet-c"
          fill="url(#comet-gradient)"
          cx="40%"
          cy="100%"
          rx="150"
          ry="2"
        />
      </g>
    </svg>
    <style jsx global>{`
      @keyframes twinkle {
        25% { opacity: 0; }
      }
      .animate-twinkle {
        animation: twinkle 4s ease-in-out infinite;
      }
      .comet {
        transform-origin: center center;
        animation: comet 10s linear infinite;
      }
      .comet-b { animation-delay: -3.3s; }
      .comet-c { animation-delay: -5s; }
      @keyframes comet {
        0%, 40% { transform: translateX(0); opacity: 0; }
        50% { opacity: 1; }
        60%, 100% { transform: translateX(-100vw); opacity: 0; }
      }
    `}</style>
  </div>
);
