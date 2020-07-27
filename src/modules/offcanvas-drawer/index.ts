/**
 * Class for off-canvas behavior.
 */
export default class MmOffCanvasDrawer {
    /** HTML element for the wrapper */
    wrapper: HTMLElement;

    /** HTML element for the content. */
    content: HTMLElement;

    /** HTML element for the blocker (off-canvas add-on). */
    backdrop: HTMLElement;

    /**
     * Class for off-canvas drawer.
     *
     * @param {HTMLElement} [node]          The element to put in the drawer.
     */
    constructor(node: HTMLElement = null) {
        //  Create the wrapper.
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add(`mm-ocd`);
        this.wrapper.classList.add(`mm-ocd--left`);

        //  Create the drawer.
        this.content = document.createElement('div');
        this.content.classList.add(`mm-ocd__content`);
        this.wrapper.append(this.content);

        //  Create the backdrop.
        this.backdrop = document.createElement('div');
        this.backdrop.classList.add(`mm-ocd__backdrop`);
        this.wrapper.append(this.backdrop);

        //  Add the nodes to the <body>.
        document.body.append(this.wrapper);

        if (node) {
            this.content.append(node);
        }

        //  Click the backdrop.
        const close = (evnt: MouseEvent) => {
            this.close();
            evnt.stopImmediatePropagation();
        };
        this.backdrop.addEventListener('touchstart', close, { passive: true });
        this.backdrop.addEventListener('mousedown', close, { passive: true });
    }

    /**
     * Open the drawer.
     */
    open() {
        this.wrapper.classList.add(`mm-ocd--open`);
        document.body.classList.add(`mm-ocd-opened`);
    }

    /**
     * Close the drawer.
     */
    close() {
        this.wrapper.classList.remove(`mm-ocd--open`);
        document.body.classList.remove(`mm-ocd-opened`);
    }
}
