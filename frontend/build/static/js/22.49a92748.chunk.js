(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{429:function(n,e,t){"use strict";t.r(e);var a,r=t(6),o=t(4),i=t(0),c=t.n(i),s=t(7),l=t(46),m=t(27),u=t(16),d=t(3),p=t(5),f=t.n(p),g=t(10),b=t(11),w=t.n(b),h=function(n){return function(){var e=Object(g.a)(f.a.mark(function e(t){var a,r;return f.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t({type:"RESET_PASSWORD_REQUEST"}),a=w.a.CancelToken,r=a.source(),e.next=6,w.a.post("/api/users/resetPasswordEmail",{email:n},{cancelToken:r.token});case 6:t({type:"RESET_PASSWORD_SUCCESS"}),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),t({type:"RESET_PASSWORD_FAIL",payload:e.t0.response&&e.t0.response.data.message?e.t0.response.data.message:e.t0.message});case 12:case"end":return e.stop()}},e,null,[[0,9]])}));return function(n){return e.apply(this,arguments)}}()},E=t(51),v=t(15),x=t(77),S=s.b.div(a||(a=Object(r.a)(["\n  .cont {\n    margin-top: clamp(20px, 14vh, 80px);\n    width: 35%;\n    max-width: 606px;\n  }\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  flex: 1 1 auto;\n  .xSign2 {\n    position: absolute;\n    right: 0%;\n    top: 50%;\n    transform: translate(-50%, -70%);\n    width: calc(0.75rem + 1vw);\n    cursor: pointer;\n    padding: 0.2rem;\n  }\n  h1 {\n    color: #1a1a1a;\n    font-weight: 500;\n    font-size: calc(2rem + 1vw);\n  }\n  form {\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n    width: 100%;\n    justify-content: center;\n    margin-bottom: 0.5rem;\n    margin-top: 0.3rem;\n\n    .email {\n      position: relative;\n      img {\n      }\n      input {\n        width: 100%;\n        background: #f3f3f3;\n        border: none;\n        padding: 0.5rem 1rem;\n        border-radius: 6px;\n        width: 100%;\n        font-size: calc(1rem + 0.3vw);\n      }\n    }\n    label {\n      font-size: calc(1rem + 0.3vw);\n      color: #343a40;\n    }\n    button {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      padding: 0.35rem 1.2rem;\n      border: none;\n      background: #00b2d8;\n      color: white;\n      border-radius: 6px;\n      font-size: calc(1.2rem + 0.3vw);\n      cursor: pointer;\n      transition: 0.1s;\n      &:hover {\n        background: #00a8ce;\n      }\n      #loader:first-child {\n        width: calc(0.9rem + 0.5vw);\n        height: calc(0.9rem + 0.5vw);\n        margin-left: 0.45rem;\n        #greybackground path {\n          stroke: white;\n        }\n      }\n    }\n    #email,\n    #password {\n      margin-bottom: 1rem;\n      margin-top: 0.3rem;\n      padding-right: 2.8rem;\n    }\n    #password {\n      margin-bottom: 0rem;\n    }\n  }\n  @media screen and (max-width: 1050px) {\n    .cont {\n      width: 90%;\n    }\n    .xSign2 {\n      transform: translate(-50%, -24%) !important;\n      width: calc(2rem + 1vw);\n      cursor: pointer;\n      padding: 0.6rem;\n      transform: translate(-12%, -65%) !important;\n    }\n    form {\n      align-items: stretch;\n    }\n    button {\n      align-self: flex-start;\n    }\n  }\n"])));e.default=function(){var n=Object(d.b)(),e=Object(i.useState)(""),t=Object(o.a)(e,2),a=t[0],r=t[1],s=Object(d.c)(function(n){return n.userInfo}),p=s.error,f=s.resetLoading,g=s.user,b=s.sent,w=Object(v.k)();Object(i.useEffect)(function(){g.name&&w.push("/")},[g]);var y=Object(i.useState)(!1),k=Object(o.a)(y,1)[0];return c.a.createElement(c.a.Fragment,null,c.a.createElement(E.a,{providedClassName:"goBackForgotPassword"}),b&&c.a.createElement(x.a,{setWarning:k,timer:5,desc:c.a.createElement("p",null,"Check Your email to verify It's you",c.a.createElement("br",null)," and Reset your Password"),title:"Email Sent",type:"ok"}),c.a.createElement(S,null,c.a.createElement("div",{className:"cont"},c.a.createElement("h1",null,"Forgot Password"),c.a.createElement(m.a,{vibrating:"true",visiblity:!!p,msg:p?p.includes("timed out")?"Network Error":p.includes("mongo")?"Server Error":p:"",type:"error"}),c.a.createElement("form",{onSubmit:function(e){e.preventDefault(),n(h(a))}},c.a.createElement("label",{htmlFor:"email"},"Email"),c.a.createElement("div",{className:"email"},c.a.createElement("input",{onChange:function(n){return r(n.target.value)},value:a,type:"text",id:"email"}),c.a.createElement(l.a,{onClick:function(){return r("")},style:{display:"".concat(a.length?"block":"none")},className:"xSign2"})),c.a.createElement("button",{type:"submit"},"Send",f&&c.a.createElement(u.a,null))))))}}}]);
//# sourceMappingURL=22.49a92748.chunk.js.map