import React, { FC } from 'react'
import Meta from '../components/Meta'
import ProductList from '../components/ProductList'

interface Props {
  scrollPosition: number
  setScrollPosition: any
}

const Home: FC<Props> = ({ scrollPosition, setScrollPosition }) => {
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
