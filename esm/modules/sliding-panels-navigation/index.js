import { $, uniqueId } from '../helpers';
import * as DOM from '../dom';
/**
 * Class for navigating in a mobile menu.
 */
var MmSlidingPanelsNavigation = /** @class */ (function () {
    /**
     * Class for navigating in a mobile menu.
     *
     * @param {HTMLElement} node            HTMLElement for the menu.
     * @param {string}      title           The title for the menu.
     * @param {string}      selectedClass   The class for selected listitems.
     * @param {string}      theme           The color scheme for the menu.
     */
    function MmSlidingPanelsNavigation(node, title, selectedClass) {
        this.node = node;
        this.title = title;
        this.selectedClass = selectedClass;
        this.mmSpnTitle = this.node.querySelector("#mm-header__title");
        this._setSelectedl();
        this._initAnchors();
        this._initPanels();
    }
    MmSlidingPanelsNavigation.prototype._initPanels = function () {
        var panelsDiv = DOM.create('div.mm-panels');
        var panels = this.node.querySelectorAll('.mm-panel');
        for (var i = 0; i < panels.length; i++) {
            var singlePanel = panels[i];
            var id = singlePanel.id || uniqueId();
            var link = singlePanel.previousElementSibling;
            if (link && !link.href) {
                link.href = '#' + id;
            }
            singlePanel.id = id;
            singlePanel.classList.add("mm-hidden");
            singlePanel.dataset.mmSpnTitle =
                singlePanel.dataset.mmSpnTitle || link.textContent;
            panelsDiv.append(singlePanel);
        }
        this.node.append(panelsDiv);
    };
    /**
     * Open the given panel.
     *
     * @param {HTMLElement} panel Panel to open.
     */
    MmSlidingPanelsNavigation.prototype.openPanel = function (panel, title) {
        if (!title) {
            title = panel.dataset.mmSpnTitle;
        }
        //  Use the default title.
        if (!title) {
            title = this.title;
        }
        //  Set the title.
        this.mmSpnTitle.innerHTML = title;
        //  Unset all panels from being opened and parent.
        $(".mm-spn--open", this.node).forEach(function (open) {
            open.classList.add("mm-hidden");
            open.classList.remove("mm-spn--open");
        });
        //  Set the current panel as being opened.
        panel.classList.remove("mm-hidden");
        panel.classList.add("mm-spn--open");
        document.dispatchEvent(new Event('openPanel:finish'));
    };
    /**
     * Initiate the selected listitem / open the current panel.
     */
    MmSlidingPanelsNavigation.prototype._setSelectedl = function () {
        /** All selected LIs. */
        var listitems = $('.' + this.selectedClass, this.node);
        /** The last selected LI. */
        var listitem = listitems[listitems.length - 1];
        /** The opened UL. */
        var panel = null;
        if (listitem) {
            panel = listitem.closest('.mm-panel');
        }
        if (!panel) {
            panel = this.node.querySelector('.mm-panel');
        }
    };
    /**
     * Initialize the click event handlers.
     */
    MmSlidingPanelsNavigation.prototype._initAnchors = function () {
        /**
         * Clicking an A in the menu: prevent bubbling up to the LI.
         *
         * @param   {HTMLElement}    target The clicked element.
         * @return  {boolean}       handled Whether or not the event was handled.
         */
        var clickAnchor = function (target) {
            if (target.matches('a')) {
                return true;
            }
            return false;
        };
        this.node.addEventListener('click', function (evnt) {
            var target = evnt.target;
            var handled = false;
            handled = handled || clickAnchor(target);
            if (handled) {
                evnt.stopImmediatePropagation();
            }
        });
    };
    return MmSlidingPanelsNavigation;
}());
export default MmSlidingPanelsNavigation;
