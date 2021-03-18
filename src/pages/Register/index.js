import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {styles} from '../../configs/styles';
import {Gap, InputText, TextInputNumber} from '../../components';
import auth from '@react-native-firebase/auth';
import {reducer} from '../../constants/values';
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../../constants/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Spinner, PickerImageAlert} from '../../utils';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const Register = ({navigation}) => {
  const dispatch = useDispatch();
  const global = useSelector((state) => state.global);
  const [toggle, settoggle] = useState(false);
  const [photoType, setphotoType] = useState('');
  const [loading, setloading] = useState(false);
  const [disable, setdisable] = useState(false);
  const [email, setemail] = useState('');
  const [nama, setnama] = useState('');
  const [uri, seturi] = useState('');
  const [photoUser, setphotoUser] = useState('');
  const [hide, sethide] = useState(true);

  function didLoadFalse() {
    setdisable(false);
    setloading(false);
  }

  function didLoadTrue() {
    setdisable(true);
    setloading(true);
  }

  function didShowHide() {
    sethide(!hide);
  }

  function didToggle() {
    settoggle(!toggle);
    setphotoType('user');
  }

  function uploadImageToStorage(path, name) {
    let reference = storage().ref(`user/${name}`);
    let task = reference.putFile(path);
    task.then(() => {
      reference
        .getDownloadURL()
        .then((result) => {
          setphotoUser(result);
          firestore()
            .collection('user')
            .doc(global.dataUser.email)
            .onSnapshot((result) => {
              setloading(false);
              firestore()
                .collection('user')
                .doc(result.user.email)
                .set({...result, photo: result})
                .then(() => {
                  setloading(false);
                  didLoadFalse();
                  dispatch({type: reducer.DATAUSER, value: result});
                  dispatch({type: reducer.ISLOGIN, value: true});
                  navigation.replace('Register');
                });
            });
        })
        .catch((e) => {
          didLoadFalse();
        });
    });
  }

  function validate() {
    if (email == '') {
    }
  }

  function didRegister() {
    didLoadTrue();
  }

  function didLogin() {
    navigation.replace('Login');
  }

  return (
    <View style={styles.container}>
      <Spinner loading={loading} />
      <PickerImageAlert
        toggle={toggle}
        photoType={photoType}
        cancelPress={() => didToggle()}
        getUrlDownload={() => uploadImageToStorage()}
      />
      <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
        <View style={styles.containerNoneCenter}>
          <View
            style={styles.buttonSolidCustom(
              colors.primary,
              wp('100%'),
              hp('5%'),
            )}>
            <Text style={styles.textBlack}>Update Profile</Text>
          </View>

          <Gap height={hp('2%')} />
          <TouchableOpacity onPress={() => didToggle()}>
            {photoUser != '' ? (
              <Image
                source={{uri: `${photoUser}`}}
                style={{height: wp('30%'), width: wp('30%'), borderRadius: 100}}
              />
            ) : (
              <Icon
                name={'user-circle'}
                size={wp('30%')}
                color={colors.darkGray}
                solid
              />
            )}

            <View style={styles.containerAddPhotoIcon}>
              <Icon
                name={'plus-circle'}
                size={wp('7%')}
                color={colors.white}
                solid
              />
            </View>
          </TouchableOpacity>
          <Gap height={hp('2%')} />
          <InputText
            label={'Email'}
            value={email}
            onChangeText={(text) => setemail(text)}
            iconLeft={
              <Icon
                name={'envelope'}
                size={wp('5%')}
                color={colors.darkGray}
                solid
              />
            }
            placeholder={'masukkan alamat Email anda'}
          />
          <Gap height={hp('1%')} />
          <InputText
            label={'Nama lengkap'}
            value={nama}
            onChangeText={(text) => setnama(text)}
            iconLeft={
              <Icon
                name={'envelope'}
                size={wp('5%')}
                color={colors.darkGray}
                solid
              />
            }
            placeholder={'masukkan Nama Lengkap anda'}
          />
          <Gap height={hp('1%')} />
          <InputText
            label={'No Handphone'}
            value={email}
            onChangeText={(text) => setnama(text)}
            iconLeft={
              <Icon
                name={'envelope'}
                size={wp('5%')}
                color={colors.darkGray}
                solid
              />
            }
            placeholder={'masukkan Nomor Handphone anda'}
          />
          <Gap height={hp('2%')} />
          <TouchableOpacity
            disabled={disable}
            onPress={() => didRegister()}
            style={styles.buttonSolid}>
            <Text style={styles.textBoldWhite}>Simpan</Text>
          </TouchableOpacity>
          <Gap height={hp('1%')} />
          <TouchableOpacity
            disabled={disable}
            onPress={() => didRegister()}
            style={styles.buttonSolidSecondary}>
            <Text style={styles.textBoldWhite}>Lewati</Text>
          </TouchableOpacity>
          <Gap height={hp('1%')} />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Register;
