import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import color from '../../constants/colors';
import {
  Home,
  Message,
  Profile,
  Splash,
  Login,
  Register,
  OnBoarding,
  ChatRoom,
} from '../../pages';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Routing = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OnBoarding"
        component={OnBoarding}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={({route}) => ({
          title: route.params.thread.name,
        })}
      />
    </Stack.Navigator>
  );
};

const MainApp = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: color.darkGray,
        activeBackgroundColor: color.primary,
        inactiveBackgroundColor: color.primary,
        labelStyle: {
          fontSize: 12,
          padding: 0,
          bottom: 5,
        },
        inactiveTintColor: color.secondary,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => (
            <Icon
              name={'home'}
              size={24}
              color={focused ? color.darkGray : color.secondary}
              brand
            />
          ),
        }}
      />
      <Tab.Screen
        name="Message"
        component={Message}
        options={{
          tabBarLabel: 'Message',
          tabBarIcon: ({focused}) => (
            <Icon
              name={'comments'}
              color={focused ? color.darkGray : color.secondary}
              size={24}
              brand
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({focused}) => (
            <Icon
              name={'user'}
              color={focused ? color.darkGray : color.secondary}
              size={24}
              brand
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Routing;
