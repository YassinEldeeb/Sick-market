(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{208:function(e,t,r){"use strict";var n=r(258),o=r(259),i=r(229);e.exports={formats:i,parse:o,stringify:n}},228:function(e,t,r){"use strict";var n=Object.prototype.hasOwnProperty,o=Array.isArray,i=function(){for(var e=[],t=0;t<256;++t)e.push("%"+((t<16?"0":"")+t.toString(16)).toUpperCase());return e}(),a=function(e,t){for(var r=t&&t.plainObjects?Object.create(null):{},n=0;n<e.length;++n)"undefined"!==typeof e[n]&&(r[n]=e[n]);return r};e.exports={arrayToObject:a,assign:function(e,t){return Object.keys(t).reduce(function(e,r){return e[r]=t[r],e},e)},combine:function(e,t){return[].concat(e,t)},compact:function(e){for(var t=[{obj:{o:e},prop:"o"}],r=[],n=0;n<t.length;++n)for(var i=t[n],a=i.obj[i.prop],c=Object.keys(a),s=0;s<c.length;++s){var u=c[s],l=a[u];"object"===typeof l&&null!==l&&-1===r.indexOf(l)&&(t.push({obj:a,prop:u}),r.push(l))}return function(e){for(;e.length>1;){var t=e.pop(),r=t.obj[t.prop];if(o(r)){for(var n=[],i=0;i<r.length;++i)"undefined"!==typeof r[i]&&n.push(r[i]);t.obj[t.prop]=n}}}(t),e},decode:function(e,t,r){var n=e.replace(/\+/g," ");if("iso-8859-1"===r)return n.replace(/%[0-9a-f]{2}/gi,unescape);try{return decodeURIComponent(n)}catch(o){return n}},encode:function(e,t,r){if(0===e.length)return e;var n="string"===typeof e?e:String(e);if("iso-8859-1"===r)return escape(n).replace(/%u[0-9a-f]{4}/gi,function(e){return"%26%23"+parseInt(e.slice(2),16)+"%3B"});for(var o="",a=0;a<n.length;++a){var c=n.charCodeAt(a);45===c||46===c||95===c||126===c||c>=48&&c<=57||c>=65&&c<=90||c>=97&&c<=122?o+=n.charAt(a):c<128?o+=i[c]:c<2048?o+=i[192|c>>6]+i[128|63&c]:c<55296||c>=57344?o+=i[224|c>>12]+i[128|c>>6&63]+i[128|63&c]:(a+=1,c=65536+((1023&c)<<10|1023&n.charCodeAt(a)),o+=i[240|c>>18]+i[128|c>>12&63]+i[128|c>>6&63]+i[128|63&c])}return o},isBuffer:function(e){return!(!e||"object"!==typeof e)&&!!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e))},isRegExp:function(e){return"[object RegExp]"===Object.prototype.toString.call(e)},merge:function e(t,r,i){if(!r)return t;if("object"!==typeof r){if(o(t))t.push(r);else{if(!t||"object"!==typeof t)return[t,r];(i&&(i.plainObjects||i.allowPrototypes)||!n.call(Object.prototype,r))&&(t[r]=!0)}return t}if(!t||"object"!==typeof t)return[t].concat(r);var c=t;return o(t)&&!o(r)&&(c=a(t,i)),o(t)&&o(r)?(r.forEach(function(r,o){if(n.call(t,o)){var a=t[o];a&&"object"===typeof a&&r&&"object"===typeof r?t[o]=e(a,r,i):t.push(r)}else t[o]=r}),t):Object.keys(r).reduce(function(t,o){var a=r[o];return n.call(t,o)?t[o]=e(t[o],a,i):t[o]=a,t},c)}}},229:function(e,t,r){"use strict";var n=String.prototype.replace,o=/%20/g;e.exports={default:"RFC3986",formatters:{RFC1738:function(e){return n.call(e,o,"+")},RFC3986:function(e){return e}},RFC1738:"RFC1738",RFC3986:"RFC3986"}},258:function(e,t,r){"use strict";var n=r(228),o=r(229),i=Object.prototype.hasOwnProperty,a={brackets:function(e){return e+"[]"},comma:"comma",indices:function(e,t){return e+"["+t+"]"},repeat:function(e){return e}},c=Array.isArray,s=Array.prototype.push,u=function(e,t){s.apply(e,c(t)?t:[t])},l=Date.prototype.toISOString,f={addQueryPrefix:!1,allowDots:!1,charset:"utf-8",charsetSentinel:!1,delimiter:"&",encode:!0,encoder:n.encode,encodeValuesOnly:!1,formatter:o.formatters[o.default],indices:!1,serializeDate:function(e){return l.call(e)},skipNulls:!1,strictNullHandling:!1},p=function e(t,r,o,i,a,s,l,p,d,h,y,v,m){var g=t;if("function"===typeof l?g=l(r,g):g instanceof Date?g=h(g):"comma"===o&&c(g)&&(g=g.join(",")),null===g){if(i)return s&&!v?s(r,f.encoder,m):r;g=""}if("string"===typeof g||"number"===typeof g||"boolean"===typeof g||n.isBuffer(g))return s?[y(v?r:s(r,f.encoder,m))+"="+y(s(g,f.encoder,m))]:[y(r)+"="+y(String(g))];var b,w=[];if("undefined"===typeof g)return w;if(c(l))b=l;else{var O=Object.keys(g);b=p?O.sort(p):O}for(var D=0;D<b.length;++D){var C=b[D];a&&null===g[C]||(c(g)?u(w,e(g[C],"function"===typeof o?o(r,C):r,o,i,a,s,l,p,d,h,y,v,m)):u(w,e(g[C],r+(d?"."+C:"["+C+"]"),o,i,a,s,l,p,d,h,y,v,m)))}return w};e.exports=function(e,t){var r,n=e,s=function(e){if(!e)return f;if(null!==e.encoder&&void 0!==e.encoder&&"function"!==typeof e.encoder)throw new TypeError("Encoder has to be a function.");var t=e.charset||f.charset;if("undefined"!==typeof e.charset&&"utf-8"!==e.charset&&"iso-8859-1"!==e.charset)throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var r=o.default;if("undefined"!==typeof e.format){if(!i.call(o.formatters,e.format))throw new TypeError("Unknown format option provided.");r=e.format}var n=o.formatters[r],a=f.filter;return("function"===typeof e.filter||c(e.filter))&&(a=e.filter),{addQueryPrefix:"boolean"===typeof e.addQueryPrefix?e.addQueryPrefix:f.addQueryPrefix,allowDots:"undefined"===typeof e.allowDots?f.allowDots:!!e.allowDots,charset:t,charsetSentinel:"boolean"===typeof e.charsetSentinel?e.charsetSentinel:f.charsetSentinel,delimiter:"undefined"===typeof e.delimiter?f.delimiter:e.delimiter,encode:"boolean"===typeof e.encode?e.encode:f.encode,encoder:"function"===typeof e.encoder?e.encoder:f.encoder,encodeValuesOnly:"boolean"===typeof e.encodeValuesOnly?e.encodeValuesOnly:f.encodeValuesOnly,filter:a,formatter:n,serializeDate:"function"===typeof e.serializeDate?e.serializeDate:f.serializeDate,skipNulls:"boolean"===typeof e.skipNulls?e.skipNulls:f.skipNulls,sort:"function"===typeof e.sort?e.sort:null,strictNullHandling:"boolean"===typeof e.strictNullHandling?e.strictNullHandling:f.strictNullHandling}}(t);"function"===typeof s.filter?n=(0,s.filter)("",n):c(s.filter)&&(r=s.filter);var l,d=[];if("object"!==typeof n||null===n)return"";l=t&&t.arrayFormat in a?t.arrayFormat:t&&"indices"in t?t.indices?"indices":"repeat":"indices";var h=a[l];r||(r=Object.keys(n)),s.sort&&r.sort(s.sort);for(var y=0;y<r.length;++y){var v=r[y];s.skipNulls&&null===n[v]||u(d,p(n[v],v,h,s.strictNullHandling,s.skipNulls,s.encode?s.encoder:null,s.filter,s.sort,s.allowDots,s.serializeDate,s.formatter,s.encodeValuesOnly,s.charset))}var m=d.join(s.delimiter),g=!0===s.addQueryPrefix?"?":"";return s.charsetSentinel&&("iso-8859-1"===s.charset?g+="utf8=%26%2310003%3B&":g+="utf8=%E2%9C%93&"),m.length>0?g+m:""}},259:function(e,t,r){"use strict";var n=r(228),o=Object.prototype.hasOwnProperty,i={allowDots:!1,allowPrototypes:!1,arrayLimit:20,charset:"utf-8",charsetSentinel:!1,comma:!1,decoder:n.decode,delimiter:"&",depth:5,ignoreQueryPrefix:!1,interpretNumericEntities:!1,parameterLimit:1e3,parseArrays:!0,plainObjects:!1,strictNullHandling:!1},a=function(e){return e.replace(/&#(\d+);/g,function(e,t){return String.fromCharCode(parseInt(t,10))})},c=function(e,t,r){if(e){var n=r.allowDots?e.replace(/\.([^.[]+)/g,"[$1]"):e,i=/(\[[^[\]]*])/g,a=/(\[[^[\]]*])/.exec(n),c=a?n.slice(0,a.index):n,s=[];if(c){if(!r.plainObjects&&o.call(Object.prototype,c)&&!r.allowPrototypes)return;s.push(c)}for(var u=0;null!==(a=i.exec(n))&&u<r.depth;){if(u+=1,!r.plainObjects&&o.call(Object.prototype,a[1].slice(1,-1))&&!r.allowPrototypes)return;s.push(a[1])}return a&&s.push("["+n.slice(a.index)+"]"),function(e,t,r){for(var n=t,o=e.length-1;o>=0;--o){var i,a=e[o];if("[]"===a&&r.parseArrays)i=[].concat(n);else{i=r.plainObjects?Object.create(null):{};var c="["===a.charAt(0)&&"]"===a.charAt(a.length-1)?a.slice(1,-1):a,s=parseInt(c,10);r.parseArrays||""!==c?!isNaN(s)&&a!==c&&String(s)===c&&s>=0&&r.parseArrays&&s<=r.arrayLimit?(i=[])[s]=n:i[c]=n:i={0:n}}n=i}return n}(s,t,r)}};e.exports=function(e,t){var r=function(e){if(!e)return i;if(null!==e.decoder&&void 0!==e.decoder&&"function"!==typeof e.decoder)throw new TypeError("Decoder has to be a function.");if("undefined"!==typeof e.charset&&"utf-8"!==e.charset&&"iso-8859-1"!==e.charset)throw new Error("The charset option must be either utf-8, iso-8859-1, or undefined");var t="undefined"===typeof e.charset?i.charset:e.charset;return{allowDots:"undefined"===typeof e.allowDots?i.allowDots:!!e.allowDots,allowPrototypes:"boolean"===typeof e.allowPrototypes?e.allowPrototypes:i.allowPrototypes,arrayLimit:"number"===typeof e.arrayLimit?e.arrayLimit:i.arrayLimit,charset:t,charsetSentinel:"boolean"===typeof e.charsetSentinel?e.charsetSentinel:i.charsetSentinel,comma:"boolean"===typeof e.comma?e.comma:i.comma,decoder:"function"===typeof e.decoder?e.decoder:i.decoder,delimiter:"string"===typeof e.delimiter||n.isRegExp(e.delimiter)?e.delimiter:i.delimiter,depth:"number"===typeof e.depth?e.depth:i.depth,ignoreQueryPrefix:!0===e.ignoreQueryPrefix,interpretNumericEntities:"boolean"===typeof e.interpretNumericEntities?e.interpretNumericEntities:i.interpretNumericEntities,parameterLimit:"number"===typeof e.parameterLimit?e.parameterLimit:i.parameterLimit,parseArrays:!1!==e.parseArrays,plainObjects:"boolean"===typeof e.plainObjects?e.plainObjects:i.plainObjects,strictNullHandling:"boolean"===typeof e.strictNullHandling?e.strictNullHandling:i.strictNullHandling}}(t);if(""===e||null===e||"undefined"===typeof e)return r.plainObjects?Object.create(null):{};for(var s="string"===typeof e?function(e,t){var r,c={},s=t.ignoreQueryPrefix?e.replace(/^\?/,""):e,u=t.parameterLimit===1/0?void 0:t.parameterLimit,l=s.split(t.delimiter,u),f=-1,p=t.charset;if(t.charsetSentinel)for(r=0;r<l.length;++r)0===l[r].indexOf("utf8=")&&("utf8=%E2%9C%93"===l[r]?p="utf-8":"utf8=%26%2310003%3B"===l[r]&&(p="iso-8859-1"),f=r,r=l.length);for(r=0;r<l.length;++r)if(r!==f){var d,h,y=l[r],v=y.indexOf("]="),m=-1===v?y.indexOf("="):v+1;-1===m?(d=t.decoder(y,i.decoder,p),h=t.strictNullHandling?null:""):(d=t.decoder(y.slice(0,m),i.decoder,p),h=t.decoder(y.slice(m+1),i.decoder,p)),h&&t.interpretNumericEntities&&"iso-8859-1"===p&&(h=a(h)),h&&t.comma&&h.indexOf(",")>-1&&(h=h.split(",")),o.call(c,d)?c[d]=n.combine(c[d],h):c[d]=h}return c}(e,r):e,u=r.plainObjects?Object.create(null):{},l=Object.keys(s),f=0;f<l.length;++f){var p=l[f],d=c(p,s[p],r);u=n.merge(u,d,r)}return n.compact(u)}},265:function(e,t,r){var n;e.exports=(n=r(0),function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=4)}([function(e,t,r){e.exports=r(2)()},function(e,t){e.exports=n},function(e,t,r){"use strict";var n=r(3);function o(){}function i(){}i.resetWarningCache=o,e.exports=function(){function e(e,t,r,o,i,a){if(a!==n){var c=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}function t(){return e}e.isRequired=e;var r={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:i,resetWarningCache:o};return r.PropTypes=r,r}},function(e,t,r){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,r){"use strict";r.r(t),r.d(t,"default",function(){return E}),r.d(t,"Component",function(){return E}),r.d(t,"makeAspectCrop",function(){return C}),r.d(t,"containCrop",function(){return j});var n=r(1),o=r.n(n),i=r(0),a=r.n(i);function c(e){var t,r,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(r=c(e[t]))&&(n&&(n+=" "),n+=r);else for(t in e)e[t]&&(n&&(n+=" "),n+=t);return n}function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function u(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function l(e,t){return(l=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function f(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var r,n=d(e);if(t){var o=d(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return function(e,t){return!t||"object"!==s(t)&&"function"!=typeof t?p(e):t}(this,r)}}function p(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function d(e){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function h(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function y(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?h(Object(r),!0).forEach(function(t){v(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):h(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function v(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var g=!1;try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:function(){return g=!0,!0}}))}catch(e){}function b(e){var t,r;if(e.touches){var n=function(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var r=[],n=!0,o=!1,i=void 0;try{for(var a,c=e[Symbol.iterator]();!(n=(a=c.next()).done)&&(r.push(a.value),!t||r.length!==t);n=!0);}catch(e){o=!0,i=e}finally{try{n||null==c.return||c.return()}finally{if(o)throw i}}return r}}(e,t)||function(e,t){if(e){if("string"==typeof e)return m(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?m(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}(e.touches,1)[0];t=n.pageX,r=n.pageY}else t=e.pageX,r=e.pageY;return{x:t,y:r}}function w(e,t,r){return Math.min(Math.max(e,t),r)}function O(e){return e&&!isNaN(e.width)&&!isNaN(e.height)}function D(e){return"n"===e?"s":"ne"===e?"sw":"e"===e?"w":"se"===e?"nw":"s"===e?"n":"sw"===e?"ne":"w"===e?"e":"nw"===e?"se":e}function C(e,t,r){if(isNaN(e.aspect))return console.warn("`crop.aspect` should be a number in order to make an aspect crop",e),e;var n=y({unit:"px",x:0,y:0},e);return e.width&&(n.height=n.width/e.aspect),e.height&&(n.width=n.height*e.aspect),n.y+n.height>r&&(n.height=r-n.y,n.width=n.height*e.aspect),n.x+n.width>t&&(n.width=t-n.x,n.height=n.width/e.aspect),n}function x(e,t,r){return"%"===e.unit?e:{unit:"%",aspect:e.aspect,x:e.x/t*100,y:e.y/r*100,width:e.width/t*100,height:e.height/r*100}}function S(e,t,r){return e.unit?"px"===e.unit?e:{unit:"px",aspect:e.aspect,x:e.x*t/100,y:e.y*r/100,width:e.width*t/100,height:e.height*r/100}:y(y({},e),{},{unit:"px"})}function j(e,t,r,n){var o=S(t,r,n),i=S(e,r,n),a=y({},o);if(!o.aspect)return o.x<0?(a.x=0,a.width+=o.x):o.x+o.width>r&&(a.width=r-o.x),o.y+o.height>n&&(a.height=n-o.y),a;var c=!1;o.x<0?(a.x=0,a.width+=o.x,a.height=a.width/o.aspect,c=!0):o.x+o.width>r&&(a.width=r-o.x,a.height=a.width/o.aspect,c=!0),c&&i.y>a.y&&(a.y=o.y+(o.height-a.height));var s=!1;return a.y+a.height>n&&(a.height=n-o.y,a.width=a.height*o.aspect,s=!0),s&&i.x>a.x&&(a.x=o.x+(o.width-a.width)),a}var E=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&l(e,t)}(i,e);var t,r,n=f(i);function i(){var e;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i);for(var t=arguments.length,r=new Array(t),o=0;o<t;o++)r[o]=arguments[o];return v(p(e=n.call.apply(n,[this].concat(r))),"window","undefined"!=typeof window?window:{}),v(p(e),"document","undefined"!=typeof document?document:{}),v(p(e),"state",{}),v(p(e),"keysDown",new Set),v(p(e),"onCropMouseTouchDown",function(t){var r=e.props,n=r.crop,o=r.disabled,i=e.mediaDimensions,a=S(n,i.width,i.height);if(!o){t.preventDefault();var c=b(t);e.componentRef.setActive?e.componentRef.setActive({preventScroll:!0}):e.componentRef.focus({preventScroll:!0});var s,u=t.target.dataset.ord,l="nw"===u||"w"===u||"sw"===u,f="nw"===u||"n"===u||"ne"===u;a.aspect&&(s=e.getElementOffset(e.cropSelectRef)),e.evData={clientStartX:c.x,clientStartY:c.y,cropStartWidth:a.width,cropStartHeight:a.height,cropStartX:l?a.x+a.width:a.x,cropStartY:f?a.y+a.height:a.y,xInversed:l,yInversed:f,xCrossOver:l,yCrossOver:f,startXCrossOver:l,startYCrossOver:f,isResize:t.target.dataset.ord,ord:u,cropOffset:s},e.mouseDownOnCrop=!0,e.setState({cropIsActive:!0})}}),v(p(e),"onComponentMouseTouchDown",function(t){var r=e.props,n=r.crop,o=r.disabled,i=r.locked,a=r.keepSelection,c=r.onChange,s=e.mediaWrapperRef.firstChild;if(t.target===s&&s.contains(t.target)&&!(o||i||a&&O(n))){t.preventDefault();var u=b(t);e.componentRef.setActive?e.componentRef.setActive({preventScroll:!0}):e.componentRef.focus({preventScroll:!0});var l=e.getElementOffset(e.mediaWrapperRef),f=u.x-l.left,p=u.y-l.top,d={unit:"px",aspect:n?n.aspect:void 0,x:f,y:p,width:0,height:0};e.evData={clientStartX:u.x,clientStartY:u.y,cropStartWidth:d.width,cropStartHeight:d.height,cropStartX:d.x,cropStartY:d.y,xInversed:!1,yInversed:!1,xCrossOver:!1,yCrossOver:!1,startXCrossOver:!1,startYCrossOver:!1,isResize:!0,ord:"nw"},e.mouseDownOnCrop=!0;var h=e.mediaDimensions,y=h.width,v=h.height;c(S(d,y,v),x(d,y,v)),e.setState({cropIsActive:!0,newCropIsBeingDrawn:!0})}}),v(p(e),"onDocMouseTouchMove",function(t){var r=e.props,n=r.crop,o=r.disabled,i=r.onChange,a=r.onDragStart;if(!o&&e.mouseDownOnCrop){t.preventDefault(),e.dragStarted||(e.dragStarted=!0,a(t));var c,s=p(e).evData,u=b(t);if(s.isResize&&n.aspect&&s.cropOffset&&(u.y=e.straightenYPath(u.x)),s.xDiff=u.x-s.clientStartX,s.yDiff=u.y-s.clientStartY,(c=s.isResize?e.resizeCrop():e.dragCrop())!==n){var l=e.mediaDimensions,f=l.width,d=l.height;i(S(c,f,d),x(c,f,d))}}}),v(p(e),"onComponentKeyDown",function(t){var r=e.props,n=r.crop,o=r.disabled,a=r.onChange,c=r.onComplete;if(!o){e.keysDown.add(t.key);var s=!1;if(O(n)){var u=e.makeNewCrop(),l=(navigator.platform.match("Mac")?t.metaKey:t.ctrlKey)?i.nudgeStepLarge:t.shiftKey?i.nudgeStepMedium:i.nudgeStep;if(e.keysDown.has("ArrowLeft")&&(u.x-=l,s=!0),e.keysDown.has("ArrowRight")&&(u.x+=l,s=!0),e.keysDown.has("ArrowUp")&&(u.y-=l,s=!0),e.keysDown.has("ArrowDown")&&(u.y+=l,s=!0),s){t.preventDefault();var f=e.mediaDimensions,p=f.width,d=f.height;u.x=w(u.x,0,p-u.width),u.y=w(u.y,0,d-u.height);var h=S(u,p,d),y=x(u,p,d);a(h,y),c(h,y)}}}}),v(p(e),"onComponentKeyUp",function(t){e.keysDown.delete(t.key)}),v(p(e),"onDocMouseTouchEnd",function(t){var r=e.props,n=r.crop,o=r.disabled,i=r.onComplete,a=r.onDragEnd;if(!o&&e.mouseDownOnCrop){e.mouseDownOnCrop=!1,e.dragStarted=!1;var c=e.mediaDimensions,s=c.width,u=c.height;a(t),i(S(n,s,u),x(n,s,u)),e.setState({cropIsActive:!1,newCropIsBeingDrawn:!1})}}),v(p(e),"onMediaLoaded",function(){var t=e.props,r=t.onComplete,n=t.onChange,o=e.createNewCrop(),i=o.pixelCrop,a=o.percentCrop;n(i,a),r(i,a)}),e}return t=i,(r=[{key:"componentDidMount",value:function(){if(this.document.addEventListener){var e=!!g&&{passive:!1};this.document.addEventListener("mousemove",this.onDocMouseTouchMove,e),this.document.addEventListener("touchmove",this.onDocMouseTouchMove,e),this.document.addEventListener("mouseup",this.onDocMouseTouchEnd,e),this.document.addEventListener("touchend",this.onDocMouseTouchEnd,e),this.document.addEventListener("touchcancel",this.onDocMouseTouchEnd,e),this.componentRef.addEventListener("medialoaded",this.onMediaLoaded)}}},{key:"componentWillUnmount",value:function(){this.document.removeEventListener&&(this.document.removeEventListener("mousemove",this.onDocMouseTouchMove),this.document.removeEventListener("touchmove",this.onDocMouseTouchMove),this.document.removeEventListener("mouseup",this.onDocMouseTouchEnd),this.document.removeEventListener("touchend",this.onDocMouseTouchEnd),this.document.removeEventListener("touchcancel",this.onDocMouseTouchEnd),this.componentRef.removeEventListener("medialoaded",this.onMediaLoaded))}},{key:"componentDidUpdate",value:function(e){var t=this.props.crop;if(this.imageRef&&e.crop!==t&&t.aspect&&(t.width&&!t.height||!t.width&&t.height)){var r=this.imageRef,n=r.width,o=r.height,i=C(this.makeNewCrop(),n,o),a=S(i,n,o),c=x(i,n,o);this.props.onChange(a,c),this.props.onComplete(a,c)}}},{key:"createNewCrop",value:function(){var e=this.mediaDimensions,t=e.width,r=e.height,n=function(e,t,r){return!e.aspect||e.width&&e.height?e:C(e,t,r)}(this.makeNewCrop(),t,r);return{pixelCrop:S(n,t,r),percentCrop:x(n,t,r)}}},{key:"onImageLoad",value:function(e){var t=this.props,r=t.onComplete,n=t.onChange;if(!1!==(0,t.onImageLoaded)(e)){var o=this.createNewCrop(),i=o.pixelCrop,a=o.percentCrop;n(i,a),r(i,a)}}},{key:"getDocumentOffset",value:function(){var e=this.document.documentElement||{},t=e.clientTop,r=void 0===t?0:t,n=e.clientLeft;return{clientTop:r,clientLeft:void 0===n?0:n}}},{key:"getWindowOffset",value:function(){var e=this.window,t=e.pageYOffset,r=void 0===t?0:t,n=e.pageXOffset;return{pageYOffset:r,pageXOffset:void 0===n?0:n}}},{key:"getElementOffset",value:function(e){var t=e.getBoundingClientRect(),r=this.getDocumentOffset(),n=this.getWindowOffset();return{top:t.top+n.pageYOffset-r.clientTop,left:t.left+n.pageXOffset-r.clientLeft}}},{key:"getCropStyle",value:function(){var e=this.makeNewCrop(this.props.crop?this.props.crop.unit:"px");return{top:"".concat(e.y).concat(e.unit),left:"".concat(e.x).concat(e.unit),width:"".concat(e.width).concat(e.unit),height:"".concat(e.height).concat(e.unit)}}},{key:"getNewSize",value:function(){var e,t=this.props,r=t.crop,n=t.minWidth,o=t.maxWidth,i=t.minHeight,a=t.maxHeight,c=this.evData,s=this.mediaDimensions,u=s.width,l=s.height,f=c.cropStartWidth+c.xDiff;return c.xCrossOver&&(f=Math.abs(f)),f=w(f,n,o||u),e=r.aspect?f/r.aspect:c.cropStartHeight+c.yDiff,c.yCrossOver&&(e=Math.min(Math.abs(e),c.cropStartY)),e=w(e,i,a||l),r.aspect&&(f=w(e*r.aspect,0,u)),{width:f,height:e}}},{key:"dragCrop",value:function(){var e=this.makeNewCrop(),t=this.evData,r=this.mediaDimensions,n=r.width,o=r.height;return e.x=w(t.cropStartX+t.xDiff,0,n-e.width),e.y=w(t.cropStartY+t.yDiff,0,o-e.height),e}},{key:"resizeCrop",value:function(){var e=this.evData,t=this.makeNewCrop(),r=e.ord;e.xInversed&&(e.xDiff-=2*e.cropStartWidth,e.xDiffPc-=2*e.cropStartWidth),e.yInversed&&(e.yDiff-=2*e.cropStartHeight,e.yDiffPc-=2*e.cropStartHeight);var n=this.getNewSize(),o=e.cropStartX,a=e.cropStartY;e.xCrossOver&&(o=t.x+(t.width-n.width)),e.yCrossOver&&(a=!1===e.lastYCrossover?t.y-n.height:t.y+(t.height-n.height));var c=this.mediaDimensions,s=c.width,u=c.height,l=j(this.props.crop,{unit:t.unit,x:o,y:a,width:n.width,height:n.height,aspect:t.aspect},s,u);return t.aspect||i.xyOrds.indexOf(r)>-1?(t.x=l.x,t.y=l.y,t.width=l.width,t.height=l.height):i.xOrds.indexOf(r)>-1?(t.x=l.x,t.width=l.width):i.yOrds.indexOf(r)>-1&&(t.y=l.y,t.height=l.height),e.lastYCrossover=e.yCrossOver,this.crossOverCheck(),t}},{key:"straightenYPath",value:function(e){var t,r,n=this.evData,o=n.ord,i=n.cropOffset,a=n.cropStartWidth,c=n.cropStartHeight;return"nw"===o||"se"===o?(t=c/a,r=i.top-i.left*t):(t=-c/a,r=i.top+(c-i.left*t)),t*e+r}},{key:"createCropSelection",value:function(){var e=this,t=this.props,r=t.disabled,n=t.locked,i=t.renderSelectionAddon,a=t.ruleOfThirds,c=t.crop,s=this.getCropStyle();return o.a.createElement("div",{ref:function(t){return e.cropSelectRef=t},style:s,className:"ReactCrop__crop-selection",onMouseDown:this.onCropMouseTouchDown,onTouchStart:this.onCropMouseTouchDown},!r&&!n&&o.a.createElement("div",{className:"ReactCrop__drag-elements"},o.a.createElement("div",{className:"ReactCrop__drag-bar ord-n","data-ord":"n"}),o.a.createElement("div",{className:"ReactCrop__drag-bar ord-e","data-ord":"e"}),o.a.createElement("div",{className:"ReactCrop__drag-bar ord-s","data-ord":"s"}),o.a.createElement("div",{className:"ReactCrop__drag-bar ord-w","data-ord":"w"}),o.a.createElement("div",{className:"ReactCrop__drag-handle ord-nw","data-ord":"nw"}),o.a.createElement("div",{className:"ReactCrop__drag-handle ord-n","data-ord":"n"}),o.a.createElement("div",{className:"ReactCrop__drag-handle ord-ne","data-ord":"ne"}),o.a.createElement("div",{className:"ReactCrop__drag-handle ord-e","data-ord":"e"}),o.a.createElement("div",{className:"ReactCrop__drag-handle ord-se","data-ord":"se"}),o.a.createElement("div",{className:"ReactCrop__drag-handle ord-s","data-ord":"s"}),o.a.createElement("div",{className:"ReactCrop__drag-handle ord-sw","data-ord":"sw"}),o.a.createElement("div",{className:"ReactCrop__drag-handle ord-w","data-ord":"w"})),i&&O(c)&&o.a.createElement("div",{className:"ReactCrop__selection-addon",onMouseDown:function(e){return e.stopPropagation()}},i(this.state)),a&&o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"ReactCrop__rule-of-thirds-hz"}),o.a.createElement("div",{className:"ReactCrop__rule-of-thirds-vt"})))}},{key:"makeNewCrop",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"px",t=y(y({},i.defaultCrop),this.props.crop),r=this.mediaDimensions,n=r.width,o=r.height;return"px"===e?S(t,n,o):x(t,n,o)}},{key:"crossOverCheck",value:function(){var e=this.evData,t=this.props,r=t.minWidth,n=t.minHeight;!r&&(!e.xCrossOver&&-Math.abs(e.cropStartWidth)-e.xDiff>=0||e.xCrossOver&&-Math.abs(e.cropStartWidth)-e.xDiff<=0)&&(e.xCrossOver=!e.xCrossOver),!n&&(!e.yCrossOver&&-Math.abs(e.cropStartHeight)-e.yDiff>=0||e.yCrossOver&&-Math.abs(e.cropStartHeight)-e.yDiff<=0)&&(e.yCrossOver=!e.yCrossOver);var o=e.xCrossOver!==e.startXCrossOver,i=e.yCrossOver!==e.startYCrossOver;e.inversedXOrd=!!o&&D(e.ord),e.inversedYOrd=!!i&&D(e.ord)}},{key:"render",value:function(){var e=this,t=this.props,r=t.children,n=t.circularCrop,i=t.className,a=t.crossorigin,s=t.crop,u=t.disabled,l=t.locked,f=t.imageAlt,p=t.onImageError,d=t.renderComponent,h=t.src,y=t.style,v=t.imageStyle,m=t.ruleOfThirds,g=this.state,b=g.cropIsActive,w=g.newCropIsBeingDrawn,D=O(s)&&this.componentRef?this.createCropSelection():null,C=function(){for(var e,t,r=0,n="";r<arguments.length;)(e=arguments[r++])&&(t=c(e))&&(n&&(n+=" "),n+=t);return n}("ReactCrop",i,{"ReactCrop--active":b,"ReactCrop--disabled":u,"ReactCrop--locked":l,"ReactCrop--new-crop":w,"ReactCrop--fixed-aspect":s&&s.aspect,"ReactCrop--circular-crop":s&&n,"ReactCrop--rule-of-thirds":s&&m,"ReactCrop--invisible-crop":!this.dragStarted&&s&&!s.width&&!s.height});return o.a.createElement("div",{ref:function(t){e.componentRef=t},className:C,style:y,onTouchStart:this.onComponentMouseTouchDown,onMouseDown:this.onComponentMouseTouchDown,tabIndex:"0",onKeyDown:this.onComponentKeyDown,onKeyUp:this.onComponentKeyUp},o.a.createElement("div",{ref:function(t){e.mediaWrapperRef=t}},d||o.a.createElement("img",{ref:function(t){return e.imageRef=t},crossOrigin:a,className:"ReactCrop__image",style:v,src:h,onLoad:function(t){return e.onImageLoad(t.target)},onError:p,alt:f})),r,D)}},{key:"mediaDimensions",get:function(){var e=this.mediaWrapperRef;return{width:e.clientWidth,height:e.clientHeight}}}])&&u(t.prototype,r),i}(n.PureComponent);E.xOrds=["e","w"],E.yOrds=["n","s"],E.xyOrds=["nw","ne","se","sw"],E.nudgeStep=1,E.nudgeStepMedium=10,E.nudgeStepLarge=100,E.defaultCrop={x:0,y:0,width:0,height:0,unit:"px"},E.propTypes={className:a.a.string,children:a.a.oneOfType([a.a.arrayOf(a.a.node),a.a.node]),circularCrop:a.a.bool,crop:a.a.shape({aspect:a.a.number,x:a.a.number,y:a.a.number,width:a.a.number,height:a.a.number,unit:a.a.oneOf(["px","%"])}),crossorigin:a.a.string,disabled:a.a.bool,locked:a.a.bool,imageAlt:a.a.string,imageStyle:a.a.shape({}),keepSelection:a.a.bool,minWidth:a.a.number,minHeight:a.a.number,maxWidth:a.a.number,maxHeight:a.a.number,onChange:a.a.func.isRequired,onImageError:a.a.func,onComplete:a.a.func,onImageLoaded:a.a.func,onDragStart:a.a.func,onDragEnd:a.a.func,src:a.a.string.isRequired,style:a.a.shape({}),renderComponent:a.a.node,renderSelectionAddon:a.a.func,ruleOfThirds:a.a.bool},E.defaultProps={circularCrop:!1,className:void 0,crop:void 0,crossorigin:void 0,disabled:!1,locked:!1,imageAlt:"",maxWidth:void 0,maxHeight:void 0,minWidth:0,minHeight:0,keepSelection:!1,onComplete:function(){},onImageError:function(){},onImageLoaded:function(){},onDragStart:function(){},onDragEnd:function(){},children:void 0,style:void 0,renderComponent:void 0,imageStyle:void 0,renderSelectionAddon:void 0,ruleOfThirds:!1}}]))},266:function(e,t,r){},267:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"StyledDropZone",{enumerable:!0,get:function(){return o.default}}),Object.defineProperty(t,"readFileAsText",{enumerable:!0,get:function(){return i.default}}),t.default=void 0;var n=a(r(286)),o=a(r(403)),i=a(r(287));function a(e){return e&&e.__esModule?e:{default:e}}var c=n.default;t.default=c},286:function(e,t,r){"use strict";function n(e){return(n="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==n(e)&&"function"!==typeof e)return{default:e};var t=u();if(t&&t.has(e))return t.get(e);var r={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if(Object.prototype.hasOwnProperty.call(e,i)){var a=o?Object.getOwnPropertyDescriptor(e,i):null;a&&(a.get||a.set)?Object.defineProperty(r,i,a):r[i]=e[i]}r.default=e,t&&t.set(e,r);return r}(r(0)),i=s(r(9)),a=s(r(402)),c=s(r(287));function s(e){return e&&e.__esModule?e:{default:e}}function u(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return u=function(){return e},e}function l(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function f(e,t){return(f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function p(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var r,o=h(e);if(t){var i=h(this).constructor;r=Reflect.construct(o,arguments,i)}else r=o.apply(this,arguments);return function(e,t){if(t&&("object"===n(t)||"function"===typeof t))return t;return d(e)}(this,r)}}function d(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function h(e){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var y=[],v={drag:"onDrag",dragstart:"onDragStart",dragend:"onDragEnd",dragover:"onDragOver",dragenter:"onDragEnter",dragleave:"onDragLeave",drop:"onDrop"};Object.keys(v).forEach(function(e){document.addEventListener(e,function(t){y.forEach(function(r){return r[v[e]](t,!0)})})});var m=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)}(s,o.Component);var t,r,n,i=p(s);function s(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,s),(t=i.call(this,e)).onClick=t.onClick.bind(d(t)),t.onDrag=t.onDrag.bind(d(t)),t.onDragStart=t.onDragStart.bind(d(t)),t.onDragEnd=t.onDragEnd.bind(d(t)),t.onDragOver=t.onDragOver.bind(d(t)),t.onDragEnter=t.onDragEnter.bind(d(t)),t.onDragLeave=t.onDragLeave.bind(d(t)),t.onDrop=t.onDrop.bind(d(t)),t.state={overDocument:!1,over:!1},t}return t=s,(r=[{key:"setDragOver",value:function(e,t){var r=this;!1===e&&t?this.timeout=setTimeout(function(){return r.setState({overDocument:!1})},75):!0===e&&t?(this.timeout=clearTimeout(this.timeout),this.setState({overDocument:!0})):this.setState({over:e})}},{key:"triggerOnDrop",value:function(e){var t=this;this.props.dontRead||this.props.multiple?this.props.onDrop(e,void 0):(0,c.default)(e).catch(function(e){return Promise.resolve(void 0)}).then(function(r){return t.props.onDrop(e,r)})}},{key:"componentDidMount",value:function(){y.push(this)}},{key:"componentWillUnmount",value:function(){y.push(this)}},{key:"onClick",value:function(e){var t=this;e.stopPropagation(),(0,a.default)(this.props).then(function(e){return t.triggerOnDrop(e)})}},{key:"onDrag",value:function(e,t){t||e.preventDefault()}},{key:"onDragStart",value:function(e,t){t||e.preventDefault()}},{key:"onDragOver",value:function(e,t){e.preventDefault(),this.setDragOver(!0,t)}},{key:"onDragEnter",value:function(e,t){e.preventDefault(),this.setDragOver(!0,t)}},{key:"onDragEnd",value:function(e,t){e.preventDefault(),this.setDragOver(!1,t)}},{key:"onDragLeave",value:function(e,t){e.preventDefault(),this.setDragOver(!1,t)}},{key:"onDrop",value:function(e,t){if(e.preventDefault(),this.setDragOver(!1,t),!t){var r=e.dataTransfer.items?e.dataTransfer.items[0].getAsFile():e.dataTransfer.files?e.dataTransfer.files[0]:void 0;r&&this.triggerOnDrop(r)}}},{key:"render",value:function(){var e=!0===this.props.handleClick,t=this.props.children,r=t({over:this.state.over,overDocument:this.state.overDocument}),n={onDrag:this.onDrag,onDragStart:this.onDragStart,onDragEnd:this.onDragEnd,onDragOver:this.onDragOver,onDragEnter:this.onDragEnter,onDragLeave:this.onDragLeave,onDrop:this.onDrop};return e&&(n.onClick=this.onClick),o.default.cloneElement(r,n)}}])&&l(t.prototype,r),n&&l(t,n),s}();m.propTypes={onDrop:i.default.func.isRequired,handleClick:i.default.bool,dontRead:i.default.bool},m.defaultProps={handleClick:!0,dontRead:!1,onDrop:function(e,t){}};var g=m;t.default=g},287:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:n;return new Promise(function(r,n){var o=new FileReader;o.onload=function(){return r(o.result)},o.onerror=n,o.readAsText(e,t)})};var n="ISO-8859-1"},402:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return new Promise(function(t,r){var n=document.createElement("input");e.multiple&&n.setAttribute("multiple",""),e.accept&&n.setAttribute("accept",e.accept),n.setAttribute("type","file"),n.style.display="none",n.addEventListener("change",function(o){n.files.length?e.multiple?t(n.files):t(n.files[0]):r(o),n.remove()}),document.body.appendChild(n);var o=document.createEvent("MouseEvent");o.initMouseEvent("click",!1,!1,window,0,0,0,0,0,!1,!1,!1,!1,0,null),n.dispatchEvent(o)})}},403:function(e,t,r){"use strict";function n(e){return(n="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=f;var o=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==n(e)&&"function"!==typeof e)return{default:e};var t=s();if(t&&t.has(e))return t.get(e);var r={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if(Object.prototype.hasOwnProperty.call(e,i)){var a=o?Object.getOwnPropertyDescriptor(e,i):null;a&&(a.get||a.set)?Object.defineProperty(r,i,a):r[i]=e[i]}r.default=e,t&&t.set(e,r);return r}(r(0)),i=c(r(9)),a=c(r(286));function c(e){return e&&e.__esModule?e:{default:e}}function s(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return s=function(){return e},e}function u(){return(u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function l(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}function f(e){var t=e.children,r=e.className,n=e.accept,i=e.multiple,c=e.handleClick,s=e.dontRead,f=e.onDrop,p=l(e,["children","className","accept","multiple","handleClick","dontRead","onDrop"]),d=(0,o.useRef)(null),h=function(e){13!==e.keyCode&&32!==e.keyCode||d.current&&d.current.click()};return o.default.createElement(a.default,{handleClick:c,dontRead:s,accept:n,multiple:i,onDrop:f},function(e){var n="DropZone";return e.over&&(n+=" DropZone--over"),e.overDocument&&(n+=" DropZone--over-document"),r&&(n+=" "+r),o.default.createElement("div",u({className:n,role:"button",tabIndex:"0",onKeyDown:h,ref:d},p),t||"Click or drop your file here")})}f.propTypes={onDrop:i.default.func.isRequired,handleClick:i.default.bool,dontRead:i.default.bool,className:i.default.string,accept:i.default.string,multiple:i.default.bool}}}]);
//# sourceMappingURL=2.51eb9146.chunk.js.map