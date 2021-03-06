import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import allGalaxies from "./allGalaxies";
import singleGalaxy from "./singleGalaxy";
import userDashboard from "./userDashboard"
import cart from "./cart";

const reducer = combineReducers({
  auth,
  allGalaxies,
  singleGalaxy,
  cart,
  userDashboard
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
