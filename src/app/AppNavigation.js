import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthenStackNavigation from './authen/AuthenStackNavigation'
import MainStackNavigation from './main/MainStackNavigation'
import { AppContext } from './main/AppContext'
const AppNavigation = () => {
  const { isLogin } = useContext(AppContext)
  return (
    <NavigationContainer>
      {/* {
        isLogin ? <MainStackNavigation /> :
          <AuthenStackNavigation />
      } */}
      <MainStackNavigation/>
    </NavigationContainer>
  )
}

export default AppNavigation

const styles = StyleSheet.create({})