import { css } from 'styled-components'

export const media = {
  ws: (...args) => css`
    @media (max-width: 280px) {
      ${ css(...args) }
    }
  `,
  xs: (...args) => css`
    @media (max-width: 767px) {
      ${ css(...args) }
    }
  `,
  sm: (...args) => css`
    @media (max-width: 991px) {
      ${ css(...args) }
    }
  `,
  md: (...args) => css`
    @media (max-width: 1199px) {
      ${ css(...args) }
    }
  `,
  lg: (...args) => css`
    @media (min-width: 1200px) {
      ${ css(...args) }
    }
  `
}
