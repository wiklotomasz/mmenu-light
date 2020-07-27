/**	Options for the navigation. */
interface mmNavigationOptions {
    /** The class for selected listitems. */
    selectedClass?: string;

    /** Whether or not to use sliding submenus. */
    slidingSubmenus?: boolean;

    /** The title for the menu. */
    title?: string;
}

/**	Options for the offcanvas drawer. */
interface mmOffcanvasOptions {
    /** The position of the drawer. */
    position?: 'left' | 'right';
}
