import { legacy_createStore } from "redux";
import cartReducer from "./cart/cartReducer";
const store=legacy_createStore(cartReducer);

export default store;