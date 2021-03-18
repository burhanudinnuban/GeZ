import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {styles} from '../../configs/styles';

const Splash = ({navigation}) => {
  const dispatch = useDispatch();
  const global = useSelector((state) => state.global);
  const isLogIn = global.isLogIn;
  const isFirstLaunch = global.isFirstLaunch;

  useEffect(() => {
    setTimeout(() => {
      if (isFirstLaunch == false) {
        navigation.replace('OnBoarding');
      } else {
        if (isLogIn == false) {
          navigation.replace('Login');
        } else {
          navigation.replace('MainApp');
        }
      }
    }, 2500);
    return () => {};
  }, [isFirstLaunch, isLogIn, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.containerNoneCenter}>
        <Image source={require(`../../assets/images/launcher.png`)} />
      </View>
    </View>
  );
};

export default Splash;
