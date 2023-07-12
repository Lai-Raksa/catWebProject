import { combineReducers } from 'redux'

import navReducer from './navbar/navbarReducer'

const rootReducer = combineReducers({
    navbar: navReducer
})

export default rootReducer