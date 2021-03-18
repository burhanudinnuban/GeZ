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

const AlertNotif = ({value}) => {
  const dispatch = useDispatch();
  const global = useSelector((state) => state.global);
  const toggleNotif = global.toggleNotif;

  function didToggle() {
    dispatch({type: reducer.TOGGLENOTIF, value: false});
  }

  return (
    <Modal isVisible={toggleNotif}>
      <View
        style={{
          height: hp('27%'),
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.secondary,
          borderRadius: 10,
        }}>
        <Text style={styles.textTitle}>Notification</Text>
        <Box
          height={1}
          width={wp('90%')}
          borderWidth={1}
          borderColor={colors.primary}
        />
        <Gap height={hp('5%')} />
        <View
          style={{
            flexDirection: 'row',
            width: wp('90%'),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.textChoose}>{value}</Text>
        </View>
        <Gap height={hp('4%')} />
        <TouchableOpacity onPress={() => didToggle()}>
          <Text style={styles.button3}>Oke</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default AlertNotif;

const styles = StyleSheet.create({
  button3: {
    color: colors.blue,
    textAlign: 'center',
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
  textTitle: {
    color: colors.mimosa,
    fontSize: wp('5%'),
    bottom: hp('1.5%'),
    fontWeight: 'bold',
  },
  textChoose: {
    color: colors.black,
    fontSize: wp('4%'),
    flexWrap: 'wrap',
    textAlign: 'center',
    marginHorizontal: 10,
  },
});
