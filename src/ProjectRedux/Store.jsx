import { legacy_createStore } from "redux";
import cartReducer from "./cart/cartReducer";


const loadState = () => {
  try {
    const serializedState = localStorage.getItem('cartState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};


const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cartState', serializedState);
  } catch (err) {
   
  }
};


const persistedState = loadState();


const store = legacy_createStore(cartReducer, persistedState);


store.subscribe(() => {
  saveState(store.getState());
});

export default store;
