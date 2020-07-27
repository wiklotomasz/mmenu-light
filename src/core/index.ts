import MmSlidingPanelsNavigation from '../modules/sliding-panels-navigation/index';
import MmOffCanvasDrawer from '../modules/offcanvas-drawer/index';

/**
 * Class for a lightweight mobile menu.
 */
export default class MmenuLight {
    /** HTML element for the menu. */
    menu: HTMLElement;

    /** The Navigation instance. */
    navigator: MmSlidingPanelsNavigation;

    /** The Off-canvas instance. */
    drawer: MmOffCanvasDrawer;

    /**
     * Create a lightweight mobile menu.
     *
     * @param {HTMLElement} menu                HTML element for the menu.
     * @param {string}      [mediaQuery='all']  Media queury to match for the menu.
     */
    constructor(menu: HTMLElement, mediaQuery: string = 'all') {
        //  Store the menu node.
        this.menu = menu;
    }

    /**
     * Add navigation for the menu.
     *
     * @param {object} options Options for the navigation.
     */
    navigation(options: mmNavigationOptions) {
        //  Only needs to be done ones.
        if (!this.navigator) {
            options = options || {};

            const {
                title = 'Menu',
                selectedClass = 'Selected',
                slidingSubmenus = true
            } = options;

            this.navigator = new MmSlidingPanelsNavigation(
                this.menu,
                title,
                selectedClass,
                slidingSubmenus
            );

            //  Enable
            () => this.menu.classList.add('mm-spn')
        }

        return this.navigator;
    }

    /**
     * Add off-canvas behavior to the menu.
     *
     * @param {object} options Options for the off-canvas drawer.
     */
    offcanvas(options: mmOffcanvasOptions) {
        //  Only needs to be done ones.
        if (!this.drawer) {
            options = options || {};
            const { position = 'left' } = options;
            this.drawer = new MmOffCanvasDrawer(null, position);

            /** Original location in the DOM for the menu. */
            let orgLocation = document.createComment('original menu location');
            this.menu.after(orgLocation);

            //  Enable
            this.drawer.content.append(this.menu);
        }

        return this.drawer;
    }
}
