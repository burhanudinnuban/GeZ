import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {TopBar} from '../../components';
import {styles} from '../../configs/styles';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome5';
import color from '../../constants/colors';
import {useSelector, useDispatch} from 'react-redux';
import {reducer} from '../../constants/values';
import {Spinner, AlertAsk} from '../../utils';

const Home = () => {
  const dispatch = useDispatch();
  const global = useSelector((state) => state.global);
  const [toggleAsk, settoggleAsk] = useState(false);
  const user = global.dataUser;

  function didTest() {
    console.log(toggleAsk);
    settoggleAsk(!toggleAsk);
  }

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <View style={styles.container}>
      <AlertAsk
        value={
          'jaringan anda sangat lemot sadadasdadasdasdasdsadaasdasdasdadasdaasdasdadasdsadasdasdasdsdsadasdadasasdasdasdasdasda'
        }
        actionNo={() => didTest()}
        actionYes={() => didTest()}
        toggle={toggleAsk}
      />
      <Spinner />
      <TopBar
        component2={
          <TouchableOpacity onPress={() => didTest()}>
            <Text style={styles.textBoldWhite}>Home</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
};

export default Home;
