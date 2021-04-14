import React, { useEffect } from 'react'
import Product from '../components/Product'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { productListAction } from '../actions/products'
import Loader from '../components/loader'
import Message from '../components/message'

const ProductList = ({ setScrolled, loadedImages, setLoadedImages }) => {
  const dispatch = useDispatch()

  const { products, error, loading } = useSelector((state) => state.productList)

  useEffect(() => {
    if (!products) dispatch(productListAction())
  }, [dispatch])
  return (
    <StyledList>
      <h1 className='title'>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : !error && products ? (
        <div className='productList'>
          {products.map((each) => (
            <Product data={each} key={each._id} setScrolled={setScrolled} />
          ))}
        </div>
      ) : error ? (
        <Message
          msg={
            error.includes('timed out')
              ? 'Network Error'
              : error.includes('mongo')
              ? 'Server Error'
              : error
          }
          type='error'
        />
      ) : (
        ''
      )}
    </StyledList>
  )
}
const StyledList = styled.div`
  padding: calc(0.8rem + 1vw) 0;
  width: 90%;
  margin: 0 auto;

  .title {
    font-size: calc(1.5rem + 1vw);
    font-weight: 500;
    padding-bottom: calc(0.7rem + 0.5vw);
    color: #1a1a1a;
  }
  .productList {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(calc(200px + 5vw), 1fr));
    grid-gap: calc(0.5rem + 0.8vw);
    @media screen and (max-width: 400px) {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)) !important;
    }
  }
`

export default ProductList
