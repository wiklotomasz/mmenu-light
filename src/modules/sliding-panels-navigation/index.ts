import { r, $, uniqueId } from '../helpers';
import * as DOM from '../dom';
import * as support from '../support';

/**
 * Class for navigating in a mobile menu.
 */
export default class MmSlidingPanelsNavigation {
    /** HTML element for the menu. */
    node: HTMLElement;

    /** The title for the menu. */
    title: string;

    /** Whether or not to use sliding submenus. */
    slidingSubmenus: boolean;

    /** The class for selected menu items. */
    selectedClass: string;

    /** Menu title tag */
    mmSpnTitle: HTMLElement;

    /**
     * Class for navigating in a mobile menu.
     *
     * @param {HTMLElement} node            HTMLElement for the menu.
     * @param {string}      title           The title for the menu.
     * @param {string}      selectedClass   The class for selected listitems.
     * @param {boolean}     slidingSubmenus Whether or not to use sliding submenus.
     * @param {string}      theme           The color scheme for the menu.
     */
    constructor(
        node: HTMLElement,
        title: string,
        selectedClass: string,
        slidingSubmenus: boolean
    ) {
        this.node = node;
        this.title = title;
        this.slidingSubmenus = slidingSubmenus;
        this.selectedClass = selectedClass;

        this.node.classList.add(
            `mm-spn--${this.slidingSubmenus ? 'navbar' : 'vertical'}`
        );

        this.mmSpnTitle = this.node.querySelector(`#mm-header__title`);

        this._setSelectedl();
        this._initAnchors();
        this._initPanels();
    }

    _initPanels() {
        let panelsDiv = DOM.create('div.mm-panels');
        let panels = this.node.querySelectorAll('.mm-panel');

        for (let i = 0; i < panels.length; i++) {
            const singlePanel = (panels[i] as HTMLElement);
            const id = singlePanel.id || uniqueId();
            let link = (singlePanel.previousElementSibling as HTMLAnchorElement);
            if (link) {
                link.href = '#' + id;
            }
            singlePanel.id = id;
            singlePanel.dataset.mmSpnTitle = singlePanel.dataset.mmSpnTitle || link.textContent;
            panelsDiv.append(singlePanel);
        }

        this.node.append(panelsDiv);
    }

    /**
     * Open the given panel.
     *
     * @param {HTMLElement} panel Panel to open.
     */
    openPanel(panel: HTMLElement) {
        /** Title above the panel to open. */
        let title = panel.dataset.mmSpnTitle;

        //  Use the default title.
        if (!title) {
            title = this.title;
        }

        //  Set the title.
        this.mmSpnTitle.innerHTML = title;

        //  Unset all panels from being opened and parent.
        $(`.mm-spn--open`, this.node).forEach(open => {
            open.classList.remove(`mm-spn--open`);
        });

        //  Set the current panel as being opened.
        panel.classList.add(`mm-spn--open`);
        
        document.dispatchEvent(new Event('openPanel:finish'));
    }

    /**
     * Initiate the selected listitem / open the current panel.
     */
    _setSelectedl() {
        /** All selected LIs. */
        let listitems = $('.' + this.selectedClass, this.node);

        /** The last selected LI. */
        let listitem = listitems[listitems.length - 1];

        /** The opened UL. */
        let panel = null;

        if (listitem) {
            panel = listitem.closest('.mm-panel');
        }
        if (!panel) {
            panel = this.node.querySelector('.mm-panel');
        }
    }

    /**
     * Initialize the click event handlers.
     */
    _initAnchors() {
        /**
         * Clicking an A in the menu: prevent bubbling up to the LI.
         *
         * @param   {HTMLElement}    target The clicked element.
         * @return  {boolean}       handled Whether or not the event was handled.
         */
        const clickAnchor = (target: HTMLElement): boolean => {
            if (target.matches('a')) {
                return true;
            }
            return false;
        };

        /**
         * Click a LI or SPAN in the menu: open its submenu (if present).
         *
         * @param   {HTMLElement}    target The clicked element.
         * @return  {boolean}               Whether or not the event was handled.
         */
        const openSubmenu = (target: HTMLElement): boolean => {
            /** Parent listitem for the submenu.  */
            let listitem;

            //  Find the parent listitem.
            if (target.closest('.span')) {
                listitem = target.parentElement;
            } else if (target.closest('.mm-listitem')) {
                listitem = target;
            } else {
                listitem = false;
            }

            if (listitem) {
                r(listitem.children).forEach(panel => {
                    if (panel.matches('.mm-panel')) {
                        this.openPanel(panel);
                    }
                });

                return true;
            }
            return false;
        };

        this.node.addEventListener('click', evnt => {
            let target = evnt.target as HTMLElement;
            let handled = false;

            handled = handled || clickAnchor(target);
            handled = handled || openSubmenu(target);

            if (handled) {
                evnt.stopImmediatePropagation();
            }
        });
    }
}
