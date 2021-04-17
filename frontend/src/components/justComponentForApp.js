import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const JustComponentForApp = () => {
  const location = useLocation()
  const productList = useSelector((state) => state.productList)

  useEffect(() => {
    productList.loading = false
    productList.success = false
  }, [location.pathname])

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
    })
  }, [location.pathname])

  return <p></p>
}

export default JustComponentForApp
