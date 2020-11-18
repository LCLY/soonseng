import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'animate.css/animate.min.css';
import 'react-image-lightbox/style.css';
// 3rd party lib
import { BrowserRouter } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';
// redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { watchDashboard, watchSales } from './store/sagas/index';

// redux-persist
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

// reducers
import dashboardReducer from 'src/store/reducers/dashboard';
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
  dashboard: dashboardReducer,
  sales: salesReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

// set config to our rootreducer
const pReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();
// use the new persistreducer in creating store
const store = createStore(pReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

const persistor = persistStore(store);

sagaMiddleware.run(watchDashboard);
sagaMiddleware.run(watchSales);

/**
 * @ignore
 */
const app = (
  <Provider store={store}>
    <ParallaxProvider>
      <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </ParallaxProvider>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root') || document.createElement('div'));
