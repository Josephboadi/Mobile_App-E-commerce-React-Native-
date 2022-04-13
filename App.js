import "react-native-gesture-handler"
import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import Toast from "react-native-toast-message"
import { LogBox } from "react-native"

// Redux
import { Provider } from "react-redux"
import store from "./Redux/store"

// Context Api
import Auth from "./Context/store/Auth"

// Navigator
import AppStack from "./navigation/AppStack"

// Screens
import Header from "./components/Header"

LogBox.ignoreAllLogs(true)

export default function App() {
  return (
    <Auth>
      <Provider store={store}>
        <NavigationContainer>
          <AppStack />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </NavigationContainer>
      </Provider>
    </Auth>
  )
}
