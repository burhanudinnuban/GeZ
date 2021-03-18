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
import {photo, reducer} from '../../../constants/values';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {PermissionsAndroid} from 'react-native';
import ImageResizer from 'react-native-image-resizer';

const PickerImageAlert = ({toggle, photoType, cancelPress, getUrlDownload}) => {
  const dispatch = useDispatch();
  const global = useSelector((state) => state.global);

  async function didImagePickerCamera() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      } else {
      }
    } catch (err) {}
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, (response) => {
      cancelPress();
      if (response.didCancel) {
      } else if (response.error) {
        alert(`${response.error}`);
      } else if (response.customButton) {
        alert(response.customButton);
      } else {
        didResizer(response.uri, 90);
      }
    });
    return true;
  }

  function didImagePickerLibrary() {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, (response) => {
      cancelPress();
      if (response.didCancel) {
      } else if (response.error) {
        alert(`${response.error}`);
      } else if (response.customButton) {
        alert(response.customButton);
      } else {
        didResizer(response.uri, 0);
      }
    });
  }

  async function didResizer(uri, rotation) {
    ImageResizer.createResizedImage(uri, 1000, 1000, 'PNG', 50, rotation).then(
      (response) => {
        // response.uri is the URI of the new image that can now be displayed, uploaded...
        //resized image uri
        let uri = response.uri;
        //to resolve file path issue on different platforms
        let uploadUri =
          Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

        getUrlDownload();

        if (photoType == 'user') {
          dispatch({type: photo.user, value: uploadUri});
        }
      },
    );
  }

  return (
    <Modal isVisible={toggle}>
      <View
        style={{
          height: hp('27%'),
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.secondary,
          borderRadius: 10,
        }}>
        <Text style={styles.textTitle}>Pick Choose</Text>
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
          <TouchableOpacity
            onPress={() => didImagePickerCamera()}
            style={styles.backgroundButton}>
            <Text style={styles.textChoose}>Camera</Text>
          </TouchableOpacity>
          <Gap width={wp('10%')} />
          <TouchableOpacity
            onPress={() => didImagePickerLibrary()}
            style={styles.backgroundButton}>
            <Text style={styles.textChoose}>Storage</Text>
          </TouchableOpacity>
        </View>
        <Gap height={hp('4%')} />
        <TouchableOpacity onPress={cancelPress}>
          <Text style={styles.button3}>Batal</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default PickerImageAlert;

const styles = StyleSheet.create({
  button3: {
    color: colors.redDark,
    textAlign: 'center',
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
  textTitle: {
    color: colors.darkGray,
    fontSize: wp('5%'),
    bottom: hp('1.5%'),
    fontWeight: 'bold',
  },
  textChoose: {
    color: colors.blue,
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
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
});
