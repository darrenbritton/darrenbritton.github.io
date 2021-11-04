import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import Footer from "./footer";

const Body = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  width: 100vw;

  img {
    margin-bottom: 0;
  }
`;

const Content = styled.div`
  flex: 1;
`;

const PageBase = ({ location, children }) => {
  return (
    <Body>
      <Helmet
        title="Darren Britton"
        meta={[
          { name: "description", content: "portfolio" },
          { name: "keywords", content: "darren, britton, portfolio" },
          { name: "viewport", content: "width=device-width, initial-scale=1" },
        ]}
      />
      <Content>{children}</Content>
      {location && location.pathname != "/404" && <Footer />}
    </Body>
  );
};

export default PageBase;
