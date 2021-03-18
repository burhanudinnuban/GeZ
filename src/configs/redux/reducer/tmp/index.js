import {reducer, photo} from '../../../../constants/values';

const initialStateRoot = {
  loading: false,
  disable: false,
  togglePickerImg: false,
  toggleNotif: false,
  toggleAsk: false,
  photoType: '',
  photoUser: '',
};

const tmp = (state = initialStateRoot, action) => {
  switch (action.type) {
    case reducer.ISFIRSTLAUNCH:
      return {
        ...state,
        isFirstLaunch: action.value,
      };
    case reducer.DISABLE:
      return {
        ...state,
        disable: action.value,
      };
    case reducer.TOGGLEPICKERIMG:
      return {
        ...state,
        togglePickerImg: action.value,
      };
    case reducer.TOGGLENOTIF:
      return {
        ...state,
        toggleNotif: action.value,
      };
    case reducer.TOGGLEASK:
      return {
        ...state,
        toggleAsk: action.value,
      };
    case reducer.PHOTOTYPE:
      return {
        ...state,
        photoType: action.value,
      };
    case photo.user:
      return {
        ...state,
        photoUser: action.value,
      };
    default:
      return state;
  }
};

export default tmp;
