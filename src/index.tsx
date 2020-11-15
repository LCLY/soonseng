import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'src/components/ImageRelated/LightboxComponent/node_modules/react-image-lightbox/style.css';
// 3rd party lib
import { BrowserRouter } from 'react-router-dom';

// redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { watchAuth } from './store/sagas/index';

// redux-persist
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

// reducers
import salesReducer from 'src/store/reducers/sales';

// enable browser redux extension tool
const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

// redux persist config
const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: [''], // which reducer want to store - name of reducer
};

// combine all reducers
const rootReducer = combineReducers({
  sales: salesReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

// set config to our rootreducer
const pReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();
// use the new persistreducer in creating store
const store = createStore(pReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

const persistor = persistStore(store);

sagaMiddleware.run(watchAuth);

/**
 * @ignore
 */
const app = (
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root') || document.createElement('div'));
