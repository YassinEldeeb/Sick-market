(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{29:function(e,t,n){"use strict";var a,r=n(13),o=n(0),c=n.n(o),l=n(14).b.div(a||(a=Object(r.a)(["\n  display: grid;\n  place-items: center;\n"])));t.a=function(){return c.a.createElement(l,{className:"providedLoader"},c.a.createElement("svg",{id:"loader",viewBox:"0 0 699 699",fill:"none",xmlns:"http://www.w3.org/2000/svg"},c.a.createElement("g",{id:"loader"},c.a.createElement("g",{id:"greybackground"},c.a.createElement("mask",{id:"path-1-inside-1",fill:"white"},c.a.createElement("path",{d:"M4.66747 353.779C3.74434 285.654 23.0432 218.786 60.1236 161.629C97.2041 104.473 150.401 59.5958 212.986 32.6728C275.572 5.74982 344.736 -2.00978 411.731 10.3753C478.727 22.7603 540.545 54.7338 589.37 102.252L532.538 160.646C495.263 124.367 448.067 99.9571 396.919 90.5016C345.771 81.0462 292.967 86.9703 245.186 107.525C197.405 128.079 156.792 162.341 128.482 205.977C100.173 249.614 85.4392 300.665 86.144 352.675L4.66747 353.779Z"})),c.a.createElement("path",{d:"M4.66747 353.779C3.74434 285.654 23.0432 218.786 60.1236 161.629C97.2041 104.473 150.401 59.5958 212.986 32.6728C275.572 5.74982 344.736 -2.00978 411.731 10.3753C478.727 22.7603 540.545 54.7338 589.37 102.252L532.538 160.646C495.263 124.367 448.067 99.9571 396.919 90.5016C345.771 81.0462 292.967 86.9703 245.186 107.525C197.405 128.079 156.792 162.341 128.482 205.977C100.173 249.614 85.4392 300.665 86.144 352.675L4.66747 353.779Z",stroke:"#343A40",strokeWidth:"128",mask:"url(#path-1-inside-1)"})))))}},49:function(e,t,n){e.exports=n(86)},86:function(e,t,n){"use strict";n.r(t);var a,r=n(0),o=n.n(r),c=n(15),l=n.n(c),i=n(20),d=n(18),s=n(3),u=n(30),E=n(13),p=n(14),m=Object(p.a)(a||(a=Object(E.a)(["\n*{\n    margin:0;\n    padding:0;\n    box-sizing:border-box;\n    font-family: 'Poppins', sans-serif;\n    outline:none;\n    scrollbar-width:thin; \n}\n*::-webkit-scrollbar {\n  width: 7.4px;\n}\n*::-webkit-scrollbar-track {\n  background: transparent;\n}\n*::-webkit-scrollbar-thumb {\n  background: #cdcdcd;\n  border: transparent;\n}\na{\n    color:white;\n    text-decoration:none;\n}\n\n.App{\n    min-height:100vh;\n    display:flex;\n    flex-direction:column;\n}\n    .starsRating {\n      position: relative;\n      margin: 0.2rem 0;\n      display: inline-block;\n    }\n    .ratingCount {\n      position: absolute;\n      right: 0;\n      top: 0;\n      transform: translate(100%, -50%);\n      span {\n        font-size: calc(0.7rem + 0.3vw);\n        color: #1a1a1a;\n      }\n    }\n    .starsRating .fas,\n    .starsRating .far {\n      padding-right: 0.1rem;\n      color: #00b2d8;\n      font-size: calc(1rem + 0.3vw);\n      &:last-child {\n        padding-right: 0rem;\n      }\n    }\n    #loader{\n        width:calc(3rem + 1vw);\n        height:calc(3rem + 1vw);\n        animation:loaderAnim 1.4s infinite ease-out;\n        transform-origin:center;\n    }\n    @keyframes loaderAnim {\n       from {\n        transform:rotate(0deg)\n       }\n       to{\n        transform:rotate(360deg)\n       }\n    }\n  \n  .gobackMessage {\n    display: inline-flex !important;\n    margin-left:5vw;\n  }\n  .filepond--drop-label label{\n    font-size:calc(0.74rem + 0.3vw) !important;\n  }\n  .browseTextFilePond{\n    cursor: pointer;\n    text-decoration:underline;\n  }\n  .goBackForgotPassword ,.flexCont {\n    display: inline-flex !important;\n  }\n  .goBackForgotPassword{\n    margin-left: 5vw;\n  }\n@media screen and (max-width:1050px){\n    *{   \n    -webkit-tap-highlight-color: rgba(255, 255, 255, 0.05);\n    -webkit-touch-callout: none; \n    -webkit-user-select: none; \n    -khtml-user-select: none; \n    -moz-user-select: none; \n    -ms-user-select: none; \n    user-select: none;\n    }\n      .filepond--drop-label label{\n    font-size:calc(0.64rem + 0.3vw) !important;\n  }\n    .xSign{\n        width: calc(2.1rem + 1vw) !important;\n        padding:0.6rem !important;\n        transform: translate(-7%,-50%) !important;\n    }\n    .burger{\n        display:flex !important;\n    }\n    .dropDown{\n        display:none !important;\n    }\n    .inputDiv input {\n        border-top-left-radius:5px;\n        border-bottom-left-radius:5px;\n        font-size: calc(0.7rem + 1vw);\n    }\n    .profile{\n        display:none !important;\n    }\n    .searchForm{\n        order: 3;\n        flex: 1 1 400rem !important;\n        margin: unset !important;\n        margin-top: calc(0.35rem + 1vw);\n        \n    }\n    .submit img{\n        width: calc(1rem + 1vw)!important;\n    }\n    nav{\n        flex-wrap:wrap;\n        width:94%;\n    }\n    header{\n        padding:calc(0.8rem + 1vw) 0 !important;\n    }\n    .cart h1{\n        font-size: calc(0.7rem + 1vw);\n    }\n    .cartImg{\n        width: calc(1.65rem + 0.8vw) !important;\n        .cart_counter{\n            height: 1.25rem;\n            width: 1.25rem;\n            font-size: calc(0.7rem + 0.2vw);\n        }\n    }\n}\n@media screen and (max-width:350px){\n    nav div svg{\n        width: calc(9rem + 5vw) !important;\n    }\n}\n@media screen and (max-width:450px){\n    *::-webkit-scrollbar {\n  width: 4px;\n}\n*::-webkit-scrollbar-thumb {\n  border-radius:1px;\n}\n   .burger span{\n       width: 2.4rem !important;\n       height: 0.2rem !important;\n       margin: 0.15rem 0 !important;\n   }\n}\n@media screen and (max-width:300px){\n   .burger {\n       margin-right: 0 !important;\n       span{\n        width: 1.75rem !important;\n        height: 0.16rem !important;  \n        margin: 0.13rem 0 !important; \n       }\n   }\n      .cartImg{\n        width: calc(1.35rem + 0.8vw) !important;\n        .cart_counter{\n            height: 0.9rem;\n            width: 0.9rem;\n            font-size: calc(0.6rem + 0.2vw);\n        }\n    }\n}\n  .goBackVerification{\n        display:inline-flex !important;\n        .flex-cont{\n            display:inline-flex !important;\n        }\n    }\n    .goBackVerifyCont{\n        justify-self: flex-start;\n        align-self: flex-start;\n        margin-left:5vw;\n        width: max-content;\n        height: max-content;\n        \n    }\n"]))),g=n(12),S=n(19),h=n.n(S),C=n(28),O=n(21),_=n.n(O),b=function(e){return function(){var t=Object(C.a)(h.a.mark(function t(n){var a,r,o;return h.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,n({type:"CHECK_TOKEN_REQUEST"}),a=_.a.CancelToken,r=a.source(),o={headers:{Content_Type:"application/json",Authorization:"Bearer ".concat(e)},cancelToken:r.token},t.next=7,_.a.post("/api/users/checkToken",null,o);case 7:n({type:"CHECK_TOKEN_SUCCESS",payload:!0}),t.next=13;break;case 10:t.prev=10,t.t0=t.catch(0),401===t.t0.response.status?(console.log(t.t0.response&&t.t0.response.data.message?t.t0.response.data.message:t.t0.message),n({type:"USER_LOGOUT"}),localStorage.removeItem("sickUserInfo"),n({type:"CHECK_TOKEN_SUCCESS",payload:!1})):n({type:"CHECK_TOKEN_FAIL",payload:t.t0.response&&t.t0.response.data.message?t.t0.response.data.message:t.t0.message});case 13:case"end":return t.stop()}},t,null,[[0,10]])}));return function(e){return t.apply(this,arguments)}}()},f=n(29),v=Object(r.lazy)(function(){return n.e(19).then(n.bind(null,332))}),R=Object(r.lazy)(function(){return n.e(9).then(n.bind(null,330))}),y=Object(r.lazy)(function(){return n.e(12).then(n.bind(null,338))}),T=Object(r.lazy)(function(){return n.e(24).then(n.bind(null,321))}),A=Object(r.lazy)(function(){return n.e(15).then(n.bind(null,339))}),L=Object(r.lazy)(function(){return n.e(17).then(n.bind(null,333))}),w=Object(r.lazy)(function(){return n.e(18).then(n.bind(null,340))}),U=Object(r.lazy)(function(){return n.e(25).then(n.bind(null,334))}),I=Object(r.lazy)(function(){return n.e(13).then(n.bind(null,322))}),P=Object(r.lazy)(function(){return Promise.all([n.e(11),n.e(5)]).then(n.bind(null,331))}),j=Object(r.lazy)(function(){return n.e(6).then(n.bind(null,323))}),D=Object(r.lazy)(function(){return n.e(26).then(n.bind(null,324))}),k=Object(r.lazy)(function(){return Promise.all([n.e(7),n.e(22)]).then(n.bind(null,341))}),M=Object(r.lazy)(function(){return n.e(21).then(n.bind(null,335))}),F=Object(r.lazy)(function(){return n.e(20).then(n.bind(null,342))}),x=Object(r.lazy)(function(){return n.e(14).then(n.bind(null,343))}),N=Object(r.lazy)(function(){return n.e(23).then(n.bind(null,344))}),z=Object(r.lazy)(function(){return Promise.all([n.e(2),n.e(16)]).then(n.bind(null,336))}),G=Object(r.lazy)(function(){return n.e(10).then(n.bind(null,345))}),Q=Object(r.lazy)(function(){return Promise.all([n.e(4),n.e(8)]).then(n.bind(null,329))}),H=function(){var e=JSON.parse(localStorage.getItem("sickCartProducts")),t=Object(r.useState)(!1),n=Object(i.a)(t,2),a=n[0],c=n[1],l=e?e.map(function(e){return e.qty}):[],E=void 0;e&&0!==l.length&&(E=l.reduce(function(e,t){return e+t}));var p=Object(r.useState)(E||0),S=Object(i.a)(p,2),h=S[0],C=S[1];document.body.style.overflow=a?"hidden":"auto";var O=Object(g.b)(),_=Object(g.c)(function(e){return e.userInfo}),H=_.loading,B=_.validToken,Y=_.token;return Object(r.useEffect)(function(){!Y||H||B||O(b(Y))},[O,Y,H,B]),o.a.createElement("div",{className:"App"},o.a.createElement(d.BrowserRouter,null,o.a.createElement(u.LastLocationProvider,null,o.a.createElement(m,null),o.a.createElement(r.Suspense,{fallback:o.a.createElement(f.a,null)},o.a.createElement(s.g,null,o.a.createElement(s.d,{path:"/",exact:!0},o.a.createElement(R,{cartCount:h,activeMenu:a,setActiveMenu:c}),o.a.createElement(v,null)),o.a.createElement(s.d,{path:"/products/:id"},o.a.createElement(R,{cartCount:h,activeMenu:a,setActiveMenu:c}),o.a.createElement(y,{cartCount:h,setCartCount:C})),o.a.createElement(s.d,{path:"/product-description/:id"},o.a.createElement(R,{cartCount:h,activeMenu:a,setActiveMenu:c}),o.a.createElement(T,null)),o.a.createElement(s.d,{path:"/cart"},o.a.createElement(R,{cartCount:h,activeMenu:a,setActiveMenu:c}),o.a.createElement(A,{cartCount:h,setCartCount:C})),o.a.createElement(s.d,{path:"/login"},o.a.createElement(R,{cartCount:h,activeMenu:a,setActiveMenu:c}),o.a.createElement(L,null)),o.a.createElement(s.d,{path:"/forgotPassword"},o.a.createElement(R,{cartCount:h,activeMenu:a,setActiveMenu:c}),o.a.createElement(x,null)),o.a.createElement(s.d,{path:"/resetPassword"},o.a.createElement(R,{cartCount:h,activeMenu:a,setActiveMenu:c}),o.a.createElement(N,null)),o.a.createElement(s.d,{path:"/register"},o.a.createElement(R,{cartCount:h,activeMenu:a,setActiveMenu:c}),o.a.createElement(w,null)),o.a.createElement(s.d,{path:"/verify"},o.a.createElement(R,{cartCount:h,activeMenu:a,setActiveMenu:c}),o.a.createElement(U,null)),o.a.createElement(s.d,{path:"/changeEmail"},o.a.createElement(R,{cartCount:h,activeMenu:a,setActiveMenu:c}),o.a.createElement(I,null)),o.a.createElement(s.d,{path:"/account/edit-profile"},o.a.createElement(R,{cartCount:h,activeMenu:a,setActiveMenu:c}),o.a.createElement(P,null)),o.a.createElement(s.d,{path:"/account/orders"},o.a.createElement(R,{cartCount:h,activeMenu:a,setActiveMenu:c}),o.a.createElement(G,null)),o.a.createElement(s.d,{path:"/account/change-password"},o.a.createElement(R,{cartCount:h,activeMenu:a,setActiveMenu:c}),o.a.createElement(j,null)),o.a.createElement(s.d,{path:"/shipping"},o.a.createElement(R,{cartCount:h,activeMenu:a,setActiveMenu:c}),o.a.createElement(k,null)),o.a.createElement(s.d,{path:"/payment"},o.a.createElement(R,{cartCount:h,activeMenu:a,setActiveMenu:c}),o.a.createElement(M,null)),o.a.createElement(s.d,{path:"/placeOrder"},o.a.createElement(R,{cartCount:h,activeMenu:a,setActiveMenu:c}),o.a.createElement(F,{setCartCount:C})),o.a.createElement(s.d,{path:"/orders/:id"},o.a.createElement(R,{cartCount:h,activeMenu:a,setActiveMenu:c}),o.a.createElement(z,null)),o.a.createElement(s.d,{path:"/account"},o.a.createElement(R,{cartCount:h,activeMenu:a,setActiveMenu:c})),o.a.createElement(s.d,{path:"/dashboard/orders"},o.a.createElement(Q,{pageContent:"orders"})),o.a.createElement(s.d,{path:"/dashboard/statistics"},o.a.createElement(Q,{pageContent:"statistics"})),o.a.createElement(s.d,{path:"/dashboard/categories"},o.a.createElement(Q,{pageContent:"categories"})),o.a.createElement(s.d,{path:"/dashboard/geomap"},o.a.createElement(Q,{pageContent:"geomap"})),o.a.createElement(s.d,{path:"/dashboard/products"},o.a.createElement(Q,{pageContent:"products"})),o.a.createElement(s.d,{path:"/dashboard/discounts"},o.a.createElement(Q,{pageContent:"discounts"})),o.a.createElement(s.d,{path:"/dashboard/employees"},o.a.createElement(Q,{pageContent:"employees"})),o.a.createElement(s.d,{path:"/dashboard/customers"},o.a.createElement(Q,{pageContent:"customers"})),o.a.createElement(s.d,{path:"/dashboard/chat"},o.a.createElement(Q,{pageContent:"chat"})),o.a.createElement(s.d,{path:"/dashboard/emails"},o.a.createElement(Q,{pageContent:"emails"})),o.a.createElement(s.d,{path:"/dashboard"},o.a.createElement(Q,{pageContent:""})),o.a.createElement(s.d,null,o.a.createElement(D,null)))))))},B=function(e){e&&e instanceof Function&&n.e(27).then(n.bind(null,326)).then(function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,o=t.getLCP,c=t.getTTFB;n(e),a(e),r(e),o(e),c(e)})},Y=n(11),K=n(48),V=(n(83),{products:[]}),W=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:V,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"PRODUCT_LIST_REQUEST":return{products:[],loading:!0};case"PRODUCT_LIST_SUCCESS":return{products:t.payload,loading:!1};case"PRODUCT_LIST_FAIL":return{error:t.payload,loading:!1};default:return e}},J={product:{}},q=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:J,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"PRODUCT_DETAIL_REQUEST":return{product:{},loading:!0};case"PRODUCT_DETAIL_SUCCESS":return{product:t.payload,loading:!1};case"PRODUCT_DETAIL_FAIL":return{error:t.payload,loading:!1};default:return e}},Z=n(1),X={cartItems:[],address:{},paymentMethod:null},$=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:X,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_ITEM_TO_CART":return e.cartItems.push(t.payload),e;case"UPDATE_ITEM_QTY":case"REMOVE_ITEM":return e=Object(Z.a)({},e,{cartItems:t.payload});case"SAVE_ADDRESS":return Object(Z.a)({},e,{address:t.payload});case"SAVE_PAYMENT_METHOD":return Object(Z.a)({},e,{paymentMethod:t.payload});case"GEOCODING_REQUEST":return Object(Z.a)({},e,{geocodingLoading:!0});case"GEOCODING_SUCCESS":return Object(Z.a)({},e,{address:t.payload,geocodingLoading:!1});case"GEOCODING_FAIL":return Object(Z.a)({},e,{error:t.payload,geocodingLoading:!1});case"COUPON_REQUEST":return Object(Z.a)({},e,{loadingCoupon:!0});case"COUPON_SUCCESS":return Object(Z.a)({},e,{loadingCoupon:!1,discount:t.payload,errorCoupon:null});case"COUPON_FAIL":return Object(Z.a)({},e,{loadingCoupon:!1,errorCoupon:t.payload});default:return e}},ee={user:{profileLoading:!0}},te=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ee,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"USER_LOGIN_REQUEST":return Object(Z.a)({},e,{loading:!0,error:null});case"USER_LOGIN_SUCCESS":return Object(Z.a)({},e,{loading:!1},t.payload);case"USER_LOGIN_FAIL":return Object(Z.a)({},e,{loading:!1,error:t.payload});case"USER_LOGOUT":case"USER_LOGOUT_ALL":return localStorage.removeItem("sickUserInfo"),{user:{}};case"CHECK_TOKEN_REQUEST":return Object(Z.a)({},e,{loading:!0});case"CHECK_TOKEN_SUCCESS":return Object(Z.a)({},e,{validToken:t.payload,loading:!1});case"CHECK_TOKEN_FAIL":return Object(Z.a)({},e,{loading:!1,error:t.payload});case"REGISTER_REQUEST":return{loading:!0,error:null,user:{}};case"REGISTER_SUCCESS":return Object(Z.a)({},e,t.payload);case"REGISTER_FAIL":return{loading:!1,error:t.payload};case"VERIFY_REQUEST":return Object(Z.a)({},e,{verifyLoading:!0,verificationError:null});case"VERIFY_SUCCESS":return e.user.status="Verified",Object(Z.a)({},e,{verifyLoading:!1});case"VERIFY_FAIL":return Object(Z.a)({},e,{verifyLoading:!1,verificationError:t.payload});case"NEW_VERIFY_CODE_REQUEST":return Object(Z.a)({},e,{newCodeLoading:!0,newCodeError:null});case"NEW_VERIFY_CODE_SUCCESS":return Object(Z.a)({},e,{newCodeLoading:!1});case"NEW_VERIFY_CODE_FAIL":return Object(Z.a)({},e,{newCodeLoading:!1,newCodeError:t.payload});case"UPDATE_USER_REQUEST":return Object(Z.a)({},e,{updateLoading:!0,updated:null,updateError:null});case"UPDATE_USER_SUCCESS":return e.user=t.payload,Object(Z.a)({},e,{updateLoading:!1,updated:!0});case"UPDATE_USER_FAIL":return Object(Z.a)({},e,{updateLoading:!1,updateError:t.payload,updated:!1});case"USER_PROFILE_REQUEST":return Object(Z.a)({},e,{profileLoading:!0,updated:null});case"USER_PROFILE_SUCCESS":return e.user=t.payload,Object(Z.a)({},e,{profileLoading:!1});case"USER_PROFILE_FAIL":return Object(Z.a)({},e,{updateLoading:!1,profileError:t.payload,updated:!1});case"DELETE_PROFILE_PIC_REQUEST":return Object(Z.a)({},e,{deleteProfilePicLoading:!0});case"DELETE_PROFILE_PIC_SUCCESS":return e.user.availablePic=!1,e.user.profilePicLink&&(e.user.profilePicLink="cleared"),localStorage.setItem("sickUserInfo",JSON.stringify({user:e.user,token:e.token})),Object(Z.a)({},e,{deleteProfilePicLoading:!1});case"DELETE_PROFILE_PIC_FAIL":return Object(Z.a)({},e,{deleteProfilePicLoading:!1,deleteProfileError:t.payload});case"PROFILE_PIC_UPLOADED":return e.user.availablePic=!0,e.user.profilePicLink&&(e.user.profilePicLink="cleared"),localStorage.setItem("sickUserInfo",JSON.stringify({user:e.user,token:e.token})),Object(Z.a)({},e);case"CLEAR_ERRORS":return Object(Z.a)({},e,{deleteProfileError:null,profileError:null,updateError:null,newCodeError:null,verificationError:null,error:null,updated:null});case"RESET_PASSWORD_REQUEST":return Object(Z.a)({},e,{resetLoading:!0,error:null,sent:!1});case"RESET_PASSWORD_SUCCESS":return Object(Z.a)({},e,{resetLoading:!1,sent:!0});case"RESET_PASSWORD_FAIL":return Object(Z.a)({},e,{resetLoading:!1,error:t.payload,sent:!1});case"RESET_PASSWORD_STEP2_REQUEST":return Object(Z.a)({},e,{reset2Loading:!0,error:null,reset:!1});case"RESET_PASSWORD_STEP2_SUCCESS":return Object(Z.a)({},e,{reset2Loading:!1,reset:!0});case"RESET_PASSWORD_STEP2_FAIL":return Object(Z.a)({},e,{reset2Loading:!1,error:t.payload,reset:!1});default:return e}},ne={order:{}},ae=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ne,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"CREATE_ORDER_REQUEST":return{order:{},orderLoading:!0};case"CREATE_ORDER_SUCCESS":return{order:t.payload,orderLoading:!1,orderPlaced:!0};case"CREATE_ORDER_FAIL":return{error:t.payload,orderLoading:!1,orderPlaced:!1};default:return e}},re={product:{}},oe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:re,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_TO_BUYNOW_CART":return e.product=t.payload,e;default:return e}},ce={order:{}},le=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ce,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_ORDER_REQUEST":return{orderLoading:!0,order:{}};case"GET_ORDER_SUCCESS":return Object(Z.a)({},t.payload,{orderLoading:!1});case"GET_ORDER_FAIL":return Object(Z.a)({},e,{error:t.payload,orderLoading:!1});default:return e}},ie=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ORDER_PAY_REQUEST":return{error:null,orderPayLoading:!0};case"ORDER_PAY_SUCCESS":return{success:!0,orderPayLoading:!1};case"ORDER_PAY_FAIL":return{error:t.payload,orderPayLoading:!1};case"ORDER_PAY_RESET":return{};default:return e}},de=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{loadingOrders:!0},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_MY_ORDERS_REQUEST":return{loadingOrders:!0};case"GET_MY_ORDERS_SUCCESS":return{orders:t.payload,loadingOrders:!1};case"GET_MY_ORDERS_FAIL":return{error:t.payload,loadingOrders:!1};default:return e}},se={loading:!0},ue=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:se,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_DASHBOARD_USERS_REQUEST":return{loading:!0};case"GET_DASHBOARD_USERS_SUCCESS":return{users:t.payload.users,count:t.payload.count,loading:!1};case"GET_DASHBOARD_USERS_FAIL":return{error:t.payload,loading:!1};default:return e}},Ee={loading:!0},pe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ee,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SEARCH_DASHBOARD_USERS_REQUEST":return{loading:!0};case"SEARCH_DASHBOARD_USERS_SUCCESS":return{users:t.payload.users,count:t.payload.count,loading:!1};case"SEARCH_DASHBOARD_USERS_FAIL":return{error:t.payload,loading:!1};default:return e}},me={loading:!0},ge=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:me,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"USERS_ACTIONS_REQUEST":return{loading:!0};case"USERS_ACTIONS_SUCCESS":return{user:t.payload,loading:!1};case"USERS_ACTIONS_FAIL":return{error:t.payload,loading:!1};default:return e}},Se=n(16),he=n.n(Se);he.a.config();var Ce,Oe=Object(Y.combineReducers)({productList:W,product:q,cart:$,userInfo:te,order:ae,buyNowProduct:oe,orderDetails:le,orderPay:ie,myOrders:de,dashboardUsers:ue,dashboardSearchUsers:pe,userActions:ge}),_e=JSON.parse(localStorage.getItem("sickUserInfo")),be=JSON.parse(localStorage.getItem("sickCartProducts")),fe=JSON.parse(localStorage.getItem("sickAddress")),ve=JSON.parse(localStorage.getItem("sickPaymentMethod")),Re=JSON.parse(localStorage.getItem("sickDiscount")),ye=be?be.map(function(e){return e.price*e.qty}):[],Te=ye.length?ye.reduce(function(e,t){return e+t}).toFixed(2):null;Ce={cart:{cartItems:be||[],address:fe||{},paymentMethod:Te?ve?20>Te||Te>17e3?ve:"PayPal or Credit & Debit Cards":{}:ve||null,discount:Re||null},userInfo:_e||{user:{}}};var Ae=[K.a],Le=Object(Y.createStore)(Oe,Ce,Y.applyMiddleware.apply(void 0,Ae));he.a.config(),l.a.render(o.a.createElement(g.a,{store:Le},o.a.createElement(H,null)),document.getElementById("root")),B(),function(){var e="".concat("","/sw.js");navigator.serviceWorker.register(e).then(function(e){console.warn("Response",e)})}()}},[[49,1,3]]]);
//# sourceMappingURL=main.5a586add.chunk.js.map