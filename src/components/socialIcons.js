import React from "react";
import styled, { css } from "styled-components";
import { SocialIcon } from "react-social-icons";

const Base = styled.div`
  margin: 20px 0;
  text-align: center;
`;

const StyledSocialIcon = styled(SocialIcon)`
  width: 35px !important;
  height: 35px !important;
  & .social-svg-mask {
    display: none;
  }
`;

class SocialIcons extends React.Component {
  render() {
    const icons = this.props.urls.map(function (url) {
      return <StyledSocialIcon fgColor="#fff" url={url} />;
    });
    return <Base {...this.props}>{icons}</Base>;
  }
}

export default SocialIcons;
