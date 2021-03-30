import React, { useEffect } from "react"
import { useLocation } from "react-router-dom"
import Goback from "../components/Goback"
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux"
import Message from "../components/message"
import Loader from "../components/loader"
import { productDetailAction } from "../actions/products"

const Description = () => {
  const dispatch = useDispatch()

  const location = useLocation()
  const Id = location.pathname.split("/")[2]
  const { product, error, loading } = useSelector((state) => state.product)
  useEffect(() => {
    if (!product) dispatch(productDetailAction(Id))
  }, [dispatch, Id])
  return (
    <StyledDesc>
      <Goback toPath={`/products/${Id}`} />
      {error && (
        <Message
          type='error'
          msg={
            error.includes("timed out")
              ? "Network Error"
              : error.includes("mongo")
              ? "Server Error"
              : error
          }
        />
      )}
      {loading && <Loader />}
      {product && (
        <div className='description'>
          <h1>Description:</h1>
          <p>{product.description}</p>
        </div>
      )}
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
