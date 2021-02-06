import React, { useState, useEffect } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { LastLocationProvider } from "react-router-last-location"
import Global from "./components/GlobalStyles"
import Home from "./pages/Home"
import Nav from "./components/Nav"
import ProductDetail from "./pages/ProductDetail"
import Description from "./pages/Description"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import { useDispatch, useSelector } from "react-redux"
import checkToken from "./actions/checkToken"
import Register from "./pages/Register"
import Verify from "./pages/Verify"
import ChangeEmail from "./pages/changeEmail"
import EditProfile from "./pages/edit-profile"
import ChangePassword from "./pages/changePassword"
import NotFound from "./pages/notFound"

const App = () => {
  const savedCart = JSON.parse(localStorage.getItem("sickCartProducts"))
  const [activeMenu, setActiveMenu] = useState(false)
  const [scrolled, setScrolled] = useState(0)

  const qtyArr = savedCart ? savedCart.map((each) => each.qty) : []
  let initialCartValue = undefined
  if (savedCart && qtyArr.length !== 0) {
    initialCartValue = qtyArr.reduce((acc, product) => acc + product)
  }

  const [cartCount, setCartCount] = useState(
    initialCartValue ? initialCartValue : 0
  )
  document.body.style.overflow = activeMenu ? "hidden" : "auto"
  const dispatch = useDispatch()
  const { loading, validToken, user, token } = useSelector(
    (state) => state.userInfo
  )

  useEffect(() => {
    if (token && !loading && !validToken) {
      dispatch(checkToken(token))
    }
  }, [dispatch, token, loading, validToken])

  const [slider, setSlider] = useState(false)

  return (
    <div className='App'>
      <BrowserRouter>
        <LastLocationProvider>
          <Global />
          <Nav
            cartCount={cartCount}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />
          <Switch>
            <Route path='/' exact>
              <Home scrolled={scrolled} setScrolled={setScrolled} />
            </Route>
            <Route path='/products/:id'>
              <ProductDetail
                cartCount={cartCount}
                setCartCount={setCartCount}
              />
            </Route>
            <Route path='/product-description/:id'>
              <Description />
            </Route>
            <Route path='/cart'>
              <Cart cartCount={cartCount} setCartCount={setCartCount} />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/register'>
              <Register />
            </Route>
            <Route path='/verify'>
              <Verify />
            </Route>
            <Route path='/changeEmail'>
              <ChangeEmail />
            </Route>
            <Route path='/account/edit-profile'>
              <EditProfile slider2={slider} setSlider2={setSlider} />
            </Route>
            <Route path='/account/change-password'>
              <ChangePassword slider={slider} setSlider={setSlider} />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </LastLocationProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
