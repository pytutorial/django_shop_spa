import { createStore } from 'redux';
import rootReducer from './rootReducer';

const store = createStore(rootReducer);

if (module.hot) {
  module.hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default
    store.replaceReducer(newRootReducer)
  })
}

export default store;
