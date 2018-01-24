import styled, { css } from 'styled-components'

const HeroImage = styled.div`
  position: relative;
  z-index: 1;
  margin: 0;
  padding: 0;
  width: 100%;
  padding-top: 100%;
  background-color: #194892;
  background: linear-gradient(270deg,#355e9e,#5478b0,#194892);
  background-size: 600% 600%;
  animation: scroll 30s cubic-bezier(0.4, 0.0, 0.2, 1) infinite;

  button {
    position: absolute;
    bottom: 5%;
    left: 15%;
  }

@keyframes scroll {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

  ${props => props.img && css`
    animation: unset;
    background-image: url(${props => props.img});
    background-repeat: no-repeat;
    background-size: cover;
    image-rendering: -webkit-optimize-contrast;
  `}

  ${props => props.fillPage && css`
    padding-top: 0;
    width: 100vw;
    height: 100vh;
  `}

  ${props => props.overlay && css`
    &:after {
      background: #292929;
      opacity: 0.4;
      content: "";
      width: 100%;
      height: auto;
      position: absolute;
      z-index: -1;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
    }
  `}
`

export default HeroImage
