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
     * @param {string}      [mediaQuery='all']  Media queury to match for the menu.
     */
    function MmenuLight(menu, mediaQuery) {
        if (mediaQuery === void 0) { mediaQuery = 'all'; }
        //  Store the menu node.
        this.menu = menu;
    }
    /**
     * Add navigation for the menu.
     *
     * @param {object} options Options for the navigation.
     */
    MmenuLight.prototype.navigation = function (options) {
        var _this = this;
        //  Only needs to be done ones.
        if (!this.navigator) {
            options = options || {};
            var _a = options.title, title = _a === void 0 ? 'Menuu' : _a, _b = options.selectedClass, selectedClass = _b === void 0 ? 'Selected' : _b, _c = options.slidingSubmenus, slidingSubmenus = _c === void 0 ? true : _c;
            this.navigator = new MmSlidingPanelsNavigation(this.menu, title, selectedClass, slidingSubmenus);
            //  Enable
            (function () { return _this.menu.classList.add('mm-spn'); });
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
            //  Enable
            this.drawer.content.append(this.menu);
        }
        return this.drawer;
    };
    return MmenuLight;
}());
export default MmenuLight;
