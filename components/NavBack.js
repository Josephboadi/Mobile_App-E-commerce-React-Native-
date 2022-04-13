import React from "react"
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import { useNavigation } from "@react-navigation/native"
import { COLORS } from "../constants"

const { width } = Dimensions.get("window")
const NavBack = () => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <View style={styles.header}>
        <View
          style={{
            // height: "100%",
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: 20,
            paddingRight: 10,
            paddingTop: 5,
          }}
        >
          <Ionicons name='arrow-back' size={30} color={COLORS.gray40} />
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

export default NavBack
