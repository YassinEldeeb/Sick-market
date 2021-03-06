import React, { FC, useState, useEffect, Suspense, lazy } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { LastLocationProvider } from 'react-router-last-location'
import Global from './components/GlobalStyles'
import { useDispatch, useSelector } from 'react-redux'
import checkToken from './actions/checkToken'
import Nav from './components/Nav'
import JustComponentForApp from './components/justComponentForApp'
import Loader from './components/loader'
import socket from './clientSocket/socket'
import { userLogoutAction } from './actions/logout'
import { AnimatePresence } from 'framer-motion'
import LoggingOut from './components/loggingYouOut'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Shipping from './pages/Shipping'
import Payment from './pages/Payment'
import PlaceOrder from './pages/PlaceOrder'
//
//
const Account = lazy(() => import('./pages/Account'))

const Description = lazy(() => import('./pages/Description'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Verify = lazy(() => import('./pages/Verify'))
const ChangeEmail = lazy(() => import('./pages/changeEmail'))

const NotFound = lazy(() => import('./pages/notFound'))

const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const ResetPassword = lazy(() => import('./pages/ResetPassword'))
const OrderDetails = lazy(() => import('./pages/orderDetails'))
const Dashboard = lazy(() => import('./pages/Dashboard'))

const App: FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const savedCart = JSON.parse(localStorage.getItem('sickCartProducts')!)
  const [activeMenu, setActiveMenu] = useState(false)

  const qtyArr = savedCart
    ? savedCart
        .filter((e: any) => {
          if (!e.removed) return e
        })
        .map((each: any) => each.qty)
    : []

  let initialCartValue = undefined
  if (savedCart && qtyArr.length !== 0) {
    initialCartValue = qtyArr.reduce((acc: any, product: any) => acc + product)
  }

  const [cartCount, setCartCount] = useState(
    initialCartValue ? initialCartValue : 0
  )
  document.body.style.overflow = activeMenu ? 'hidden' : 'auto'
  const dispatch = useDispatch()
  const { loading, validToken, token, logoutLoading, user } = useSelector(
    (state: any) => state.userInfo
  )
  const { products } = useSelector((state: any) => state.productList)

  useEffect(() => {
    if (token && !loading && !validToken) {
      dispatch(checkToken(token))
    }
  }, [dispatch, token, loading, validToken])

  useEffect(() => {
    if (user._id) {
      socket.emit('userSignedIn', user._id)
      if (user.rank === 'admin') {
        socket.emit('adminJoined')
      }
    }
  }, [user._id])

  const [register, setRegister] = useState(false)
  const [register2, setRegister2] = useState(false)
  useEffect(() => {
    if (!register) {
      socket.on('logoutMe', () => {
        console.log('Logout me!')
        dispatch(userLogoutAction())
      })
      setRegister(true)
    }
    if (!register2) {
      socket.on('NewUser', () => {
        dispatch({
          type: 'NEW_DASHBOARD_USERS',
        })
      })
      socket.on('ProductAdded', (id) => {
        if (user._id !== id) {
          console.log(`Fired! ${id}`)
          dispatch({
            type: 'NEW_DASHBOARD_PRODUCT',
          })
        }
      })
      setRegister2(true)
    }
  }, [])

  return (
    <div className='App' id={`${logoutLoading ? 'logoutLoading' : ''}`}>
      <BrowserRouter>
        <LastLocationProvider>
          <Global />
          <Nav
            cartCount={cartCount}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />
          <AnimatePresence>{logoutLoading && <LoggingOut />}</AnimatePresence>
          <JustComponentForApp />
          <Suspense fallback={<p className='loadingText'>Loading</p>}>
            <Switch>
              <Route path='/' exact>
                <Home
                  scrollPosition={scrollPosition}
                  setScrollPosition={setScrollPosition}
                />
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
              <Route path='/account'>
                <Account />
              </Route>

              <Route path='/shipping'>
                <Shipping />
              </Route>
              <Route path='/payment'>
                <Payment />
              </Route>
              <Route path='/placeOrder'>
                <PlaceOrder cartCount={cartCount} setCartCount={setCartCount} />
              </Route>
              <Route path='/orders/:id'>
                <OrderDetails />
              </Route>

              <Route path='/dashboard'>
                <Dashboard />
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
