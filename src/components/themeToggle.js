import React, { useEffect, useState } from "react";

// Dark/light toggle. Persists the choice, follows the system preference until
// the user explicitly picks. The pre-paint script in gatsby-ssr.js sets the
// initial data-theme so there's no flash; this only mirrors + flips it.
const ThemeToggle = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    setDark(root.getAttribute("data-theme") === "dark");

    const mq = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
    const onSystem = (e) => {
      if (!localStorage.getItem("db-theme")) {
        const next = e.matches ? "dark" : "light";
        root.setAttribute("data-theme", next);
        setDark(next === "dark");
      }
    };
    if (mq) mq.addEventListener("change", onSystem);
    return () => {
      if (mq) mq.removeEventListener("change", onSystem);
    };
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("db-theme", next);
    } catch (e) {
      /* storage unavailable — toggle still works for the session */
    }
    setDark(next === "dark");
  };

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggle}
      aria-pressed={dark}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className="ico" aria-hidden="true" />
    </button>
  );
};

export default ThemeToggle;
