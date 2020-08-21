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
        // Set Menu Id
        this._menuId = '#mm-0';
        // Setup state
        this.state = [this._menuId];
        // Init history back functionality
        this.handleBackButton();
        document.addEventListener('close:finish', function () {
            _this.initEmptyState();
        });
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
    MmenuLight.prototype.openPanelByHash = function (href) {
        if (href && href.length > 1 && href.slice(0, 1) == '#') {
            try {
                var panel = this.menu.querySelector(href);
                if (panel && panel.matches('.mm-panel')) {
                    this.navigator.openPanel(panel);
                    if (!this.drawer.isMenuOpen) {
                        this.drawer.open();
                    }
                    return true;
                }
            }
            catch (err) {
                console.error('Didnt find corresponding panel in main navigation');
            }
        }
    };
    MmenuLight.prototype.addState = function (hash) {
        if (hash !== this._menuId) {
            this.state.push(hash);
        }
        console.log(this.state);
    };
    MmenuLight.prototype.removeState = function () {
        console.log('usuwam 1 state');
        if (this.state.length) {
            this.state.pop();
        }
        console.log(this.state);
    };
    MmenuLight.prototype.initEmptyState = function () {
        this.state = [this._menuId];
    };
    MmenuLight.prototype.handleBackButton = function () {
        var _this = this;
        var _menu = '#openmenu';
        var states = [];
        //create history breadcrumbs
        var setStates = function () {
            states = [_menu];
            var openPanels = _this.menu.querySelectorAll('.mm-spn--open');
            openPanels.forEach(function (panel) {
                states.push(panel.dataset.panelId);
            });
        };
        document.addEventListener('open:finish', function () {
            setStates();
            history.pushState(null, document.title, _menu);
        });
        document.addEventListener('openPanel:finish', function () {
            setStates();
        });
        //back menu or close menu on history back
        window.addEventListener('popstate', function () {
            if (_this.drawer.isMenuOpen) { //sprawdz czy menu jest otwarte
                if (states.length) {
                    states = states.slice(0, -1);
                    var hash = states[states.length - 1];
                    if (hash == _menu) {
                        _this.drawer.close(false);
                    }
                    else {
                        _this.navigator.openPanel(_this.menu.querySelector("[data-panel-id=\"" + hash + "\""));
                        history.pushState(null, document.title, _menu);
                    }
                }
            }
        });
        //set default history on menu close
        document.addEventListener('close:finish', function () {
            states = [];
            history.back();
            history.pushState(null, document.title, location.pathname + location.search);
        });
    };
    MmenuLight.prototype.handleClosings = function () {
        console.log('handle closing');
        this.removeState();
        var parent = this.state[this.state.length - 1];
        console.log('bede otwierał', parent);
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
