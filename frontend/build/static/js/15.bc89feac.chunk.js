(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[15],{198:function(n,e,t){"use strict";var r,c=t(4),a=(t(0),t(5)),o=t(10),i=t(1),s=a.b.div(r||(r=Object(c.a)(["\n  .circle1 {\n    pointer-events: none !important;\n  }\n  h1 {\n    font-weight: 300;\n    font-size: calc(0.9rem + 0.2vw);\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    white-space: nowrap;\n    transform: translate(-50%, -154%);\n    a {\n      color: #343a40;\n    }\n  }\n  margin-top: 3.3rem;\n  .journeyLine {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n  .line {\n    width: calc(4rem + 4vw);\n    height: 4px;\n    background: #e4e4e4;\n    &.active {\n      background: #00b2d8;\n    }\n  }\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  .circle {\n    position: relative;\n    border-radius: 50%;\n    width: 21px;\n    height: 21px;\n    background: #e4e4e4;\n    pointer-events: none;\n    h1 a {\n      color: #b4b4b4;\n    }\n    &.active {\n      background: #00b2d8;\n      pointer-events: all;\n      h1 a {\n        font-weight: 400;\n        color: #343a40;\n      }\n    }\n  }\n  .current {\n    border: 2.7px solid #00b2d8;\n    background: transparent !important;\n    animation: pulse-blue 1s ease infinite;\n  }\n\n  @keyframes pulse-blue {\n    0% {\n      box-shadow: 0 0 0 0 rgba(52, 172, 224, 0.7);\n    }\n\n    70% {\n      box-shadow: 0 0 0 8px rgba(52, 172, 224, 0);\n    }\n\n    100% {\n      box-shadow: 0 0 0 0 rgba(52, 172, 224, 0);\n    }\n  }\n  @media screen and (max-width: 1050px) {\n    margin-top: 2.7rem;\n    .circle {\n      width: 17px;\n      height: 17px;\n    }\n    h1 {\n      font-size: calc(0.78rem + 0.2vw);\n      transform: translate(-50%, -157%);\n    }\n    .line {\n      width: calc(3.2rem + 4vw);\n      height: 2.5px;\n    }\n    .current {\n      border: 1.7px solid #00b2d8;\n    }\n    @keyframes pulse-blue {\n      0% {\n        box-shadow: 0 0 0 0 rgba(52, 172, 224, 0.7);\n      }\n\n      70% {\n        box-shadow: 0 0 0 6px rgba(52, 172, 224, 0);\n      }\n\n      100% {\n        box-shadow: 0 0 0 0 rgba(52, 172, 224, 0);\n      }\n    }\n  }\n"])));e.a=function(n){var e=n.step1,t=n.step2,r=n.step3,c=n.step4,a=n.current;return Object(i.jsx)(s,{children:Object(i.jsxs)("div",{className:"journeyLine",children:[Object(i.jsx)("div",{className:"circle circle1 ".concat(e?"active":""," ").concat("step1"===a?"current":""),children:Object(i.jsx)("h1",{children:Object(i.jsx)(o.Link,{to:"/login",children:"Sign In"})})}),Object(i.jsx)("div",{className:"line ".concat(t?"active":"")}),Object(i.jsx)(o.Link,{id:"RouterNavLink",to:"/shipping",className:"circle circle2 ".concat(t?"active":""," ").concat("step2"===a?"current":""),children:Object(i.jsx)("h1",{children:Object(i.jsx)(o.Link,{to:"/shipping",children:"Shipping"})})}),Object(i.jsx)("div",{className:"line ".concat(r?"active":"")}),Object(i.jsx)(o.Link,{id:"RouterNavLink",to:"/payment",className:"circle circle3 ".concat(r?"active":""," ").concat("step3"===a?"current":""),children:Object(i.jsx)("h1",{children:Object(i.jsx)(o.Link,{to:"/payment",children:"Payment"})})}),Object(i.jsx)("div",{className:"line ".concat(c?"active":"")}),Object(i.jsx)(o.Link,{id:"RouterNavLink",to:"/placeOrder",className:"circle circle4 ".concat(c?"active":"","  ").concat("step4"===a?"current":""),children:Object(i.jsx)("h1",{children:Object(i.jsx)(o.Link,{to:"/placeOrder",children:"Place Order"})})})]})})}},397:function(n,e,t){"use strict";t.r(e);var r,c=t(4),a=t(8),o=t(0),i=t(5),s=t(198),l=t(77),d=t(54),p=t(9),u=t.n(p),b=t(14),h=t(7),m=t(12),j=t(13),f=t.n(j),x=function(n){return function(){var e=Object(b.a)(u.a.mark((function e(t,r){var c,a,o,i,s;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=r().userInfo.token,t({type:"COUPON_REQUEST"}),e.prev=2,a=f.a.CancelToken,o=a.source(),i={headers:{Content_Type:"application/json",Authorization:"Bearer ".concat(c)},cancelToken:o.token},e.next=8,f.a.post("/api/coupons/use",{code:n},i);case 8:s=e.sent,t({type:"COUPON_SUCCESS",payload:s.data}),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(2),t({type:"COUPON_FAIL",payload:e.t0.response&&e.t0.response.data.message?e.t0.response.data.message:e.t0.message});case 15:case"end":return e.stop()}}),e,null,[[2,12]])})));return function(n,t){return e.apply(this,arguments)}}()},g=t(36),v=t(1),O=i.b.div(r||(r=Object(c.a)(["\n  .haveaCoupon {\n    margin-bottom: 0.5rem;\n    color: #0084a0;\n    cursor: pointer;\n    display: inline-block;\n    transition: 0.1s ease;\n    font-size: calc(0.82rem + 0.3vw);\n    &:hover {\n      color: #0093b4;\n    }\n  }\n  .couponCont {\n    position: relative;\n    display: inline-block;\n    width: 55%;\n    margin-bottom: 0.5rem;\n\n    .inputError {\n      position: absolute;\n      right: 0%;\n      top: 50%;\n      transform: translate(110%, -50%);\n      color: #ff6969;\n      font-size: calc(0.8rem + 0.3vw);\n      font-weight: 500;\n      &.ok {\n        color: #22cb84;\n      }\n    }\n    .CouponInput {\n      background: #f3f3f3;\n      border: none;\n      padding: 0.5rem 1rem;\n      border-radius: 6px;\n      width: 100%;\n      font-size: calc(0.9rem + 0.3vw);\n      display: inline-block;\n      padding-right: calc(3% + 0.5rem + 25px);\n    }\n    .Indication {\n      outline: none;\n      border: none;\n      position: absolute;\n      right: 4%;\n      top: 50%;\n      transform: translate(0, -50%);\n      width: 25px;\n      height: 25px;\n      background: url(",");\n      background-size: cover;\n      cursor: pointer;\n      border-radius: 50%;\n      &.idle {\n        background: rgba(71, 79, 87, 0.95);\n      }\n      &.error {\n        background: url(",");\n        background-size: cover;\n      }\n      #loader:first-child {\n        position: absolute;\n        right: 0%;\n        top: 0%;\n        transform: translate(0, -50%);\n        width: 25px;\n        height: 25px;\n        #greybackground path {\n          stroke: #25da8e;\n        }\n      }\n    }\n  }\n\n  .explaningWhy {\n    color: #e65959;\n    font-size: calc(0.7rem + 0.3vw);\n    font-weight: 500;\n  }\n  .disabled {\n    pointer-events: none;\n    opacity: 0.5;\n  }\n  .align {\n    display: flex;\n    justify-content: center;\n    align-items: flex-start;\n    flex-direction: column;\n    width: 52%;\n  }\n  width: 90%;\n  margin: 0 auto;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  margin-top: 1.8rem;\n  .methods {\n    margin-left: 0.7rem;\n  }\n  .couponIcons {\n    width: 24px;\n    height: 24px;\n    border-radius: 50%;\n  }\n  .select {\n    width: 100%;\n    display: flex;\n    justify-content: center;\n    align-items: flex-start;\n    flex-direction: column;\n    padding-left: 43px;\n    margin-bottom: 1.2rem;\n    border-left: 2px solid #dfdfdf;\n    input {\n      display: none;\n    }\n    .labelCont {\n      margin-bottom: 0.7rem;\n      position: relative;\n      .selectOption {\n        display: block;\n        width: 24px;\n        height: 24px;\n        border-radius: 50%;\n        box-shadow: inset 0px 0px 0px 2px #343a40;\n        position: absolute;\n        left: 0;\n        top: 50%;\n        transform: translate(-120%, -50%);\n        &.disabled {\n          pointer-events: none;\n          opacity: 0.5;\n        }\n      }\n      .activeSelect {\n        display: block;\n        width: 24px;\n        height: 24px;\n        border-radius: 50%;\n        position: absolute;\n        left: 0;\n        top: 50%;\n        transform: translate(-120%, -50%);\n      }\n    }\n    label {\n      font-size: calc(0.61rem + 1vw);\n      font-weight: 400;\n      cursor: pointer;\n      color: #1a1a1a;\n      &:last-child {\n        margin-bottom: unset;\n      }\n\n      &.active::before {\n        box-shadow: unset;\n        background: url(",");\n        background-size: cover;\n      }\n    }\n  }\n  .continue {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    padding: 0.45rem 0.9rem;\n    border: none;\n    background: #00b2d8;\n    color: white;\n    border-radius: 6px;\n    font-size: calc(1.1rem + 0.3vw);\n    cursor: pointer;\n    transition: 0.1s;\n    &:hover {\n      background: #00a8ce;\n    }\n  }\n  h1 {\n    color: #1a1a1a;\n    font-weight: 500;\n    font-size: calc(2rem + 1vw);\n    margin-bottom: 1.2rem;\n  }\n  @media screen and (max-width: 1050px) {\n    .explaningWhy {\n      transform: translateX(-2%) !important;\n    }\n    h1 {\n      font-size: calc(1.74rem + 1vw);\n    }\n    .continue {\n      font-size: calc(1.15rem + 0.3vw);\n      border-radius: 6px;\n      padding: 0.5rem 0.9rem;\n    }\n    .align {\n      width: 100%;\n    }\n    .select {\n      margin-bottom: 1.05rem;\n      padding-left: 33px;\n      label {\n        margin-bottom: 0.85rem;\n        font-size: calc(0.7rem + 1vw);\n\n        &::before {\n          content: '';\n          width: 18px;\n          height: 18px;\n          box-shadow: inset 0px 0px 0px 1.5px #343a40;\n        }\n        &.active::before {\n          box-shadow: unset;\n          background: url(",");\n          background-size: cover;\n        }\n      }\n    }\n  }\n"])),(function(n){return n.img}),(function(n){return n.img2}),(function(n){return n.img}),(function(n){return n.img}));e.default=function(){var n=Object(m.l)(),e="buyNow"===n.search.split("=")[1],t=Object(h.c)((function(n){return n.cart})),r=t.paymentMethod,c=t.address,i=t.cartItems,p=t.discount,j=t.loadingCoupon,f=t.errorCoupon,y=Object(h.c)((function(n){return n.buyNowProduct})).product,w=e?y.price*y.qty:i.map((function(n){return n.price*n.qty})),k=e?w:w.length?w.reduce((function(n,e){return n+e})):null,N=Object(h.c)((function(n){return n.userInfo})).user,C=Object(o.useState)(r&&r.length?r:"PayPal or Credit & Debit Cards"),P=Object(a.a)(C,2),S=P[0],z=P[1],E=Object(h.b)(),D=Object(m.k)();Object(o.useEffect)((function(){i.length||y.name||D.push("/cart")}),[i]),Object(o.useEffect)((function(){"payment"!==n.pathname.split("/")[1]||N.name||D.push("buyNow"===n.search.split("=")[1]?"/login?redirect=payment":"/login?redirect=payment?order=buyNow")}),[D,n,N]),Object(o.useEffect)((function(){c.city||D.push("buyNow"===n.search.split("=")[1]?"/shipping?order=buyNow":"/shipping")}),[D,n,N]);var I=Object(o.useState)(!!p),L=Object(a.a)(I,2),F=L[0],T=L[1],_=Object(o.useState)(!1),M=Object(a.a)(_,2),U=M[0],A=M[1],J=Object(o.useState)(p?p.code.code:""),R=Object(a.a)(J,2),W=R[0],Y=R[1];return Object(o.useEffect)((function(){p&&(E(function(n){return Object(b.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n&&localStorage.setItem("sickDiscount",JSON.stringify(n));case 1:case"end":return e.stop()}}),e)})))}(p)),A(p.code.amount+"% OFF"))}),[p]),Object(o.useEffect)((function(){f&&A(f)}),[f]),Object(v.jsxs)(v.Fragment,{children:[Object(v.jsx)(s.a,{step1:!0,step2:!0,step3:!0,current:"step3"}),Object(v.jsx)(O,{children:Object(v.jsxs)("div",{className:"align",children:[Object(v.jsx)("h1",{children:"Payment Method"}),Object(v.jsxs)("div",{className:"methods",children:[Object(v.jsxs)("div",{className:"select",children:[Object(v.jsx)("input",{type:"radio",id:"credit"}),Object(v.jsxs)("div",{className:"labelCont",children:[Object(v.jsx)("label",{className:"".concat("PayPal or Credit & Debit Cards"===S?"active":""),htmlFor:"credit",onClick:function(){return z("PayPal or Credit & Debit Cards")},children:"PayPal or Credit & Debit Cards"}),"PayPal or Credit & Debit Cards"===S?Object(v.jsx)(d.a,{className:"activeSelect"}):Object(v.jsx)("div",{className:"selectOption"})]}),Object(v.jsx)("input",{type:"radio",id:"delivery"}),Object(v.jsxs)("div",{className:"labelCont",children:[Object(v.jsx)("label",{className:"".concat("Cash on Delivery"===S?"active":""," ").concat(k<20||k>17e3?"disabled":""),htmlFor:"Cash on Delivery",onClick:function(){(!k<20||k>17e3)&&z("Cash on Delivery")},children:"Cash on Delivery"}),"Cash on Delivery"===S?Object(v.jsx)(d.a,{class:"activeSelect"}):Object(v.jsx)("div",{className:"selectOption ".concat(k<20||k>17e3?"disabled":"")})]}),k<20&&Object(v.jsx)("li",{className:"explaningWhy",children:"Your order is less than 20 EGP"}),k>17e3&&Object(v.jsx)("li",{className:"explaningWhy",children:"Your total cart value is above EGP 17,000"})]}),!F&&Object(v.jsx)("p",{className:"haveaCoupon",onClick:function(){return T(!0)},children:"Have a coupon or a voucher?"}),F&&Object(v.jsxs)("form",{className:"couponCont",onSubmit:function(n){n.preventDefault(),E(x(W))},children:[Object(v.jsx)("input",{placeholder:"Enter Code",className:"CouponInput",type:"text",value:W,onChange:function(n){return Y(n.target.value)}}),Object(v.jsxs)("button",{type:"submit",className:"Indication ".concat(f&&!j?"error":""," ").concat(!f&&!p||j?"idle":""),children:[!j&&!f&&!j&&p&&Object(v.jsx)(d.a,{className:"couponIcons"}),f&&!j&&Object(v.jsx)(l.a,{className:"couponIcons"}),j&&Object(v.jsx)(g.a,{})]}),Object(v.jsx)("div",{className:"inputError ".concat(f?"":"ok"),children:Object(v.jsx)("span",{children:U})})]}),Object(v.jsx)("button",{className:"continue",onClick:function(){var e;E((e=k<20||k>17e3?"PayPal or Credit & Debit Cards":S,function(){var n=Object(b.a)(u.a.mark((function n(t){return u.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:t({type:"SAVE_PAYMENT_METHOD",payload:e}),localStorage.setItem("sickPaymentMethod",JSON.stringify(e));case 2:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()));D.push("buyNow"===n.search.split("=")[1]?"/placeOrder?order=buyNow":"/placeOrder")},children:"Continue"})]})]})})]})}}}]);
//# sourceMappingURL=15.bc89feac.chunk.js.map