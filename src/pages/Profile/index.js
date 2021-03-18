import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {TopBar} from '../../components';
import {styles} from '../../configs/styles';
import {useSelector, useDispatch} from 'react-redux';
import {reducer} from '../../constants/values';
import auth from '@react-native-firebase/auth';
import {Spinner} from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({navigation}) => {
  const dispatch = useDispatch();
  const global = useSelector((state) => state.global);
  const disable = global.disable;

  function didLogout() {
    dispatch({type: reducer.LOADING, value: true});
    auth()
      .signOut()
      .then(() => {
        navigation.replace('Login');
        AsyncStorage.clear();
        dispatch({type: reducer.ISLOGIN, value: false});
        dispatch({type: reducer.LOADING, value: false});
      })
      .catch((e) => {
        dispatch({type: reducer.LOADING, value: false});
        alert('signal is problem');
      });
  }

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <View style={styles.container}>
      <Spinner />
      <TopBar
        component1={<TouchableOpacity></TouchableOpacity>}
        component2={
          <TouchableOpacity>
            <Text style={styles.textBoldWhite}>Profile</Text>
          </TouchableOpacity>
        }
        component3={
          <TouchableOpacity disabled={disable} onPress={() => didLogout()}>
            <Text style={styles.textBoldRed}>Logout</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
};

export default Profile;
