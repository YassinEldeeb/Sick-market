(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[6],{332:function(e,n,t){"undefined"!=typeof self&&self,e.exports=function(e){return r={},n.m=t=[function(n){n.exports=e},function(e,n,t){e.exports=t(2)()},function(e,n,t){"use strict";function r(){}function o(){}var i=t(3);o.resetWarningCache=r,e.exports=function(){function e(e,n,t,r,o,a){if(a!==i){var c=Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}function n(){return e}var t={array:e.isRequired=e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:n,element:e,elementType:e,instanceOf:n,node:e,objectOf:n,oneOf:n,oneOfType:n,shape:n,exact:n,checkPropTypes:o,resetWarningCache:r};return t.PropTypes=t}},function(e){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,n,t){"use strict";function r(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var t=[],r=!0,o=!1,i=void 0;try{for(var a,c=e[Symbol.iterator]();!(r=(a=c.next()).done)&&(t.push(a.value),!n||t.length!==n);r=!0);}catch(e){o=!0,i=e}finally{try{r||null==c.return||c.return()}finally{if(o)throw i}}return t}}(e,n)||function(e,n){if(e){if("string"==typeof e)return o(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(t):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?o(e,n):void 0}}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e,n){null!=n&&n<=e.length||(n=e.length);for(var t=0,r=Array(n);t<n;t++)r[t]=e[t];return r}function i(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var t=[],r=!0,o=!1,i=void 0;try{for(var a,c=e[Symbol.iterator]();!(r=(a=c.next()).done)&&(t.push(a.value),!n||t.length!==n);r=!0);}catch(e){o=!0,i=e}finally{try{r||null==c.return||c.return()}finally{if(o)throw i}}return t}}(e,n)||function(e,n){if(e){if("string"==typeof e)return a(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(t):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?a(e,n):void 0}}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(e,n){null!=n&&n<=e.length||(n=e.length);for(var t=0,r=Array(n);t<n;t++)r[t]=e[t];return r}function c(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var t=[],r=!0,o=!1,i=void 0;try{for(var a,c=e[Symbol.iterator]();!(r=(a=c.next()).done)&&(t.push(a.value),!n||t.length!==n);r=!0);}catch(e){o=!0,i=e}finally{try{r||null==c.return||c.return()}finally{if(o)throw i}}return t}}(e,n)||function(e,n){if(e){if("string"==typeof e)return s(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(t):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?s(e,n):void 0}}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(e,n){null!=n&&n<=e.length||(n=e.length);for(var t=0,r=Array(n);t<n;t++)r[t]=e[t];return r}function l(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var t=[],r=!0,o=!1,i=void 0;try{for(var a,c=e[Symbol.iterator]();!(r=(a=c.next()).done)&&(t.push(a.value),!n||t.length!==n);r=!0);}catch(e){o=!0,i=e}finally{try{r||null==c.return||c.return()}finally{if(o)throw i}}return t}}(e,n)||function(e,n){if(e){if("string"==typeof e)return u(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(t):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?u(e,n):void 0}}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(e,n){null!=n&&n<=e.length||(n=e.length);for(var t=0,r=Array(n);t<n;t++)r[t]=e[t];return r}function d(e,n,t,r,o,i){var a=e.getElementsByTagName(n)[0],c=a,s=a;(s=e.createElement(n)).id=t,s.src=r,c&&c.parentNode?c.parentNode.insertBefore(s,c):e.head.appendChild(s),s.onerror=i,s.onload=o}function f(e,n){var t=e.getElementById(n);t&&t.parentNode.removeChild(t)}function p(e){return y.a.createElement("span",{style:{paddingRight:10,fontWeight:500,paddingLeft:e.icon?0:10,paddingTop:10,paddingBottom:10}},e.children)}function m(e){return y.a.createElement("div",{style:{marginRight:10,background:e.active?"#eee":"#fff",padding:10,borderRadius:2}},y.a.createElement("svg",{width:"18",height:"18",xmlns:"http://www.w3.org/2000/svg"},y.a.createElement("g",{fill:"#000",fillRule:"evenodd"},y.a.createElement("path",{d:"M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z",fill:"#EA4335"}),y.a.createElement("path",{d:"M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z",fill:"#4285F4"}),y.a.createElement("path",{d:"M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z",fill:"#FBBC05"}),y.a.createElement("path",{d:"M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z",fill:"#34A853"}),y.a.createElement("path",{fill:"none",d:"M0 0h18v18H0z"}))))}function g(e){var n=i(Object(b.useState)(!1),2),t=n[0],r=n[1],o=i(Object(b.useState)(!1),2),a=o[0],c=o[1],s=e.tag,l=e.type,u=e.className,d=e.disabledStyle,f=e.buttonText,g=e.children,v=e.render,j=e.theme,S=e.icon,O=e.disabled,w=h({onSuccess:e.onSuccess,onAutoLoadFinished:e.onAutoLoadFinished,onRequest:e.onRequest,onFailure:e.onFailure,onScriptLoadFailure:e.onScriptLoadFailure,clientId:e.clientId,cookiePolicy:e.cookiePolicy,loginHint:e.loginHint,hostedDomain:e.hostedDomain,autoLoad:e.autoLoad,isSignedIn:e.isSignedIn,fetchBasicProfile:e.fetchBasicProfile,redirectUri:e.redirectUri,discoveryDocs:e.discoveryDocs,uxMode:e.uxMode,scope:e.scope,accessType:e.accessType,responseType:e.responseType,jsSrc:e.jsSrc,prompt:e.prompt}),x=w.signIn,k=O||!w.loaded;if(v)return v({onClick:x,disabled:k});var I={backgroundColor:"dark"===j?"rgb(66, 133, 244)":"#fff",display:"inline-flex",alignItems:"center",color:"dark"===j?"#fff":"rgba(0, 0, 0, .54)",boxShadow:"0 2px 2px 0 rgba(0, 0, 0, .24), 0 0 1px 0 rgba(0, 0, 0, .24)",padding:0,borderRadius:2,border:"1px solid transparent",fontSize:14,fontWeight:"500",fontFamily:"Roboto, sans-serif"},_={cursor:"pointer",backgroundColor:"dark"===j?"#3367D6":"#eee",color:"dark"===j?"#fff":"rgba(0, 0, 0, .54)",opacity:1},E=k?Object.assign({},I,d):a?Object.assign({},I,_):t?Object.assign({},I,{cursor:"pointer",opacity:.9}):I;return y.a.createElement(s,{onMouseEnter:function(){return r(!0)},onMouseLeave:function(){r(!1),c(!1)},onMouseDown:function(){return c(!0)},onMouseUp:function(){return c(!1)},onClick:x,style:E,type:l,disabled:k,className:u},[S&&y.a.createElement(m,{key:1,active:a}),y.a.createElement(p,{icon:S,key:2},g||f)])}t.r(n),t.d(n,"default",(function(){return j})),t.d(n,"GoogleLogin",(function(){return j})),t.d(n,"GoogleLogout",(function(){return O})),t.d(n,"useGoogleLogin",(function(){return h})),t.d(n,"useGoogleLogout",(function(){return S}));var b=t(0),y=t.n(b),h=(t(1),function(e){function n(e){var n=e.getBasicProfile(),t=e.getAuthResponse(!0);e.googleId=n.getId(),e.tokenObj=t,e.tokenId=t.id_token,e.accessToken=t.access_token,e.profileObj={googleId:n.getId(),imageUrl:n.getImageUrl(),email:n.getEmail(),name:n.getName(),givenName:n.getGivenName(),familyName:n.getFamilyName()},i(e)}function t(e){if(e&&e.preventDefault(),C){var t=window.gapi.auth2.getAuthInstance(),r={prompt:N};p(),"code"===E?t.grantOfflineAccess(r).then((function(e){return i(e)}),(function(e){return l(e)})):t.signIn(r).then((function(e){return n(e)}),(function(e){return l(e)}))}}var o=e.onSuccess,i=void 0===o?function(){}:o,a=e.onAutoLoadFinished,c=void 0===a?function(){}:a,s=e.onFailure,l=void 0===s?function(){}:s,u=e.onRequest,p=void 0===u?function(){}:u,m=e.onScriptLoadFailure,g=e.clientId,y=e.cookiePolicy,h=e.loginHint,v=e.hostedDomain,j=e.autoLoad,S=e.isSignedIn,O=e.fetchBasicProfile,w=e.redirectUri,x=e.discoveryDocs,k=e.uxMode,I=e.scope,_=e.accessType,E=e.responseType,T=e.jsSrc,L=void 0===T?"https://apis.google.com/js/api.js":T,N=e.prompt,A=r(Object(b.useState)(!1),2),C=A[0],P=A[1];return Object(b.useEffect)((function(){var e=!1,t=m||l;return d(document,"script","google-login",L,(function(){var r={client_id:g,cookie_policy:y,login_hint:h,hosted_domain:v,fetch_basic_profile:O,discoveryDocs:x,ux_mode:k,redirect_uri:w,scope:I,access_type:_};"code"===E&&(r.access_type="offline"),window.gapi.load("auth2",(function(){var o=window.gapi.auth2.getAuthInstance();o?o.then((function(){e||(S&&o.isSignedIn.get()?(P(!0),c(!0),n(o.currentUser.get())):(P(!0),c(!1)))}),(function(e){l(e)})):window.gapi.auth2.init(r).then((function(t){if(!e){P(!0);var r=S&&t.isSignedIn.get();c(r),r&&n(t.currentUser.get())}}),(function(e){P(!0),c(!1),t(e)}))}))}),(function(e){t(e)})),function(){e=!0,f(document,"google-login")}}),[]),Object(b.useEffect)((function(){j&&t()}),[C]),{signIn:t,loaded:C}});function v(e){var n=l(Object(b.useState)(!1),2),t=n[0],r=n[1],o=l(Object(b.useState)(!1),2),i=o[0],a=o[1],c=e.tag,s=e.type,u=e.className,d=e.disabledStyle,f=e.buttonText,g=e.children,h=e.render,v=e.theme,j=e.icon,O=e.disabled,w=S({jsSrc:e.jsSrc,onFailure:e.onFailure,onScriptLoadFailure:e.onScriptLoadFailure,clientId:e.clientId,cookiePolicy:e.cookiePolicy,loginHint:e.loginHint,hostedDomain:e.hostedDomain,fetchBasicProfile:e.fetchBasicProfile,discoveryDocs:e.discoveryDocs,uxMode:e.uxMode,redirectUri:e.redirectUri,scope:e.scope,accessType:e.accessType,onLogoutSuccess:e.onLogoutSuccess}),x=w.signOut,k=O||!w.loaded;if(h)return h({onClick:x,disabled:k});var I={backgroundColor:"dark"===v?"rgb(66, 133, 244)":"#fff",display:"inline-flex",alignItems:"center",color:"dark"===v?"#fff":"rgba(0, 0, 0, .54)",boxShadow:"0 2px 2px 0 rgba(0, 0, 0, .24), 0 0 1px 0 rgba(0, 0, 0, .24)",padding:0,borderRadius:2,border:"1px solid transparent",fontSize:14,fontWeight:"500",fontFamily:"Roboto, sans-serif"},_={cursor:"pointer",backgroundColor:"dark"===v?"#3367D6":"#eee",color:"dark"===v?"#fff":"rgba(0, 0, 0, .54)",opacity:1},E=k?Object.assign({},I,d):i?Object.assign({},I,_):t?Object.assign({},I,{cursor:"pointer",opacity:.9}):I;return y.a.createElement(c,{onMouseEnter:function(){return r(!0)},onMouseLeave:function(){r(!1),a(!1)},onMouseDown:function(){return a(!0)},onMouseUp:function(){return a(!1)},onClick:x,style:E,type:s,disabled:k,className:u},[j&&y.a.createElement(m,{key:1,active:i}),y.a.createElement(p,{icon:j,key:2},g||f)])}g.defaultProps={type:"button",tag:"button",buttonText:"Sign in with Google",scope:"profile email",accessType:"online",prompt:"",cookiePolicy:"single_host_origin",fetchBasicProfile:!0,isSignedIn:!1,uxMode:"popup",disabledStyle:{opacity:.6},icon:!0,theme:"light",onRequest:function(){}};var j=g,S=function(e){var n=e.jsSrc,t=void 0===n?"https://apis.google.com/js/api.js":n,r=e.onFailure,o=e.onScriptLoadFailure,i=e.clientId,a=e.cookiePolicy,s=e.loginHint,l=e.hostedDomain,u=e.fetchBasicProfile,p=e.discoveryDocs,m=e.uxMode,g=e.redirectUri,y=e.scope,h=e.accessType,v=e.onLogoutSuccess,j=c(Object(b.useState)(!1),2),S=j[0],O=j[1],w=Object(b.useCallback)((function(){if(window.gapi){var e=window.gapi.auth2.getAuthInstance();null!=e&&e.then((function(){e.signOut().then((function(){e.disconnect(),v()}))}),(function(e){return r(e)}))}}),[v]);return Object(b.useEffect)((function(){var e=o||r;return d(document,"script","google-login",t,(function(){var n={client_id:i,cookie_policy:a,login_hint:s,hosted_domain:l,fetch_basic_profile:u,discoveryDocs:p,ux_mode:m,redirect_uri:g,scope:y,access_type:h};window.gapi.load("auth2",(function(){window.gapi.auth2.getAuthInstance()?O(!0):window.gapi.auth2.init(n).then((function(){return O(!0)}),(function(n){return e(n)}))}))}),(function(n){e(n)})),function(){f(document,"google-login")}}),[]),{signOut:w,loaded:S}};v.defaultProps={type:"button",tag:"button",buttonText:"Logout of Google",disabledStyle:{opacity:.6},icon:!0,theme:"light",jsSrc:"https://apis.google.com/js/api.js"};var O=v}],n.c=r,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(n){return e[n]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="",n(n.s=4);function n(e){if(r[e])return r[e].exports;var o=r[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var t,r}(t(1))},392:function(e,n,t){"use strict";t.r(n);var r,o=t(8),i=t(4),a=t(1),c=t(9),s=t(36),l=t(63),u=t(64),d=t(5),f=t(6),p=t.n(f),m=t(12),g=t(10),b=t.n(g),y=function(e,n){return function(){var t=Object(m.a)(p.a.mark((function t(r){var o,i,a,c,s;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,r({type:"USER_LOGIN_REQUEST"}),o=b.a.CancelToken,i=o.source(),a={headers:{Content_Type:"application/json"},cancelToken:i.token},t.next=7,b.a.post("/api/users/login",{email:e,password:n},a);case 7:c=t.sent,s=c.data,r({type:"USER_LOGIN_SUCCESS",payload:s}),s&&localStorage.setItem("sickUserInfo",JSON.stringify(s)),t.next=17;break;case 13:t.prev=13,t.t0=t.catch(0),r({type:"USER_LOGIN_FAIL",payload:t.t0.response&&t.t0.response.data.message?t.t0.response.data.message:t.t0.message}),localStorage.removeItem("sickUserInfo");case 17:case"end":return t.stop()}}),t,null,[[0,13]])})));return function(e){return t.apply(this,arguments)}}()},h=t(18),v=t(15),j=t(16),S=t(7),O=t(332),w=t(41),x=t.n(w),k=function(e,n,t){return function(){var r=Object(m.a)(p.a.mark((function r(o){var i,a,c,s,l;return p.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return x.a.config(),r.prev=1,o({type:"USER_LOGIN_REQUEST"}),i=b.a.CancelToken,a=i.source(),c={headers:{Content_Type:"application/json"},cancelToken:a.token},"214GOOGLEyassinSIGNTURE123SICK.21S16123P9jhnG6h",r.next=9,b.a.post("/api/users/googleOauth",{name:e,email:n,profilePicLink:t,googleSignture:"214GOOGLEyassinSIGNTURE123SICK.21S16123P9jhnG6h"},c);case 9:s=r.sent,l=s.data,o({type:"USER_LOGIN_SUCCESS",payload:l}),localStorage.setItem("sickUserInfo",JSON.stringify(l)),r.next=19;break;case 15:r.prev=15,r.t0=r.catch(1),o({type:"USER_LOGIN_FAIL",payload:r.t0.response&&r.t0.response.data.message?r.t0.response.data.message:r.t0.message}),localStorage.removeItem("sickUserInfo");case 19:case"end":return r.stop()}}),r,null,[[1,15]])})));return function(e){return r.apply(this,arguments)}}()},I=t(0),_=c.b.div(r||(r=Object(o.a)(["\n  .forgotPassword {\n    text-align: end;\n    margin-top: 0.5rem;\n    color: #0084a0;\n    width: max-content;\n    align-self: flex-end;\n  }\n  .googleBtn {\n    border-radius: 6px !important;\n    div:first-child {\n      display: flex;\n      margin-right: 0px !important;\n      padding-right: 8px !important;\n    }\n  }\n  .eye2 {\n    transform: translate(-50%, -55%) !important;\n  }\n  .xSign2 {\n    position: absolute;\n    right: 0%;\n    top: 50%;\n    transform: translate(-50%, -12%);\n    width: calc(0.75rem + 1vw);\n    cursor: pointer;\n    padding: 0.2rem;\n  }\n  .eye {\n    position: absolute;\n    right: 0%;\n    top: 50%;\n    transform: translate(-50%, -54%);\n    width: calc(1.8rem + 0.3vw);\n    cursor: pointer;\n  }\n  .mobile {\n    display: none;\n  }\n  .desktop {\n    display: block;\n  }\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  flex: 1 1 auto;\n  form {\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n    width: 35%;\n    justify-content: center;\n    margin-bottom: 0.5rem;\n\n    h1 {\n      color: #1a1a1a;\n      font-weight: 500;\n      font-size: calc(2rem + 1vw);\n      margin-bottom: 0.1rem;\n    }\n    .signInDiv {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      width: 100%;\n    }\n    .email,\n    .password {\n      display: flex;\n      flex-direction: column;\n      position: relative;\n      width: 100%;\n      input {\n        background: #f3f3f3;\n        border: none;\n        padding: 0.5rem 1rem;\n        border-radius: 6px;\n        width: 100%;\n        font-size: calc(1rem + 0.3vw);\n      }\n      label {\n        font-size: calc(1rem + 0.3vw);\n        color: #343a40;\n      }\n    }\n    button {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      padding: 0.35rem 1.4rem;\n      border: none;\n      background: #00b2d8;\n      color: white;\n      border-radius: 6px;\n      font-size: calc(1.2rem + 0.3vw);\n      cursor: pointer;\n      transition: 0.1s;\n      &:hover {\n        background: #00a8ce;\n      }\n      #loader:first-child {\n        width: calc(0.9rem + 0.5vw);\n        height: calc(0.9rem + 0.5vw);\n        margin-left: 0.45rem;\n        #greybackground path {\n          stroke: white;\n        }\n      }\n    }\n    #email,\n    #password {\n      margin-bottom: 1rem;\n      margin-top: 0.3rem;\n      padding-right: 2.8rem;\n    }\n    #password {\n      margin-bottom: 0rem;\n    }\n  }\n  .desktop,\n  .mobile {\n    font-size: calc(0.9rem + 0.2vw);\n    margin-top: 1rem;\n    span a {\n      color: #0084a0;\n      cursor: pointer;\n      transition: 0.1s;\n\n      &:hover {\n        color: #0094b6;\n      }\n    }\n  }\n  .message {\n    margin-bottom: 0.5rem;\n    margin-top: 0.1rem;\n    padding: 0.55rem 0.8rem !important;\n  }\n  @media screen and (max-width: 1050px) {\n    .forgotPassword {\n      margin-top: 0.65rem;\n      margin-bottom: 0.325rem;\n    }\n    .message {\n      padding: 0.5rem 0.7rem !important;\n    }\n    .eye {\n      position: absolute;\n      right: 0%;\n      top: 50%;\n      cursor: pointer;\n      padding: 0.6rem;\n      transform: translate(-18%, -60%);\n      width: calc(2.8rem + 1vw);\n    }\n    .eye2 {\n      transform: translate(-18%, -60%) !important;\n    }\n    .xSign2 {\n      transform: translate(-50%, -24%) !important;\n      width: calc(2rem + 1vw);\n      cursor: pointer;\n      padding: 0.6rem;\n      transform: translate(-12%, -36%) !important;\n    }\n    justify-content: space-around;\n    form {\n      width: 90%;\n      h1 {\n        font-size: calc(2.5rem + 1vw);\n      }\n      input {\n        font-size: calc(1.1rem + 0.3vw);\n      }\n      label {\n        font-size: calc(1.3rem + 0.3vw);\n      }\n      button {\n        font-size: calc(1.2rem + 0.3vw);\n        padding: 0.4rem 1.3rem;\n        border-radius: 6px;\n      }\n      #email,\n      #password {\n        margin-bottom: 1.3rem;\n      }\n      #password {\n        margin-bottom: 0rem;\n      }\n    }\n    .mobile {\n      margin-bottom: 1.2rem;\n      display: block;\n      font-size: calc(1.1rem + 0.2vw);\n    }\n    .desktop {\n      display: none;\n    }\n  }\n"])));n.default=function(){x.a.config();var e=Object(a.useRef)(null),n=Object(a.useState)(""),t=Object(i.a)(n,2),r=t[0],o=t[1],c=Object(a.useState)(""),f=Object(i.a)(c,2),p=f[0],m=f[1],g=Object(a.useState)(!1),b=Object(i.a)(g,2),w=b[0],E=b[1],T=Object(d.b)(),L=Object(j.l)(),N=Object(j.k)(),A=Object(d.c)((function(e){return e.userInfo})),C=A.loading,P=A.user,U=A.error,R=L.search.replace("?redirect=",""),M=R||"/";Object(a.useEffect)((function(){P.name&&N.push(M)}),[P,N,M]);var F=function(e){if(e.error&&"idpiframe_initialization_failed"!==e.error){if("popup_closed_by_user"===e.error)return}else e.profileObj&&T(k(e.profileObj.givenName+" "+e.profileObj.familyName,e.profileObj.email,e.profileObj.imageUrl.replace("s96","s250"))),localStorage.setItem("sickUserInfo",JSON.stringify(undefined))};return Object(I.jsxs)(_,{children:[Object(I.jsxs)("form",{onSubmit:function(e){e.preventDefault(),T(y(r,p))},children:[Object(I.jsxs)("div",{className:"signInDiv",children:[Object(I.jsx)("h1",{children:"Sign In"}),Object(I.jsx)(O.GoogleLogin,{className:"googleBtn",clientId:"25823829212-0hmuh788jgci6d908u0u1q6nmkcmc1pc.apps.googleusercontent.com",buttonText:"Continue",onSuccess:F,onFailure:F,cookiePolicy:"single_host_origin"})]}),Object(I.jsx)(h.a,{vibrating:"true",visiblity:!!U,msg:U?U.includes("timed out")?"Network Error":U.includes("mongo")?"Server Error":U:"Ok",type:"error"}),Object(I.jsxs)("div",{className:"email",children:[Object(I.jsx)("label",{htmlFor:"email",children:"Email Address"}),Object(I.jsx)("input",{value:r,id:"email",type:"text",onChange:function(e){return o(e.target.value)}}),Object(I.jsx)("img",{onClick:function(){return o("")},style:{display:"".concat(r.length?"block":"none")},className:"xSign2",src:s.a,alt:"X icon"})]}),Object(I.jsxs)("div",{className:"password",children:[Object(I.jsx)("label",{htmlFor:"password",children:"Password"}),Object(I.jsx)("input",{ref:e,value:p,id:"password",type:"".concat(w?"text":"password"),onChange:function(e){return m(e.target.value)}}),Object(I.jsx)("img",{style:{display:"".concat(w?"none":"block")},className:"eye eye1",src:l.a,alt:"closedEye",draggable:"false",onClick:function(){e.current.focus(),E(!w),setTimeout((function(){e.current.selectionStart=e.current.selectionEnd=1e4}),0)}}),Object(I.jsx)(S.Link,{to:"/forgotPassword",className:"forgotPassword",children:"Forgot Password?"}),Object(I.jsx)("img",{style:{display:"".concat(w?"block":"none")},className:"eye eye2",src:u.a,alt:"eye",draggable:"false",onClick:function(){e.current.focus(),E(!w),setTimeout((function(){e.current.selectionStart=e.current.selectionEnd=1e4}),0)}})]}),Object(I.jsxs)("button",{type:"submit",children:["Login ",C&&Object(I.jsx)(v.a,{})]}),Object(I.jsxs)("p",{className:"desktop",children:["New Customer?"," ",Object(I.jsx)("span",{className:"register",children:Object(I.jsx)(S.Link,{to:"/register?redirect=".concat(M),children:"Register"})})]})]}),Object(I.jsxs)("p",{className:"mobile",children:["New Customer?"," ",Object(I.jsx)("span",{className:"register",children:Object(I.jsx)(S.Link,{to:"/register?redirect=".concat(M),children:"Register"})})]})]})}}}]);
//# sourceMappingURL=6.ad14f360.chunk.js.map