!function(e){var t={};function n(s){if(t[s])return t[s].exports;var o=t[s]={i:s,l:!1,exports:{}};return e[s].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(s,o,function(t){return e[t]}.bind(null,o));return s},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);var s=function(e){return Array.prototype.slice.call(e)},o=function(e,t){return s((t||document).querySelectorAll(e))},i=("ontouchstart"in window||navigator.msMaxTouchPoints,navigator.userAgent.indexOf("MSIE")>-1||navigator.appVersion.indexOf("Trident/")>-1),r=function(){function e(e,t,n,s){this.node=e,this.title=t,this.slidingSubmenus=s,this.selectedClass=n,i&&(this.slidingSubmenus=!1),this.node.classList.add("mm-spn--"+(this.slidingSubmenus?"navbar":"vertical")),this.mmSpnTitle=this.node.querySelector("#mm-header__title"),this._setSelectedl(),this._initAnchors()}return e.prototype.openPanel=function(e){var t=e.parentElement;if(this.slidingSubmenus){var n=e.dataset.mmSpnTitle;t===this.node?this.node.classList.add("mm-spn--main"):(this.node.classList.remove("mm-spn--main"),n||s(t.children).forEach((function(e){e.matches("a, span")&&(n=e.textContent)}))),n||(n=this.title),this.mmSpnTitle.innerHTML=n,o(".mm-spn--open",this.node).forEach((function(e){e.classList.remove("mm-spn--open"),e.classList.remove("mm-spn--parent")})),e.classList.add("mm-spn--open"),e.classList.remove("mm-spn--parent");for(var i=e.parentElement.closest(".mm-panel");i;)i.classList.add("mm-spn--open"),i.classList.add("mm-spn--parent"),i=i.parentElement.closest(".mm-panel")}else{var r=e.matches(".mm-spn--open");o(".mm-spn--open",this.node).forEach((function(e){e.classList.remove("mm-spn--open")})),e.classList[r?"remove":"add"]("mm-spn--open");for(var a=e.parentElement.closest(".mm-panel");a;)a.classList.add("mm-spn--open"),a=a.parentElement.closest(".mm-panel")}},e.prototype._setSelectedl=function(){var e=o("."+this.selectedClass,this.node),t=e[e.length-1],n=null;t&&(n=t.closest(".mm-panel")),n||(n=this.node.querySelector(".mm-panel")),this.openPanel(n)},e.prototype._initAnchors=function(){var e=this;this.node.addEventListener("click",(function(t){var n=t.target,o=!1;(o=(o=o||function(e){return!!e.matches("a")}(n))||function(t){var n;return!!(n=t.closest("span")?t.parentElement:!!t.closest("li")&&t)&&(s(n.children).forEach((function(t){t.matches(".mm-panel")&&e.openPanel(t)})),!0)}(n))&&t.stopImmediatePropagation()}))},e}(),a=function(){function e(e){var t=this;void 0===e&&(e=null),this.wrapper=document.createElement("div"),this.wrapper.classList.add("mm-ocd"),this.wrapper.classList.add("mm-ocd--left"),this.content=document.createElement("div"),this.content.classList.add("mm-ocd__content"),this.wrapper.append(this.content),this.backdrop=document.createElement("div"),this.backdrop.classList.add("mm-ocd__backdrop"),this.wrapper.append(this.backdrop),document.body.append(this.wrapper),e&&this.content.append(e);var n=function(e){t.close(),e.stopImmediatePropagation()};this.backdrop.addEventListener("touchstart",n,{passive:!0}),this.backdrop.addEventListener("mousedown",n,{passive:!0})}return e.prototype.open=function(){this.wrapper.classList.add("mm-ocd--open"),document.body.classList.add("mm-ocd-opened")},e.prototype.close=function(){this.wrapper.classList.remove("mm-ocd--open"),document.body.classList.remove("mm-ocd-opened")},e}(),c=function(){function e(e){this.menu=e}return e.prototype.navigation=function(e){if(!this.navigator){var t=(e=e||{}).title,n=void 0===t?"Menu":t,s=e.selectedClass,o=void 0===s?"selected":s,i=e.slidingSubmenus,a=void 0===i||i;this.navigator=new r(this.menu,n,o,a)}return this.navigator},e.prototype.offcanvas=function(){if(!this.drawer){this.drawer=new a(null);var e=document.createComment("original menu location");this.menu.after(e),this.drawer.content.append(this.menu)}return this.drawer},e.prototype.handleClosings=function(){var e=o(".mm-spn--open",this.navigator.node),t=e[e.length-1];if(t){var n=t.parentElement.closest(".mm-panel");if(n)return this.navigator.openPanel(n),!0;this.drawer.close()}return!1},e}();t.default=c;window.MmenuLight=c}]);