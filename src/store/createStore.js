import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import {combineReducers} from 'redux'
import { browserHistory } from 'react-router'
import {makeRootReducer, injectReducer} from './reducers'
import { updateLocation } from './location'
import {loadData, updateCircleAction} from '../components/Shapes/shapesReducers';

export default (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [thunk];

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [];

  let composeEnhancers = compose;

  if (__DEV__) {
    const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    if (typeof composeWithDevToolsExtension === 'function') {
      composeEnhancers = composeWithDevToolsExtension
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );
  store.asyncReducers = {};

  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  store.unsubscribeHistory = browserHistory.listen(updateLocation(store));

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default;
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }


  //SCHEMADEFINITION

  injectReducer(store, {
    key: 'scene', reducer:
    combineReducers({
      appState:function(state, action) {
        if (state === undefined) {
          return {};
        }
        if (action.type === 'SET_STATE') {
          state = action.payload.state.result.appState;
        }

        if (action.type === 'UPDATE_SELECTED_ITEM') {
          state = {...state, selectedId: action.payload.id}
        }

        return state;
      },
      lines: function(state, action) {
        if (state === undefined) {
          return {byIds: {}};
        }
        if (action.type === 'SET_STATE') {
          state = {...state, byIds: action.payload.state.entities.lines};
        }
        if (action.type === 'UPDATE_CIRCLE') {
          // assume payload { <id> : {....}
          if (state.byIds[action.payload.id]) {
            state = {
              ...state, byIds: {
                ...state.byIds, [action.payload.id]: action.payload
              }
            }
          }
        }
        return state;
      },
      circles: function(state, action) {
        console.log(state, action);
        if (state === undefined) {
          return {byIds: {}};
        }
        if (action.type === 'SET_STATE') {
          state = {...state, byIds: action.payload.state.entities.circles};
        }
        if (action.type === 'UPDATE_CIRCLE') {
          // assume payload { <id> : {....}
          if (state.byIds[action.payload.id]) {
            state = {
              ...state, byIds: {
                ...state.byIds, [action.payload.id]: action.payload
              }
            }
          }
        }
        console.log('POST', state);
        return state;

      }, squares: function(state, action) {
          console.log(state, action);
          if (state === undefined) {
            return { byIds : {}};
          }
          if (action.type === 'SET_STATE') {
            state = {...state, byIds :action.payload.state.entities.squares};
          }
          if (action.type === 'UPDATE_CIRCLE') {
            // assume payload { <id> : {....}
            if (state.byIds[action.payload.id]) {
              state = {
                ...state, byIds: {
                  ...state.byIds, [action.payload.id]: action.payload
                }
              }
            }
          }
        console.log('POST', state);
        return state;
      }
    })
  });


  store.dispatch(loadData()).then(() => {
    store.dispatch(updateCircleAction({
      id: 2,
      svgAttributes:{
        cx: 200,
        cy: 60,
        r: 30
      },
      style: {fill: 'blue', stroke: 'green', strokeWidth:5}

    }))
  });

  return store;
}
