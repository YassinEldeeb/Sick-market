(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[12],{391:function(e,n,t){"use strict";t.r(n);var r,a=t(8),c=t(4),i=t(1),s=t(9),o=t(6),l=t.n(o),d=t(12),m=t(10),u=t.n(m),f=function(e){return function(){var n=Object(d.a)(l.a.mark((function n(t,r){var a,c,i,s;return l.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(t({type:"VERIFY_REQUEST"}),!(a=r().userInfo).token||"pending"!==a.user.status){n.next=16;break}return n.prev=3,c=u.a.CancelToken,i=c.source(),s={headers:{Content_Type:"application/json",Authorization:"Bearer ".concat(a.token)},cancelToken:i.token},n.next=9,u.a.post("/api/users/getSecurityCode",{code:Number(e)},s);case 9:t({type:"VERIFY_SUCCESS"}),localStorage.setItem("sickUserInfo",JSON.stringify({user:r().userInfo.user,token:r().userInfo.token})),n.next=16;break;case 13:n.prev=13,n.t0=n.catch(3),t({type:"VERIFY_FAIL",payload:n.t0.response&&n.t0.response.data.message?n.t0.response.data.message:n.t0.message});case 16:case"end":return n.stop()}}),n,null,[[3,13]])})));return function(e,t){return n.apply(this,arguments)}}()},p=t.p+"static/media/danger.52622ca6.svg",g=t(5),b=t(18),h=t(15),x=t(16),j=t(7),v=function(){return function(){var e=Object(d.a)(l.a.mark((function e(n,t){var r,a,c,i;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n({type:"NEW_VERIFY_CODE_REQUEST"}),!(r=t().userInfo).token||"pending"!==r.user.status){e.next=15;break}return e.prev=3,a=u.a.CancelToken,c=a.source(),i={headers:{Content_Type:"application/json",Authorization:"Bearer ".concat(r.token)},cancelToken:c.token},e.next=9,u.a.get("/api/users/getNewSecurityCode",i);case 9:n({type:"NEW_VERIFY_CODE_SUCCESS"}),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(3),n({type:"NEW_VERIFY_CODE_FAIL",payload:e.t0.response&&e.t0.response.data.message?e.t0.response.data.message:e.t0.message});case 15:case"end":return e.stop()}}),e,null,[[3,12]])})));return function(n,t){return e.apply(this,arguments)}}()},w=t(0),y=s.b.div(r||(r=Object(a.a)(["\n  .emailSentMessage {\n    margin: 0.35rem 0;\n    margin-bottom: 0.5rem;\n    color: #3e3e3e;\n    font-size: calc(1rem + 0.2vw);\n    a {\n      color: #0084a0;\n    }\n  }\n  .waitActive {\n    filter: grayscale(0.2);\n    opacity: 0.7;\n    pointer-events: none;\n  }\n  .message {\n    align-self: flex-start;\n    margin-bottom: 0rem;\n  }\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex: 1 1 auto;\n  .modelBox {\n    border-radius: 12px;\n    box-shadow: -2px 4px 10px rgba(0, 0, 0, 0.2);\n    overflow: hidden;\n    display: flex;\n    justify-content: stretch;\n    align-items: stretch;\n  }\n\n  .danger {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-direction: column;\n    width: 100%;\n\n    .danger-text {\n      padding: 0.9rem calc(1.5rem + 1vw);\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      background: #fffbd6;\n      width: 100%;\n      img {\n        width: calc(1.4rem + 0.05vw);\n        height: calc(1.4rem + 0.05vw);\n        margin-right: 0.4rem;\n      }\n      p {\n        font-size: calc(0.85rem + 0.3vw);\n        color: #715100;\n      }\n    }\n  }\n  .theRest {\n    padding: calc(1.5rem + 1vw);\n    flex: 1 1 auto;\n    width: 100%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-direction: column;\n    h1 {\n      color: #1a1a1a;\n      font-weight: 500;\n      font-size: calc(2.2rem + 0.3vw);\n      align-self: flex-start;\n      margin-bottom: calc(1rem + 0.3vh);\n    }\n    input {\n      background: #f3f3f3;\n      border: none;\n      border-radius: 5px;\n      font-size: calc(1.1rem + 0.3vw);\n      padding: 0.5rem 1rem;\n      margin-bottom: calc(1.4rem + 0.3vh);\n    }\n    .verifyBtns {\n      display: flex;\n      flex-direction: column;\n      width: 100%;\n      button {\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n        padding: 0.4rem 1.3rem;\n        border: none;\n        color: white;\n        background: #00b2d8;\n        border-radius: 6px;\n        font-size: calc(1.2rem + 0.3vw);\n        cursor: pointer;\n        transition: 0.1s ease;\n        &:hover {\n          background: #00bde7;\n        }\n        #loader:first-child {\n          width: calc(0.9rem + 0.5vw);\n          height: calc(0.9rem + 0.5vw);\n          margin-left: 0.45rem;\n          #greybackground path {\n            stroke: white;\n          }\n        }\n      }\n      .btns {\n        width: 100%;\n        display: flex;\n        justify-content: space-between;\n        align-items: flex-end;\n        p {\n          font-size: calc(0.9rem + 0.2vw);\n          cursor: pointer;\n          color: #0084a0;\n        }\n      }\n    }\n  }\n  @media screen and (max-width: 1050px) {\n    .emailSentMessage {\n      font-size: calc(0.8rem + 0.2vw);\n    }\n    .message {\n      span {\n        font-size: calc(0.7rem + 0.1vw) !important;\n      }\n    }\n    margin-top: calc(2rem + 0.3vh);\n    align-items: flex-start;\n    .danger {\n      .danger-text {\n        padding: 0.9rem calc(1rem + 1vw);\n        img {\n          width: calc(1.3rem + 0.05vw);\n          height: calc(1.3rem + 0.05vw);\n          margin-right: 0.55rem;\n        }\n        p {\n          font-size: calc(0.7rem + 0.3vw);\n        }\n      }\n    }\n    .theRest {\n      padding: calc(0.85rem + 1vw) calc(1rem + 1vw) calc(1rem + 1vw)\n        calc(1rem + 1vw);\n      h1 {\n        font-size: calc(1.6rem + 0.3vw);\n        margin-bottom: calc(0.7rem + 0.3vh);\n      }\n      input {\n        margin-bottom: calc(1rem + 0.3vh);\n      }\n    }\n    .modelBox {\n      width: 90%;\n      border: unset;\n      border-radius: 12px;\n      box-shadow: -2px 4px 10px rgba(0, 0, 0, 0.2);\n    }\n    .verifyBtns {\n      display: flex;\n      flex-direction: column;\n      width: 100%;\n    }\n  }\n"])));n.default=function(){var e=Object(i.useState)(""),n=Object(c.a)(e,2),t=n[0],r=n[1],a=Object(i.useState)(""),s=Object(c.a)(a,2),o=s[0],l=s[1],d=Object(g.c)((function(e){return e.userInfo})),m=d.verificationError,u=d.verifyLoading,O=d.user,k=d.newCodeError,S=d.newCodeLoading,E=Object(i.useState)(0),I=Object(c.a)(E,2),C=I[0],N=I[1],_=Object(i.useState)(!1),T=Object(c.a)(_,2),z=T[0],R=T[1],V=O?O.status:"",B=Object(i.useState)(localStorage.getItem("sickTimerSeconds")?JSON.parse(localStorage.getItem("sickTimerSeconds")):60),F=Object(c.a)(B,1)[0],A=Object(x.l)();Object(i.useEffect)((function(){z&&setTimeout((function(){C>0?(N((function(e){return e-1})),localStorage.setItem("sickTimerSeconds",C)):(R(!1),localStorage.removeItem("sickTimerSeconds"))}),1e3)}),[z,C]);var D=Object(g.b)(),L=Object(x.k)(),Y=A.search.split("=")[1]?A.search.split("=")[1]:"/",U=Object(g.c)((function(e){return e.order}));return Object(i.useEffect)((function(){O.name?"Verified"===V&&(U.error=null,L.push(Y)):L.push("/login")}),[V,O,L]),Object(i.useEffect)((function(){D(v())}),[D]),Object(i.useEffect)((function(){!z&&k&&(N(F),R(!0))}),[k,z,F]),Object(i.useEffect)((function(){!1!==S||k?"Email already Verified"===k&&L.push(Y):(N(60),z||R(!0))}),[S,L,k,z]),Object(w.jsx)(y,{children:Object(w.jsx)("div",{className:"modelBox",children:Object(w.jsxs)("div",{className:"danger",children:[Object(w.jsxs)("div",{className:"danger-text",children:[Object(w.jsx)("img",{src:p,alt:"danger"}),Object(w.jsx)("p",{children:"If you didn\u2019t find the email in your Inbox, maybe It\u2019s in your Spam box"})]}),Object(w.jsxs)("div",{className:"theRest",children:[Object(w.jsx)("h1",{children:"Enter Code to Verify"}),Object(w.jsx)(b.a,{hidden:"true",vibrating:"true",visiblity:o.length?o:!(!m||u),msg:o.length?o:m?m.includes("timed out")?"Network Error":m.includes("mongo")?"Server Error":m:"Ok",type:"error"}),Object(w.jsxs)("form",{className:"verifyBtns",onSubmit:function(e){l(""),e.preventDefault(),4===t.length?D(f(Number(t))):l("Code must be 4 Digits")},children:[O&&!1===S&&!k&&Object(w.jsxs)("p",{className:"emailSentMessage",children:["Email Sent to '",O.email,"'"," ",Object(w.jsx)(j.Link,{to:"/changeEmail?redirect=verify",children:"Change Email"})]}),Object(w.jsx)("input",{maxLength:4,value:t,onChange:function(e){return r(e.target.value)},type:"number",id:"code",placeholder:"4 Digits Code"}),Object(w.jsxs)("div",{className:"btns",children:[Object(w.jsxs)("button",{type:"submit",children:["Verify ",u&&Object(w.jsx)(h.a,{})]}),Object(w.jsx)("p",{className:"".concat(z?"waitActive":""),onClick:function(){z||(N(60),R(!0)),D(v())},children:C?"Send again(".concat(C,")"):"Send again"})]})]})]})]})})})}}}]);
//# sourceMappingURL=12.558517f0.chunk.js.map