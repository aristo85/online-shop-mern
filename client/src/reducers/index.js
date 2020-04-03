import { combineReducers } from "redux";
import user from './user_reducer';
import searchProduct from './searchProduct_reducer';

const rootReducer = combineReducers({
    user,
    searchProduct
})
export default rootReducer;