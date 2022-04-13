import React from "react"
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native"
import Feather from "react-native-vector-icons/Feather"
import { useNavigation } from "@react-navigation/native"
import { COLORS } from "../constants"

const { width } = Dimensions.get("window")
const Header = () => {
  const navigation = useNavigation()
  return (
    // <SafeAreaView style={styles.header}>
    <TouchableOpacity onPress={() => navigation.openDrawer()}>
      <View style={styles.header}>
        <View
          style={{
            // height: "100%",
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: 10,
            paddingRight: 10,
            // marginLeft: 10,
          }}
        >
          <Feather name='sidebar' size={20} color={COLORS.gray40} />
        </View>

        <View
          style={{
            flex: 1,
            display: "flex",
            width: "100%",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            // paddingLeft: 40,

            // backgroundColor: "red",
          }}
        >
          <Image
            source={require("../assets/logo.png")}
            resizeMode='contain'
            style={{
              height: 50,
              alignSelf: "flex-end",
              marginRight: 50 - width / 3,
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
    // </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    // alignContent: "center",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 5,
    // paddingTop: 20,
    // marginTop: 80,
  },
})

export default Header
