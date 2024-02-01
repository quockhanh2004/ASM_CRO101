import { StyleSheet, Text, View ,Image} from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
//screens tab
import Home from './tabs/Home'
import Cart from './tabs/Cart'
import Favorite from './tabs/Favorite'
import History from './tabs/History'
// screens stack
import Detail from './stacks/Detail'
import Payment from './stacks/Payment'
import Personal from './stacks/Personal'
import Setting from './stacks/Setting'

const tabScreenOptions = ({ route }) => {
  return {

      headerShown: false,
      tabBarStyle: {
          backgroundColor: '#0C0F14',
          height: 60,
          position: 'absolute',
          borderTopWidth: 0,
          elevation:0,
          borderTopColor: 'tranparent',
          tabBarActiveTintColor: '#FF6C22'
      },

      tabBarIcon: ({ focused }) => {
          if (route.name == 'Home') {
              if (focused) {
                  return <Image source={require('../../../assets/images/ic_home.png')} />
              }
              return <Image source={require('../../../assets/images/ic_home_default.png')} />
          } else if (route.name == 'Cart') {
              if (focused) {
                  return <Image source={require('../../../assets/images/ic_cart.png')} />
              }
              return <Image source={require('../../../assets/images/ic_cart_default.png')} />
          }
          else if (route.name == 'Favorite') {
              if (focused) {
                  return <Image source={require('../../../assets/images/ic_favorite.png')} />
              }
              return <Image source={require('../../../assets/images/ic_favorite_default.png')} />
          } else if (route.name == 'History') {
              if (focused) {
                  return <Image source={require('../../../assets/images/ic_notification.png')} />
              }
              return <Image source={require('../../../assets/images/ic_notification_default.png')} />
          }
      },
      tabBarLabel: ({ focused }) => {
          if (route.name == 'Home') {
              if (focused) {
                  return <Text style={{ color: '#D17842' }}>Home</Text>
              }
          } else if (route.name == 'Cart') {
              if (focused) {
                  return <Text style={{ color: '#D17842' }}>Cart</Text>
              }
          }
          else if (route.name == 'Favorite') {
              if (focused) {
                  return <Text style={{ color: '#D17842' }}>Favorite</Text>
              }
          }
          else if (route.name == 'History') {
              if (focused) {
                  return <Text style={{ color: '#D17842' }}>History</Text>
              }
          }
      }
  }
}

const Tab = createBottomTabNavigator()
const MainTabsNavigation = () => {
  return (
    <Tab.Navigator 
    screenOptions={ 
      tabScreenOptions}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Favorite" component={Favorite} />
      <Tab.Screen name="History" component={History} />
    </Tab.Navigator>
  )
}

const Stack = createNativeStackNavigator();
const MainStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={MainTabsNavigation} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="Personal" component={Personal} />
      <Stack.Screen name="Setting" component={Setting} />
    </Stack.Navigator>
  )
}

export default MainStackNavigation

const styles = StyleSheet.create({
  tabBarStyle:{
    height: 60,
    position: 'absolute',
    borderTopWidth: 0,
    elevation:0,
    borderTopColor: 'tranparent',
    backgroundColor: 'rgba(12,15,20,0.5)'
  }
})