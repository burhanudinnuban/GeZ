import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {GiftedChat, Send} from 'react-native-gifted-chat';
import database from '@react-native-firebase/database';
import {useSelector, useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../../constants/colors';
import {styles} from '../../configs/styles';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const RoomChat = ({route}) => {
  const {thread} = route.params;
  const global = useSelector((state) => state.global);
  const user = global.dataUser.user;
  const [messages, setMessages] = useState([]);

  function handleSend(newMessage = []) {
    const text = newMessage[0].text;
    setMessages(GiftedChat.append(messages, newMessage));
    firestore()
      .collection('MESSAGE_THREADS')
      .doc(thread._id)
      .collection('MESSAGES')
      .add({
        text,
        // createdAt: new Date().getTime(),
        createdAt: '1615044597',
        user: {
          _id: user.uid,
          displayName: user.displayName,
        },
      })
      .then(async () => {
        await firestore()
          .collection('MESSAGE_THREADS')
          .doc(thread._id)
          .set(
            {
              latestMessage: {
                text,
                createdAt: new Date().getTime(),
              },
            },
            {merge: true},
          );
      });
  }

  useEffect(() => {
    const unsubscribeListener = firestore()
      .collection('MESSAGE_THREADS')
      .doc(thread._id)
      .collection('MESSAGES')
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        console.log(querySnapshot);
        const messages = querySnapshot.docs.map((doc) => {
          const firebaseData = doc.data();

          const data = {
            _id: doc.id,
            text: '',
            createdAt: new Date().getTime(),
            ...firebaseData,
          };

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.displayName,
            };
          }

          return data;
        });

        setMessages(messages);
      });

    return () => unsubscribeListener();
  }, [thread._id]);

  return (
    <GiftedChat
      messages={messages}
      alwaysShowSend
      renderSend={(props) => (
        <Send {...props}>
          <View
            style={{
              borderRadius: 100,
              backgroundColor: colors.mimosa,
              padding: 8,
              marginRight: 5,
              alignSelf: 'center',
            }}>
            <Icon
              name={'paper-plane'}
              color={colors.darkGray}
              size={widthPercentageToDP(7)}
              brand
            />
          </View>
        </Send>
      )}
      onSend={(newMessage) => {
        handleSend(newMessage);
        console.log(newMessage);
      }}
      user={{
        _id: user.uid,
      }}
    />
  );
};

export default RoomChat;
