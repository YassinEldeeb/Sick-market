import React, { useEffect } from "react"
import ProductList from "../components/ProductList"

const Home = ({ scrolled, setScrolled }) => {
  useEffect(() => {
    window.scroll({
      top: scrolled,
      left: 0,
    })
  }, [])
  return (
    <>
      <ProductList setScrolled={setScrolled} />
    </>
  )
}

export default Home
