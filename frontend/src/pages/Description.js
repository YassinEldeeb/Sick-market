import React from "react"
import { useLocation } from "react-router-dom"
import Goback from "../components/Goback"
import styled from "styled-components"
import { useSelector } from "react-redux"

const Description = () => {
  const location = useLocation()
  const Id = location.pathname.split("/")[2]
  const { product } = useSelector((state) => state.product)
  return (
    <StyledDesc>
      <Goback toPath={`/products/${Id}`} />
      <div className='description'>
        <h1>Description:</h1>
        <p>{product.description}</p>
      </div>
    </StyledDesc>
  )
}
const StyledDesc = styled.div`
  width: 90%;
  margin: 0 auto;
  display: none;

  .description {
    h1 {
      font-size: calc(1.8rem + 1vw);
      color: #1a1a1a;
      margin-top: 0.5rem;
      margin-bottom: 0.2rem;
      font-weight: 500;
    }
    p {
      font-size: calc(0.8rem + 1vw);
      color: #1a1a1a;
    }
  }
  @media screen and (max-width: 1050px) {
    display: block;
  }
`

export default Description
