import React from "react";

// Set the theme before first paint: saved choice, else system preference.
// Mirrors the inline <head> script from the design so there's no light/dark flash.
const themeInit = `(function(){try{var s=localStorage.getItem('db-theme');var m=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.setAttribute('data-theme',s||m);}catch(e){}})();`;

export const onRenderBody = ({ setHtmlAttributes, setHeadComponents, setPreBodyComponents }) => {
  setHtmlAttributes({ lang: "en", "data-theme": "light" });
  setHeadComponents([
    <link key="gf-pre1" rel="preconnect" href="https://fonts.googleapis.com" />,
    <link key="gf-pre2" rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />,
    <link
      key="gf-ibm-plex-mono"
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap"
    />,
    // Reveal classes ship in the SSR markup (so there's no flash of hidden
    // content before JS adds them); without JS the IntersectionObserver never
    // fires, so force the revealed state for no-JS visitors.
    <noscript
      key="reveal-noscript"
      dangerouslySetInnerHTML={{
        __html: "<style>.reveal{opacity:1 !important;transform:none !important}</style>",
      }}
    />,
  ]);
  setPreBodyComponents([
    <script key="theme-init" dangerouslySetInnerHTML={{ __html: themeInit }} />,
  ]);
};
