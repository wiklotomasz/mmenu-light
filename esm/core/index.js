import MmSlidingPanelsNavigation from '../modules/sliding-panels-navigation/index';
import MmOffCanvasDrawer from '../modules/offcanvas-drawer/index';
/**
 * Class for a lightweight mobile menu.
 */
var MmenuLight = /** @class */ (function () {
    /**
     * Create a lightweight mobile menu.
     *
     * @param {HTMLElement} menu                HTML element for the menu.
     */
    function MmenuLight(menu) {
        var _this = this;
        //  Store the menu node.
        this.menu = menu;
        // find Dom elements
        var closeButton = this.menu.querySelector('.mm-btn_close');
        var prevButton = this.menu.querySelector('.mm-btn_prev');
        var searchOpener = this.menu.querySelector('#search-mobile-opener');
        // Set Menu Id
        this._menuId = '#mm-0';
        // Setup state
        this.state = [this._menuId];
        // Add class to body
        document.documentElement.classList.add("mm-init");
        // Init history back functionality
        this.handleBackButton();
        // Init close on ESC key
        this.handleESCClose();
        document.addEventListener('close:finish', function () {
            _this.initEmptyState();
        });
        if (closeButton) {
            closeButton.addEventListener('click', function (evnt) {
                evnt.preventDefault();
                _this.drawer.close();
            });
        }
        if (prevButton) {
            prevButton.addEventListener('click', function (evnt) {
                evnt.preventDefault();
                _this.handleClosings();
            });
        }
        if (searchOpener) {
            searchOpener.addEventListener('click', function (evnt) {
                evnt.preventDefault();
                _this.handleSearchOpen(evnt);
            });
        }
    }
    /**
     * Add navigation for the menu.
     *
     * @param {object} options Options for the navigation.
     */
    MmenuLight.prototype.navigation = function (options) {
        //  Only needs to be done ones.
        if (!this.navigator) {
            options = options || {};
            var _a = options.title, title = _a === void 0 ? 'Menu' : _a, _b = options.selectedClass, selectedClass = _b === void 0 ? 'selected' : _b, _c = options.slidingSubmenus, slidingSubmenus = _c === void 0 ? true : _c;
            this.navigator = new MmSlidingPanelsNavigation(this.menu, title, selectedClass, slidingSubmenus);
        }
        return this.navigator;
    };
    /**
     * Add off-canvas behavior to the menu.
     *
     * @param {object} options Options for the off-canvas drawer.
     */
    MmenuLight.prototype.offcanvas = function () {
        //  Only needs to be done ones.
        if (!this.drawer) {
            this.drawer = new MmOffCanvasDrawer(null);
            /** Original location in the DOM for the menu. */
            var orgLocation = document.createComment('original menu location');
            this.menu.after(orgLocation);
            this.drawer.content.append(this.menu);
        }
        return this.drawer;
    };
    MmenuLight.prototype.handleOpen = function (evnt) {
        var navOpener = evnt.target.closest('.nav-opener');
        var href = navOpener.hash;
        this.addState(href);
        this.openPanelByHash(href);
    };
    MmenuLight.prototype.handleSearchOpen = function (evnt) {
        var searchDiv = evnt.target.closest('#search-mobile-opener');
        this.addState('#search');
        this.navigator.openPanel(searchDiv, 'Suche');
    };
    MmenuLight.prototype.handleESCClose = function () {
        var _this = this;
        document.addEventListener('keyup', function (evnt) {
            if (evnt.keyCode == 27) {
                _this.drawer.close();
            }
        }, { passive: true });
    };
    MmenuLight.prototype.openPanelByHash = function (href) {
        if (href && href.length > 1 && href.slice(0, 1) == '#') {
            var panel = this.menu.querySelector(href);
            this.navigator.openPanel(panel);
            if (!this.drawer.isMenuOpen) {
                this.drawer.open();
            }
            return true;
        }
        else {
            console.error('Didnt find corresponding panel in main navigation');
            return false;
        }
    };
    MmenuLight.prototype.addState = function (hash) {
        if (hash !== this._menuId && hash != this.state[this.state.length - 1]) {
            this.state.push(hash);
        }
    };
    MmenuLight.prototype.removeState = function () {
        if (this.state.length) {
            this.state.pop();
        }
    };
    MmenuLight.prototype.initEmptyState = function () {
        this.state = [this._menuId];
    };
    MmenuLight.prototype.handleBackButton = function () {
        var _this = this;
        var mmenu = '#menu-open';
        document.addEventListener('open:finish', function () {
            history.pushState(null, document.title, mmenu);
        });
        //back menu or close menu on history back
        window.addEventListener('popstate', function () {
            if (_this.drawer.isMenuOpen) { //sprawdz czy menu jest otwarte
                if (_this.state.length) {
                    history.pushState(null, document.title, mmenu);
                    _this.handleClosings();
                }
            }
        });
        //set default history on menu close
        document.addEventListener('close:finish', function () {
            history.back();
        });
    };
    MmenuLight.prototype.handleClosings = function () {
        this.removeState();
        var parent = this.state[this.state.length - 1];
        if (parent) {
            this.openPanelByHash(parent);
            return true;
        }
        else {
            this.drawer.close();
        }
        return false;
    };
    return MmenuLight;
}());
export default MmenuLight;
