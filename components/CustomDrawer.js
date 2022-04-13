import React, { useContext } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";

import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AuthGlobal from "../Context/store/AuthGlobal";

const CustomDrawer = (props) => {
  const context = useContext(AuthGlobal);
  const [active, setActiveLabel] = "";
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#8200d6" }}
      >
        <ImageBackground
          source={require("../assets/images/menu-bg.jpeg")}
          style={{ padding: 20 }}
        >
          {context?.stateUser?.isAuthenticated ? (
            <>
              <Image
                source={{ uri: context?.stateUser?.userProfile?.avatar?.url }}
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 40,
                  marginBottom: 10,
                }}
              />
              <Text
                style={{
                  color: "#fff",
                  fontSize: 18,
                  // fontFamily: 'Roboto-Medium',
                  marginBottom: 5,
                }}
              >
                {context?.stateUser?.userProfile?.name}
              </Text>
            </>
          ) : (
            <>
              <Image
                source={{
                  uri: "https://res.cloudinary.com/dblprzex8/image/upload/v1604333253/profile1_dbycgc.png",
                }}
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 40,
                  marginBottom: 10,
                }}
              />
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  width: 80,
                  borderColor: "white",
                  borderRadius: 20,
                }}
                onPress={() =>
                  navigation.navigate("Profile2", { screen: "Login" })
                }
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 18,
                    // fontFamily: 'Roboto-Medium',
                    marginBottom: 5,
                    marginLeft: 10,
                  }}
                >
                  Sign In
                </Text>
              </TouchableOpacity>
            </>
          )}

          {/* <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: "#fff",
                // fontFamily: 'Roboto-Regular',
                marginRight: 5,
              }}
            >
              280 Coins
            </Text>
            <FontAwesome5 name='coins' size={14} color='#fff' />
          </View> */}
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
          {/* <DrawerItemList {...props} /> */}
          <View style={styles.drawerSection}>
            <DrawerItem
              // focused
              // activeTintColor='white'
              // activeBackgroundColor='#aa18ea'
              icon={({ color, size }) => (
                <Ionicons name='home-outline' size={22} color={color} />
              )}
              label='Home'
              onPress={() => {
                navigation.navigate("Home");
              }}
            />
            <DrawerItem
              // activeBackgroundColor='#aa18ea'
              icon={({ color, size }) => (
                <Ionicons name='person-outline' size={22} color={color} />
              )}
              label='Profile'
              onPress={() => {
                if (
                  context?.stateUser?.isAuthenticated === false ||
                  context?.stateUser?.isAuthenticated === null ||
                  context.stateUser.isAuthenticated === undefined
                ) {
                  navigation.navigate("Profile2", { screen: "Login" });
                } else {
                  navigation.navigate("Profile2", { screen: "Profile" });
                }
              }}
            />
            <DrawerItem
              // activeBackgroundColor='#aa18ea'
              icon={({ color, size }) => (
                <Ionicons name='cart-outline' color={color} size={24} />
              )}
              label='Cart'
              onPress={() => {
                navigation.navigate("Cart2", { screen: "Cart" });
              }}
            />
            {context?.stateUser?.userProfile?.role === "admin" ? (
              <DrawerItem
                // activeBackgroundColor='#aa18ea'
                icon={({ color, size }) => (
                  <Ionicons name='settings-outline' size={22} color={color} />
                )}
                label='Settings'
                onPress={() => {
                  navigation.navigate("Settings", { screen: "Products" });
                }}
              />
            ) : null}
          </View>
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name='share-social-outline' size={22} />
            <Text
              style={{
                fontSize: 15,
                // fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}
            >
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name='exit-outline' size={22} />
            <Text
              style={{
                fontSize: 15,
                // fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}
            >
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default CustomDrawer;
