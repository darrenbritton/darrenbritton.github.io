import React, { useEffect, useRef } from "react";

import ThemeToggle from "./themeToggle";
import MotionToggle from "./motionToggle";

const LINKS = [
  { ix: "01", label: "About", hash: "#about" },
  { ix: "02", label: "DevAlly", hash: "#devally" },
  { ix: "03", label: "Experience", hash: "#experience" },
  { ix: "04", label: "Contact", hash: "#contact" },
];

// `home` => anchors are same-page (#about); otherwise they point back to the
// homepage (/#about) and the wordmark returns home.
const NavBar = ({ home = false }) => {
  const prefix = home ? "" : "/";
  const brandHref = home ? "#top" : "/";
  const navRef = useRef(null);

  // Quiet nav: slides away while reading downward, returns on the first
  // upward scroll. Skipped entirely when motion is off; CSS :focus-within
  // keeps it pinned for keyboard users either way.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return undefined;
    let lastY = window.scrollY;
    const onScroll = () => {
      if (document.documentElement.getAttribute("data-motion") === "off") {
        nav.classList.remove("nav-hidden");
        lastY = window.scrollY;
        return;
      }
      const y = window.scrollY;
      if (y > lastY && y > 260) nav.classList.add("nav-hidden");
      else if (y < lastY - 2) nav.classList.remove("nav-hidden");
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="nav" aria-label="Primary" ref={navRef}>
      <div className="wrap">
        <a href={brandHref} className="name">
          <span className="dot" aria-hidden="true" />
          <span className="wm">
            Darren <span className="wm-last">Britton</span>
          </span>
        </a>
        <div className="nav-right">
          <div className="links">
            {LINKS.map((l) => (
              <a key={l.ix} href={`${prefix}${l.hash}`}>
                <span className="ix">{l.ix}</span>
                {l.label}
              </a>
            ))}
          </div>
          <MotionToggle />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
