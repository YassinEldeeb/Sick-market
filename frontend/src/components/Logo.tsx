import React, { FC } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

interface Props {
  activeMenu: boolean
  setActiveMenu: any
}

const Logo: FC<Props> = ({ activeMenu, setActiveMenu }) => {
  return (
    <StyledBurger>
      <div
        className={`burger ${activeMenu ? 'active' : ''}`}
        onClick={() => {
          setActiveMenu(!activeMenu)
        }}
      >
        <span className={`firstBar ${activeMenu ? 'active' : ''}`}></span>
        <span className={`secondBar ${activeMenu ? 'active' : ''}`}></span>
        <span className={`thirdBar ${activeMenu ? 'active' : ''}`}></span>
      </div>
      <Link to='/' aria-label='Home'>
        <svg
          id='Logo'
          viewBox='0 0 211 43'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
        >
          <path
            d='M67.231 31.288C65.903 31.288 64.615 31.112 63.367 30.76C62.135 30.392 61.143 29.92 60.391 29.344L61.711 26.416C62.431 26.944 63.287 27.368 64.279 27.688C65.271 28.008 66.263 28.168 67.255 28.168C68.359 28.168 69.175 28.008 69.703 27.688C70.231 27.352 70.495 26.912 70.495 26.368C70.495 25.968 70.335 25.64 70.015 25.384C69.711 25.112 69.311 24.896 68.815 24.736C68.335 24.576 67.679 24.4 66.847 24.208C65.567 23.904 64.519 23.6 63.703 23.296C62.887 22.992 62.183 22.504 61.591 21.832C61.015 21.16 60.727 20.264 60.727 19.144C60.727 18.168 60.991 17.288 61.519 16.504C62.047 15.704 62.839 15.072 63.895 14.608C64.967 14.144 66.271 13.912 67.807 13.912C68.879 13.912 69.927 14.04 70.951 14.296C71.975 14.552 72.871 14.92 73.639 15.4L72.439 18.352C70.887 17.472 69.335 17.032 67.783 17.032C66.695 17.032 65.887 17.208 65.359 17.56C64.847 17.912 64.591 18.376 64.591 18.952C64.591 19.528 64.887 19.96 65.479 20.248C66.087 20.52 67.007 20.792 68.239 21.064C69.519 21.368 70.567 21.672 71.383 21.976C72.199 22.28 72.895 22.76 73.471 23.416C74.063 24.072 74.359 24.96 74.359 26.08C74.359 27.04 74.087 27.92 73.543 28.72C73.015 29.504 72.215 30.128 71.143 30.592C70.071 31.056 68.767 31.288 67.231 31.288ZM76.7517 18.088H80.4957V31H76.7517V18.088ZM78.6237 16.288C77.9357 16.288 77.3757 16.088 76.9437 15.688C76.5117 15.288 76.2957 14.792 76.2957 14.2C76.2957 13.608 76.5117 13.112 76.9437 12.712C77.3757 12.312 77.9357 12.112 78.6237 12.112C79.3117 12.112 79.8717 12.304 80.3037 12.688C80.7357 13.072 80.9517 13.552 80.9517 14.128C80.9517 14.752 80.7357 15.272 80.3037 15.688C79.8717 16.088 79.3117 16.288 78.6237 16.288ZM90.2104 31.192C88.8344 31.192 87.5944 30.912 86.4904 30.352C85.4024 29.776 84.5464 28.984 83.9224 27.976C83.3144 26.968 83.0104 25.824 83.0104 24.544C83.0104 23.264 83.3144 22.12 83.9224 21.112C84.5464 20.104 85.4024 19.32 86.4904 18.76C87.5944 18.184 88.8344 17.896 90.2104 17.896C91.5704 17.896 92.7544 18.184 93.7624 18.76C94.7864 19.32 95.5304 20.128 95.9944 21.184L93.0904 22.744C92.4184 21.56 91.4504 20.968 90.1864 20.968C89.2104 20.968 88.4024 21.288 87.7624 21.928C87.1224 22.568 86.8024 23.44 86.8024 24.544C86.8024 25.648 87.1224 26.52 87.7624 27.16C88.4024 27.8 89.2104 28.12 90.1864 28.12C91.4664 28.12 92.4344 27.528 93.0904 26.344L95.9944 27.928C95.5304 28.952 94.7864 29.752 93.7624 30.328C92.7544 30.904 91.5704 31.192 90.2104 31.192ZM103.6 25.936L101.8 27.712V31H98.0564V13.192H101.8V23.272L107.272 18.088H111.736L106.36 23.56L112.216 31H107.68L103.6 25.936ZM137.233 17.896C138.849 17.896 140.129 18.376 141.073 19.336C142.033 20.28 142.513 21.704 142.513 23.608V31H138.769V24.184C138.769 23.16 138.553 22.4 138.121 21.904C137.705 21.392 137.105 21.136 136.321 21.136C135.441 21.136 134.745 21.424 134.233 22C133.721 22.56 133.465 23.4 133.465 24.52V31H129.721V24.184C129.721 22.152 128.905 21.136 127.273 21.136C126.409 21.136 125.721 21.424 125.209 22C124.697 22.56 124.441 23.4 124.441 24.52V31H120.697V18.088H124.273V19.576C124.753 19.032 125.337 18.616 126.025 18.328C126.729 18.04 127.497 17.896 128.329 17.896C129.241 17.896 130.065 18.08 130.801 18.448C131.537 18.8 132.129 19.32 132.577 20.008C133.105 19.336 133.769 18.816 134.569 18.448C135.385 18.08 136.273 17.896 137.233 17.896ZM151.077 17.896C153.077 17.896 154.613 18.376 155.685 19.336C156.757 20.28 157.293 21.712 157.293 23.632V31H153.789V29.392C153.085 30.592 151.773 31.192 149.853 31.192C148.861 31.192 147.997 31.024 147.261 30.688C146.541 30.352 145.989 29.888 145.605 29.296C145.221 28.704 145.029 28.032 145.029 27.28C145.029 26.08 145.477 25.136 146.373 24.448C147.285 23.76 148.685 23.416 150.573 23.416H153.549C153.549 22.6 153.301 21.976 152.805 21.544C152.309 21.096 151.565 20.872 150.573 20.872C149.885 20.872 149.205 20.984 148.533 21.208C147.877 21.416 147.317 21.704 146.853 22.072L145.509 19.456C146.213 18.96 147.053 18.576 148.029 18.304C149.021 18.032 150.037 17.896 151.077 17.896ZM150.789 28.672C151.429 28.672 151.997 28.528 152.493 28.24C152.989 27.936 153.341 27.496 153.549 26.92V25.6H150.981C149.445 25.6 148.677 26.104 148.677 27.112C148.677 27.592 148.861 27.976 149.229 28.264C149.613 28.536 150.133 28.672 150.789 28.672ZM164.257 19.792C164.705 19.168 165.305 18.696 166.057 18.376C166.825 18.056 167.705 17.896 168.697 17.896V21.352C168.281 21.32 168.001 21.304 167.857 21.304C166.785 21.304 165.945 21.608 165.337 22.216C164.729 22.808 164.425 23.704 164.425 24.904V31H160.681V18.088H164.257V19.792ZM176.468 25.936L174.668 27.712V31H170.924V13.192H174.668V23.272L180.14 18.088H184.604L179.228 23.56L185.084 31H180.548L176.468 25.936ZM198.853 24.592C198.853 24.64 198.829 24.976 198.781 25.6H189.013C189.189 26.4 189.605 27.032 190.261 27.496C190.917 27.96 191.733 28.192 192.709 28.192C193.381 28.192 193.973 28.096 194.485 27.904C195.013 27.696 195.501 27.376 195.949 26.944L197.941 29.104C196.725 30.496 194.949 31.192 192.613 31.192C191.157 31.192 189.869 30.912 188.749 30.352C187.629 29.776 186.765 28.984 186.157 27.976C185.549 26.968 185.245 25.824 185.245 24.544C185.245 23.28 185.541 22.144 186.133 21.136C186.741 20.112 187.565 19.32 188.605 18.76C189.661 18.184 190.837 17.896 192.133 17.896C193.397 17.896 194.541 18.168 195.565 18.712C196.589 19.256 197.389 20.04 197.965 21.064C198.557 22.072 198.853 23.248 198.853 24.592ZM192.157 20.728C191.309 20.728 190.597 20.968 190.021 21.448C189.445 21.928 189.093 22.584 188.965 23.416H195.325C195.197 22.6 194.845 21.952 194.269 21.472C193.693 20.976 192.989 20.728 192.157 20.728ZM209.673 30.376C209.305 30.648 208.849 30.856 208.305 31C207.777 31.128 207.217 31.192 206.625 31.192C205.089 31.192 203.897 30.8 203.049 30.016C202.217 29.232 201.801 28.08 201.801 26.56V21.256H199.809V18.376H201.801V15.232H205.545V18.376H208.761V21.256H205.545V26.512C205.545 27.056 205.681 27.48 205.953 27.784C206.241 28.072 206.641 28.216 207.153 28.216C207.745 28.216 208.249 28.056 208.665 27.736L209.673 30.376Z'
            fill='white'
          />
          <path
            d='M40.3458 26.8422C40.1219 27.8154 40.0508 29.7258 41.5572 29.5816C41.8618 28.791 41.6195 28.2431 40.3458 26.8422Z'
            fill='#2FA3E3'
          />
          <ellipse
            rx='2.89623'
            ry='3.10853'
            transform='matrix(0.986065 0.166361 -0.165764 0.986165 34.9898 37.0247)'
            fill='white'
          />
          <ellipse
            rx='2.89623'
            ry='3.10853'
            transform='matrix(0.986065 0.166361 -0.165764 0.986165 18.6707 34.2714)'
            fill='white'
          />
          <path
            d='M16.9138 25.0852C15.8264 24.9017 14.9873 24.0275 14.8484 22.9333L13.3139 10.8464C13.1028 9.18339 14.5554 7.78863 16.2081 8.06748L49.948 13.7598C51.7182 14.0585 52.6071 16.0703 51.6357 17.5795L44.768 28.2489C44.227 29.0893 43.2373 29.5263 42.2515 29.36L16.9138 25.0852ZM12.4585 1.12995C13.5593 1.31567 14.4041 2.20883 14.5283 3.31845L16.9871 25.2744C17.1114 26.384 17.9561 27.2771 19.0569 27.4629L39.8226 30.9663C41.2824 31.2126 42.0215 32.8659 41.2313 34.1174C40.7855 34.8235 39.9592 35.1926 39.1356 35.0537L15.3425 31.0395C14.2447 30.8543 13.4012 29.9652 13.2737 28.859L10.7398 6.8747C10.6123 5.76845 9.76881 4.87944 8.67093 4.69422L8.01121 4.58291C7.15667 4.43874 6.48176 3.77802 6.31932 2.92659C6.0487 1.50817 7.27465 0.255366 8.69825 0.495546L12.4585 1.12995Z'
            fill='white'
          />
          <path
            d='M40.8173 31.4541C40.2191 32.2531 39.3818 33.971 40.8173 34.4504C41.4155 33.8511 41.4155 33.2519 40.8173 31.4541Z'
            fill='#2FA3E3'
          />
          <rect
            width='43.0686'
            height='9.58753'
            transform='matrix(0.986065 0.166361 -0.165764 0.986165 10.4678 8.08623)'
            fill='url(#pattern0)'
          />
          <path
            d='M45.6023 30.2556C46.8588 30.7211 48.4672 31.5126 47.8641 33.7472C46.8588 33.9799 45.6023 34.1661 45.6023 30.2556Z'
            fill='#00B2D8'
          />
          <path
            d='M44.406 33.8511C45.6626 34.3166 47.2709 35.1081 46.6678 37.3427C45.6626 37.5754 44.406 37.7616 44.406 33.8511Z'
            fill='#00B2D8'
          />
          <path
            d='M47.9951 33.8511C49.2517 34.3166 50.86 35.1081 50.2569 37.3427C49.2517 37.5754 47.9951 37.7616 47.9951 33.8511Z'
            fill='#00B2D8'
          />
          <line
            y1='-0.05'
            x2='2.39514'
            y2='-0.05'
            transform='matrix(0.647733 0.761868 -0.760684 0.649122 41.5571 35.4268)'
            stroke='#E5E5E5'
            strokeWidth='0.1'
          />
          <line
            y1='-0.05'
            x2='2.39462'
            y2='-0.05'
            transform='matrix(-0.73413 -0.679009 0.677655 -0.73538 48.4287 30.7769)'
            stroke='#E5E5E5'
            strokeWidth='0.1'
          />
          <line
            y1='-0.05'
            x2='2.39514'
            y2='-0.05'
            transform='matrix(0.647733 0.761868 -0.760684 0.649122 41.9717 37.2119)'
            stroke='#E5E5E5'
            strokeWidth='0.1'
          />
          <line
            y1='-0.05'
            x2='2.39462'
            y2='-0.05'
            transform='matrix(-0.73413 -0.679009 0.677655 -0.73538 47.8035 29.0542)'
            stroke='#E5E5E5'
            strokeWidth='0.1'
          />
          <circle cx='48.5' cy='33.5' r='0.5' fill='#00B2D8' />
          <circle cx='47' cy='38' r='1' fill='#00B2D8' />
          <circle cx='51.5' cy='31.5' r='1.5' fill='#00B2D8' />
          <defs>
            <pattern
              id='pattern0'
              patternContentUnits='objectBoundingBox'
              width='1'
              height='1'
            >
              <use
                xlinkHref='#image0'
                transform='translate(0 -0.000102227) scale(0.00195312 0.00877372)'
              />
            </pattern>
            <image
              id='image0'
              width='512'
              height='114'
              xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAByCAQAAACPBKGSAAAAAnNCSVQICFXsRgQAAAACYktHRAAAqo0jMgAABDBJREFUeJzt3T2IXFUUB/Az+xXNRgwoJAbBVjEWCklhYWGjCAYbRRRU0EYhWIiKlVZiYWdAUgsRIaCFoIUgksomYLOFYgQVPxAsVmOWqDtWNrL3znjfvH0zc36/LS/nvZv7Hv83O3lnbwQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwc6Oej39fPBZXez4H5LUR78bH7eVrs5vJnk7GEz2fAXK71CUAVmY3jz391fPxIbu/uxT3HQDAHBMAkJgAgMQEACQmACAxAQCJCQBITABAYgIAEhMAkJgAgMT6bgbqu9twDrwYLxQbHkfxS9xVrHwzHo8/C2MrcSnu6Ty35fZO3Ft8EX41LsaDxcoP4kSl8kI82nlui6LvALgS3xbv8fmyGUfbCg/HkcrogcrYjdVTXmmbTiJH4lhl9MfK2NFqZeONsJCmC4BH4r3G438WtzRW7reH4v22wnF1dLdxbNIoXdbPyv9ruu8A2hsOO7Uq7qsbhp4A7L/pAqD+kAMWlP8FgMQEACQmACAxAQCJCQBITABAYgIAEhMAkJgAgMSmC4D2lqG+m41mp3mm9cL11sN2qMyivvK10XrlasNcBtRputO16x6P001bfK7GVpxpqBvCiXim8m+8Gs+XFvqBOFVseBzF73FbYWwlvq/snDaK7bi90payVml2nUPbcTaubagbx8F4ujT4bNxRbDYZxW9xvLC+a7EVm5X323fi1kLlgTgdX5dn258f4lxcs+fIepyPT/Z5NintxLjtp+x8c+V4PG6czUA/33VY+cZznqqs3VPVypcqlXcPs35fzOw+/g/fAQwoUY9V+x+Guam1sPYxv/6puTbZgVqFe/vDOgIAEhMAkJgAgMQEACQmACAxAQCJCQBITABAYgIAEhMA00qwydlyab9gc3ipe5vS4nTrDW03Su/uNl+cya+Vll8WnsObtB8bUV6GiYtQumD1wnGlsscn5iAXO8191KPX4tW2wjPxZGVz0G/izmr1VhwrRshGvBWvtE2qHz+1v9Nf8VHc38NRh/F2PDfEaX0C6K65H3szDlVH666L6yujBxvm09lXcXnPR8pK/NzL+Zbp8TXQL+MCoLvm27DeDTipV7BbdS8e7q9tdekNFGa+BGR2bh56AvxfAgASEwCQmACAxAQAJCYAIDEBAIkJAEhMAEBiAgASEwCQmADorrmfor7958aE6vr4IE0e+72f6TLtnzpQV45moO4+jD+KXb3jGMcbpcJz8WVxe9CV+HXCaV+PQ8WWn/W4MKG6yU68XGlS3IiLfZy04mx8WtwddLGsxefDnHiZGirn1fJsAbhd7UBmAfkVgOl5XCwdAQCJCQBITABAYgIAEhMAkJgAgMQEACQmACAxAQCJCQCm503ApaMZqH87sbsU/QCjuDz0FAAAAAAAAAAAAAAAAAAAAAAAltg/tyLQx5NtrPYAAAAASUVORK5CYII='
            />
          </defs>
        </svg>{' '}
      </Link>
    </StyledBurger>
  )
}
const StyledBurger = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .burger {
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 0.25rem;
    z-index: 11;
    transition: 0.3s ease;
    &.active {
      transform: rotate(90deg);
    }
    span {
      display: block;
      height: 0.26rem;
      width: 2.8rem;
      background: white;
      margin: 0.18rem 0;
      border-radius: 2px;
      transition: all 0.2s ease;
    }
    .firstBar.active {
      transform: translate(0%, 300%) rotate(-45deg);
    }
    .secondBar.active {
      opacity: 0;
    }
    .thirdBar.active {
      transform: translate(0%, -210%) rotate(45deg);
    }
    @media screen and (max-height: 650px) and (max-width: 1050px) {
      .firstBar.active {
        width: 1.95rem !important;
      }
      .secondBar.active {
        width: 1.95rem !important;
      }
      .thirdBar.active {
        width: 1.95rem !important;
      }
    }
  }
`

export default Logo
