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

    /**
     * Create a lightweight mobile menu.
     *
     * @param {HTMLElement} menu                HTML element for the menu.
     */
    constructor(menu: HTMLElement) {
        //  Store the menu node.
        this.menu = menu;

        // Init history back functionality
        this.handleBackButton();
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

            //	Wrap the panels in a node.
            // let panels = DOM.create('div.mm-panels');

            // DOM.children(this.menu).forEach((panel) => {
            //     panels.append(panel);
            // });

            // this.menu.append(panels);

            // var panel = this.menu.querySelectorAll('.mm-panel');

            // for (let i = 0; i < panel.length; i++) {
            //     const singlePanel = panel[i];
            //     let link = panel[i].parentElement;
            //     let title = link.querySelector('.nav-opener');
            //     if (title) {
            //         title.setAttribute('href', '#mm-'+i);
            //     }
            //     singlePanel.setAttribute('data-panel-id','#mm-'+i);
            //     panels.append(panel[i]);
            // }
    
            //this.menu.append(panels);

            //  Enable
            this.drawer.content.append(this.menu);
        }

        return this.drawer;
    }

    handleOpen(evnt) {
        const navOpener = evnt.target.closest('.nav-opener');
        const href = navOpener.hash;

        if (href && href.length > 1 && href.slice(0, 1) == '#') {
            try {
                let panel = this.menu.querySelector(href);
                if (panel && panel.matches('.mm-panel')) {
                    this.navigator.openPanel(panel);
                    this.drawer.open();
                    return true;
                }
            } catch (err) {
                console.error('Didnt find corresponding panel in main navigation');
            }
        }	
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
        /** The opened ULs. */
        let panels = $(`.mm-spn--open`, this.navigator.node);

        /** The last opened UL. */
        let panel = panels[panels.length - 1];
        if (panel) {
            /** The second to last opened UL. */
            let parent = panel.parentElement.closest('.mm-panel');
            if (parent) {
                this.navigator.openPanel(parent);
                return true;
            } else {
                this.drawer.close();
            }
        }
        return false;
    }
}
