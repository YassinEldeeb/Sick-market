(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[10],{392:function(n,e,t){"use strict";t.r(e);var r,a=t(8),s=t(4),o=t(1),c=t(9),i=t(35),l=t(52),m=t(53),d=t(5),u=t(6),p=t.n(u),f=t(12),b=t(11),g=t.n(b),j=function(n,e,t){return function(){var r=Object(f.a)(p.a.mark((function r(a){var s,o,c,i,l;return p.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,a({type:"REGISTER_REQUEST"}),s=g.a.CancelToken,o=s.source(),c={headers:{Content_Type:"application/json"},cancelToken:o.token},r.next=7,g.a.post("/api/users",{name:n,email:e,password:t},c);case 7:i=r.sent,l=i.data,a({type:"REGISTER_SUCCESS"}),a({type:"USER_LOGIN_SUCCESS",payload:l}),l&&localStorage.setItem("sickUserInfo",JSON.stringify(l)),r.next=18;break;case 14:r.prev=14,r.t0=r.catch(0),a({type:"REGISTER_FAIL",payload:r.t0.response&&r.t0.response.data.message?r.t0.response.data.message:r.t0.message}),localStorage.removeItem("sickUserInfo");case 18:case"end":return r.stop()}}),r,null,[[0,14]])})));return function(n){return r.apply(this,arguments)}}()},h=t(18),w=t(15),y=t(16),x=t(7),O=t(0),v=c.b.div(r||(r=Object(a.a)(["\n  .eye2 {\n    transform: translate(-50%, 8%) !important;\n  }\n  .xSign2 {\n    position: absolute;\n    right: 0%;\n    top: 50%;\n    transform: translate(-50%, -12%);\n    width: calc(0.75rem + 1vw);\n    cursor: pointer;\n    padding: 0.2rem;\n  }\n  .eye {\n    position: absolute;\n    right: 0%;\n    top: 50%;\n    transform: translate(-50%, -6%);\n    width: calc(1.8rem + 0.3vw);\n    cursor: pointer;\n  }\n  .mobile {\n    display: none;\n  }\n  .desktop {\n    display: block;\n  }\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  flex: 1 1 auto;\n  form {\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n    width: 35%;\n    justify-content: center;\n    margin-top: clamp(20px, 14vh, 80px);\n    margin-bottom: 2.5rem;\n    h1 {\n      color: #1a1a1a;\n      font-weight: 500;\n      font-size: calc(2rem + 1vw);\n    }\n    .signInDiv {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      width: 100%;\n    }\n    .email,\n    .password,\n    .name {\n      position: relative;\n      width: 100%;\n      input {\n        background: #f3f3f3;\n        border: none;\n        padding: 0.5rem 1rem;\n        border-radius: 6px;\n        width: 100%;\n        font-size: calc(1rem + 0.3vw);\n      }\n      label {\n        font-size: calc(1rem + 0.3vw);\n        color: #343a40;\n      }\n    }\n    .registerBtn {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      padding: 0.45rem 1.1rem;\n      border: none;\n      background: #00b2d8;\n      color: white;\n      border-radius: 6px;\n      font-size: calc(1.2rem + 0.3vw);\n      cursor: pointer;\n      transition: 0.1s;\n      &:hover {\n        background: #00a8ce;\n      }\n      #loader:first-child {\n        width: calc(0.9rem + 0.5vw);\n        height: calc(0.9rem + 0.5vw);\n        margin-left: 0.45rem;\n        #greybackground path {\n          stroke: white;\n        }\n      }\n    }\n    #email,\n    #password,\n    #confirmPassword,\n    #name {\n      margin-bottom: 1rem;\n      margin-top: 0.3rem;\n      padding-right: 2.8rem;\n    }\n  }\n  .desktop,\n  .mobile {\n    font-size: calc(0.9rem + 0.2vw);\n    margin-top: 1.2rem;\n    span a {\n      color: #0084a0;\n      cursor: pointer;\n      transition: 0.1s;\n\n      &:hover {\n        color: #0094b6;\n      }\n    }\n  }\n  .message {\n    margin-top: 0.1rem;\n    width: 100%;\n    margin-bottom: 0.5rem;\n  }\n  @media screen and (max-width: 1050px) {\n    form {\n      margin-bottom: 1rem;\n    }\n    .message {\n      padding: 0.5rem 0.7rem !important;\n    }\n    .eye {\n      position: absolute;\n      right: 0%;\n      top: 50%;\n      cursor: pointer;\n      padding: 0.6rem;\n      transform: translate(-18%, -36%);\n      width: calc(2.8rem + 1vw);\n    }\n    .eye2 {\n      transform: translate(-18%, -35%) !important;\n    }\n    .xSign2 {\n      transform: translate(-50%, -24%) !important;\n      width: calc(2rem + 1vw);\n      cursor: pointer;\n      padding: 0.6rem;\n      transform: translate(-12%, -36%) !important;\n    }\n    justify-content: space-around;\n    form {\n      margin-top: 1.1rem;\n      margin-bottom: 0;\n      width: 90%;\n      h1 {\n        font-size: calc(2.5rem + 1vw);\n      }\n      input {\n        font-size: calc(1.1rem + 0.3vw);\n      }\n      label {\n        font-size: calc(1.3rem + 0.3vw);\n      }\n      button {\n        font-size: calc(1.2rem + 0.3vw);\n        padding: 0.5rem 1.1rem;\n        border-radius: 6px;\n      }\n      #email,\n      #password {\n        margin-bottom: 1.3rem;\n      }\n    }\n    .mobile {\n      margin: 1.8rem 0;\n      display: block;\n      font-size: calc(1.1rem + 0.2vw);\n    }\n    .desktop {\n      display: none;\n    }\n    .filepond--drop-label.filepond--drop-label label {\n      font-size: calc(0.9rem + 1vw) !important;\n    }\n    .filepond--wrapper {\n      align-self: center;\n      width: 12rem;\n      margin-bottom: 0.65rem;\n    }\n    .filepond--root.filepond--hopper {\n      height: 12rem !important;\n    }\n  }\n  .filepond--drop-label.filepond--drop-label label {\n    font-size: 1.2rem;\n  }\n"])));e.default=function(){var n=Object(o.useRef)(null),e=Object(o.useRef)(null),t=Object(o.useState)(""),r=Object(s.a)(t,2),a=r[0],c=r[1],u=Object(o.useState)(""),p=Object(s.a)(u,2),f=p[0],b=p[1],g=Object(o.useState)(""),k=Object(s.a)(g,2),S=k[0],E=k[1],N=Object(o.useState)(""),C=Object(s.a)(N,2),z=C[0],R=C[1],I=Object(o.useState)(!1),P=Object(s.a)(I,2),T=P[0],U=P[1],L=Object(o.useState)(null),_=Object(s.a)(L,2),F=_[0],A=_[1],G=Object(d.b)(),J=Object(y.l)(),B=Object(y.k)(),D=Object(d.c)((function(n){return n.userInfo})),H=D.loading,X=D.user,q=D.error,Q=J.search.replace("?redirect=",""),Y="/"!==Q?Q:"/verify";Object(o.useEffect)((function(){X.name&&B.push(Y)}),[X,B,Y]);return Object(o.useEffect)((function(){(F||q)&&window.scroll({top:0,left:0})}),[q,F]),Object(O.jsxs)(v,{children:[Object(O.jsxs)("form",{onSubmit:function(n){n.preventDefault(),S!==z?A("Password & Confirm Password don't match"):S?isNaN(a)?(A(null),G(j(a,f,S))):A("Name must be alphabetical letters!"):A("name, Email and Password are Required")},children:[Object(O.jsx)("h1",{children:"Sign Up"}),Object(O.jsx)(h.a,{vibrating:"true",visiblity:!(!q&&!F),msg:function(){if(F)return F;if(!q)return"ok";if(q.includes("mongo"))return"Server Error";if(q.includes("timed out"))return"Network Error";if(q.includes("is shorter than the minimum allowed length (8)"))return"Password is shorter than the minimum allowed length (8).";switch(q){case"User validation failed: password: Password can't contain any sort of 'password' keyword":return"Your Password can't contain any sort of the 'password' keyword.";default:return q}}(),type:"error"}),Object(O.jsxs)("div",{className:"name",children:[Object(O.jsx)("label",{htmlFor:"name",children:"Name"}),Object(O.jsx)("input",{value:a,id:"name",type:"text",onChange:function(n){return c(n.target.value)}}),Object(O.jsx)("img",{onClick:function(){return c("")},style:{display:"".concat(a.length?"block":"none")},className:"xSign2",src:i.a,alt:"X icon"})]}),Object(O.jsxs)("div",{className:"email",children:[Object(O.jsx)("label",{htmlFor:"email",children:"Email Address"}),Object(O.jsx)("input",{value:f,id:"email",type:"text",onChange:function(n){return b(n.target.value)}}),Object(O.jsx)("img",{onClick:function(){return b("")},style:{display:"".concat(f.length?"block":"none")},className:"xSign2",src:i.a,alt:"X icon"})]}),Object(O.jsxs)("div",{className:"password",children:[Object(O.jsx)("label",{htmlFor:"password",children:"Password"}),Object(O.jsx)("input",{ref:n,value:S,id:"password",type:"".concat(T?"text":"password"),onChange:function(n){return E(n.target.value)}}),Object(O.jsx)("img",{style:{display:"".concat(T?"none":"block")},className:"eye eye1",src:l.a,alt:"closedEye",draggable:"false",onClick:function(){n.current.focus(),U(!T),setTimeout((function(){n.current.selectionStart=n.current.selectionEnd=1e4}),0)}}),Object(O.jsx)("img",{style:{display:"".concat(T?"block":"none")},className:"eye eye2",src:m.a,alt:"eye",draggable:"false",onClick:function(){n.current.focus(),U(!T),setTimeout((function(){n.current.selectionStart=n.current.selectionEnd=1e4}),0)}})]}),Object(O.jsxs)("div",{className:"password",children:[Object(O.jsx)("label",{htmlFor:"confirmPassword",children:"Confirm Password"}),Object(O.jsx)("input",{ref:e,value:z,id:"confirmPassword",type:"".concat(T?"text":"password"),onChange:function(n){return R(n.target.value)}}),Object(O.jsx)("img",{style:{display:"".concat(T?"none":"block")},className:"eye eye1",src:l.a,alt:"closedEye",draggable:"false",onClick:function(){e.current.focus(),U(!T),setTimeout((function(){e.current.selectionStart=e.current.selectionEnd=1e4}),0)}}),Object(O.jsx)("img",{style:{display:"".concat(T?"block":"none")},className:"eye eye2",src:m.a,alt:"eye",draggable:"false",onClick:function(){e.current.focus(),U(!T),setTimeout((function(){e.current.selectionStart=e.current.selectionEnd=1e4}),0)}})]}),Object(O.jsxs)("button",{className:"registerBtn",type:"submit",children:["Register ",H&&Object(O.jsx)(w.a,{})]}),Object(O.jsxs)("p",{className:"desktop",children:["Have an Account?"," ",Object(O.jsx)("span",{className:"register",children:Object(O.jsx)(x.Link,{to:"/login?redirect=".concat(Y),children:"Login"})})]})]}),Object(O.jsxs)("p",{className:"mobile",children:["Have an Account?"," ",Object(O.jsx)("span",{className:"register",children:Object(O.jsx)(x.Link,{to:"/login?redirect=".concat(Y),children:"Login"})})]})]})}}}]);
//# sourceMappingURL=10.a8c5d92b.chunk.js.map