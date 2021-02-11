import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import productListReducer from "./reducers/productList"
import productDetailReducer from "./reducers/productDetail"
import cartReducer from "./reducers/cart"
import userReducer from "./reducers/user"

const reducers = combineReducers({
  productList: productListReducer,
  product: productDetailReducer,
  cart: cartReducer,
  userInfo: userReducer,
})
let initialState

const savedUserInfo = JSON.parse(localStorage.getItem("sickUserInfo"))
const savedCart = JSON.parse(localStorage.getItem("sickCartProducts"))
const savedAddress = JSON.parse(localStorage.getItem("sickAddress"))
const savedPaymentMethod = JSON.parse(localStorage.getItem("sickPaymentMethod"))

const pricesArr = savedCart
  ? savedCart.map((each) => each.price * each.qty)
  : null
const totalPrice = pricesArr
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
          : "PayPal or Credit & Debit Cards"
        : {}
      : savedPaymentMethod
      ? savedPaymentMethod
      : null,
  },
  userInfo: savedUserInfo ? savedUserInfo : { user: {} },
}

const middleware = [thunk]

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)
export default store
