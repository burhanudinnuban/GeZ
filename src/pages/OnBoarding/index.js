import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {reducer} from '../../constants/values';
import {styles} from '../../configs/styles';
import {Gap, Box} from '../../components';
import colors from '../../constants/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const {width, height} = Dimensions.get('window');

const OnBoarding = ({navigation}) => {
  const global = useSelector((state) => state.global);
  const disable = global.disable;
  const loading = global.loading;
  const [sliderState, setSliderState] = useState({currentPage: 0});
  const indexPage = sliderState.currentPage;
  const setSliderPage = (event) => {
    const {currentPage} = sliderState;
    const {x} = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.floor(x / ((width * 80) / 100));
    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
    }
    if (sliderState.currentPage == 3) {
      didLewati();
    }
  };

  const dispatch = useDispatch();

  async function didLewati() {
    dispatch({type: reducer.ISFIRSTLAUNCH, value: true});
    navigation.replace('Login');
  }

  useEffect(() => {}, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{flex: 1}}
        horizontal={true}
        scrollEventThrottle={16}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => {
          setSliderPage(event);
        }}>
        <View style={styles.containerNoneCenter}>
          <Text>OnBoarding 1</Text>
        </View>
        <View style={styles.containerNoneCenter}>
          <Text>OnBoarding 2</Text>
        </View>
        <View style={styles.containerNoneCenter}>
          <Text>OnBoarding 3</Text>
        </View>
        <View style={styles.containerNoneCenter}></View>
      </ScrollView>
      <View style={styles.containerNoneRowBottom}>
        <Box
          height={hp('1.2%')}
          color={indexPage == 0 ? colors.blueLight : colors.primary}
          width={wp('20%')}
          borderRadius={5}
          borderWidth={1}
          borderColor={colors.secondary}
        />
        <Gap width={5} />
        <Box
          height={hp('1.2%')}
          color={indexPage == 1 ? colors.blueLight : colors.primary}
          width={wp('20%')}
          borderRadius={5}
          borderWidth={1}
          borderColor={colors.secondary}
        />
        <Gap width={5} />
        <Box
          height={hp('1.2%')}
          color={indexPage == 2 ? colors.blueLight : colors.primary}
          width={wp('20%')}
          borderRadius={5}
          borderWidth={1}
          borderColor={colors.secondary}
        />
        <Gap width={5} />
        <TouchableOpacity
          style={styles.buttonOutlineSmall}
          onPress={() => didLewati()}>
          <Text style={styles.textSecondaryBold}>Lewati</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OnBoarding;
