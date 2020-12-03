import { createStore, compose } from 'redux';
import reducer from './reducer';
import middlewares from './middlewares';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// To enable Redux DevTools Extension, just use window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__, this is take the informations in our store
const enhancers = composeEnhancers(middlewares);
const store = createStore(reducer, enhancers);
export default store;
