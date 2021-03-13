(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{112:function(n,e,t){"use strict";var a=t(0),r=t.n(a);e.a=function(n){var e=n.ratingValue,t=n.numOfReviews;return r.a.createElement("div",{className:"starsRating"},function(){for(var n=[],t=[],a=Math.round(10*e)/10,c=.5;c<5;c+=.5)a>=c&&n.push(.5);if(Number.isInteger(n.length/2))for(var o=0;o<n.length/2;o++)t.push(r.a.createElement("i",{key:"star".concat(t.length),className:"fas fa-star"}));else{for(var i=0;i<Math.floor(n.length/2);i++)t.push(r.a.createElement("i",{key:"star".concat(t.length),className:"fas fa-star"}));t.push(r.a.createElement("i",{key:"star".concat(t.length),className:"fas fa-star-half-alt"}))}for(;t.length<5;)for(var s=0;s<5-t.length;s++)t.push(r.a.createElement("i",{key:"star".concat(t.length),className:"far fa-star"}));return t}(),r.a.createElement("div",{className:"ratingCount"},r.a.createElement("span",null,"(",t,")")))}},114:function(n,e,t){"use strict";t.d(e,"a",function(){return l}),t.d(e,"c",function(){return m}),t.d(e,"b",function(){return d});var a=t(1),r=t(19),c=t.n(r),o=t(28),i=t(21),s=t.n(i),l=function(n,e){return function(){var t=Object(o.a)(c.a.mark(function t(a,r){var o,i,l,m,d,u,p;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(o=r().product.product,i=o,0!==Object.keys(i).length){t.next=10;break}return l=s.a.CancelToken,m=l.source(),t.next=7,s.a.get("/api/products/".concat(n),{cancelToken:m.token});case 7:d=t.sent,u=d.data,i=u;case 10:r().cart.cartItems.find(function(e){return e._id===n})||a({type:"ADD_ITEM_TO_CART",payload:{name:i.name,qty:e,image:i.image,price:i.price,_id:i._id,rating:i.rating,numReviews:i.numReviews,countInStock:i.countInStock,brand:i.brand}}),p=r().cart.cartItems,localStorage.setItem("sickCartProducts",JSON.stringify(p));case 14:case"end":return t.stop()}},t)}));return function(n,e){return t.apply(this,arguments)}}()},m=function(n,e){return function(){var t=Object(o.a)(c.a.mark(function t(r,o){var i,s;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:i=o().cart.cartItems,i.find(function(e){return e._id===n._id}).qty!==e&&(s=i.map(function(t){return t._id===n._id?Object(a.a)({},t,{qty:e}):t}),r({type:"UPDATE_ITEM_QTY",payload:s}),localStorage.setItem("sickCartProducts",JSON.stringify(s)));case 3:case"end":return t.stop()}},t)}));return function(n,e){return t.apply(this,arguments)}}()},d=function(n){return function(){var e=Object(o.a)(c.a.mark(function e(t,a){var r,o;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:r=a().cart.cartItems,o=r.filter(function(e){return e._id!==n._id}),t({type:"REMOVE_ITEM",payload:o}),localStorage.setItem("sickCartProducts",JSON.stringify(o));case 4:case"end":return e.stop()}},e)}));return function(n,t){return e.apply(this,arguments)}}()}},133:function(n,e,t){"use strict";t.d(e,"b",function(){return s}),t.d(e,"a",function(){return l});var a=t(19),r=t.n(a),c=t(28),o=t(21),i=t.n(o),s=function(){return function(){var n=Object(c.a)(r.a.mark(function n(e){var t,a,c,o;return r.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,e({type:"PRODUCT_LIST_REQUEST"}),t=i.a.CancelToken,a=t.source(),n.next=6,i.a.get("/api/products",{cancelToken:a.token});case 6:c=n.sent,o=c.data,e({type:"PRODUCT_LIST_SUCCESS",payload:o}),n.next=14;break;case 11:n.prev=11,n.t0=n.catch(0),e({type:"PRODUCT_LIST_FAIL",payload:n.t0.response&&n.t0.response.data.message?n.t0.response.data.message:n.t0.message});case 14:case"end":return n.stop()}},n,null,[[0,11]])}));return function(e){return n.apply(this,arguments)}}()},l=function(n){return function(){var e=Object(c.a)(r.a.mark(function e(t){var a,c,o,s;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a=i.a.CancelToken,c=a.source(),t({type:"PRODUCT_DETAIL_REQUEST"}),e.next=6,i.a.get("/api/products/".concat(n),{cancelToken:c.token});case 6:o=e.sent,s=o.data,t({type:"PRODUCT_DETAIL_SUCCESS",payload:s}),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),t({type:"PRODUCT_DETAIL_FAIL",payload:e.t0.response&&e.t0.response.data.message?e.t0.response.data.message:e.t0.message});case 14:case"end":return e.stop()}},e,null,[[0,11]])}));return function(n){return e.apply(this,arguments)}}()}},134:function(n,e,t){"use strict";var a,r=t(13),c=t(20),o=t(0),i=t.n(o),s=t(90),l=t.n(s),m=t(14),d=t(12),u=t(114),p=m.b.div(a||(a=Object(r.a)(["\n  .select {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    padding: 0.25rem 1.5rem;\n    background: #f4f4f4;\n    position: relative;\n    border-radius: 5px;\n    cursor: pointer;\n    h1 {\n      font-weight: 400;\n      color: #1a1a1a;\n    }\n    .drop-menu {\n      z-index: 2;\n      padding-top: 0.2rem;\n      box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);\n      border: 1px solid rgba(52, 58, 64, 0.16);\n      position: absolute;\n      left: 0;\n      bottom: 0;\n      transform: translate(0, 100%);\n      display: none;\n      background: #ffff;\n      width: 120%;\n      max-height: 180px;\n      overflow-y: scroll;\n      border-radius: 5px;\n      border-top-left-radius: 3px;\n      border-top-right-radius: 3px;\n      &.active {\n        display: block;\n      }\n      p {\n        font-size: calc(0.9rem + 0.3vw);\n        padding: 0.3rem 0;\n        padding-left: 1rem;\n        border-radius: 4px;\n        margin: 0.2rem;\n        color: #253858;\n        border-bottom: unset !important;\n        &:last-child {\n          margin-bottom: 0;\n          margin-bottom: 0.2rem;\n        }\n        &:hover {\n          background: rgba(222, 235, 255, 0.5);\n        }\n        &.active {\n          background: #00b2d8;\n          color: white;\n        }\n      }\n    }\n    img {\n      transform: rotate(270deg);\n      height: 14px;\n    }\n    h1 {\n      margin-right: 0.7rem;\n      font-size: calc(1rem + 0.3vw) !important;\n    }\n  }\n  @media screen and (max-width: 1050px) {\n    .select {\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      padding: 0.32rem 1.4rem;\n      background: #f4f4f4;\n      position: relative;\n      border-radius: 5px;\n\n      cursor: pointer;\n      .drop-menu {\n        padding-top: 0.2rem;\n        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);\n        border: 1px solid rgba(52, 58, 64, 0.2);\n        position: absolute;\n        left: 0;\n        top: 0;\n        transform: translate(-20%, -100%);\n        display: none;\n        background: #ffff;\n        width: 120%;\n        height: 140px;\n        overflow-y: scroll;\n        border-radius: 5px;\n        border-bottom-left-radius: 0;\n        border-bottom-right-radius: 0;\n        &.active {\n          display: block;\n        }\n        p {\n          font-size: calc(0.9rem + 0.3vw);\n          padding: 0.35rem 0;\n          padding-left: 1rem;\n          margin-bottom: 0.2rem;\n          border-bottom: 0.2px solid rgba(0, 0, 0, 0.15);\n          &:last-child {\n            margin-bottom: 0;\n            margin-bottom: 0.2rem;\n            border-bottom: unset;\n          }\n          &:hover {\n            background: #f5f5f5;\n          }\n        }\n      }\n      img {\n        transform: rotate(270deg);\n        width: 6px !important;\n        height: unset !important;\n      }\n      h1 {\n        margin-right: 0.7rem;\n        font-size: calc(1rem + 0.3vw) !important;\n      }\n    }\n  }\n"])));e.a=function(n){var e=n.product,t=n.cartItems,a=n.qty,r=n.setQty,s=n.cartCount,m=n.setCartCount,f=!!t&&t.find(function(n){return n._id===e._id}),g=Object(d.b)(),b=Object(o.useState)(!1),h=Object(c.a)(b,2),v=h[0],y=h[1];document.body.addEventListener("click",function(n){n.stopPropagation(),n.target.classList.contains("selectValue")||n.target.classList.contains("select")||n.target.classList.contains("arrowImg")||n.target.classList.contains("drop-menu")||n.target.classList.contains("option")||v&&y(!1)});var w,x=Object(o.useState)(a),k=Object(c.a)(x,2),E=k[0],O=k[1];return Object(o.useEffect)(function(){t&&f&&g(Object(u.c)(f,Number(a)))},[a,t,g,f]),i.a.createElement(p,null,i.a.createElement("div",{className:"select",onClick:function(){return y(!v)}},i.a.createElement("h1",{className:"selectValue"},a),i.a.createElement("img",{className:"arrowImg",src:l.a,alt:"arrow"}),i.a.createElement("div",{className:"drop-menu ".concat(v?"active":"")},function(){w=[];for(var n=1;n<e.countInStock+1;n++)w.push(i.a.createElement("p",{className:"option ".concat(E===n?"active":""),key:"selectOption".concat(w.length),onClick:function(n){if(r(n.target.innerText),O(Number(n.target.innerText)),f){var e=Number(n.target.innerText);e<=f.qty?m(s-(f.qty-e)):m(s+(e-f.qty))}}},n));return w}())))}},338:function(n,e,t){"use strict";t.r(e);var a,r=t(13),c=t(19),o=t.n(c),i=t(28),s=t(20),l=t(0),m=t.n(l),d=t(3),u=t(18),p=t(91),f=t(112),g=t(14),b=t(12),h=t(133),v=t(88),y=t(29),w=t(114),x=t(134),k=g.b.div(a||(a=Object(r.a)(["\n  .currency {\n    font-size: calc(0.2rem + 1vw);\n    margin-left: 0.15rem;\n  }\n  .mobile .starsRating,\n  .bottomInfo,\n  .mobile2 a {\n    display: none;\n  }\n  .bottomInfo {\n    width: 100%;\n    display: none;\n    justify-content: space-between;\n    align-items: center;\n    margin: calc(0.5rem + 0.3vh) 0;\n    h3 {\n      font-size: calc(1.25rem + 1vw);\n    }\n    .selectMobile {\n      display: flex;\n      align-items: center;\n      h1 {\n        font-size: calc(0.9rem + 1vw);\n        margin-right: 0.5rem;\n      }\n      .select img {\n        height: 12px;\n      }\n    }\n  }\n  width: 90%;\n  margin: 0 auto;\n  .details {\n    margin-top: 1rem;\n    display: flex;\n    justify-content: space-between;\n    align-items: flex-start;\n    gap: calc(1rem + 0.5vw);\n    .category {\n      font-size: calc(0.3rem + 1vw) !important;\n    }\n    .productImg {\n      min-width: 42%;\n      width: 100%;\n      height: 100%;\n      object-fit: cover;\n      border-radius: 10px;\n      max-width: 37rem;\n      img {\n        border-radius: 10px;\n        display: block;\n        width: 100%;\n        height: 100%;\n        object-fit: cover;\n      }\n    }\n    .description,\n    .productImg {\n      flex: 1 1 12rem;\n    }\n\n    .description,\n    .table {\n      display: flex;\n      flex-direction: column;\n      align-items: flex-start;\n      justify-content: space-between;\n    }\n    .description {\n      .brand {\n        color: #00667b;\n      }\n      h4 {\n        font-weight: 500;\n        font-size: calc(1.1rem + 1vw);\n        color: #1a1a1a;\n      }\n      p {\n        color: #343a40;\n        margin: calc(0.1rem + 0.3vw) 0;\n        font-size: calc(0.4rem + 1vw);\n      }\n      p:first-child {\n        margin: unset;\n      }\n      h3 {\n        font-weight: 400;\n        color: #1a1a1a;\n        font-size: calc(0.35rem + 1vw);\n      }\n      .starsRating {\n        margin-top: calc(0.3rem + 0.2vw);\n        i {\n          font-size: calc(1.3rem + 0.3vw);\n        }\n      }\n    }\n  }\n  .mobile-btn,\n  .mobile-btn {\n    display: none !important;\n  }\n  .table {\n    padding: calc(1rem + 0.3vw);\n    box-shadow: -2px 2px 8px rgba(0, 0, 0, 0.1);\n    border-radius: 10px;\n    align-items: stretch !important;\n\n    h1,\n    h3 {\n      font-weight: 400;\n      color: #1a1a1a;\n    }\n    .price,\n    .quantity,\n    .status {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      margin-bottom: calc(0.7rem + 0.3vw);\n\n      h1 {\n        font-size: calc(0.6rem + 1vw);\n      }\n      h3 {\n        font-size: calc(0.45rem + 1vw);\n      }\n    }\n\n    .price h1 {\n      padding-right: calc(5.5rem + 1vw);\n    }\n\n    .add,\n    .buy {\n      display: grid;\n      place-items: center;\n      padding: 0.8rem 2.8rem;\n      border-radius: 5px;\n      cursor: pointer;\n      transition: 0.2s ease;\n\n      &:hover {\n        background: #007e9b;\n      }\n      h1 {\n        color: white;\n        font-weight: 400;\n        font-size: calc(0.9rem + 0.3vw);\n      }\n    }\n    .buy {\n      margin-top: 0.5rem;\n      background: #00b2d8;\n      &:hover {\n        background: #00add4;\n      }\n    }\n    div:last-child {\n      margin-bottom: 0 !important;\n    }\n  }\n  @media screen and (max-width: 1050px) {\n    .currency {\n      font-size: calc(0.7rem + 1vw);\n      margin-left: 0.15rem;\n    }\n    .mobile-btn,\n    .mobile-btn {\n      display: grid !important;\n    }\n    .select {\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      padding: 0.32rem 1.4rem;\n      background: #f4f4f4;\n      position: relative;\n      border-radius: 5px;\n\n      cursor: pointer;\n      .drop-menu {\n        padding-top: 0.2rem;\n        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);\n        border: 1px solid rgba(52, 58, 64, 0.2);\n        position: absolute;\n        left: 0;\n        top: 0;\n        transform: translate(-20%, -100%);\n        display: none;\n        background: #ffff;\n        width: 120%;\n        max-height: 140px;\n        overflow-y: scroll;\n        border-radius: 5px;\n        border-bottom-left-radius: 0;\n        border-bottom-right-radius: 0;\n        &.active {\n          display: block;\n        }\n        p {\n          font-size: calc(0.9rem + 0.3vw);\n          padding: 0.35rem 0;\n          padding-left: 1rem;\n          margin-bottom: 0.2rem;\n          border-bottom: 0.2px solid rgba(0, 0, 0, 0.15);\n          &:last-child {\n            margin-bottom: 0;\n            margin-bottom: 0.2rem;\n            border-bottom: unset;\n          }\n          &:hover {\n            background: #f5f5f5;\n          }\n        }\n      }\n      img {\n        transform: rotate(270deg);\n        width: 6px !important;\n        height: unset !important;\n      }\n      h1 {\n        margin-right: 0.7rem;\n        font-size: calc(1rem + 0.3vw) !important;\n      }\n    }\n    h1,\n    h3 {\n      font-weight: 400;\n      color: #1a1a1a;\n    }\n    .price,\n    .quantity,\n    .status {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      margin-bottom: calc(0.7rem + 0.3vw);\n\n      h1 {\n        font-size: calc(0.6rem + 1vw);\n      }\n      h3 {\n        font-size: calc(0.45rem + 1vw);\n      }\n    }\n\n    .price h1 {\n      padding-right: calc(5.5rem + 1vw);\n    }\n    .add,\n    .buy {\n      display: grid;\n      place-items: center;\n      padding: 0.8rem 2.8rem;\n      border-radius: 5px;\n      cursor: pointer;\n      transition: 0.2s ease;\n      &:hover {\n        background: #007e9b;\n      }\n      h1 {\n        color: white;\n        font-weight: 400;\n        font-size: calc(1rem + 0.3vw);\n      }\n    }\n    .buy {\n      margin-top: 0.5rem;\n      background: #00b2d8;\n      &:hover {\n        background: #00add4;\n      }\n    }\n    /* / */\n    .bottomInfo {\n      display: flex;\n      h3 {\n        display: block !important;\n      }\n    }\n    .starsRating {\n      display: none;\n    }\n    .mobile2 {\n      width: 100%;\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      a {\n        display: block;\n        color: #1a1a1a;\n        text-decoration: underline;\n        text-underline-offset: 1px;\n      }\n    }\n    .mobile {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      width: 100%;\n\n      .brand {\n        font-size: calc(0.85rem + 0.3vw) !important;\n      }\n      .starsRating {\n        display: block;\n        margin: 0 !important;\n        margin-right: 0.9rem !important;\n        i {\n          font-size: calc(1rem + 0.3vw) !important;\n        }\n      }\n    }\n    .description {\n      h4 {\n        font-size: calc(1.2rem + 1vw) !important;\n      }\n    }\n    .details {\n      margin: 0.7rem 0 !important;\n      flex-wrap: wrap;\n      gap: calc(0.7rem + 0.5vw);\n      .category {\n        font-size: calc(0.85rem + 0.3vw) !important;\n        margin: 0 !important;\n        margin-top: calc(0.1rem + 0.3vw) !important;\n      }\n      h3 {\n        display: none;\n      }\n      .productImg {\n        order: 2;\n        min-width: unset;\n        width: 100%;\n        height: 100%;\n        object-fit: cover;\n        border-radius: 10px;\n        max-width: unset;\n      }\n      .productImg,\n      .description {\n        flex: 1 1 500rem !important;\n      }\n      .table {\n        display: none;\n      }\n    }\n  }\n  .details {\n    margin: 0.7rem 0 !important;\n  }\n"])));e.default=function(n){var e=n.cartCount,t=n.setCartCount,a=Object(d.l)(),r="buyNow"===a.search.split("=")[1],c=a.pathname.split("/")[2],g=localStorage.getItem("sickCartProducts")?JSON.parse(localStorage.getItem("sickCartProducts")):[],E=g?g.find(function(n){return n._id===c}):void 0,O=Object(l.useState)(E?E.qty:1),N=Object(s.a)(O,2),j=N[0],C=N[1],I=Object(d.k)(),S=Object(b.b)(),_=Object(b.c)(function(n){return n.product}),T=_.product,z=_.error,R=_.loading,L=Object(b.c)(function(n){return n.cart}).cartItems,P=Object(l.useState)(!1),D=Object(s.a)(P,2),q=D[0],A=D[1];Object(l.useEffect)(function(){!function(){var n=Object(i.a)(o.a.mark(function n(){return o.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if(T.price||q){n.next=6;break}return console.log(a.search.split("=")[1],q),A(!0),n.next=5,S(Object(h.a)(c));case 5:A(!1);case 6:case"end":return n.stop()}},n)}));return function(){return n.apply(this,arguments)}}()()},[a.pathname,S,c,a.search,T,q]);var U=function(){r||(S(function(n){return function(){var e=Object(i.a)(o.a.mark(function e(t,a){var r,c;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:r=a().product.product,t({type:"ADD_TO_BUYNOW_CART",payload:{name:(c=r).name,qty:n,image:c.image,price:c.price,_id:c._id,rating:c.rating,numReviews:c.numReviews,countInStock:c.countInStock,brand:c.brand}});case 3:case"end":return e.stop()}},e)}));return function(n,t){return e.apply(this,arguments)}}()}(j)),I.push("/shipping?order=buyNow"))},F=function(){var n=!!L&&L.find(function(n){return n._id===c});n?n&&(S(Object(w.b)(n)),t(Number(e)-Number(j))):(S(Object(w.a)(c,j)),t(Number(e)+Number(j)))};return m.a.createElement(k,null,m.a.createElement(p.a,null),R?m.a.createElement(y.a,null):z?m.a.createElement(v.a,{type:"error",msg:z.includes("timed out")?"Network Error":z.includes("mongo")?"Server Error":z}):m.a.createElement("div",{className:"details"},m.a.createElement("div",{className:"productImg"},m.a.createElement("img",{src:T.image,alt:"product"}),m.a.createElement("div",{className:"bottomInfo"},m.a.createElement("h3",null,T.price,m.a.createElement("span",{className:"currency"},"EGP")),m.a.createElement("div",{className:"selectMobile"},m.a.createElement("h1",null,0!==T.countInStock?"In Stock":"Out Of Stock"),0!==T.countInStock&&m.a.createElement(x.a,{cartCount:e,setCartCount:t,qty:j,setQty:C,product:T,cartItems:L}))),0!==T.countInStock&&m.a.createElement(m.a.Fragment,null,m.a.createElement("div",{className:"add mobile-btn",onClick:F,style:{background:"".concat(E?"#474f57 ":"#0084a0")}},m.a.createElement("h1",null,E?"Remove":"Add to Cart")),m.a.createElement("div",{className:"buy mobile-btn",onClick:U},m.a.createElement("h1",null,r?"Buying Process":"Buy Now")))),m.a.createElement("div",{className:"description"},m.a.createElement("div",{className:"mobile"},m.a.createElement("p",{className:"brand"},"Brand: ",T.brand),m.a.createElement(f.a,{ratingValue:T.rating,numOfReviews:T.numReviews})),m.a.createElement("h4",null,T.name),m.a.createElement("div",{className:"mobile2"},m.a.createElement("p",{className:"category"},"Category: ",T.category),m.a.createElement(u.Link,{to:"/product-description/".concat(a.pathname.split("/")[2])},"description")),m.a.createElement(f.a,{ratingValue:T.rating,numOfReviews:T.numReviews}),m.a.createElement("h3",null,T.description)),m.a.createElement("div",{className:"table"},m.a.createElement("div",{className:"price"},m.a.createElement("h1",null,"Price:"),m.a.createElement("h3",null,T.price,m.a.createElement("span",{className:"currency"},"EGP"))),m.a.createElement("div",{className:"status"},m.a.createElement("h1",null,"Status:"),m.a.createElement("h3",null,0===T.countInStock?"Out Of Stock":"In Stock")),0!==T.countInStock&&m.a.createElement(m.a.Fragment,null,m.a.createElement("div",{className:"quantity"},m.a.createElement("h1",null,"Qty:"),m.a.createElement(x.a,{cartCount:e,setCartCount:t,qty:j,setQty:C,product:T,cartItems:L})),m.a.createElement("div",{className:"add",onClick:F,style:{background:"".concat(E?"#474f57 ":"#0084a0")}},m.a.createElement("h1",null,E?"Remove":"Add to Cart")),m.a.createElement("div",{className:"buy",onClick:U},m.a.createElement("h1",null,r?"Buying Process":"Buy Now"))))))}},88:function(n,e,t){"use strict";var a,r=t(13),c=t(0),o=t.n(c),i=t(14),s=t(18),l=i.b.div(a||(a=Object(r.a)(["\n  span {\n    a {\n      color: #0084a0;\n      &:hover {\n        text-decoration: underline;\n      }\n    }\n  }\n  &.active {\n    animation: shake 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;\n  }\n  @keyframes shake {\n    10%,\n    90% {\n      transform: translate3d(-1px, 0, 0);\n    }\n\n    20%,\n    80% {\n      transform: translate3d(2px, 0, 0);\n    }\n\n    30%,\n    50%,\n    70% {\n      transform: translate3d(-4px, 0, 0);\n    }\n\n    40%,\n    60% {\n      transform: translate3d(4px, 0, 0);\n    }\n  }\n"])));e.a=function(n){var e=n.msg,t=n.type,a=void 0===t?"ok":t,r=n.visiblity,c=void 0===r||r,i=n.vibrating,m=n.hidden,d=void 0!==m&&m;return o.a.createElement(l,{className:"message ".concat(c&&i?"active":""),style:{background:"".concat("ok"===a?"#DCF1F7":"#F7DDDC"),padding:"0.65rem 1.1rem",borderRadius:"5px",border:"1px solid rgba(56, 0, 0, 0.08)",opacity:"".concat(c?1:0),pointerEvents:"".concat(c?"all":"none"),height:"".concat(c?"100%":"20px"),display:"".concat(d?"none":"inline-block")}},o.a.createElement("span",{style:{fontWeight:500,color:"".concat("ok"===a?"#306F83":"#712B29"),fontSize:"calc(0.8rem + 0.5vw)",display:"".concat(d?"none":"block")}},"returnTheThing"===e?o.a.createElement("p",null,"Email isn't Verified"," ",o.a.createElement(s.Link,{to:"/verify?redirect=/placeOrder"},"Verify Email")):e))}},90:function(n,e,t){n.exports=t.p+"static/media/gobackArrow.7e6c7659.svg"},91:function(n,e,t){"use strict";var a,r=t(13),c=t(0),o=t.n(c),i=t(90),s=t.n(i),l=t(14),m=t(3),d=t(18),u=t(30),p=l.b.div(a||(a=Object(r.a)(["\n  display: inline-block;\n  margin-top: 1rem;\n  .flexCont {\n    cursor: pointer;\n    border-radius: 7px;\n    padding: 0.7rem 0.9rem;\n    display: flex;\n    background: #f4f4f4;\n    transition: all 0.2s ease;\n    &:hover {\n      background: #f6f6f6;\n    }\n    img {\n      width: calc(0.28rem + 0.3vw);\n    }\n    h1 {\n      font-size: calc(0.7rem + 0.3vw);\n      font-weight: 400;\n      padding-left: 0.4rem;\n      color: #1a1a1a;\n    }\n  }\n  @media screen and (max-width: 1050px) {\n    margin-top: 0.7rem;\n    .flexCont {\n      padding: 0.6rem 0.8rem;\n      h1 {\n        font-size: calc(0.75rem + 0.3vw);\n      }\n      img {\n        width: calc(0.35rem + 0.3vw);\n      }\n    }\n  }\n"])));e.a=function(n){var e,t=n.toPath,a=n.providedClassName,r=n.text,c=void 0===r?"Go back":r,i="buyNow"===Object(m.l)().search.split("=")[1],l=Object(u.useLastLocation)();return console.log("LAST",l),e=t||(!l||l.pathname.includes("product-description")||l.pathname.includes("products")?"/":"".concat(l.pathname).concat(i?"?order=buyNow":"")),o.a.createElement(p,{className:"".concat(a||"")},o.a.createElement(d.Link,{to:e,className:"flexCont"},o.a.createElement("img",{src:s.a,alt:"arrow"}),o.a.createElement("h1",null,c)))}}}]);
//# sourceMappingURL=12.a3b2451b.chunk.js.map