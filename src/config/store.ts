import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from 'reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

// const skipLogger: string[] = [
//   'SELECT_MAIN_WRAPPER_MENU_ITEMS_KEYS'
// ];

const logger = () => (next: any) => (action: any) => {
  // if (!skipLogger.includes(action.type)) {
  //   console.log('ACT =>', action);
  // }
  next(action);
};

const enhancers: any[] = [];
const middleware = [sagaMiddleware, logger];

if (process.env.NODE_ENV === 'development') {
  const { devToolsExtension } = window as any;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store = createStore(rootReducer, composedEnhancers);

sagaMiddleware.run(rootSaga);

export default store;
