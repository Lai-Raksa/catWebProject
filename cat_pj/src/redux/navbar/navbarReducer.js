import { OPEN_NAV, CLOSE_NAV } from "./navbarTypes";

const initialState = {
    isNav: false
}

const navReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_NAV :
            return{
                ...state,
                isNav: true
            }
        case CLOSE_NAV :
            return{
                isNav: false
            }
        default: return state
    }
}

export default navReducer