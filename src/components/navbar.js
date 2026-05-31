import React from "react";

import ThemeToggle from "./themeToggle";

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
  return (
    <nav className="nav" aria-label="Primary">
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
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
