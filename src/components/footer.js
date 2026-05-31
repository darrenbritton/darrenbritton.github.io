import React from "react";

const Footer = ({ home = false }) => (
  <footer className="foot">
    <div className="wrap">
      <span>© 2026 Darren Britton</span>
      {home ? (
        <a href="#top">
          <span aria-hidden="true">↑</span> Top
        </a>
      ) : (
        <a href="/">
          <span aria-hidden="true">↑</span> Home
        </a>
      )}
    </div>
  </footer>
);

export default Footer;
