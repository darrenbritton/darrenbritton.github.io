import React, { useEffect, useState } from "react";

// Site-wide animation switch (WCAG 2.3.3 / 2.2.2). The pre-paint script in
// gatsby-ssr.js seeds html[data-motion] from the saved choice, falling back
// to prefers-reduced-motion; this button flips and persists it. Every
// animation system (GSAP, the WebGL hero, the ticker) watches the attribute.
const MotionToggle = () => {
  const [on, setOn] = useState(true);

  useEffect(() => {
    setOn(document.documentElement.getAttribute("data-motion") !== "off");
  }, []);

  const toggle = () => {
    const next = on ? "off" : "on";
    document.documentElement.setAttribute("data-motion", next);
    try {
      localStorage.setItem("db-motion", next);
    } catch (e) {
      /* storage unavailable: still applies for the session */
    }
    setOn(!on);
  };

  return (
    <button
      className="motion-toggle"
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? "Pause all animation" : "Play animation"}
    >
      <svg
        className="wave"
        viewBox="0 0 20 14"
        width="20"
        height="14"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M1 7h3l2.5-5L11 12l2.5-5H19"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="slash" aria-hidden="true" />
    </button>
  );
};

export default MotionToggle;
