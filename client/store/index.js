import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import allGalaxies from "./allGalaxies";
import singleGalaxy from "./singleGalaxy";
import singleOrder from "./singleOrder";

const reducer = combineReducers({
  auth,
  allGalaxies,
  singleGalaxy,
  singleOrder,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
