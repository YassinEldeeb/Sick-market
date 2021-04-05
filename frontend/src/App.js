import React, { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { LastLocationProvider } from 'react-router-last-location'
import Global from './components/GlobalStyles'
import { useDispatch, useSelector } from 'react-redux'
import checkToken from './actions/checkToken'
import Loader from './components/loader'
import Nav from './components/Nav'
import JustComponentForApp from './components/justComponentForApp'
import EditProfile from './pages/edit-profile'
import ChangePassword from './pages/changePassword'
import MyOrders from './pages/MyOrders'
const Home = lazy(() => import('./pages/Home'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Description = lazy(() => import('./pages/Description'))
const Cart = lazy(() => import('./pages/Cart'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Verify = lazy(() => import('./pages/Verify'))
const ChangeEmail = lazy(() => import('./pages/changeEmail'))

const NotFound = lazy(() => import('./pages/notFound'))
const Shipping = lazy(() => import('./pages/Shipping'))
const Payment = lazy(() => import('./pages/Payment'))
const PlaceOrder = lazy(() => import('./pages/PlaceOrder'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const ResetPassword = lazy(() => import('./pages/ResetPassword'))
const OrderDetails = lazy(() => import('./pages/orderDetails'))
const Dashboard = lazy(() => import('./pages/Dashboard'))

const App = () => {
  const savedCart = JSON.parse(localStorage.getItem('sickCartProducts'))
  const [activeMenu, setActiveMenu] = useState(false)

  const qtyArr = savedCart ? savedCart.map((each) => each.qty) : []
  let initialCartValue = undefined
  if (savedCart && qtyArr.length !== 0) {
    initialCartValue = qtyArr.reduce((acc, product) => acc + product)
  }

  const [cartCount, setCartCount] = useState(
    initialCartValue ? initialCartValue : 0
  )
  document.body.style.overflow = activeMenu ? 'hidden' : 'auto'
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
          <Nav
            cartCount={cartCount}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />
          <JustComponentForApp />
          <Suspense fallback={<p className='loadingText'>Loading...</p>}>
            <Switch>
              <Route path='/' exact>
                <Home />
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
              <Route path='/forgotPassword'>
                <ForgotPassword />
              </Route>
              <Route path='/resetPassword'>
                <ResetPassword />
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
                <EditProfile />
              </Route>
              <Route path='/account/orders'>
                <MyOrders />
              </Route>
              <Route path='/account/change-password'>
                <ChangePassword />
              </Route>
              <Route path='/shipping'>
                <Shipping />
              </Route>
              <Route path='/payment'>
                <Payment />
              </Route>
              <Route path='/placeOrder'>
                <PlaceOrder setCartCount={setCartCount} />
              </Route>
              <Route path='/orders/:id'>
                <OrderDetails />
              </Route>

              <Route path='/account'></Route>

              <Route path='/dashboard/orders'>
                <Dashboard pageContent={'orders'} />
              </Route>
              <Route path='/dashboard/statistics'>
                <Dashboard pageContent={'statistics'} />
              </Route>
              <Route path='/dashboard/categories'>
                <Dashboard pageContent={'categories'} />
              </Route>
              <Route path='/dashboard/geomap'>
                <Dashboard pageContent={'geomap'} />
              </Route>
              <Route path='/dashboard/products'>
                <Dashboard pageContent={'products'} />
              </Route>
              <Route path='/dashboard/discounts'>
                <Dashboard pageContent={'discounts'} />
              </Route>
              <Route path='/dashboard/employees'>
                <Dashboard pageContent={'employees'} />
              </Route>
              <Route path='/dashboard/customers'>
                <Dashboard pageContent={'customers'} />
              </Route>
              <Route path='/dashboard/chat'>
                <Dashboard pageContent={'chat'} />
              </Route>
              <Route path='/dashboard/emails'>
                <Dashboard pageContent={'emails'} />
              </Route>
              <Route path='/dashboard'>
                <Dashboard pageContent={''} />
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </Suspense>
        </LastLocationProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
