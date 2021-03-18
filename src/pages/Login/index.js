import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {styles} from '../../configs/styles';
import {Gap, InputText} from '../../components';
import auth from '@react-native-firebase/auth';
import {reducer} from '../../constants/values';
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../../constants/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Spinner, AlertAsk} from '../../utils';
import firestore from '@react-native-firebase/firestore';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [hide, sethide] = useState(true);
  const [toggle, settoggle] = useState(false);
  const [loading, setloading] = useState(false);
  const [disable, setdisable] = useState(false);

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

  function didLogin() {
    didLoadTrue();
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        didLoadFalse();
        dispatch({type: reducer.DATAUSER, value: result});
        dispatch({type: reducer.ISLOGIN, value: true});
        navigation.replace('MainApp');
      })
      .catch((e) => {
        const error = e.code;
        if (error == 'auth/user-not-found') {
          settoggle(true);
        } else {
          alert(error);
        }
        didLoadFalse();
      });
  }

  function register() {
    didLoadTrue();
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firestore()
          .collection('user')
          .doc(result.user.email)
          .set({
            email: result.user.email,
            uid: result.user.uid,
          })
          .then(() => {
            setloading(false);
            didLoadFalse();
            dispatch({type: reducer.DATAUSER, value: result});
            dispatch({type: reducer.ISLOGIN, value: true});
            navigation.replace('Register');
          });
      });
  }

  return (
    <SafeAreaView style={styles.containerPageLogin}>
      <Spinner loading={loading} />
      <AlertAsk
        toggle={toggle}
        value={'Akun anda belum terdaftar! \n Daftarkan akun anda sekarang.'}
        actionYes={() => register()}
        actionNo={() => settoggle(false)}
      />
      <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
        <View style={styles.containerNoneCenter}>
          <Gap height={hp('5%')} />
          <Image source={require(`../../assets/images/launcher_logo.png`)} />
          <Text style={styles.textBoldWhiteLarge}>LOGIN</Text>
          <Gap height={hp('1%')} />
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
            placeholder={'masukkan alamat email anda'}
          />
          <Gap height={hp('1%')} />
          <InputText
            label={'Password'}
            value={password}
            secureTextEntry={hide}
            onChangeText={(text) => setpassword(text)}
            iconLeft={
              <Icon
                name={'lock'}
                size={wp('5%')}
                color={colors.darkGray}
                solid
              />
            }
            placeholder={'masukkan password anda'}
            iconRight={
              <TouchableOpacity onPress={() => didShowHide()}>
                {hide ? (
                  <Icon name={'eye'} size={wp('5%')} color={colors.white} />
                ) : (
                  <Icon
                    name={'eye-slash'}
                    size={wp('5%')}
                    color={colors.white}
                  />
                )}
              </TouchableOpacity>
            }
          />
          <Gap height={hp('5%')} />
          <TouchableOpacity
            disabled={disable}
            onPress={() => didLogin()}
            style={styles.buttonSolid}>
            <Text style={styles.textBoldWhiteMedium}>Selanjutnya</Text>
          </TouchableOpacity>

          <Gap height={hp('1%')} />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Login;
