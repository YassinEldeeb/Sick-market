import React, { FC } from 'react'
import styled from 'styled-components'

interface Props {
  reference?: () => any
  providedClassName?: string
}

const Loader: FC<Props> = ({ reference, providedClassName }) => {
  return (
    <StyledLoader
      className={`providedLoader ${providedClassName ? providedClassName : ''}`}
      ref={reference ? reference : null}
    >
      <svg
        id='loader'
        viewBox='0 0 699 699'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g id='loader'>
          <g id='greybackground'>
            <mask id='path-1-inside-1' fill='white'>
              <path d='M4.66747 353.779C3.74434 285.654 23.0432 218.786 60.1236 161.629C97.2041 104.473 150.401 59.5958 212.986 32.6728C275.572 5.74982 344.736 -2.00978 411.731 10.3753C478.727 22.7603 540.545 54.7338 589.37 102.252L532.538 160.646C495.263 124.367 448.067 99.9571 396.919 90.5016C345.771 81.0462 292.967 86.9703 245.186 107.525C197.405 128.079 156.792 162.341 128.482 205.977C100.173 249.614 85.4392 300.665 86.144 352.675L4.66747 353.779Z' />
            </mask>
            <path
              d='M4.66747 353.779C3.74434 285.654 23.0432 218.786 60.1236 161.629C97.2041 104.473 150.401 59.5958 212.986 32.6728C275.572 5.74982 344.736 -2.00978 411.731 10.3753C478.727 22.7603 540.545 54.7338 589.37 102.252L532.538 160.646C495.263 124.367 448.067 99.9571 396.919 90.5016C345.771 81.0462 292.967 86.9703 245.186 107.525C197.405 128.079 156.792 162.341 128.482 205.977C100.173 249.614 85.4392 300.665 86.144 352.675L4.66747 353.779Z'
              stroke='#343A40'
              strokeWidth='128'
              mask='url(#path-1-inside-1)'
            />
          </g>
        </g>
      </svg>
    </StyledLoader>
  )
}
const StyledLoader = styled.div`
  display: grid;
  place-items: center;
`

export default Loader
