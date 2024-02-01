import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import AppNavigation from './src/app/AppNavigation'
import { AppProvider } from './src/app/main/AppContext'
function App(): React.JSX.Element {
  return (
    <AppProvider>
      <SafeAreaView style={styles.container}>
        <AppNavigation />
      </SafeAreaView>
    </AppProvider>
  )
}
export default App
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})