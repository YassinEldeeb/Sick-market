(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{121:function(n,e,t){"use strict";var a,r=t(13),c=t(0),o=t.n(c),i=t(14),l=t(18),s=i.b.div(a||(a=Object(r.a)(["\n  .circle1 {\n    pointer-events: none !important;\n  }\n  h1 {\n    font-weight: 300;\n    font-size: calc(0.9rem + 0.2vw);\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    white-space: nowrap;\n    transform: translate(-50%, -154%);\n    a {\n      color: #343a40;\n    }\n  }\n  margin-top: 3.3rem;\n  .journeyLine {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n  .line {\n    width: calc(4rem + 4vw);\n    height: 4px;\n    background: #e4e4e4;\n    &.active {\n      background: #00b2d8;\n    }\n  }\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  .circle {\n    position: relative;\n    border-radius: 50%;\n    width: 21px;\n    height: 21px;\n    background: #e4e4e4;\n    pointer-events: none;\n    h1 a {\n      color: #b4b4b4;\n    }\n    &.active {\n      background: #00b2d8;\n      pointer-events: all;\n      h1 a {\n        font-weight: 400;\n        color: #343a40;\n      }\n    }\n  }\n  .current {\n    border: 2.7px solid #00b2d8;\n    background: transparent !important;\n    animation: pulse-blue 1s ease infinite;\n  }\n\n  @keyframes pulse-blue {\n    0% {\n      box-shadow: 0 0 0 0 rgba(52, 172, 224, 0.7);\n    }\n\n    70% {\n      box-shadow: 0 0 0 8px rgba(52, 172, 224, 0);\n    }\n\n    100% {\n      box-shadow: 0 0 0 0 rgba(52, 172, 224, 0);\n    }\n  }\n  @media screen and (max-width: 1050px) {\n    margin-top: 2.7rem;\n    .circle {\n      width: 17px;\n      height: 17px;\n    }\n    h1 {\n      font-size: calc(0.78rem + 0.2vw);\n      transform: translate(-50%, -157%);\n    }\n    .line {\n      width: calc(3.2rem + 4vw);\n      height: 2.5px;\n    }\n    .current {\n      border: 1.7px solid #00b2d8;\n    }\n    @keyframes pulse-blue {\n      0% {\n        box-shadow: 0 0 0 0 rgba(52, 172, 224, 0.7);\n      }\n\n      70% {\n        box-shadow: 0 0 0 6px rgba(52, 172, 224, 0);\n      }\n\n      100% {\n        box-shadow: 0 0 0 0 rgba(52, 172, 224, 0);\n      }\n    }\n  }\n"])));e.a=function(n){var e=n.step1,t=n.step2,a=n.step3,r=n.step4,c=n.current;return o.a.createElement(s,null,o.a.createElement("div",{className:"journeyLine"},o.a.createElement("div",{className:"circle circle1 ".concat(e?"active":""," ").concat("step1"===c?"current":"")},o.a.createElement("h1",null,o.a.createElement(l.Link,{to:"/login"},"Sign In"))),o.a.createElement("div",{className:"line ".concat(t?"active":"")}),o.a.createElement(l.Link,{id:"RouterNavLink",to:"/shipping",className:"circle circle2 ".concat(t?"active":""," ").concat("step2"===c?"current":"")},o.a.createElement("h1",null,o.a.createElement(l.Link,{to:"/shipping"},"Shipping"))),o.a.createElement("div",{className:"line ".concat(a?"active":"")}),o.a.createElement(l.Link,{id:"RouterNavLink",to:"/payment",className:"circle circle3 ".concat(a?"active":""," ").concat("step3"===c?"current":"")},o.a.createElement("h1",null,o.a.createElement(l.Link,{to:"/payment"},"Payment"))),o.a.createElement("div",{className:"line ".concat(r?"active":"")}),o.a.createElement(l.Link,{id:"RouterNavLink",to:"/place-order",className:"circle circle4 ".concat(r?"active":"","  ").concat("step4"===c?"current":"")},o.a.createElement("h1",null,o.a.createElement(l.Link,{to:"/place-order"},"Place Order")))))}},135:function(n,e,t){"use strict";var a,r=t(13),c=t(0),o=t.n(c),i=t(14),l=t(18),s=t(12),m=i.b.div(a||(a=Object(r.a)(["\n  .currency1,\n  .currency2 {\n    margin-left: 0.15rem;\n    font-size: calc(0.6rem + 0.3vw) !important;\n  }\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  width: 100%;\n  padding: 0.5rem 0;\n  border-bottom: 1px solid rgba(0, 0, 0, 12.5%);\n  width: 95%;\n  &:last-child {\n    border-bottom: unset;\n  }\n  .firstDiv {\n    flex: 1 1 auto;\n    display: flex;\n    justify-content: flex-start;\n    align-items: center;\n    width: max-content;\n    img {\n      width: 5vw;\n      max-width: 100%;\n      object-fit: cover;\n      border-radius: 5px;\n      border: 0.5px solid rgba(0, 0, 0, 0.1);\n    }\n    h1 {\n      font-weight: 400 !important;\n      font-size: calc(0.9rem + 0.3vw) !important;\n      margin-left: 0.8rem !important;\n      padding-bottom: 0 !important;\n      padding-top: 0 !important;\n      a {\n        color: #1a1a1a;\n        &:hover {\n          text-decoration: underline;\n        }\n      }\n    }\n  }\n  .secondDiv {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    margin-left: calc(1.5rem + 1vw);\n    width: min-content;\n    p {\n      color: #343a40;\n      font-size: calc(0.75rem + 0.3vw) !important;\n      font-weight: 400 !important;\n      padding-bottom: 0 !important;\n      width: max-content;\n    }\n  }\n  @media screen and (max-width: 1050px) {\n    width: 100%;\n    .firstDiv {\n      flex: 1 1 67%;\n      img {\n        width: calc(3vw + 3rem) !important;\n        max-width: 100%;\n      }\n      h1 {\n        font-size: calc(0.53rem + 1vw) !important;\n      }\n    }\n    .secondDiv {\n      flex: 1 1 auto;\n      margin-left: calc(0.75rem + 1vw);\n      p {\n        white-space: normal;\n        width: unset;\n        font-size: calc(0.4rem + 1vw) !important;\n      }\n    }\n    .currency1,\n    .currency2 {\n      margin-left: 0.15rem;\n      font-size: calc(0.4rem + 0.3vw) !important;\n    }\n  }\n"])));e.a=function(n){var e=n.img,t=n.productName,a=n.qty,r=n.price,c=n.id,i=n.isBuyNow,d=Object(s.b)();return o.a.createElement(m,null,o.a.createElement("div",{className:"firstDiv"},o.a.createElement(l.Link,{onClick:function(){return d({type:"PRODUCT_DETAIL_REQUEST"})},to:"/products/".concat(c).concat(i?"?order=buyNow":"")},o.a.createElement("img",{src:e,alt:"product"})),o.a.createElement("h1",null,o.a.createElement(l.Link,{onClick:function(){return d({type:"PRODUCT_DETAIL_REQUEST"})},to:"/products/".concat(c).concat(i?"?order=buyNow":"")},t))),o.a.createElement("div",{className:"secondDiv"},o.a.createElement("p",null,a," x ",r,o.a.createElement("span",{className:"currency1"},"EGP")," = ",(a*r).toFixed(2),o.a.createElement("span",{className:"currency2"},"EGP"))))}},342:function(n,e,t){"use strict";t.r(e);var a,r=t(13),c=t(0),o=t.n(c),i=t(14),l=t(3),s=t(12),m=t(121),d=t(135),p=t(19),u=t.n(p),b=t(28),g=t(21),h=t.n(g),f=function(n,e){return function(){var t=Object(b.a)(u.a.mark(function t(a,r){var c,o,i,l,s,m,d,p,b;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return c=r().userInfo,o=r().cart,i=r().buyNowProduct.product,t.prev=3,a({type:"CREATE_ORDER_REQUEST"}),l=h.a.CancelToken,s=l.source(),m={headers:{Content_Type:"application/json",Authorization:"Bearer ".concat(c.token)},cancelToken:s.token},d=function(){return!1===e?o.cartItems.map(function(n){return{name:n.name,qty:n.qty,image:n.image,price:n.price,product:n._id}}):[{name:i.name,qty:i.qty,image:i.image,price:i.price,product:i._id}]},t.next=11,h.a.post("/api/orders",{user:c.user._id,orderItems:d(),shippingAddress:{address:o.address.address,city:o.address.city,phoneNumber:o.address.phoneNumber,governorate:o.address.governorate,lat:o.address.location.lat,lon:o.address.location.lon},couponDiscount:o.couponDiscount?o.couponDiscount:0,paymentMethod:o.paymentMethod,taxPrice:o.taxes,shippingPrice:o.shipping,totalPrice:o.totalPrice,itemsPrice:o.itemsPrice,code:o.discount?o.discount.code.code:null,voucherRemaining:o.couponDiscount&&Number(o.couponDiscount)-o.totalPrice>0?Math.abs((Number(o.totalPrice)-Number(o.couponDiscount)).toFixed(2)):null},m);case 11:p=t.sent,b=p.data,e||(localStorage.removeItem("sickCartProducts"),n(0)),a({type:"CREATE_ORDER_SUCCESS",payload:b}),e||(o.cartItems=[]),o.taxes=null,o.totalPrice=null,o.shipping=null,t.next=25;break;case 21:t.prev=21,t.t0=t.catch(3),console.log(o),a({type:"CREATE_ORDER_FAIL",payload:t.t0.response&&t.t0.response.data.message?t.t0.response.data.message:t.t0.message});case 25:case"end":return t.stop()}},t,null,[[3,21]])}));return function(n,e){return t.apply(this,arguments)}}()},w=t(88),v=t(29),E=i.b.div(a||(a=Object(r.a)(["\n  .lineSeperate {\n    display: none;\n  }\n\n  .shipping-section p,\n  .payment-section p {\n    width: 90%;\n  }\n  button {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    padding: 0.55rem 0.5rem;\n    border: none;\n    background: #00b2d8;\n    color: white;\n    border-radius: 6px;\n    font-size: calc(1.2rem + 0.3vw);\n    cursor: pointer;\n    transition: 0.1s;\n    margin: 0 calc(1.1rem + 0.3vw);\n    margin-bottom: calc(0.8rem + 0.3vw);\n    &:hover {\n      background: #00a8ce;\n    }\n    #loader:first-child {\n      width: calc(0.9rem + 0.5vw);\n      height: calc(0.9rem + 0.5vw);\n      margin-left: 0.45rem;\n      #greybackground path {\n        stroke: white;\n      }\n    }\n  }\n  .currency {\n    margin-left: 0.15rem;\n    font-size: calc(0.6rem + 0.3vw) !important;\n    &.free {\n      display: none;\n    }\n  }\n  .table {\n    box-shadow: -2px 2px 8px rgba(0, 0, 0, 0.1);\n    border-radius: 10px;\n    margin-top: 1rem;\n    display: flex;\n    flex-direction: column;\n    align-items: stretch;\n    border: 1px solid rgba(0, 0, 0, 7.5%);\n    flex: 1 1 auto;\n    h1 {\n      font-size: calc(1rem + 0.3vw);\n      font-weight: 400;\n      padding: 0 calc(1.1rem + 0.3vw);\n    }\n    p {\n      font-size: calc(1rem + 0.3vw);\n      margin-left: calc(2.4rem + 1vw);\n    }\n    .title {\n      font-size: calc(1.48rem + 0.3vw);\n      font-weight: 500;\n      padding-top: calc(0.8rem + 0.3vw);\n      padding-bottom: calc(0.5rem + 0.3vw);\n      color: #1a1a1a;\n      margin-right: calc(1.7rem + 0.6vw);\n      white-space: nowrap;\n    }\n\n    .row {\n      padding: 0.5rem 0;\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      border-top: 1px solid rgba(0, 0, 0, 7.5%);\n      margin: 0 calc(1.1rem + 0.3vw);\n      h1 {\n        padding: unset !important;\n        color: #1a1a1a;\n        font-size: calc(0.83rem + 0.3vw);\n      }\n      p {\n        color: #1a1a1a;\n        font-size: calc(0.83rem + 0.3vw);\n      }\n      span {\n        color: #1a1a1a;\n      }\n    }\n    .row1 {\n      border-top: unset;\n      padding-top: 0;\n    }\n    .row4 {\n      margin-bottom: calc(0.5rem + 0.3vw);\n      h1 {\n        color: #1a1a1a;\n      }\n      p {\n        color: #1a1a1a;\n        margin-left: calc(1.5rem + 1vw);\n        display: flex;\n        align-items: center;\n      }\n      p.discount {\n        font-weight: 500;\n      }\n      span {\n        color: #1a1a1a;\n      }\n      .lastPrice {\n        margin-right: 0.4rem;\n        text-decoration: line-through;\n        font-size: calc(0.71rem + 0.3vw);\n        font-weight: 400 !important;\n      }\n    }\n  }\n  .section {\n    h1 {\n      padding-bottom: 0.8rem;\n      padding-top: 0.8rem;\n      font-weight: 500;\n      color: #1a1a1a;\n      font-size: calc(1.8rem + 0.3vw);\n    }\n    &:first-child h1 {\n      padding-top: unset;\n    }\n    p {\n      color: #1a1a1a;\n      padding-bottom: 0.8rem;\n      font-size: calc(0.8rem + 0.3vw);\n    }\n    border-bottom: 1px solid rgba(0, 0, 0, 12.5%);\n    &:last-child {\n      border-bottom: unset;\n    }\n  }\n  .content {\n    width: 85%;\n    margin: 0 auto;\n    margin-top: 1.8rem;\n    margin-bottom: 1rem;\n    display: flex;\n    justify-content: center;\n    align-items: flex-start;\n    gap: calc(1.5rem + 0.3vw);\n    .summary {\n      flex: 1 1 75%;\n    }\n  }\n\n  @media screen and (max-width: 1050px) {\n    .lineSeperate {\n      display: block;\n      border-radius: 1px;\n      width: 45%;\n      height: 2px;\n      background: rgba(0, 176, 216, 62%);\n      margin: calc(1.3rem + 0.5vh) auto;\n      margin-top: calc(1.45rem + 0.5vh);\n    }\n    .currency {\n      margin-left: 0.1rem;\n      font-size: calc(0.55rem + 0.3vw) !important;\n    }\n    .content {\n      flex-direction: column;\n      width: 90%;\n      gap: unset !important;\n    }\n    .summary {\n      order: 2;\n      width: 100%;\n    }\n\n    .table {\n      width: 100%;\n      margin-top: 0;\n      border: unset;\n      box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.12);\n      .title {\n        font-size: calc(1.55rem + 0.3vw);\n        padding-bottom: calc(0.8rem + 0.3vw - 0.5rem);\n        padding-top: calc(1rem + 0.3vw);\n        margin-right: unset;\n      }\n      .row1 {\n        border-top: unset !important;\n      }\n      .row4 {\n        margin-bottom: calc(0.8rem + 0.3vw - 0.5rem) !important;\n      }\n      .row {\n        border-top: 1px solid rgba(0, 0, 0, 5%);\n        padding: 0.5rem 0;\n        margin: 0 calc(1.1rem + 0.3vw);\n      }\n      .row h1,\n      .row p {\n        font-size: calc(0.9rem + 0.3vw);\n      }\n      button {\n        font-size: calc(1.1rem + 0.3vw);\n      }\n      .row {\n        padding: 0.5rem 0;\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n        border-top: 1px solid rgba(0, 0, 0, 7.5%);\n        margin: 0 calc(1.1rem + 0.3vw);\n        h1 {\n          padding: unset !important;\n          color: #1a1a1a;\n          font-size: calc(0.83rem + 0.3vw);\n        }\n        p {\n          color: #1a1a1a;\n          font-size: calc(0.83rem + 0.3vw);\n        }\n        span {\n          color: #1a1a1a;\n        }\n      }\n    }\n    .section {\n      h1 {\n        padding-bottom: 0.4rem;\n        padding-top: 0.8rem;\n        font-weight: 500;\n        color: #1a1a1a;\n        font-size: calc(1.55rem + 0.3vw);\n      }\n      &:first-child h1 {\n        padding-top: unset;\n      }\n      p {\n        padding-bottom: 0.8rem;\n        color: #1a1a1a;\n        font-size: calc(0.52rem + 1vw) !important;\n      }\n      border-bottom: 1px solid rgba(0, 0, 0, 12.5%);\n      &:last-child {\n        border-bottom: unset;\n      }\n    }\n  }\n"])));e.default=function(n){var e=n.setCartCount,t=Object(s.b)(),a=Object(s.c)(function(n){return n.buyNowProduct}).product;function r(n){return n.length>30?n.substr(0,29)+"..":n}var i=Object(s.c)(function(n){return n.cart}),p=i.address,u=i.cartItems,b=i.paymentMethod,g=i.discount,h=Object(s.c)(function(n){return n.userInfo}).user,y=Object(s.c)(function(n){return n.cart}),x=Object(l.k)(),N=Object(l.l)(),k="buyNow"===N.search.split("=")[1];Object(c.useEffect)(function(){"placeorder"!==N.pathname.split("/")[1].toLocaleLowerCase()||h.name||x.push("buyNow"===N.search.split("=")[1]?"/login?redirect=placeOrder?order=buyNow":"/login?redirect=placeOrder")},[x,N,h]);var P=u.map(function(n){return n.price*n.qty}),O=k?a.price.toFixed(2):P.length?P.reduce(function(n,e){return n+e}).toFixed(2):0,j=function(n){return Number(n).toFixed(2)},z=function(){return g?j(g.code.amount/100*(Number(O)+14*Number(O)/100)):0};y.taxes=j(14*Number(O)/100),y.totalPrice=Number(O),y.shipping=j(50),y.itemsPrice=O,y.totalPrice=Math.abs(j(Number(O)+50+14*Number(O)/100-z())),y.couponDiscount=g?z():0;var D=Object(s.c)(function(n){return n.order}),L=D.order,_=D.orderLoading,R=D.orderPlaced,T=D.error;return Object(c.useEffect)(function(){R&&(localStorage.removeItem("sickDiscount"),x.push("/orders/".concat(L._id)))},[R,x]),Object(c.useEffect)(function(){y.paymentMethod&&p.display_address&&(y.cartItems.length||!1!==R)||(console.log("orderPlaced:",R),x.push("/cart"))},[u,p.display_address]),o.a.createElement(E,null,o.a.createElement(m.a,{step1:!0,step2:!0,step3:!0,step4:!0,current:"step4"}),o.a.createElement("div",{className:"content"},o.a.createElement("div",{className:"summary"},o.a.createElement(w.a,{vibrating:"true",visiblity:!!T,msg:T?T.includes("timed out")?"Network Error":T.includes("mongo")?"Server Error":T.includes("Email isn't verified")?"returnTheThing":T:"Ok",hidden:!T,type:"error"}),o.a.createElement("div",{className:"shipping-section section"},o.a.createElement("h1",null,"Shipping :"),o.a.createElement("p",null,"Address: ",p.display_address)),o.a.createElement("div",{className:"payment-section section"},o.a.createElement("h1",null,"Payment Method :"),o.a.createElement("p",null,"Method: ",b)),o.a.createElement("div",{className:"order-section section"},o.a.createElement("h1",null,k||1===u.length?"Order Item :":"Order Items :"),k?o.a.createElement(d.a,{price:a.price,qty:a.qty,productName:r(a.name),img:a.image,id:a._id,isBuyNow:k}):u.map(function(n){return o.a.createElement(d.a,{price:n.price,qty:n.qty,productName:r(n.name),img:n.image,id:n._id})}))),o.a.createElement("div",{className:"table"},o.a.createElement("h1",{className:"title"},"Order Summary"),o.a.createElement("div",{className:"row1 row"},o.a.createElement("h1",null,"Items :"),o.a.createElement("p",null,O,o.a.createElement("span",{className:"currency"},"EGP"))),o.a.createElement("div",{className:"row2 row"},o.a.createElement("h1",null,"Shipping :"),o.a.createElement("p",null,j(50),o.a.createElement("span",{className:"currency"},"EGP"))),o.a.createElement("div",{className:"row3 row"},o.a.createElement("h1",null,"Tax :"),o.a.createElement("p",null,j(14*Number(O)/100),o.a.createElement("span",{className:"currency"},"EGP"))),g&&o.a.createElement("div",{className:"row5 row"},o.a.createElement("h1",null,"Discount :"),o.a.createElement("p",null,"-",j(z()),o.a.createElement("span",{className:"currency"},"EGP"))),o.a.createElement("div",{className:"row4 row"},o.a.createElement("h1",null,"Total :"),o.a.createElement("p",{className:"".concat(g?"discount":"")},g&&o.a.createElement("h1",{className:"lastPrice"},j(Number(O)+50+14*Number(O)/100)),j(Number(O)+50+14*Number(O)/100)===z()?"Free":j(Number(O)+50+14*Number(O)/100+-z())>0?j(Number(O)+50+14*Number(O)/100+-z()):"+"+Math.abs(j(Number(O)+50+14*Number(O)/100+-z())),o.a.createElement("span",{className:"currency ".concat(j(Number(O)+50+14*Number(O)/100)===z()?"free":"")},"EGP"))),o.a.createElement("button",{onClick:function(){t(f(e,k))}},"Place Order ",_&&o.a.createElement(v.a,null))),o.a.createElement("div",{className:"lineSeperate"})))}},88:function(n,e,t){"use strict";var a,r=t(13),c=t(0),o=t.n(c),i=t(14),l=t(18),s=i.b.div(a||(a=Object(r.a)(["\n  span {\n    a {\n      color: #0084a0;\n      &:hover {\n        text-decoration: underline;\n      }\n    }\n  }\n  &.active {\n    animation: shake 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;\n  }\n  @keyframes shake {\n    10%,\n    90% {\n      transform: translate3d(-1px, 0, 0);\n    }\n\n    20%,\n    80% {\n      transform: translate3d(2px, 0, 0);\n    }\n\n    30%,\n    50%,\n    70% {\n      transform: translate3d(-4px, 0, 0);\n    }\n\n    40%,\n    60% {\n      transform: translate3d(4px, 0, 0);\n    }\n  }\n"])));e.a=function(n){var e=n.msg,t=n.type,a=void 0===t?"ok":t,r=n.visiblity,c=void 0===r||r,i=n.vibrating,m=n.hidden,d=void 0!==m&&m;return o.a.createElement(s,{className:"message ".concat(c&&i?"active":""),style:{background:"".concat("ok"===a?"#DCF1F7":"#F7DDDC"),padding:"0.65rem 1.1rem",borderRadius:"5px",border:"1px solid rgba(56, 0, 0, 0.08)",opacity:"".concat(c?1:0),pointerEvents:"".concat(c?"all":"none"),height:"".concat(c?"100%":"20px"),display:"".concat(d?"none":"inline-block")}},o.a.createElement("span",{style:{fontWeight:500,color:"".concat("ok"===a?"#306F83":"#712B29"),fontSize:"calc(0.8rem + 0.5vw)",display:"".concat(d?"none":"block")}},"returnTheThing"===e?o.a.createElement("p",null,"Email isn't Verified"," ",o.a.createElement(l.Link,{to:"/verify?redirect=/placeOrder"},"Verify Email")):e))}}}]);
//# sourceMappingURL=20.9f452f51.chunk.js.map