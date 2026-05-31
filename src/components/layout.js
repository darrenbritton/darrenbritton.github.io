import React from "react";

import NavBar from "./navbar";
import Footer from "./footer";

const Layout = ({ location, children }) => {
  const pathname = location && location.pathname ? location.pathname : "/";
  const isHome = pathname === "/";
  return (
    <>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <NavBar home={isHome} />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer home={isHome} />
    </>
  );
};

export default Layout;
