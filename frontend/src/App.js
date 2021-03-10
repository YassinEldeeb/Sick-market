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
import Shipping from "./pages/Shipping"
import Payment from "./pages/Payment"
import PlaceOrder from "./pages/PlaceOrder"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import OrderDetails from "./pages/orderDetails"
import MyOrders from "./pages/MyOrders"
import Dashboard from "./pages/Dashboard"
import DashboardOrders from "./pages/DashboardCustomers"

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
  const { loading, validToken, token } = useSelector((state) => state.userInfo)

  useEffect(() => {
    if (token && !loading && !validToken) {
      dispatch(checkToken(token))
    }
  }, [dispatch, token, loading, validToken])

  return (
    <div className='App'>
      <BrowserRouter>
        <LastLocationProvider>
          <Global />
          <Switch>
            <Route path='/' exact>
              <Nav
                cartCount={cartCount}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
              />
              <Home scrolled={scrolled} setScrolled={setScrolled} />
            </Route>
            <Route path='/products/:id'>
              <Nav
                cartCount={cartCount}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
              />
              <ProductDetail
                cartCount={cartCount}
                setCartCount={setCartCount}
              />
            </Route>
            <Route path='/product-description/:id'>
              <Nav
                cartCount={cartCount}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
              />
              <Description />
            </Route>
            <Route path='/cart'>
              <Nav
                cartCount={cartCount}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
              />
              <Cart cartCount={cartCount} setCartCount={setCartCount} />
            </Route>
            <Route path='/login'>
              <Nav
                cartCount={cartCount}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
              />
              <Login />
            </Route>
            <Route path='/forgotPassword'>
              <Nav
                cartCount={cartCount}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
              />
              <ForgotPassword />
            </Route>
            <Route path='/resetPassword'>
              <Nav
                cartCount={cartCount}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
              />
              <ResetPassword />
            </Route>
            <Route path='/register'>
              <Nav
                cartCount={cartCount}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
              />
              <Register />
            </Route>
            <Route path='/verify'>
              <Nav
                cartCount={cartCount}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
              />
              <Verify />
            </Route>
            <Route path='/changeEmail'>
              <Nav
                cartCount={cartCount}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
              />
              <ChangeEmail />
            </Route>
            <Route path='/account/edit-profile'>
              <Nav
                cartCount={cartCount}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
              />
              <EditProfile />
            </Route>
            <Route path='/account/orders'>
              <Nav
                cartCount={cartCount}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
              />
              <MyOrders />
            </Route>
            <Route path='/account/change-password'>
              <Nav
                cartCount={cartCount}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
              />
              <ChangePassword />
            </Route>
            <Route path='/shipping'>
              <Nav
                cartCount={cartCount}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
              />
              <Shipping />
            </Route>
            <Route path='/payment'>
              <Nav
                cartCount={cartCount}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
              />
              <Payment />
            </Route>
            <Route path='/placeOrder'>
              <Nav
                cartCount={cartCount}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
              />
              <PlaceOrder setCartCount={setCartCount} />
            </Route>
            <Route path='/orders/:id'>
              <Nav
                cartCount={cartCount}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
              />
              <OrderDetails />
            </Route>

            <Route path='/account'>
              <Nav
                cartCount={cartCount}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
              />
            </Route>

            <Route path='/dashboard/orders'>
              <Dashboard pageContent={"orders"} />
            </Route>
            <Route path='/dashboard/statistics'>
              <Dashboard pageContent={"statistics"} />
            </Route>
            <Route path='/dashboard/categories'>
              <Dashboard pageContent={"categories"} />
            </Route>
            <Route path='/dashboard/geomap'>
              <Dashboard pageContent={"geomap"} />
            </Route>
            <Route path='/dashboard/products'>
              <Dashboard pageContent={"products"} />
            </Route>
            <Route path='/dashboard/discounts'>
              <Dashboard pageContent={"discounts"} />
            </Route>
            <Route path='/dashboard/employees'>
              <Dashboard pageContent={"employees"} />
            </Route>
            <Route path='/dashboard/customers'>
              <Dashboard pageContent={"customers"} />
            </Route>
            <Route path='/dashboard/chat'>
              <Dashboard pageContent={"chat"} />
            </Route>
            <Route path='/dashboard/emails'>
              <Dashboard pageContent={"emails"} />
            </Route>
            <Route path='/dashboard'>
              <Dashboard pageContent={""} />
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
