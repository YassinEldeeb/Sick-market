(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{164:function(e,n,t){"use strict";var r,a=t(5),c=t(0),i=t.n(c),o=t(6),s=t(9),l=o.b.div(r||(r=Object(a.a)(["\n  span {\n    a {\n      color: #0084a0;\n      &:hover {\n        text-decoration: underline;\n      }\n    }\n  }\n  &.active {\n    animation: shake 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;\n  }\n  @keyframes shake {\n    10%,\n    90% {\n      transform: translate3d(-1px, 0, 0);\n    }\n\n    20%,\n    80% {\n      transform: translate3d(2px, 0, 0);\n    }\n\n    30%,\n    50%,\n    70% {\n      transform: translate3d(-4px, 0, 0);\n    }\n\n    40%,\n    60% {\n      transform: translate3d(4px, 0, 0);\n    }\n  }\n"])));n.a=function(e){var n=e.msg,t=e.type,r=void 0===t?"ok":t,a=e.visiblity,c=void 0===a||a,o=e.vibrating,m=e.hidden,u=void 0!==m&&m;return i.a.createElement(l,{className:"message ".concat(c&&o?"active":""),style:{background:"".concat("ok"===r?"#DCF1F7":"#F7DDDC"),padding:"0.65rem 1.1rem",borderRadius:"5px",border:"1px solid rgba(56, 0, 0, 0.08)",opacity:"".concat(c?1:0),pointerEvents:"".concat(c?"all":"none"),height:"".concat(c?"100%":"20px"),display:"".concat(u?"none":"inline-block")}},i.a.createElement("span",{style:{fontWeight:500,color:"".concat("ok"===r?"#306F83":"#712B29"),fontSize:"calc(0.8rem + 0.5vw)",display:"".concat(u?"none":"block")}},"returnTheThing"===n?i.a.createElement("p",null,"Email isn't Verified"," ",i.a.createElement(s.Link,{to:"/verify?redirect=/placeOrder"},"Verify Email")):"returnGoBack"===n?i.a.createElement("p",null,"Sorry, Your Product have just Sold Out or Removed."," ",i.a.createElement(s.Link,{to:"/"},"Go Back")):n))}},413:function(e,n,t){"use strict";t.r(n);var r,a,c,i,o=t(5),s=t(4),l=t(0),m=t.n(l),u=t(6),d=t(15),f=t.n(d),p=t(31),g=t(20),b=t.n(g),v=function(e){return function(){var n=Object(p.a)(f.a.mark(function n(t,r){var a,c,i,o;return f.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if(t({type:"VERIFY_REQUEST"}),!(a=r().userInfo).token||"pending"!==a.user.status){n.next=16;break}return n.prev=3,c=b.a.CancelToken,i=c.source(),o={headers:{Content_Type:"application/json",Authorization:"Bearer ".concat(a.token)},cancelToken:i.token},n.next=9,b.a.post("/api/users/getSecurityCode",{code:Number(e)},o);case 9:t({type:"VERIFY_SUCCESS"}),localStorage.setItem("sickUserInfo",JSON.stringify({user:r().userInfo.user,token:r().userInfo.token})),n.next=16;break;case 13:n.prev=13,n.t0=n.catch(3),t({type:"VERIFY_FAIL",payload:n.t0.response&&n.t0.response.data.message?n.t0.response.data.message:n.t0.message});case 16:case"end":return n.stop()}},n,null,[[3,13]])}));return function(e,t){return n.apply(this,arguments)}}()};function h(){return(h=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}function y(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},c=Object.keys(e);for(r=0;r<c.length;r++)t=c[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)t=c[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var w,E=function(e){var n=e.svgRef,t=y(e,["svgRef"]);return m.a.createElement("svg",h({width:22,height:21,viewBox:"0 0 22 21",fill:"none",ref:n},t),r||(r=m.a.createElement("path",{d:"M11 3.82892L18.9118 18.3333H3.08825L11 3.82892ZM11 0L0 20.1667H22L11 0ZM10.0833 8.25H11.9167V13.75H10.0833V8.25ZM11 17.1875C10.3684 17.1875 9.85417 16.6742 9.85417 16.0417C9.85417 15.4092 10.3684 14.8958 11 14.8958C11.6316 14.8958 12.1458 15.4092 12.1458 16.0417C12.1458 16.6742 11.6316 17.1875 11 17.1875Z",fill:"#715100"})),a||(a=m.a.createElement("rect",{x:9.16602,y:7.33334,width:3.66667,height:10.0833,fill:"#FFFBD6"})),c||(c=m.a.createElement("path",{d:"M10.5 14.2308H11.5769C11.8531 14.2308 12.0769 14.007 12.0769 13.7308V8.50004C12.0769 8.2239 11.8531 8.00004 11.5769 8.00004H10.5C10.2239 8.00004 10 8.2239 10 8.50004V13.7308C10 14.0069 10.2239 14.2308 10.5 14.2308Z",fill:"#715100"})),i||(i=m.a.createElement("circle",{cx:11.0385,cy:15.9616,r:1.03846,fill:"#715100"})))},x=m.a.forwardRef(function(e,n){return m.a.createElement(E,h({svgRef:n},e))}),k=(t.p,t(7)),O=t(164),j=t(56),S=t(8),C=t(9),I=function(){return function(){var e=Object(p.a)(f.a.mark(function e(n,t){var r,a,c,i;return f.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n({type:"NEW_VERIFY_CODE_REQUEST"}),!(r=t().userInfo).token||"pending"!==r.user.status){e.next=15;break}return e.prev=3,a=b.a.CancelToken,c=a.source(),i={headers:{Content_Type:"application/json",Authorization:"Bearer ".concat(r.token)},cancelToken:c.token},e.next=9,b.a.get("/api/users/getNewSecurityCode",i);case 9:n({type:"NEW_VERIFY_CODE_SUCCESS"}),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(3),n({type:"NEW_VERIFY_CODE_FAIL",payload:e.t0.response&&e.t0.response.data.message?e.t0.response.data.message:e.t0.message});case 15:case"end":return e.stop()}},e,null,[[3,12]])}));return function(n,t){return e.apply(this,arguments)}}()},N=u.b.div(w||(w=Object(o.a)(["\n  .emailSentMessage {\n    margin: 0.35rem 0;\n    margin-bottom: 0.5rem;\n    color: #3e3e3e;\n    font-size: calc(1rem + 0.2vw);\n    a {\n      color: #0084a0;\n    }\n  }\n  .waitActive {\n    filter: grayscale(0.2);\n    opacity: 0.7;\n    pointer-events: none;\n  }\n  .message {\n    align-self: flex-start;\n    margin-bottom: 0rem;\n  }\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex: 1 1 auto;\n  .modelBox {\n    border-radius: 12px;\n    box-shadow: -2px 4px 10px rgba(0, 0, 0, 0.2);\n    overflow: hidden;\n    display: flex;\n    justify-content: stretch;\n    align-items: stretch;\n  }\n\n  .danger {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-direction: column;\n    width: 100%;\n\n    .danger-text {\n      padding: 0.9rem calc(1.5rem + 1vw);\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      background: #fffbd6;\n      width: 100%;\n      img {\n        width: calc(1.4rem + 0.05vw);\n        height: calc(1.4rem + 0.05vw);\n        margin-right: 0.4rem;\n      }\n      p {\n        font-size: calc(0.85rem + 0.3vw);\n        color: #715100;\n      }\n    }\n  }\n  .theRest {\n    padding: calc(1.5rem + 1vw);\n    flex: 1 1 auto;\n    width: 100%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-direction: column;\n    h1 {\n      color: #1a1a1a;\n      font-weight: 500;\n      font-size: calc(2.2rem + 0.3vw);\n      align-self: flex-start;\n      margin-bottom: calc(1rem + 0.3vh);\n    }\n    input {\n      background: #f3f3f3;\n      border: none;\n      border-radius: 5px;\n      font-size: calc(1.1rem + 0.3vw);\n      padding: 0.5rem 1rem;\n      margin-bottom: calc(1.4rem + 0.3vh);\n    }\n    .verifyBtns {\n      display: flex;\n      flex-direction: column;\n      width: 100%;\n      button {\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n        padding: 0.4rem 1.3rem;\n        border: none;\n        color: white;\n        background: #00b2d8;\n        border-radius: 6px;\n        font-size: calc(1.2rem + 0.3vw);\n        cursor: pointer;\n        transition: 0.1s ease;\n        &:hover {\n          background: #00bde7;\n        }\n        #loader:first-child {\n          width: calc(0.9rem + 0.5vw);\n          height: calc(0.9rem + 0.5vw);\n          margin-left: 0.45rem;\n          #greybackground path {\n            stroke: white;\n          }\n        }\n      }\n      .btns {\n        width: 100%;\n        display: flex;\n        justify-content: space-between;\n        align-items: flex-end;\n        p {\n          font-size: calc(0.9rem + 0.2vw);\n          cursor: pointer;\n          color: #0084a0;\n        }\n      }\n    }\n  }\n  @media screen and (max-width: 1050px) {\n    .emailSentMessage {\n      font-size: calc(0.8rem + 0.2vw);\n    }\n    .message {\n      span {\n        font-size: calc(0.7rem + 0.1vw) !important;\n      }\n    }\n    margin-top: calc(2rem + 0.3vh);\n    align-items: flex-start;\n    .danger {\n      .danger-text {\n        padding: 0.9rem calc(1rem + 1vw);\n        img {\n          width: calc(1.3rem + 0.05vw);\n          height: calc(1.3rem + 0.05vw);\n          margin-right: 0.55rem;\n        }\n        p {\n          font-size: calc(0.7rem + 0.3vw);\n        }\n      }\n    }\n    .theRest {\n      padding: calc(0.85rem + 1vw) calc(1rem + 1vw) calc(1rem + 1vw)\n        calc(1rem + 1vw);\n      h1 {\n        font-size: calc(1.6rem + 0.3vw);\n        margin-bottom: calc(0.7rem + 0.3vh);\n      }\n      input {\n        margin-bottom: calc(1rem + 0.3vh);\n      }\n    }\n    .modelBox {\n      width: 90%;\n      border: unset;\n      border-radius: 12px;\n      box-shadow: -2px 4px 10px rgba(0, 0, 0, 0.2);\n    }\n    .verifyBtns {\n      display: flex;\n      flex-direction: column;\n      width: 100%;\n    }\n  }\n"])));n.default=function(){var e=Object(l.useState)(""),n=Object(s.a)(e,2),t=n[0],r=n[1],a=Object(l.useState)(""),c=Object(s.a)(a,2),i=c[0],o=c[1],u=Object(k.c)(function(e){return e.userInfo}),d=u.verificationError,f=u.verifyLoading,p=u.user,g=u.newCodeError,b=u.newCodeLoading,h=Object(l.useState)(0),y=Object(s.a)(h,2),w=y[0],E=y[1],R=Object(l.useState)(!1),V=Object(s.a)(R,2),F=V[0],T=V[1],z=p?p.status:"",_=Object(l.useState)(localStorage.getItem("sickTimerSeconds")?JSON.parse(localStorage.getItem("sickTimerSeconds")):60),B=Object(s.a)(_,1)[0],L=Object(S.l)();Object(l.useEffect)(function(){F&&setTimeout(function(){w>0?(E(function(e){return e-1}),localStorage.setItem("sickTimerSeconds",w)):(T(!1),localStorage.removeItem("sickTimerSeconds"))},1e3)},[F,w]);var D=Object(k.b)(),M=Object(S.k)(),Y=L.search.split("=")[1]?L.search.split("=")[1]:"/",A=Object(k.c)(function(e){return e.order});return Object(l.useEffect)(function(){p.name?"Verified"===z&&(A.error=null,M.push(Y)):M.push("/login")},[z,p,M]),Object(l.useEffect)(function(){D(I())},[D]),Object(l.useEffect)(function(){!F&&g&&(E(B),T(!0))},[g,F,B]),Object(l.useEffect)(function(){!1!==b||g?"Email already Verified"===g&&M.push(Y):(E(60),F||T(!0))},[b,M,g,F]),m.a.createElement(N,null,m.a.createElement("div",{className:"modelBox"},m.a.createElement("div",{className:"danger"},m.a.createElement("div",{className:"danger-text"},m.a.createElement(x,null),m.a.createElement("p",null,"If you didn\u2019t find the email in your Inbox, maybe It\u2019s in your Spam box")),m.a.createElement("div",{className:"theRest"},m.a.createElement("h1",null,"Enter Code to Verify"),m.a.createElement(O.a,{hidden:"true",vibrating:"true",visiblity:i.length?i:!(!d||f),msg:i.length?i:d?d.includes("timed out")?"Network Error":d.includes("mongo")?"Server Error":d:"Ok",type:"error"}),m.a.createElement("form",{className:"verifyBtns",onSubmit:function(e){o(""),e.preventDefault(),4===t.length?D(v(Number(t))):o("Code must be 4 Digits")}},p&&!1===b&&!g&&m.a.createElement("p",{className:"emailSentMessage"},"Email Sent to '",p.email,"'"," ",m.a.createElement(C.Link,{to:"/changeEmail?redirect=verify"},"Change Email")),m.a.createElement("input",{maxLength:4,value:t,onChange:function(e){return r(e.target.value)},type:"number",id:"code",placeholder:"4 Digits Code"}),m.a.createElement("div",{className:"btns"},m.a.createElement("button",{type:"submit"},"Verify ",f&&m.a.createElement(j.a,null)),m.a.createElement("p",{className:"".concat(F?"waitActive":""),onClick:function(){F||(E(60),T(!0)),D(I())}},w?"Send again(".concat(w,")"):"Send again")))))))}}}]);
//# sourceMappingURL=24.77376c58.chunk.js.map