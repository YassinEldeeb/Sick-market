import React from 'react'
import Meta from '../components/Meta'
import ProductList from '../components/ProductList'

const Home = ({ scrollPosition, setScrollPosition }) => {
  return (
    <>
      <Meta title='Welcome to Sick Market' ogTitle='Welcome to Sick Market' />
      <ProductList
        scrollPosition={scrollPosition}
        setScrollPosition={setScrollPosition}
      />
    </>
  )
}

export default Home
