import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

const logger = ({ getState, dispatch }) => next => action => {
  next(action);
  console.log(action.type);
};

const store = createStore(reducers, applyMiddleware(logger, thunk));

export default store;
