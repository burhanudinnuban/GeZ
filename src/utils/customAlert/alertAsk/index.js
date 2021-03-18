import React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../constants/colors';
import {Gap, Box} from '../../../components';
import {useSelector, useDispatch} from 'react-redux';
import {reducer} from '../../../constants/values';

const AlertAsk = ({value, actionYes, actionNo, toggle}) => {
  return (
    <Modal isVisible={toggle}>
      <View
        style={{
          paddingVertical: 20,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.secondary,
          borderRadius: 10,
        }}>
        <Gap height={hp('2%')} />
        <Text style={styles.textTitle}>{value}</Text>
        <Gap height={hp('3%')} />
        <View
          style={{
            flexDirection: 'row',
            width: wp('90%'),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={actionNo} style={styles.backgroundButton}>
            <Text style={styles.button3}>NO</Text>
          </TouchableOpacity>
          <Gap width={wp('10%')} />
          <TouchableOpacity onPress={actionYes} style={styles.backgroundButton}>
            <Text style={styles.textChoose}>YES</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AlertAsk;

const styles = StyleSheet.create({
  backgroundButton: {
    height: hp('5%'),
    width: wp('30%'),
    backgroundColor: colors.white,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button3: {
    color: colors.redDark,
    textAlign: 'center',
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
  textTitle: {
    color: colors.black,
    fontSize: wp('4%'),
    bottom: hp('1.5%'),
    flexWrap: 'wrap',
    textAlign: 'center',
    marginHorizontal: 10,
  },
  textChoose: {
    fontWeight: 'bold',
    color: colors.blue,
    fontSize: wp('5%'),
    flexWrap: 'wrap',
    textAlign: 'center',
    marginHorizontal: 10,
  },
});
