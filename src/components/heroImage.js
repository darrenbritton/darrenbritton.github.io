import styled, { css } from 'styled-components'

const HeroImage = styled.div`
  position: relative;
  z-index: 1;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  background-color: #194892;
  background: linear-gradient(270deg,#355e9e,#5478b0,#194892);
  background-size: 600% 600%;
  animation: scroll 30s cubic-bezier(0.4, 0.0, 0.2, 1) infinite;

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
  `}

  ${props => props.fillPage && css`
    width: 100vw;
  `}

  ${props => props.overlay && css`
    &:after {
      background: #292929;
      opacity: 0.3;
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
