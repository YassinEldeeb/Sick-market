(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{135:function(n,e,t){"use strict";var a,r=t(13),i=t(0),o=t.n(i),c=t(14),s=t(18),m=t(12),l=c.b.div(a||(a=Object(r.a)(["\n  .currency1,\n  .currency2 {\n    margin-left: 0.15rem;\n    font-size: calc(0.6rem + 0.3vw) !important;\n  }\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  width: 100%;\n  padding: 0.5rem 0;\n  border-bottom: 1px solid rgba(0, 0, 0, 12.5%);\n  width: 95%;\n  &:last-child {\n    border-bottom: unset;\n  }\n  .firstDiv {\n    flex: 1 1 auto;\n    display: flex;\n    justify-content: flex-start;\n    align-items: center;\n    width: max-content;\n    img {\n      width: 5vw;\n      max-width: 100%;\n      object-fit: cover;\n      border-radius: 5px;\n      border: 0.5px solid rgba(0, 0, 0, 0.1);\n    }\n    h1 {\n      font-weight: 400 !important;\n      font-size: calc(0.9rem + 0.3vw) !important;\n      margin-left: 0.8rem !important;\n      padding-bottom: 0 !important;\n      padding-top: 0 !important;\n      a {\n        color: #1a1a1a;\n        &:hover {\n          text-decoration: underline;\n        }\n      }\n    }\n  }\n  .secondDiv {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    margin-left: calc(1.5rem + 1vw);\n    width: min-content;\n    p {\n      color: #343a40;\n      font-size: calc(0.75rem + 0.3vw) !important;\n      font-weight: 400 !important;\n      padding-bottom: 0 !important;\n      width: max-content;\n    }\n  }\n  @media screen and (max-width: 1050px) {\n    width: 100%;\n    .firstDiv {\n      flex: 1 1 67%;\n      img {\n        width: calc(3vw + 3rem) !important;\n        max-width: 100%;\n      }\n      h1 {\n        font-size: calc(0.53rem + 1vw) !important;\n      }\n    }\n    .secondDiv {\n      flex: 1 1 auto;\n      margin-left: calc(0.75rem + 1vw);\n      p {\n        white-space: normal;\n        width: unset;\n        font-size: calc(0.4rem + 1vw) !important;\n      }\n    }\n    .currency1,\n    .currency2 {\n      margin-left: 0.15rem;\n      font-size: calc(0.4rem + 0.3vw) !important;\n    }\n  }\n"])));e.a=function(n){var e=n.img,t=n.productName,a=n.qty,r=n.price,i=n.id,c=n.isBuyNow,d=Object(m.b)();return o.a.createElement(l,null,o.a.createElement("div",{className:"firstDiv"},o.a.createElement(s.Link,{onClick:function(){return d({type:"PRODUCT_DETAIL_REQUEST"})},to:"/products/".concat(i).concat(c?"?order=buyNow":"")},o.a.createElement("img",{src:e,alt:"product"})),o.a.createElement("h1",null,o.a.createElement(s.Link,{onClick:function(){return d({type:"PRODUCT_DETAIL_REQUEST"})},to:"/products/".concat(i).concat(c?"?order=buyNow":"")},t))),o.a.createElement("div",{className:"secondDiv"},o.a.createElement("p",null,a," x ",r,o.a.createElement("span",{className:"currency1"},"EGP")," = ",(a*r).toFixed(2),o.a.createElement("span",{className:"currency2"},"EGP"))))}},209:function(n,e){n.exports="data:image/png;base64,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"},210:function(n,e,t){n.exports=t.p+"static/media/close.b9bcb241.svg"},261:function(n){n.exports={v:"5.7.5",fr:30,ip:0,op:40,w:80,h:80,nm:"wrong",ddd:0,assets:[],layers:[{ddd:0,ind:1,ty:4,nm:"Shape Layer 3",sr:1,ks:{o:{a:0,k:100,ix:11},r:{a:0,k:90,ix:10},p:{a:0,k:[40,40,0],ix:2,l:2},a:{a:0,k:[4.25,4.25,0],ix:1,l:2},s:{a:0,k:[100,100,100],ix:6,l:2}},ao:0,shapes:[{ty:"gr",it:[{ind:0,ty:"sh",ix:1,ks:{a:0,k:{i:[[0,0],[0,0]],o:[[0,0],[0,0]],v:[[-5,13.5],[13.5,-5]],c:!1},ix:2},nm:"Path 1",mn:"ADBE Vector Shape - Group",hd:!1},{ty:"st",c:{a:0,k:[.8,0,0,1],ix:3},o:{a:0,k:100,ix:4},w:{a:0,k:3,ix:5},lc:2,lj:2,bm:0,nm:"Stroke 1",mn:"ADBE Vector Graphic - Stroke",hd:!1},{ty:"tr",p:{a:0,k:[0,0],ix:2},a:{a:0,k:[0,0],ix:1},s:{a:0,k:[100,100],ix:3},r:{a:0,k:0,ix:6},o:{a:0,k:100,ix:7},sk:{a:0,k:0,ix:4},sa:{a:0,k:0,ix:5},nm:"Transform"}],nm:"Shape 1",np:3,cix:2,bm:0,ix:1,mn:"ADBE Vector Group",hd:!1},{ty:"tm",s:{a:1,k:[{i:{x:[.667],y:[1]},o:{x:[.333],y:[0]},t:25,s:[0]},{t:33,s:[100]}],ix:1},e:{a:1,k:[{i:{x:[.833],y:[1]},o:{x:[.333],y:[0]},t:25,s:[0]},{t:33,s:[0]}],ix:2},o:{a:0,k:0,ix:3},m:1,ix:2,nm:"Trim Paths 1",mn:"ADBE Vector Filter - Trim",hd:!1}],ip:0,op:40,st:0,bm:0},{ddd:0,ind:2,ty:4,nm:"Shape Layer 2",sr:1,ks:{o:{a:0,k:100,ix:11},r:{a:0,k:0,ix:10},p:{a:0,k:[40,40,0],ix:2,l:2},a:{a:0,k:[4.25,4.25,0],ix:1,l:2},s:{a:0,k:[100,100,100],ix:6,l:2}},ao:0,shapes:[{ty:"gr",it:[{ind:0,ty:"sh",ix:1,ks:{a:0,k:{i:[[0,0],[0,0]],o:[[0,0],[0,0]],v:[[-5,13.5],[13.5,-5]],c:!1},ix:2},nm:"Path 1",mn:"ADBE Vector Shape - Group",hd:!1},{ty:"st",c:{a:0,k:[.8,0,0,1],ix:3},o:{a:0,k:100,ix:4},w:{a:0,k:3,ix:5},lc:2,lj:2,bm:0,nm:"Stroke 1",mn:"ADBE Vector Graphic - Stroke",hd:!1},{ty:"tr",p:{a:0,k:[0,0],ix:2},a:{a:0,k:[0,0],ix:1},s:{a:0,k:[100,100],ix:3},r:{a:0,k:0,ix:6},o:{a:0,k:100,ix:7},sk:{a:0,k:0,ix:4},sa:{a:0,k:0,ix:5},nm:"Transform"}],nm:"Shape 1",np:3,cix:2,bm:0,ix:1,mn:"ADBE Vector Group",hd:!1},{ty:"tm",s:{a:1,k:[{i:{x:[.667],y:[1]},o:{x:[.333],y:[0]},t:25,s:[0]},{t:33,s:[100]}],ix:1},e:{a:0,k:0,ix:2},o:{a:0,k:0,ix:3},m:1,ix:2,nm:"Trim Paths 1",mn:"ADBE Vector Filter - Trim",hd:!1}],ip:0,op:40,st:0,bm:0},{ddd:0,ind:4,ty:4,nm:"Circle Stroke",sr:1,ks:{o:{a:0,k:100,ix:11},r:{a:0,k:0,ix:10},p:{a:0,k:[39.022,39.022,0],ix:2,l:2},a:{a:0,k:[0,0,0],ix:1,l:2},s:{a:1,k:[{i:{x:[.667,.667,.667],y:[1,1,1]},o:{x:[.333,.333,.333],y:[0,0,0]},t:16,s:[100,100,100]},{i:{x:[.667,.667,.667],y:[1,1,1]},o:{x:[.333,.333,.333],y:[0,0,0]},t:22,s:[80,80,100]},{i:{x:[.667,.667,.667],y:[1,1,1]},o:{x:[.333,.333,.333],y:[0,0,0]},t:25,s:[120,120,100]},{t:29,s:[100,100,100]}],ix:6,l:2}},ao:0,shapes:[{ty:"gr",it:[{d:1,ty:"el",s:{a:0,k:[60,60],ix:2},p:{a:0,k:[0,0],ix:3},nm:"Ellipse Path 1",mn:"ADBE Vector Shape - Ellipse",hd:!1},{ty:"tm",s:{a:1,k:[{i:{x:[.667],y:[1]},o:{x:[.333],y:[0]},t:0,s:[0]},{t:16,s:[100]}],ix:1},e:{a:0,k:0,ix:2},o:{a:0,k:0,ix:3},m:1,ix:2,nm:"Trim Paths 1",mn:"ADBE Vector Filter - Trim",hd:!1},{ty:"st",c:{a:1,k:[{i:{x:[.833],y:[.833]},o:{x:[.167],y:[.167]},t:16,s:[.180392156863,.776470588235,.309803921569,1]},{i:{x:[.833],y:[.833]},o:{x:[.167],y:[.167]},t:23,s:[.180392156863,.776470588235,.309803921569,1]},{t:25,s:[.800000011921,0,0,1]}],ix:3},o:{a:0,k:100,ix:4},w:{a:0,k:3,ix:5},lc:2,lj:2,bm:0,nm:"Stroke 1",mn:"ADBE Vector Graphic - Stroke",hd:!1},{ty:"tr",p:{a:0,k:[.978,.978],ix:2},a:{a:0,k:[0,0],ix:1},s:{a:0,k:[100,100],ix:3},r:{a:0,k:0,ix:6},o:{a:0,k:100,ix:7},sk:{a:0,k:0,ix:4},sa:{a:0,k:0,ix:5},nm:"Transform"}],nm:"Ellipse 1",np:3,cix:2,bm:0,ix:1,mn:"ADBE Vector Group",hd:!1},{ty:"st",c:{a:0,k:[1,1,1,1],ix:3},o:{a:0,k:100,ix:4},w:{a:0,k:2,ix:5},lc:1,lj:1,ml:4,bm:0,nm:"Stroke 1",mn:"ADBE Vector Graphic - Stroke",hd:!1}],ip:0,op:40,st:0,bm:0}],markers:[]}},262:function(n){n.exports={v:"5.7.5",fr:30,ip:0,op:40,w:80,h:80,nm:"Success Checkmark",ddd:0,assets:[],layers:[{ddd:0,ind:1,ty:4,nm:"Check Mark",sr:1,ks:{o:{a:0,k:100,ix:11},r:{a:0,k:0,ix:10},p:{a:0,k:[40,40,0],ix:2,l:2},a:{a:0,k:[-1.312,6,0],ix:1,l:2},s:{a:0,k:[100,100,100],ix:6,l:2}},ao:0,shapes:[{ty:"gr",it:[{ind:0,ty:"sh",ix:1,ks:{a:0,k:{i:[[0,0],[0,0],[0,0]],o:[[0,0],[0,0],[0,0]],v:[[-15.75,8],[-8,16],[13.125,-4]],c:!1},ix:2},nm:"Path 1",mn:"ADBE Vector Shape - Group",hd:!1},{ty:"tm",s:{a:1,k:[{i:{x:[.667],y:[1]},o:{x:[.333],y:[0]},t:25,s:[0]},{t:33,s:[100]}],ix:1},e:{a:0,k:0,ix:2},o:{a:0,k:0,ix:3},m:1,ix:2,nm:"Trim Paths 1",mn:"ADBE Vector Filter - Trim",hd:!1},{ty:"st",c:{a:0,k:[.180392156863,.776470588235,.309803921569,1],ix:3},o:{a:0,k:100,ix:4},w:{a:0,k:3,ix:5},lc:2,lj:2,bm:0,nm:"Stroke 1",mn:"ADBE Vector Graphic - Stroke",hd:!1},{ty:"tr",p:{a:0,k:[0,0],ix:2},a:{a:0,k:[0,0],ix:1},s:{a:0,k:[100,100],ix:3},r:{a:0,k:0,ix:6},o:{a:0,k:100,ix:7},sk:{a:0,k:0,ix:4},sa:{a:0,k:0,ix:5},nm:"Transform"}],nm:"Shape 1",np:3,cix:2,bm:0,ix:1,mn:"ADBE Vector Group",hd:!1}],ip:0,op:40,st:0,bm:0},{ddd:0,ind:3,ty:4,nm:"Circle Stroke",sr:1,ks:{o:{a:0,k:100,ix:11},r:{a:0,k:0,ix:10},p:{a:0,k:[39.022,39.022,0],ix:2,l:2},a:{a:0,k:[0,0,0],ix:1,l:2},s:{a:1,k:[{i:{x:[.667,.667,.667],y:[1,1,1]},o:{x:[.333,.333,.333],y:[0,0,0]},t:16,s:[100,100,100]},{i:{x:[.667,.667,.667],y:[1,1,1]},o:{x:[.333,.333,.333],y:[0,0,0]},t:22,s:[80,80,100]},{i:{x:[.667,.667,.667],y:[1,1,1]},o:{x:[.333,.333,.333],y:[0,0,0]},t:25,s:[120,120,100]},{t:29,s:[100,100,100]}],ix:6,l:2}},ao:0,shapes:[{ty:"gr",it:[{d:1,ty:"el",s:{a:0,k:[60,60],ix:2},p:{a:0,k:[0,0],ix:3},nm:"Ellipse Path 1",mn:"ADBE Vector Shape - Ellipse",hd:!1},{ty:"tm",s:{a:1,k:[{i:{x:[.667],y:[1]},o:{x:[.333],y:[0]},t:0,s:[0]},{t:16,s:[100]}],ix:1},e:{a:0,k:0,ix:2},o:{a:0,k:0,ix:3},m:1,ix:2,nm:"Trim Paths 1",mn:"ADBE Vector Filter - Trim",hd:!1},{ty:"st",c:{a:0,k:[.180392156863,.776470588235,.309803921569,1],ix:3},o:{a:0,k:100,ix:4},w:{a:0,k:3,ix:5},lc:2,lj:2,bm:0,nm:"Stroke 1",mn:"ADBE Vector Graphic - Stroke",hd:!1},{ty:"tr",p:{a:0,k:[.978,.978],ix:2},a:{a:0,k:[0,0],ix:1},s:{a:0,k:[100,100],ix:3},r:{a:0,k:0,ix:6},o:{a:0,k:100,ix:7},sk:{a:0,k:0,ix:4},sa:{a:0,k:0,ix:5},nm:"Transform"}],nm:"Ellipse 1",np:3,cix:2,bm:0,ix:1,mn:"ADBE Vector Group",hd:!1}],ip:0,op:40,st:0,bm:0}],markers:[]}},336:function(n,e,t){"use strict";t.r(e);var a,r=t(13),i=t(19),o=t.n(i),c=t(28),s=t(20),m=t(0),l=t.n(m),d=t(12),p=t(21),u=t.n(p),g=function(n){return function(){var e=Object(c.a)(o.a.mark(function e(t,a){var r,i,c,s,m,l,d;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=a(function(n){return n.userInfo}),i=r.userInfo,e.prev=1,t({type:"GET_ORDER_REQUEST"}),c=u.a.CancelToken,s=c.source(),m={headers:{Authorization:"Bearer ".concat(i.token)},cancelToken:s.token},e.next=8,u.a.get("/api/orders/".concat(n),m);case 8:l=e.sent,d=l.data,t({type:"GET_ORDER_SUCCESS",payload:d}),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(1),t({type:"GET_ORDER_FAIL",payload:e.t0.response&&e.t0.response.data.message?e.t0.response.data.message:e.t0.message});case 16:case"end":return e.stop()}},e,null,[[1,13]])}));return function(n,t){return e.apply(this,arguments)}}()},x=t(3),f=t(18),h=t(14),b=t(135),k=t(88),v=t(29),E=t(203),w=t.n(E),y=t(209),A=t.n(y),D=t(210),B=t.n(D),P=t(211),O=t.n(P),C=t(261),I=t(262),N=t(263),S=function(n,e){return function(){var t=Object(c.a)(o.a.mark(function t(a,r){var i,c,s,m,l,d,p;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return i=r(function(n){return n.userInfo}),c=i.userInfo,t.prev=1,a({type:"ORDER_PAY_REQUEST"}),s=u.a.CancelToken,m=s.source(),l={headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(c.token)},cancelToken:m.token},t.next=8,u.a.patch("/api/orders/".concat(n,"/pay"),e,l);case 8:d=t.sent,p=d.data,a({type:"ORDER_PAY_SUCCESS",payload:p}),t.next=16;break;case 13:t.prev=13,t.t0=t.catch(1),a({type:"ORDER_PAY_FAIL",payload:t.t0.response&&t.t0.response.data.message?t.t0.response.data.message:t.t0.message});case 16:case"end":return t.stop()}},t,null,[[1,13]])}));return function(n,e){return t.apply(this,arguments)}}()},j=h.b.div(a||(a=Object(r.a)(["\n  .row6 {\n    z-index: 1;\n    border-top: unset !important;\n    padding: unset !important;\n    div {\n      width: 100%;\n      svg {\n        margin-bottom: 1.05rem !important;\n        width: calc(1.5rem + 1vw) !important;\n        height: calc(1.5rem + 1vw) !important;\n      }\n    }\n  }\n  .failureOrderScreen,\n  .successOrderScreen {\n    position: fixed;\n    top: 0;\n    left: 0;\n    height: 100vh;\n    width: 100%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    background: rgba(255, 255, 255, 1);\n    z-index: 10001;\n    .close {\n      width: 3rem;\n      height: 3rem;\n      object-fit: contain;\n      border-radius: 50%;\n      position: absolute;\n      right: 5%;\n      top: 3%;\n      opacity: 0.5;\n      transition: 0.2s ease;\n      &:hover {\n        filter: brightness(1);\n      }\n    }\n  }\n  .qrCodeWrapper {\n    position: fixed;\n    top: 0;\n    left: 0;\n    height: 100vh;\n    background: rgba(26, 26, 26, 0.93);\n    z-index: 10000;\n    width: 100%;\n    .close {\n      width: 3rem;\n      height: 3rem;\n      object-fit: contain;\n      border-radius: 50%;\n      position: absolute;\n      right: 5%;\n      top: 3%;\n      cursor: pointer;\n      filter: brightness(1.2);\n      transition: 0.2s ease;\n      &:hover {\n        filter: brightness(1);\n      }\n    }\n  }\n  .qrCodeScanner {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    width: calc(300px + 10vw) !important;\n    transform: translate(-50%, -50%);\n    section {\n      border-radius: 5px;\n    }\n  }\n  .flex {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    margin-bottom: 0.8rem !important;\n    img {\n      width: calc(2.8rem + 0.3vw);\n      border: 2.5px solid #00b2d8;\n      border-radius: 4px;\n      cursor: pointer;\n      transition: 0.2s ease;\n      &:hover {\n        opacity: 0.85;\n      }\n    }\n    .message {\n      margin-bottom: 0 !important;\n    }\n  }\n  .orderId {\n    margin-bottom: 1.8rem;\n    align-self: flex-start;\n    color: white;\n    background: #343a40;\n    font-weight: 400;\n    position: relative;\n    padding: 0.35rem 0.6rem;\n    border-radius: 6px;\n    font-size: calc(1.05rem + 0.3vw);\n    width: max-content;\n    max-width: 100%;\n    span {\n      font-weight: 500;\n    }\n    a {\n      position: relative;\n      &:hover .line {\n        display: block;\n      }\n      .line {\n        position: absolute;\n        left: 0;\n        bottom: 2%;\n        height: 1.8px;\n        background: white;\n        width: 100%;\n        border-radius: 100rem;\n        display: none;\n      }\n    }\n  }\n  .message span {\n    font-size: calc(0.8rem + 0.3vw) !important;\n  }\n  .message {\n    padding: 0.6rem 0.9rem !important;\n    margin-bottom: 0.8rem !important;\n  }\n  .lineSeperate {\n    display: none;\n  }\n\n  .shipping-section p,\n  .payment-section p {\n    width: 90%;\n  }\n  button {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    padding: 0.55rem 0.5rem;\n    border: none;\n    background: #00b2d8;\n    color: white;\n    border-radius: 6px;\n    font-size: calc(1.2rem + 0.3vw);\n    cursor: pointer;\n    transition: 0.1s;\n    margin: 0 calc(1.1rem + 0.3vw);\n    margin-bottom: calc(0.8rem + 0.3vw);\n    &:hover {\n      background: #00a8ce;\n    }\n    #loader:first-child {\n      width: calc(0.9rem + 0.5vw);\n      height: calc(0.9rem + 0.5vw);\n      margin-left: 0.45rem;\n      #greybackground path {\n        stroke: white;\n      }\n    }\n  }\n  .currency {\n    margin-left: 0.15rem;\n    font-size: calc(0.6rem + 0.3vw) !important;\n    &.free {\n      display: none;\n    }\n  }\n  .table {\n    box-shadow: -2px 2px 8px rgba(0, 0, 0, 0.08);\n    border-radius: 10px;\n    margin-top: 0.1rem;\n    display: flex;\n    flex-direction: column;\n    align-items: stretch;\n    border: 1px solid rgba(0, 0, 0, 5.5%);\n    flex: 1 1 auto;\n    h1 {\n      font-size: calc(1rem + 0.3vw);\n      font-weight: 400;\n      padding: 0 calc(1.3rem + 0.3vw);\n    }\n    p {\n      font-size: calc(1rem + 0.3vw);\n      margin-left: calc(2.4rem + 1vw);\n    }\n    .title {\n      font-size: calc(1.48rem + 0.3vw);\n      font-weight: 500;\n      padding-top: calc(0.8rem + 0.3vw);\n      padding-bottom: calc(0.5rem + 0.3vw);\n      color: #1a1a1a;\n      margin-right: calc(1.7rem + 0.6vw);\n      white-space: nowrap;\n    }\n\n    .row {\n      padding: 0.5rem 0;\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      border-top: 1px solid rgba(0, 0, 0, 7.5%);\n      margin: 0 calc(1.3rem + 0.3vw);\n      h1 {\n        padding: unset !important;\n        color: #1a1a1a;\n        font-size: calc(0.83rem + 0.3vw);\n      }\n      p {\n        color: #1a1a1a;\n        font-size: calc(0.83rem + 0.3vw);\n      }\n      span {\n        color: #1a1a1a;\n      }\n    }\n    .row1 {\n      border-top: unset;\n      padding-top: 0;\n    }\n    .row4 {\n      margin-bottom: 4px;\n      h1 {\n        color: #1a1a1a;\n      }\n      p {\n        color: #1a1a1a;\n        margin-left: calc(1.5rem + 1vw);\n        display: flex;\n        align-items: center;\n      }\n      p.discount {\n        font-weight: 500;\n      }\n      span {\n        color: #1a1a1a;\n      }\n      .lastPrice {\n        margin-right: 0.4rem;\n        text-decoration: line-through;\n        font-size: calc(0.71rem + 0.3vw);\n        font-weight: 400 !important;\n      }\n    }\n  }\n  .section {\n    h1 {\n      padding-bottom: 0.8rem;\n      padding-top: 0.8rem;\n      font-weight: 500;\n      color: #1a1a1a;\n      font-size: calc(1.8rem + 0.3vw);\n    }\n    &:first-child h1 {\n      padding-top: unset;\n    }\n    p {\n      color: #1a1a1a;\n      padding-bottom: 0.6rem;\n      font-size: calc(0.8rem + 0.3vw);\n    }\n    .lastChild {\n      padding-bottom: 0.8rem !important;\n    }\n    border-bottom: 1px solid rgba(0, 0, 0, 12.5%);\n    &:last-child {\n      border-bottom: unset;\n    }\n  }\n  .actualContent {\n    display: flex;\n    justify-content: center;\n    align-items: flex-start;\n    width: 100%;\n    gap: calc(1.5rem + 0.3vw);\n  }\n  .content {\n    width: 85%;\n    margin: 0 auto;\n    margin-top: 1.8rem;\n    margin-bottom: 1rem;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-direction: column;\n    .summary {\n      flex: 1 1 75%;\n    }\n  }\n\n  @media screen and (max-width: 1050px) {\n    .content {\n      width: 90% !important;\n    }\n    .qrCodeScanner {\n      width: 90% !important;\n      position: absolute;\n      top: 50%;\n      transform: translate(-50%, -50%);\n    }\n    .message {\n      padding: 0.5rem 0.8rem !important;\n      margin-bottom: 0.8rem !important;\n    }\n    .lineSeperate {\n      display: block;\n      border-radius: 1px;\n      width: 45%;\n      height: 2px;\n      background: rgba(0, 176, 216, 62%);\n      margin: calc(1.3rem + 0.5vh) auto;\n      margin-top: calc(1.45rem + 0.5vh);\n    }\n    .currency {\n      margin-left: 0.1rem;\n      font-size: calc(0.55rem + 0.3vw) !important;\n    }\n    .content {\n      flex-direction: column;\n      width: 90%;\n      gap: unset !important;\n    }\n    .actualContent {\n      width: 100%;\n      flex-direction: column;\n      gap: unset !important;\n    }\n    .orderId {\n      width: 100%;\n      font-size: calc(0.93rem + 0.3vw);\n      padding: 0.45rem 0.6rem;\n    }\n    .summary {\n      order: 2;\n      width: 100%;\n    }\n\n    .table {\n      width: 100%;\n      margin-top: 0;\n      border: unset;\n      box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.12);\n      .title {\n        font-size: calc(1.55rem + 0.3vw);\n        padding-bottom: calc(0.8rem + 0.3vw - 0.5rem);\n        padding-top: calc(1rem + 0.3vw);\n        margin-right: unset;\n      }\n      .row1 {\n        border-top: unset !important;\n      }\n      .row4 {\n        margin-bottom: calc(0.8rem + 0.3vw - 0.5rem) !important;\n      }\n      .row {\n        border-top: 1px solid rgba(0, 0, 0, 5%);\n        padding: 0.5rem 0;\n        margin: 0 calc(1.1rem + 0.3vw);\n      }\n      .row h1,\n      .row p {\n        font-size: calc(0.9rem + 0.3vw);\n      }\n      button {\n        font-size: calc(1.1rem + 0.3vw);\n      }\n      .row {\n        padding: 0.5rem 0;\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n        border-top: 1px solid rgba(0, 0, 0, 7.5%);\n        margin: 0 calc(1.1rem + 0.3vw);\n        h1 {\n          padding: unset !important;\n          color: #1a1a1a;\n          font-size: calc(0.83rem + 0.3vw);\n        }\n        p {\n          color: #1a1a1a;\n          font-size: calc(0.83rem + 0.3vw);\n        }\n        span {\n          color: #1a1a1a;\n        }\n      }\n    }\n    .section {\n      h1 {\n        padding-bottom: 0.4rem;\n        padding-top: 0.8rem;\n        font-weight: 500;\n        color: #1a1a1a;\n        font-size: calc(1.55rem + 0.3vw);\n      }\n      &:first-child h1 {\n        padding-top: unset;\n      }\n      p {\n        padding-bottom: 0.55rem;\n        color: #1a1a1a;\n        font-size: calc(0.52rem + 1vw) !important;\n      }\n      .lastChild {\n        padding-bottom: 0.8rem !important;\n      }\n      border-bottom: 1px solid rgba(0, 0, 0, 12.5%);\n      &:last-child {\n        border-bottom: unset;\n      }\n    }\n  }\n"])));e.default=function(){var n=Object(d.c)(function(n){return n.order});Object(m.useEffect)(function(){n.orderPlaced&&(n.order={},n.orderPlaced=!1)},[]);var e={loop:!1,autoplay:!0,animationData:C,rendererSettings:{}},t={loop:!1,autoplay:!0,animationData:I,rendererSettings:{}};var a=function(n){return Number(n).toFixed(2)},r=Object(d.b)(),i=Object(x.l)(),p=Object(d.c)(function(n){return n.orderDetails}),h=p.order,E=p.error,y=p.orderLoading,D=Object(d.c)(function(n){return n.orderPay}),P=D.orderPayLoading,Q=D.success,T=Object(m.useState)(!1),z=Object(s.a)(T,2),G=z[0],L=z[1],V=Object(m.useState)(null),R=Object(s.a)(V,2),M=R[0],U=R[1],F=Object(m.useState)(!1),H=Object(s.a)(F,2),_=H[0],Y=H[1];Object(m.useEffect)(function(){M||function(){var n=Object(c.a)(o.a.mark(function n(){var e,t,a;return o.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return e=u.a.CancelToken,t=e.source(),n.prev=2,n.next=5,u.a.get("https://api.currencyfreaks.com/latest?apikey=a85d31d75fc34b3e999bc0e87c08a8a9&symbols=EGP",{cancelToken:t.token});case 5:a=n.sent,console.log("Response",a),n.next=11;break;case 9:n.prev=9,n.t0=n.catch(2);case 11:U(10);case 12:case"end":return n.stop()}},n,null,[[2,9]])}));return function(){return n.apply(this,arguments)}}()()},[]),Object(m.useEffect)(function(){(!h.totalPrice&&!y||Q||h._id!==i.pathname.split("/")[2]&&!y)&&(r({type:"ORDER_PAY_RESET"}),r(g(i.pathname.split("/")[2])))},[i,r,Q,h]),Object(m.useEffect)(function(){var n=function(){var n=Object(c.a)(o.a.mark(function n(){var e,t,a;return o.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,u.a.get("/api/config/paypal");case 2:e=n.sent,t=e.data,(a=document.createElement("script")).type="text/javascript",a.src="https://www.paypal.com/sdk/js?client-id=".concat(t),a.async=!0,a.onload=function(){L(!0)},document.body.appendChild(a);case 10:case"end":return n.stop()}},n)}));return function(){return n.apply(this,arguments)}}();!1===h.isPaid&&(window.paypal||_?L(!0):(Y(!0),function(){var e=Object(c.a)(o.a.mark(function e(){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n();case 2:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}()(),Y(!1)))},[h.isPaid]);var Z=Object(m.useState)("No result"),q=Object(s.a)(Z,2),X=q[0],K=q[1],J=Object(m.useState)(!1),W=Object(s.a)(J,2),$=W[0],nn=W[1],en=Object(m.useState)(null),tn=Object(s.a)(en,2),an=tn[0],rn=tn[1];Object(m.useEffect)(function(){h._id&&X===h._id.toString()?(nn(!1),rn(!0),setTimeout(function(){rn(null)},2300)):24===X.length&&(nn(!1),rn(!1),setTimeout(function(){rn(null)},2300))},[X,h._id]);return l.a.createElement(j,null,$&&l.a.createElement("div",{className:"qrCodeWrapper",onClick:function(n){console.log(n.currentTarget),"qrCodeWrapper"===n.currentTarget.classList[0]&&nn(!1)}},l.a.createElement(w.a,{style:{width:"100%"},delay:300,onError:function(n){n&&console.log(n)},onScan:function(n){n&&K(n)},className:"qrCodeScanner"}),l.a.createElement("img",{onClick:function(){nn(!1),rn(null)},className:"close",src:B.a})),l.a.createElement("div",{className:"content",style:{alignItems:"".concat(E?"flex-start":"center"),width:"".concat(E?"90%":"85%")}},y&&l.a.createElement(v.a,null),E&&l.a.createElement(k.a,{vibrating:"true",visiblity:!!E,msg:E?E.includes("timed out")?"Network Error":E.includes("mongo")?"Server Error":E:"Ok",hidden:!E,type:"error"}),h.itemsPrice&&l.a.createElement(l.a.Fragment,null,l.a.createElement("h1",{className:"orderId"},l.a.createElement(f.Link,{to:"/account/orders"},"#Order:",l.a.createElement("div",{className:"line"})),l.a.createElement("span",null," "+h._id)),l.a.createElement("div",{className:"actualContent"},!1===an&&l.a.createElement("div",{className:"failureOrderScreen"},l.a.createElement(O.a,{options:e,width:"50%",height:"50%"}),l.a.createElement("img",{onClick:function(){rn(null),nn(!1)},className:"close",src:B.a})),an&&l.a.createElement("div",{className:"successOrderScreen"},l.a.createElement(O.a,{options:t,width:"50%",height:"50%"}),l.a.createElement("img",{onClick:function(){rn(null),nn(!1)},className:"close",src:B.a})),l.a.createElement("div",{className:"summary"},l.a.createElement("div",{className:"shipping-section section"},l.a.createElement("h1",null,"Shipping :"),l.a.createElement("p",null,"Name: ",h.user.name),l.a.createElement("p",null,"Email: ",h.user.email),l.a.createElement("p",{className:"lastChild"},"Address: ",h.shippingAddress.address,","," ",h.shippingAddress.city,","," ",h.shippingAddress.governorate,", Egypt,"," ",h.shippingAddress.phoneNumber),l.a.createElement("div",{className:"flex"},!h.isDelivered&&l.a.createElement(k.a,{type:"error",msg:"Not Delivered"}),l.a.createElement("img",{onClick:function(){return nn(!0)},src:A.a,alt:""}))),l.a.createElement("div",{className:"payment-section section"},l.a.createElement("h1",null,"Payment Method :"),l.a.createElement("p",null,"Method: ",h.paymentMethod),!h.isPaid&&l.a.createElement(k.a,{type:"error",msg:"Not Paid"}),h.isPaid&&l.a.createElement(k.a,{msg:"Paid on "+h.paidAt})),l.a.createElement("div",{className:"order-section section"},l.a.createElement("h1",null,1===h.orderItems.length?"Order Item :":"Order Items :"),h.orderItems.map(function(n){return l.a.createElement(b.a,{price:n.price,qty:n.qty,productName:(e=n.name,e.length>30?e.substr(0,29)+"..":e),img:n.image,id:n._id,key:n._id});var e}))),l.a.createElement("div",{className:"table"},l.a.createElement("h1",{className:"title"},"Order Summary"),l.a.createElement("div",{className:"row1 row"},l.a.createElement("h1",null,"Items :"),l.a.createElement("p",null,h.itemsPrice,l.a.createElement("span",{className:"currency"},"EGP"))),l.a.createElement("div",{className:"row2 row"},l.a.createElement("h1",null,"Shipping :"),l.a.createElement("p",null,h.shippingPrice,l.a.createElement("span",{className:"currency"},"EGP"))),l.a.createElement("div",{className:"row3 row"},l.a.createElement("h1",null,"Tax :"),l.a.createElement("p",null,a(h.taxPrice),l.a.createElement("span",{className:"currency"},"EGP"))),h.couponDiscount>0&&l.a.createElement("div",{className:"row5 row"},l.a.createElement("h1",null,"Discount :"),l.a.createElement("p",null,"-",h.couponDiscount,l.a.createElement("span",{className:"currency"},"EGP"))),l.a.createElement("div",{className:"row4 row"},l.a.createElement("h1",null,"Total :"),l.a.createElement("p",{className:"".concat(h.couponDiscount>0?"discount":"")},h.couponDiscount>0&&l.a.createElement("h1",{className:"lastPrice"},a(Number(h.itemsPrice)+50+14*Number(h.itemsPrice)/100)),a(Number(h.itemsPrice)+50+14*Number(h.itemsPrice)/100+-h.couponDiscount)>0?a(Number(h.itemsPrice)+50+14*Number(h.itemsPrice)/100+-h.couponDiscount):"+"+Math.abs(a(Number(h.itemsPrice)+50+14*Number(h.itemsPrice)/100+-h.couponDiscount)),l.a.createElement("span",{className:"currency ".concat(a(Number(h.totalPrice)+50+14*Number(h.totalPrice)/100)===h.couponDiscount?"free":"")},"EGP"))),!h.isPaid&&"Cash on Delivery"!==h.paymentMethod&&l.a.createElement("div",{className:"row row6"},G&&M&&!P?l.a.createElement(N.PayPalButton,{amount:10..toFixed(2),onApprove:function(n){console.log(n),r(S(h._id,n))}}):l.a.createElement(v.a,null))),l.a.createElement("div",{className:"lineSeperate"})))))}},88:function(n,e,t){"use strict";var a,r=t(13),i=t(0),o=t.n(i),c=t(14),s=t(18),m=c.b.div(a||(a=Object(r.a)(["\n  span {\n    a {\n      color: #0084a0;\n      &:hover {\n        text-decoration: underline;\n      }\n    }\n  }\n  &.active {\n    animation: shake 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;\n  }\n  @keyframes shake {\n    10%,\n    90% {\n      transform: translate3d(-1px, 0, 0);\n    }\n\n    20%,\n    80% {\n      transform: translate3d(2px, 0, 0);\n    }\n\n    30%,\n    50%,\n    70% {\n      transform: translate3d(-4px, 0, 0);\n    }\n\n    40%,\n    60% {\n      transform: translate3d(4px, 0, 0);\n    }\n  }\n"])));e.a=function(n){var e=n.msg,t=n.type,a=void 0===t?"ok":t,r=n.visiblity,i=void 0===r||r,c=n.vibrating,l=n.hidden,d=void 0!==l&&l;return o.a.createElement(m,{className:"message ".concat(i&&c?"active":""),style:{background:"".concat("ok"===a?"#DCF1F7":"#F7DDDC"),padding:"0.65rem 1.1rem",borderRadius:"5px",border:"1px solid rgba(56, 0, 0, 0.08)",opacity:"".concat(i?1:0),pointerEvents:"".concat(i?"all":"none"),height:"".concat(i?"100%":"20px"),display:"".concat(d?"none":"inline-block")}},o.a.createElement("span",{style:{fontWeight:500,color:"".concat("ok"===a?"#306F83":"#712B29"),fontSize:"calc(0.8rem + 0.5vw)",display:"".concat(d?"none":"block")}},"returnTheThing"===e?o.a.createElement("p",null,"Email isn't Verified"," ",o.a.createElement(s.Link,{to:"/verify?redirect=/placeOrder"},"Verify Email")):e))}}}]);
//# sourceMappingURL=16.964df248.chunk.js.map