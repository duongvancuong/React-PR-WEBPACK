import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas';
// import { subscribeStosre, loadState } from '../services/localstorage';
//  Returns the store instance
// It can  also take initialState argument when provided

// const persistedState = loadState();

const configureStoreDev = () => {
  const sagaMiddleware = createSagaMiddleware();
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = {
    ...createStore(
      rootReducer,
      // persistedState,
      composeEnhancers(applyMiddleware(sagaMiddleware)),
    ),
    runSaga: sagaMiddleware.run(rootSaga),
  };
  // subscribeStore(store);
  return store;
};

const configureStoreProd = () => {
  const sagaMiddleware = createSagaMiddleware();
  return {
    ...createStore(rootReducer, applyMiddleware(sagaMiddleware)),
    runSaga: sagaMiddleware.run(rootSaga)
  };
};

const env = process.env.NODE_ENV;
const configureStore = env === 'development' ? configureStoreDev : configureStoreProd;

export default configureStore;
