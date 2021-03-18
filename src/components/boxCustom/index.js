import React from 'react';
import {View} from 'react-native';

const boxCustom = ({
  height,
  color,
  width,
  borderColor,
  borderWidth,
  borderRadius,
}) => {
  return (
    <View
      style={{
        height: height,
        backgroundColor: color,
        width: width,
        borderColor: borderColor,
        borderWidth: borderWidth,
        borderRadius: borderRadius,
      }}></View>
  );
};

export default boxCustom;
