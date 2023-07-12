import { OPEN_NAV, CLOSE_NAV } from "./navbarTypes";

export const open_nav = () => {
    return {
        type: OPEN_NAV,
    }
}

export const close_nav = () => {
    return {
        type: CLOSE_NAV,
    }
}