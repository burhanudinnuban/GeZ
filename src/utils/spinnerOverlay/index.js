import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import colors from '../../constants/colors';

const SpinnerView = ({loading}) => {
  return (
    <Spinner
      visible={loading}
      textContent={'Loading...'}
      textStyle={{color: colors.black}}
    />
  );
};

export default SpinnerView;
