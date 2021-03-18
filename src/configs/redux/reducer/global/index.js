import {reducer, photo} from '../../../../constants/values';

const initialStateRoot = {
  isLogIn: false,
  isFirstLaunch: false,
  dataUser: {},
};

const global = (state = initialStateRoot, action) => {
  switch (action.type) {
    case reducer.ISLOGIN:
      return {
        ...state,
        isLogIn: action.value,
      };
    case reducer.ISFIRSTLAUNCH:
      return {
        ...state,
        isFirstLaunch: action.value,
      };
    case reducer.DATAUSER:
      return {
        ...state,
        dataUser: action.value,
      };
    default:
      return state;
  }
};

export default global;
