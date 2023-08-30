const MenuIcon = "menu"
const CloseIcon = "close"
const ArrowLeftIcon = "arrow-left"
const ArrowRightIcon = "arrow-right"


export type IconType = typeof MenuIcon | typeof CloseIcon | typeof ArrowLeftIcon | typeof ArrowRightIcon;
export enum Icons {
    menu = MenuIcon,
    close = CloseIcon,
    arrowLeft = ArrowLeftIcon,
    arrowRight = ArrowRightIcon,
}