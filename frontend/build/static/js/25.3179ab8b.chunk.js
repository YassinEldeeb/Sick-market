(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{181:function(e,n,t){e.exports=t.p+"static/media/danger.32e20194.svg"},334:function(e,n,t){"use strict";t.r(n);var a,r=t(13),c=t(20),i=t(0),o=t.n(i),s=t(14),l=t(19),m=t.n(l),d=t(28),u=t(21),f=t.n(u),p=function(e){return function(){var n=Object(d.a)(m.a.mark(function n(t,a){var r,c,i,o;return m.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if(t({type:"VERIFY_REQUEST"}),!(r=a().userInfo).token||"pending"!==r.user.status){n.next=16;break}return n.prev=3,c=f.a.CancelToken,i=c.source(),o={headers:{Content_Type:"application/json",Authorization:"Bearer ".concat(r.token)},cancelToken:i.token},n.next=9,f.a.post("/api/users/getSecurityCode",{code:Number(e)},o);case 9:t({type:"VERIFY_SUCCESS"}),localStorage.setItem("sickUserInfo",JSON.stringify({user:a().userInfo.user,token:a().userInfo.token})),n.next=16;break;case 13:n.prev=13,n.t0=n.catch(3),t({type:"VERIFY_FAIL",payload:n.t0.response&&n.t0.response.data.message?n.t0.response.data.message:n.t0.message});case 16:case"end":return n.stop()}},n,null,[[3,13]])}));return function(e,t){return n.apply(this,arguments)}}()},g=t(181),b=t.n(g),v=t(12),h=t(88),y=t(29),w=t(3),x=t(18),E=function(){return function(){var e=Object(d.a)(m.a.mark(function e(n,t){var a,r,c,i;return m.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n({type:"NEW_VERIFY_CODE_REQUEST"}),!(a=t().userInfo).token||"pending"!==a.user.status){e.next=15;break}return e.prev=3,r=f.a.CancelToken,c=r.source(),i={headers:{Content_Type:"application/json",Authorization:"Bearer ".concat(a.token)},cancelToken:c.token},e.next=9,f.a.get("/api/users/getNewSecurityCode",i);case 9:n({type:"NEW_VERIFY_CODE_SUCCESS"}),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(3),n({type:"NEW_VERIFY_CODE_FAIL",payload:e.t0.response&&e.t0.response.data.message?e.t0.response.data.message:e.t0.message});case 15:case"end":return e.stop()}},e,null,[[3,12]])}));return function(n,t){return e.apply(this,arguments)}}()},k=s.b.div(a||(a=Object(r.a)(["\n  .emailSentMessage {\n    margin: 0.35rem 0;\n    margin-bottom: 0.5rem;\n    color: #3e3e3e;\n    font-size: calc(1rem + 0.2vw);\n    a {\n      color: #0084a0;\n    }\n  }\n  .waitActive {\n    filter: grayscale(0.2);\n    opacity: 0.7;\n    pointer-events: none;\n  }\n  .message {\n    align-self: flex-start;\n    margin-bottom: 0rem;\n  }\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex: 1 1 auto;\n  .modelBox {\n    border-radius: 12px;\n    box-shadow: -2px 4px 10px rgba(0, 0, 0, 0.2);\n    overflow: hidden;\n    display: flex;\n    justify-content: stretch;\n    align-items: stretch;\n  }\n\n  .danger {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-direction: column;\n    width: 100%;\n\n    .danger-text {\n      padding: 0.9rem calc(1.5rem + 1vw);\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      background: #fffbd6;\n      width: 100%;\n      img {\n        width: calc(1.4rem + 0.05vw);\n        height: calc(1.4rem + 0.05vw);\n        margin-right: 0.4rem;\n      }\n      p {\n        font-size: calc(0.85rem + 0.3vw);\n        color: #715100;\n      }\n    }\n  }\n  .theRest {\n    padding: calc(1.5rem + 1vw);\n    flex: 1 1 auto;\n    width: 100%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-direction: column;\n    h1 {\n      color: #1a1a1a;\n      font-weight: 500;\n      font-size: calc(2.2rem + 0.3vw);\n      align-self: flex-start;\n      margin-bottom: calc(1rem + 0.3vh);\n    }\n    input {\n      background: #f3f3f3;\n      border: none;\n      border-radius: 5px;\n      font-size: calc(1.1rem + 0.3vw);\n      padding: 0.5rem 1rem;\n      margin-bottom: calc(1.4rem + 0.3vh);\n    }\n    .verifyBtns {\n      display: flex;\n      flex-direction: column;\n      width: 100%;\n      button {\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n        padding: 0.4rem 1.3rem;\n        border: none;\n        color: white;\n        background: #00b2d8;\n        border-radius: 6px;\n        font-size: calc(1.2rem + 0.3vw);\n        cursor: pointer;\n        transition: 0.1s ease;\n        &:hover {\n          background: #00bde7;\n        }\n        #loader:first-child {\n          width: calc(0.9rem + 0.5vw);\n          height: calc(0.9rem + 0.5vw);\n          margin-left: 0.45rem;\n          #greybackground path {\n            stroke: white;\n          }\n        }\n      }\n      .btns {\n        width: 100%;\n        display: flex;\n        justify-content: space-between;\n        align-items: flex-end;\n        p {\n          font-size: calc(0.9rem + 0.2vw);\n          cursor: pointer;\n          color: #0084a0;\n        }\n      }\n    }\n  }\n  @media screen and (max-width: 1050px) {\n    .emailSentMessage {\n      font-size: calc(0.8rem + 0.2vw);\n    }\n    .message {\n      span {\n        font-size: calc(0.7rem + 0.1vw) !important;\n      }\n    }\n    margin-top: calc(2rem + 0.3vh);\n    align-items: flex-start;\n    .danger {\n      .danger-text {\n        padding: 0.9rem calc(1rem + 1vw);\n        img {\n          width: calc(1.3rem + 0.05vw);\n          height: calc(1.3rem + 0.05vw);\n          margin-right: 0.55rem;\n        }\n        p {\n          font-size: calc(0.7rem + 0.3vw);\n        }\n      }\n    }\n    .theRest {\n      padding: calc(0.85rem + 1vw) calc(1rem + 1vw) calc(1rem + 1vw)\n        calc(1rem + 1vw);\n      h1 {\n        font-size: calc(1.6rem + 0.3vw);\n        margin-bottom: calc(0.7rem + 0.3vh);\n      }\n      input {\n        margin-bottom: calc(1rem + 0.3vh);\n      }\n    }\n    .modelBox {\n      width: 90%;\n      border: unset;\n      border-radius: 12px;\n      box-shadow: -2px 4px 10px rgba(0, 0, 0, 0.2);\n    }\n    .verifyBtns {\n      display: flex;\n      flex-direction: column;\n      width: 100%;\n    }\n  }\n"])));n.default=function(){var e=Object(i.useState)(""),n=Object(c.a)(e,2),t=n[0],a=n[1],r=Object(i.useState)(""),s=Object(c.a)(r,2),l=s[0],m=s[1],d=Object(v.c)(function(e){return e.userInfo}),u=d.verificationError,f=d.verifyLoading,g=d.user,S=d.newCodeError,j=d.newCodeLoading,O=Object(i.useState)(0),C=Object(c.a)(O,2),I=C[0],N=C[1],T=Object(i.useState)(!1),z=Object(c.a)(T,2),_=z[0],F=z[1],R=g?g.status:"",V=Object(i.useState)(localStorage.getItem("sickTimerSeconds")?JSON.parse(localStorage.getItem("sickTimerSeconds")):60),D=Object(c.a)(V,1)[0],B=Object(w.l)();Object(i.useEffect)(function(){_&&setTimeout(function(){I>0?(N(function(e){return e-1}),localStorage.setItem("sickTimerSeconds",I)):(F(!1),localStorage.removeItem("sickTimerSeconds"))},1e3)},[_,I]);var L=Object(v.b)(),A=Object(w.k)(),Y=B.search.split("=")[1]?B.search.split("=")[1]:"/",U=Object(v.c)(function(e){return e.order});return Object(i.useEffect)(function(){g.name?"Verified"===R&&(U.error=null,A.push(Y)):A.push("/login")},[R,g,A]),Object(i.useEffect)(function(){L(E())},[L]),Object(i.useEffect)(function(){!_&&S&&(N(D),F(!0))},[S,_,D]),Object(i.useEffect)(function(){!1!==j||S?"Email already Verified"===S&&A.push(Y):(N(60),_||F(!0))},[j,A,S,_]),o.a.createElement(k,null,o.a.createElement("div",{className:"modelBox"},o.a.createElement("div",{className:"danger"},o.a.createElement("div",{className:"danger-text"},o.a.createElement("img",{src:b.a,alt:"danger"}),o.a.createElement("p",null,"If you didn\u2019t find the email in your Inbox, maybe It\u2019s in your Spam box")),o.a.createElement("div",{className:"theRest"},o.a.createElement("h1",null,"Enter Code to Verify"),o.a.createElement(h.a,{hidden:"true",vibrating:"true",visiblity:l.length?l:!(!u||f),msg:l.length?l:u?u.includes("timed out")?"Network Error":u.includes("mongo")?"Server Error":u:"Ok",type:"error"}),o.a.createElement("form",{className:"verifyBtns",onSubmit:function(e){m(""),e.preventDefault(),4===t.length?L(p(Number(t))):m("Code must be 4 Digits")}},g&&!1===j&&!S&&o.a.createElement("p",{className:"emailSentMessage"},"Email Sent to '",g.email,"'"," ",o.a.createElement(x.Link,{to:"/changeEmail?redirect=verify"},"Change Email")),o.a.createElement("input",{maxLength:4,value:t,onChange:function(e){return a(e.target.value)},type:"number",id:"code",placeholder:"4 Digits Code"}),o.a.createElement("div",{className:"btns"},o.a.createElement("button",{type:"submit"},"Verify ",f&&o.a.createElement(y.a,null)),o.a.createElement("p",{className:"".concat(_?"waitActive":""),onClick:function(){_||(N(60),F(!0)),L(E())}},I?"Send again(".concat(I,")"):"Send again")))))))}},88:function(e,n,t){"use strict";var a,r=t(13),c=t(0),i=t.n(c),o=t(14),s=t(18),l=o.b.div(a||(a=Object(r.a)(["\n  span {\n    a {\n      color: #0084a0;\n      &:hover {\n        text-decoration: underline;\n      }\n    }\n  }\n  &.active {\n    animation: shake 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;\n  }\n  @keyframes shake {\n    10%,\n    90% {\n      transform: translate3d(-1px, 0, 0);\n    }\n\n    20%,\n    80% {\n      transform: translate3d(2px, 0, 0);\n    }\n\n    30%,\n    50%,\n    70% {\n      transform: translate3d(-4px, 0, 0);\n    }\n\n    40%,\n    60% {\n      transform: translate3d(4px, 0, 0);\n    }\n  }\n"])));n.a=function(e){var n=e.msg,t=e.type,a=void 0===t?"ok":t,r=e.visiblity,c=void 0===r||r,o=e.vibrating,m=e.hidden,d=void 0!==m&&m;return i.a.createElement(l,{className:"message ".concat(c&&o?"active":""),style:{background:"".concat("ok"===a?"#DCF1F7":"#F7DDDC"),padding:"0.65rem 1.1rem",borderRadius:"5px",border:"1px solid rgba(56, 0, 0, 0.08)",opacity:"".concat(c?1:0),pointerEvents:"".concat(c?"all":"none"),height:"".concat(c?"100%":"20px"),display:"".concat(d?"none":"inline-block")}},i.a.createElement("span",{style:{fontWeight:500,color:"".concat("ok"===a?"#306F83":"#712B29"),fontSize:"calc(0.8rem + 0.5vw)",display:"".concat(d?"none":"block")}},"returnTheThing"===n?i.a.createElement("p",null,"Email isn't Verified"," ",i.a.createElement(s.Link,{to:"/verify?redirect=/placeOrder"},"Verify Email")):n))}}}]);
//# sourceMappingURL=25.3179ab8b.chunk.js.map