import { createStore, applyMiddleware, compose, Middleware } from 'redux';
// import { createEpicMiddleware } from 'redux-observable'
import rootReducer from './rootReducer'
import IStoreState from './IStoreState';

const composeEnhancers = (
  process.env.NODE_ENV === 'development' &&
  window && window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']
) || compose;

function configureStore(initialState?: IStoreState) {
  // configure middlewares
  const middlewares: Middleware<any, any, any>[] = [
//    createEpicMiddleware(rootEpic),
  ];
  // compose enhancers
  const enhancer = composeEnhancers(
    applyMiddleware(...middlewares)
  );
  // create store
  return createStore(
    rootReducer,
    initialState!,
    enhancer
  );
}

// pass an optional param to rehydrate state on app start
const store = configureStore();

// export store singleton instance
export default store;