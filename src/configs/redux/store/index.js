import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore} from 'redux-persist';
import reducer from '../reducer';

const store = createStore(reducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export {store, persistor};
