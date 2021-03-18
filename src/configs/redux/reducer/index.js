import {persistCombineReducers} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import global from './global';
import tmp from './tmp';

const reducer = {
  global: global,
  tmp: tmp,
};

const configReduxPersist = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['global'],
};

const reduxPersistReducer = persistCombineReducers(configReduxPersist, reducer);

export default reduxPersistReducer;
