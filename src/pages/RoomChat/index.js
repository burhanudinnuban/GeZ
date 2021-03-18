import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import database from '@react-native-firebase/database';
import {useSelector, useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

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
      onSend={(newMessage) => handleSend(newMessage)}
      user={{
        _id: user.uid,
      }}
    />
  );
};

export default RoomChat;
