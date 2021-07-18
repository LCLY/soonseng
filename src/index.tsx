import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'animate.css/animate.min.css';
import 'react-image-lightbox/style.css';
// 3rd party lib
import { BrowserRouter } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';

import actioncable from 'actioncable';

// import { ActionCableProvider } from 'react-actioncable-provider';
// redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { watchDashboard, watchSales, watchAuth, watchCatalog, watchTask, watchPerformance } from './store/sagas/index';

// redux-persist
import storage from 'redux-persist/lib/storage';
import { createFilter } from 'redux-persist-transform-filter';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

// reducers
import authReducer from 'src/store/reducers/auth';
import salesReducer from 'src/store/reducers/sales';
import dashboardReducer from 'src/store/reducers/dashboard';
import catalogReducer from 'src/store/reducers/catalog';
import generalReducer from 'src/store/reducers/general';
import taskReducer from 'src/store/reducers/task';
import performanceReducer from 'src/store/reducers/performance';

export const CableApp: any = {};
CableApp.cable = actioncable.createConsumer(`${process.env.REACT_APP_WS_API}`);

export const ActionCableContext = React.createContext(CableApp);

// use this when testing locally on mobile
// const composeEnhancers = compose;

// enable browser redux extension tool
const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

// you want to store only a subset of your state of reducer one
const saveSalesSubsetFilter = createFilter('sales', ['localOrdersDict']);
const saveAuthSubsetFilter = createFilter('auth', ['auth_token', 'accessObj', 'userInfoObj']);
const saveGeneralSubsetFilter = createFilter('general', ['projectVersion']);
const saveCatalogSubsetFilter = createFilter('catalog', ['viewMode']);

// redux persist config
const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['sales', 'auth', 'general', 'catalog'], // which reducer want to store - name of reducer
  transforms: [saveSalesSubsetFilter, saveAuthSubsetFilter, saveGeneralSubsetFilter, saveCatalogSubsetFilter],
  stateReconciler: autoMergeLevel2,
};

// combine all reducers
const rootReducer = combineReducers({
  dashboard: dashboardReducer,
  sales: salesReducer,
  auth: authReducer,
  catalog: catalogReducer,
  general: generalReducer,
  task: taskReducer,
  performance: performanceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// set config to our rootreducer
const pReducer = persistReducer<RootState>(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();
// use the new persistreducer in creating store
const store = createStore(pReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

export const persistor = persistStore(store);

sagaMiddleware.run(watchDashboard);
sagaMiddleware.run(watchSales);
sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchCatalog);
sagaMiddleware.run(watchTask);
sagaMiddleware.run(watchPerformance);

const app = (
  <Provider store={store}>
    <ParallaxProvider>
      <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
          {/* <ActionCableProvider url={`${process.env.REACT_APP_API}/cable`}> */}
          <ActionCableContext.Provider value={CableApp}>
            <App />
          </ActionCableContext.Provider>
          {/* </ActionCableProvider> */}
        </PersistGate>
      </BrowserRouter>
    </ParallaxProvider>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root') || document.createElement('div'));
