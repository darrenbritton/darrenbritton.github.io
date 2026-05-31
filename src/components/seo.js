import React from "react";

const DEFAULT_TITLE = "Darren Britton · Hands-On Engineering Leader · CTO, DevAlly";
const DEFAULT_DESC =
  "Darren Britton — hands-on engineering leader, co-founder and CTO of DevAlly. Previously Principal Software Engineer at Shutterstock.";

// Rendered inside a page's `Head` export (Gatsby 5 Head API).
const Seo = ({ title, description }) => (
  <>
    <title>{title || DEFAULT_TITLE}</title>
    <meta name="description" content={description || DEFAULT_DESC} />
    <meta name="keywords" content="Darren Britton, CTO, DevAlly, engineering leader, Shutterstock, accessibility" />
  </>
);

export default Seo;
