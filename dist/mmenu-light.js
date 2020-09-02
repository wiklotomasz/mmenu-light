!function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);var i=function(e,t){return n=(t||document).querySelectorAll(e),Array.prototype.slice.call(n);var n};var o=0;var s=function(){function e(e,t,n,i){this.node=e,this.title=t,this.slidingSubmenus=i,this.selectedClass=n,this.node.classList.add("mm-spn--"+(this.slidingSubmenus?"navbar":"vertical")),this.mmSpnTitle=this.node.querySelector("#mm-header__title"),this._setSelectedl(),this._initAnchors(),this._initPanels()}return e.prototype._initPanels=function(){for(var e,t,n=(e="div.mm-panels".split("."),t=document.createElement(e.shift()),e.forEach((function(e){t.classList.add(e)})),t),i=this.node.querySelectorAll(".mm-panel"),s=0;s<i.length;s++){var r=i[s],a=r.id||"mm-"+o++,d=r.previousElementSibling;d&&!d.href&&(d.href="#"+a),r.id=a,r.classList.add("mm-hidden"),r.dataset.mmSpnTitle=r.dataset.mmSpnTitle||d.textContent,n.append(r)}this.node.append(n)},e.prototype.openPanel=function(e,t){t||(t=e.dataset.mmSpnTitle),t||(t=this.title),this.mmSpnTitle.innerHTML=t,i(".mm-spn--open",this.node).forEach((function(e){e.classList.add("mm-hidden"),e.classList.remove("mm-spn--open")})),e.classList.remove("mm-hidden"),e.classList.add("mm-spn--open"),document.dispatchEvent(new Event("openPanel:finish"))},e.prototype._setSelectedl=function(){var e=i("."+this.selectedClass,this.node),t=e[e.length-1],n=null;t&&(n=t.closest(".mm-panel")),n||(n=this.node.querySelector(".mm-panel"))},e.prototype._initAnchors=function(){this.node.addEventListener("click",(function(e){var t=e.target,n=!1;(n=n||function(e){return!!e.matches("a")}(t))&&e.stopImmediatePropagation()}))},e}(),r=function(){function e(e){var t=this;void 0===e&&(e=null),this.isMenuOpen=!1,this.wrapper=document.createElement("div"),this.wrapper.classList.add("mm-ocd"),this.wrapper.classList.add("mm-ocd--left"),this.content=document.createElement("div"),this.content.classList.add("mm-ocd__content"),this.wrapper.append(this.content),this.backdrop=document.createElement("div"),this.backdrop.classList.add("mm-ocd__backdrop"),this.wrapper.append(this.backdrop),document.body.append(this.wrapper),e&&this.content.append(e);var n=function(e){t.close(),e.stopImmediatePropagation()};this.backdrop.addEventListener("touchstart",n,{passive:!0}),this.backdrop.addEventListener("mousedown",n,{passive:!0})}return e.prototype.open=function(){this.wrapper.classList.add("mm-ocd--open"),document.documentElement.classList.add("mm-ocd-opened"),this.isMenuOpen=!0,document.dispatchEvent(new Event("open:finish"))},e.prototype.close=function(e){void 0===e&&(e=!0),this.wrapper.classList.remove("mm-ocd--open"),document.documentElement.classList.remove("mm-ocd-opened"),this.isMenuOpen=!1,e&&document.dispatchEvent(new Event("close:finish"))},e}(),a=function(){function e(e){var t=this;this.menu=e;var n=this.menu.querySelector(".mm-btn_close"),i=this.menu.querySelector(".mm-btn_prev"),o=this.menu.querySelector("#search-mobile-opener");this._menuId="#mm-0",this.state=[this._menuId],document.documentElement.classList.add("mm-init"),this.handleBackButton(),this.handleESCClose(),document.addEventListener("close:finish",(function(){t.initEmptyState()})),n&&n.addEventListener("click",(function(e){e.preventDefault(),t.drawer.close()})),i&&i.addEventListener("click",(function(e){e.preventDefault(),t.handleClosings()})),o&&o.addEventListener("click",(function(e){e.preventDefault(),t.handleSearchOpen(e)}))}return e.prototype.navigation=function(e){if(!this.navigator){var t=(e=e||{}).title,n=void 0===t?"Menu":t,i=e.selectedClass,o=void 0===i?"selected":i,r=e.slidingSubmenus,a=void 0===r||r;this.navigator=new s(this.menu,n,o,a)}return this.navigator},e.prototype.offcanvas=function(){if(!this.drawer){this.drawer=new r(null);var e=document.createComment("original menu location");this.menu.after(e),this.drawer.content.append(this.menu)}return this.drawer},e.prototype.handleOpen=function(e){var t=e.target.closest(".nav-opener").hash;this.addState(t),this.openPanelByHash(t)},e.prototype.handleSearchOpen=function(e){var t=e.target.closest("#search-mobile-opener");this.addState("#search"),this.navigator.openPanel(t,"Suche")},e.prototype.handleESCClose=function(){var e=this;document.addEventListener("keyup",(function(t){27==t.keyCode&&e.drawer.close()}),{passive:!0})},e.prototype.openPanelByHash=function(e){if(e&&e.length>1&&"#"==e.slice(0,1)){var t=this.menu.querySelector(e);return this.navigator.openPanel(t),this.drawer.isMenuOpen||this.drawer.open(),!0}return console.error("Didnt find corresponding panel in main navigation"),!1},e.prototype.addState=function(e){e!==this._menuId&&e!=this.state[this.state.length-1]&&this.state.push(e)},e.prototype.removeState=function(){this.state.length&&this.state.pop()},e.prototype.initEmptyState=function(){this.state=[this._menuId]},e.prototype.handleBackButton=function(){var e=this;document.addEventListener("open:finish",(function(){history.pushState(null,document.title,"#menu-open")})),window.addEventListener("popstate",(function(){e.drawer.isMenuOpen&&e.state.length&&(history.pushState(null,document.title,"#menu-open"),e.handleClosings())})),document.addEventListener("close:finish",(function(){history.back()}))},e.prototype.handleClosings=function(){this.removeState();var e=this.state[this.state.length-1];return e?(this.openPanelByHash(e),!0):(this.drawer.close(),!1)},e}();t.default=a;window.MmenuLight=a}]);