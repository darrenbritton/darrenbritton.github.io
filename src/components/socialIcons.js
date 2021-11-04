import React from "react";
import styled, { css } from "styled-components";
import FontAwesome from "react-fontawesome";import { SocialIcon } from 'react-social-icons';

const Base = styled.div`
  margin: 20px 0;
  text-align: center;
`;

const StyledSocialIcon = styled(SocialIcon)`
  width: 20px !important;
  height: 20px !important;
  margin: 5px;
`;

class SocialIcons extends React.Component {
  render() {
    const icons = this.props.urls.map(function (url) {
      return <StyledSocialIcon bgColor='#fff' url={url} />
      ;
    });
    return <Base {...this.props}>{icons}</Base>;
  }
}

export default SocialIcons;
