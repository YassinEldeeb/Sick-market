import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import productListReducer from './reducers/productList'
import productDetailReducer from './reducers/productDetail'
import cartReducer from './reducers/cart'
import userReducer from './reducers/user'
import createOrderReducer from './reducers/order'
import buyNowProduct from './reducers/buyNowProduct'
import getOrderReducer from './reducers/orderDetail'
import orderPayReducer from './reducers/orderPay'
import orderDeliverReducer from './reducers/orderDeliver'
import getAllOrdersReducer from './reducers/myOrders'
import getDashboardUsers from './reducers/dashboardUsers'
import searchDashboardUsers from './reducers/searchUsers'
import userActions from './reducers/userActions'
import deleteUser from './reducers/deleteUser'
import canOrder from './reducers/canOrder'
import canReview from './reducers/canReview'
import editRank from './reducers/editRank'
import deleteProduct from './reducers/deleteProduct'
import productSearchReducer from './reducers/searchProduct'
import loadedImagesReducer from './reducers/loadedImages'
import dotenv from 'dotenv'

dotenv.config()
const reducers = combineReducers({
  productList: productListReducer,
  product: productDetailReducer,
  cart: cartReducer,
  userInfo: userReducer,
  order: createOrderReducer,
  buyNowProduct: buyNowProduct,
  orderDetails: getOrderReducer,
  orderPay: orderPayReducer,
  myOrders: getAllOrdersReducer,
  dashboardUsers: getDashboardUsers,
  dashboardSearchUsers: searchDashboardUsers,
  userActions,
  deleteUser,
  canOrder,
  canReview,
  editRank,
  deleteProduct,
  productSearch: productSearchReducer,
  loadedImages: loadedImagesReducer,
  orderDeliver: orderDeliverReducer,
})
let initialState

const savedUserInfo = JSON.parse(localStorage.getItem('sickUserInfo'))
const savedCart = JSON.parse(localStorage.getItem('sickCartProducts'))
const savedAddress = JSON.parse(localStorage.getItem('sickAddress'))
const savedPaymentMethod = JSON.parse(localStorage.getItem('sickPaymentMethod'))
const sickDiscount = JSON.parse(localStorage.getItem('sickDiscount'))

const pricesArr = savedCart
  ? savedCart.map((each) => each.price * each.qty)
  : []

const totalPrice = pricesArr.length
  ? pricesArr.reduce((acc, item) => acc + item).toFixed(2)
  : null

initialState = {
  cart: {
    cartItems: savedCart ? savedCart : [],
    address: savedAddress ? savedAddress : {},
    paymentMethod: totalPrice
      ? savedPaymentMethod
        ? 20 > totalPrice || totalPrice > 17000
          ? savedPaymentMethod
          : 'PayPal or Credit & Debit Cards'
        : {}
      : savedPaymentMethod
      ? savedPaymentMethod
      : null,
    discount: sickDiscount ? sickDiscount : null,
  },
  userInfo: savedUserInfo ? savedUserInfo : { user: {} },
}

const middleware = [thunk]

let store
if (process.env.NODE_ENV !== 'production') {
  store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  )
} else {
  store = createStore(reducers, initialState, applyMiddleware(...middleware))
}

export default store
