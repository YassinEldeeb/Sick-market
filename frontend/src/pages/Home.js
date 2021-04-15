import React, { useEffect } from 'react'
import Meta from '../components/Meta'
import ProductList from '../components/ProductList'

const Home = ({ scrolled, setScrolled }) => {
  useEffect(() => {
    window.scroll({
      top: scrolled,
      left: 0,
    })
  }, [scrolled])
  return (
    <>
      <Meta title='Welcome to Sick Market' ogTitle='Welcome to Sick Market' />
      <ProductList setScrolled={setScrolled} />
    </>
  )
}

export default Home
