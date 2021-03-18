import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {Box, Gap, TopBar} from '../../components';
import {styles} from '../../configs/styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../../constants/colors';
import database from '@react-native-firebase/database';
import {useSelector, useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {GiftedChat} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Message = ({navigation}) => {
  const global = useSelector((state) => state.global);
  const user = global.dataUser.user;
  const [roomChat, setroomChat] = useState('');
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDataRoomChat = firestore()
      .collection('MESSAGE_THREADS')
      .orderBy('latestMessage.createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const threadss = querySnapshot.docs.map((documentSnapshot) => {
          return {
            _id: documentSnapshot.id,
            name: '',
            latestMessage: {text: ''},
            ...documentSnapshot.data(),
          };
        });
        setThreads(threadss);
        if (loading) {
          setLoading(false);
        }
      });

    return () => {
      getDataRoomChat();
    };
  });

  useFocusEffect(
    React.useCallback(() => {
      return () => {};
    }, []),
  );

  return (
    <View style={styles.container}>
      <TopBar
        component2={
          <TouchableOpacity>
            <Text style={styles.textBoldWhite}>Message</Text>
          </TouchableOpacity>
        }
      />
      <Box height={1} borderColor={colors.black} width={wp('100%')} />
      <FlatList
        data={threads}
        keyExtractor={(item) => item._id}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ChatRoom', {thread: item})}
            style={styles.listRoomChat}>
            <View
              style={{
                height: hp('7%'),
                width: hp('7%'),
                backgroundColor: colors.secondary,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
              }}>
              <Icon
                name={'user'}
                size={wp('6.5%')}
                color={colors.darkGray}
                solid
              />
            </View>
            <Gap width={10} />
            <View>
              <Text style={styles.textBoldWhite}>{item.name}</Text>
              <Text style={styles.textWhite}>
                {item.latestMessage.text.slice(0, 90)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Message;
