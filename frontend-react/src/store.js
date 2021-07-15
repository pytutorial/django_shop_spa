import { configureStore } from '@reduxjs/toolkit'

import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer
});


if (module.hot) {
  module.hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default
    store.replaceReducer(newRootReducer)
  })
}

export default store;
