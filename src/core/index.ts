import { $ } from '../modules/helpers';
import * as DOM from '../modules/dom';
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

        // Set Menu Id
        this._menuId = '#mm-0';

        // Setup state
        this.state = [this._menuId];

        // Init history back functionality
        this.handleBackButton();

        document.addEventListener('close:finish', () => {
            this.initEmptyState();
        });
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
        const navOpener = evnt.target.closest('.nav-opener');
        const href = navOpener.hash;

        this.addState(href);
        this.openPanelByHash(href);
    }

    openPanelByHash(href) {
        if (href && href.length > 1 && href.slice(0, 1) == '#') {
            try {
                let panel = this.menu.querySelector(href);
                if (panel && panel.matches('.mm-panel')) {
                    this.navigator.openPanel(panel);
                    if (!this.drawer.isMenuOpen) {
                        this.drawer.open();
                    }
                    return true;
                }
            } catch (err) {
                console.error('Didnt find corresponding panel in main navigation');
            }
        }
    }

    addState(hash) {
        if (hash !== this._menuId) {
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
        var _menu = '#openmenu';
        var states = [];

        //create history breadcrumbs
        const setStates = () => {
            states = [_menu];
            var openPanels = this.menu.querySelectorAll('.mm-spn--open');
            openPanels.forEach((panel: any) => {
                states.push(panel.dataset.panelId);
            });
        };

        document.addEventListener('open:finish', () => {
            setStates();
            history.pushState(null, document.title, _menu);
        });

        document.addEventListener('openPanel:finish', () => {
            setStates();
        });

        //back menu or close menu on history back
        window.addEventListener('popstate', () => {
            if (this.drawer.isMenuOpen) { //sprawdz czy menu jest otwarte
                if (states.length) {
                    states = states.slice(0, -1);
                    var hash = states[states.length - 1];
                    
                    if (hash == _menu) {
                        this.drawer.close(false);
                    } else {
                        this.navigator.openPanel(this.menu.querySelector(`[data-panel-id="${hash}"`));
                        history.pushState(null, document.title, _menu);
                    }
                }
            }
        });

        //set default history on menu close
        document.addEventListener('close:finish', () => {
            states = [];
            history.back();
            history.pushState(
                null,
                document.title,
                location.pathname + location.search
            );
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
