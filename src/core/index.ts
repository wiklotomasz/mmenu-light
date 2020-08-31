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

    /** Nav history state */
    state: Array<string>;

    /** menuId */
    _menuId: string;

    /**
     * Create a lightweight mobile menu.
     *
     * @param {HTMLElement} menu                HTML element for the menu.
     */
    constructor(menu: HTMLElement) {
        //  Store the menu node.
        this.menu = menu;

        // find Dom elements
        var closeButton = this.menu.querySelector( '.mm-btn_close' );
        var prevButton = this.menu.querySelector( '.mm-btn_prev' );
        var searchOpener = this.menu.querySelector('#search-mobile-opener');

        // Set Menu Id
        this._menuId = '#mm-0';

        // Setup state
        this.state = [this._menuId];

        // Init history back functionality
        this.handleBackButton();
        
        // Add class to body
        document.documentElement.classList.add(`mm-init`);

        document.addEventListener('close:finish', () => {
            this.initEmptyState();
        });

        if (closeButton) {
            closeButton.addEventListener( 'click', (evnt) => {
                evnt.preventDefault();
                this.drawer.close();
            });
        }

        if (prevButton) {
            prevButton.addEventListener( 'click', (evnt) => {
                evnt.preventDefault();
                this.handleClosings();
            });
        }

        if (searchOpener) {
            searchOpener.addEventListener( 'click', (evnt) => {
                evnt.preventDefault();
                this.handleSearchOpen(evnt);
            });
        }
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
                selectedClass = 'selected',
                slidingSubmenus = true
            } = options;

            this.navigator = new MmSlidingPanelsNavigation(
                this.menu,
                title,
                selectedClass,
                slidingSubmenus
            );
        }

        return this.navigator;
    }

    /**
     * Add off-canvas behavior to the menu.
     *
     * @param {object} options Options for the off-canvas drawer.
     */
    offcanvas() {
        //  Only needs to be done ones.
        if (!this.drawer) {
            this.drawer = new MmOffCanvasDrawer(null);

            /** Original location in the DOM for the menu. */
            let orgLocation = document.createComment('original menu location');
            this.menu.after(orgLocation);

            this.drawer.content.append(this.menu);
        }

        return this.drawer;
    }

    handleOpen(evnt) {
        const navOpener = (evnt.target.closest('.nav-opener') as HTMLAnchorElement);
        const href = (navOpener.hash as string);

        this.addState(href);
        this.openPanelByHash(href);
    }

    handleSearchOpen(evnt) {
        const searchDiv = evnt.target.closest('#search-mobile-opener');

        this.addState('#search');
        this.navigator.openPanel(searchDiv, 'Suche');
    }

    openPanelByHash(href) {
        if (href && href.length > 1 && href.slice(0, 1) == '#') {
            let panel = (this.menu.querySelector(href) as HTMLElement);
            this.navigator.openPanel(panel);
            if (!this.drawer.isMenuOpen) {
                this.drawer.open();
            }
            return true;
        } else {
            console.error('Didnt find corresponding panel in main navigation');
            return false;
        }
    }

    addState(hash) {
        if (hash !== this._menuId && hash != this.state[this.state.length - 1]) {
            this.state.push(hash);
        }
    }

    removeState() {
        if (this.state.length) {
            this.state.pop();
        }
    }

    initEmptyState() {
        this.state = [this._menuId];
    }

    handleBackButton() {
        var mmenu = '#menu-open'

        document.addEventListener('open:finish', () => {
            history.pushState(null, document.title, mmenu);
        });

        //back menu or close menu on history back
        window.addEventListener('popstate', () => {
            if (this.drawer.isMenuOpen) { //sprawdz czy menu jest otwarte
                if (this.state.length) {
                    history.pushState(null, document.title, mmenu);
                    this.handleClosings();
                }
            }
        });

        //set default history on menu close
        document.addEventListener('close:finish', () => {
            history.back();
        });
    }

    handleClosings() {
        this.removeState();
        const parent = this.state[this.state.length - 1];

        if (parent) {
            this.openPanelByHash(parent);
            return true;
        } else {
            this.drawer.close();
        }
        return false;
    }
}
