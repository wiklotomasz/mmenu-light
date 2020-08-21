!function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(i,o,function(e){return t[e]}.bind(null,o));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);var i=function(t){return Array.prototype.slice.call(t)},o=function(t,e){return i((e||document).querySelectorAll(t))};var s=0;var r=function(){function t(t,e,n,i){this.node=t,this.title=e,this.slidingSubmenus=i,this.selectedClass=n,this.node.classList.add("mm-spn--"+(this.slidingSubmenus?"navbar":"vertical")),this.mmSpnTitle=this.node.querySelector("#mm-header__title"),this._setSelectedl(),this._initAnchors(),this._initPanels()}return t.prototype._initPanels=function(){for(var t,e,n=(t="div.mm-panels".split("."),e=document.createElement(t.shift()),t.forEach((function(t){e.classList.add(t)})),e),i=this.node.querySelectorAll(".mm-panel"),o=0;o<i.length;o++){var r=i[o],a=r.id||"mm-"+s++,c=r.previousElementSibling;c&&(c.href="#"+a),r.id=a,r.dataset.mmSpnTitle=r.dataset.mmSpnTitle||c.textContent,n.append(r)}this.node.append(n)},t.prototype.openPanel=function(t){var e=t.dataset.mmSpnTitle;e||(e=this.title),this.mmSpnTitle.innerHTML=e,o(".mm-spn--open",this.node).forEach((function(t){t.classList.remove("mm-spn--open")})),t.classList.add("mm-spn--open"),document.dispatchEvent(new Event("openPanel:finish"))},t.prototype._setSelectedl=function(){var t=o("."+this.selectedClass,this.node),e=t[t.length-1],n=null;e&&(n=e.closest(".mm-panel")),n||(n=this.node.querySelector(".mm-panel"))},t.prototype._initAnchors=function(){var t=this;this.node.addEventListener("click",(function(e){var n=e.target,o=!1;(o=(o=o||function(t){return!!t.matches("a")}(n))||function(e){var n;return!!(n=e.closest(".span")?e.parentElement:!!e.closest(".mm-listitem")&&e)&&(i(n.children).forEach((function(e){e.matches(".mm-panel")&&t.openPanel(e)})),!0)}(n))&&e.stopImmediatePropagation()}))},t}(),a=function(){function t(t){var e=this;void 0===t&&(t=null),this.isMenuOpen=!1,this.wrapper=document.createElement("div"),this.wrapper.classList.add("mm-ocd"),this.wrapper.classList.add("mm-ocd--left"),this.content=document.createElement("div"),this.content.classList.add("mm-ocd__content"),this.wrapper.append(this.content),this.backdrop=document.createElement("div"),this.backdrop.classList.add("mm-ocd__backdrop"),this.wrapper.append(this.backdrop),document.body.append(this.wrapper),t&&this.content.append(t);var n=function(t){e.close(),t.stopImmediatePropagation()};this.backdrop.addEventListener("touchstart",n,{passive:!0}),this.backdrop.addEventListener("mousedown",n,{passive:!0})}return t.prototype.open=function(){this.wrapper.classList.add("mm-ocd--open"),document.documentElement.classList.add("mm-ocd-opened"),this.isMenuOpen=!0,document.dispatchEvent(new Event("open:finish"))},t.prototype.close=function(t){void 0===t&&(t=!0),this.wrapper.classList.remove("mm-ocd--open"),document.documentElement.classList.remove("mm-ocd-opened"),this.isMenuOpen=!1,t&&document.dispatchEvent(new Event("close:finish"))},t}(),c=function(){function t(t){var e=this;this.menu=t,this._menuId="#mm-0",this.state=[this._menuId],this.handleBackButton(),document.addEventListener("close:finish",(function(){e.initEmptyState()}))}return t.prototype.navigation=function(t){if(!this.navigator){var e=(t=t||{}).title,n=void 0===e?"Menu":e,i=t.selectedClass,o=void 0===i?"selected":i,s=t.slidingSubmenus,a=void 0===s||s;this.navigator=new r(this.menu,n,o,a)}return this.navigator},t.prototype.offcanvas=function(){if(!this.drawer){this.drawer=new a(null);var t=document.createComment("original menu location");this.menu.after(t),this.drawer.content.append(this.menu)}return this.drawer},t.prototype.handleOpen=function(t){var e=t.target.closest(".nav-opener").hash;this.addState(e),this.openPanelByHash(e)},t.prototype.openPanelByHash=function(t){if(t&&t.length>1&&"#"==t.slice(0,1))try{var e=this.menu.querySelector(t);if(e&&e.matches(".mm-panel"))return this.navigator.openPanel(e),this.drawer.isMenuOpen||this.drawer.open(),!0}catch(t){console.error("Didnt find corresponding panel in main navigation")}},t.prototype.addState=function(t){t!==this._menuId&&this.state.push(t)},t.prototype.removeState=function(){this.state.length&&this.state.pop()},t.prototype.initEmptyState=function(){this.state=[this._menuId]},t.prototype.handleBackButton=function(){var t=this;document.addEventListener("open:finish",(function(){history.pushState(null,document.title,"#menu-open")})),window.addEventListener("popstate",(function(){t.drawer.isMenuOpen&&t.state.length&&(history.pushState(null,document.title,"#menu-open"),t.handleClosings())})),document.addEventListener("close:finish",(function(){history.back()}))},t.prototype.handleClosings=function(){this.removeState();var t=this.state[this.state.length-1];return t?(this.openPanelByHash(t),!0):(this.drawer.close(),!1)},t}();e.default=c;window.MmenuLight=c}]);