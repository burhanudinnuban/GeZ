import React from 'react';
import {View, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {styles} from '../../configs/styles';
import SearchBar from '../searchBar';

const TopBar = ({component1, component2, component3}) => {
  return (
    <View style={styles.containerTopBar}>
      <View style={styles.containerTopBarComponent1}>{component1}</View>
      <View style={styles.containerTopBarComponent2}>{component2}</View>
      <View style={styles.containerTopBarComponent3}>{component3}</View>
    </View>
  );
};

export default TopBar;
