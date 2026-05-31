import React from "react";

import Layout from "../components/layout";
import Seo from "../components/seo";

const PageNotFound = ({ location }) => (
  <Layout location={location}>
    <section className="notfound">
      <div className="wrap">
        <div className="code">Error 404</div>
        <h1>This page wandered off.</h1>
        <p>
          The link is broken or the page has moved. Let&apos;s get you back to
          something that exists.
        </p>
        <a className="home" href="/">
          <span aria-hidden="true">←</span> Back to home
        </a>
      </div>
    </section>
  </Layout>
);

export default PageNotFound;

export const Head = () => <Seo title="404 · Page Not Found · Darren Britton" />;
