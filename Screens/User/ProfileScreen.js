import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  View,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import baseUrl from "../../assets/common/baseUrl";

import AuthGlobal from "../../Context/store/AuthGlobal";
import { logoutUser } from "../../Context/actions/Auth.actions";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

// import Share from "react-native-share"

// import files from "../../assets/filesBase64"
let { width } = Dimensions.get("window");

const ProfileScreen = () => {
  const context = useContext(AuthGlobal);
  const navigation = useNavigation();
  const [userProfile, setUserProfile] = useState();
  const [token, setToken] = useState();
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log(context.stateUser.isAuthenticated);
    if (
      context.stateUser.isAuthenticated === false ||
      context.stateUser.isAuthenticated === null ||
      context.stateUser.isAuthenticated === undefined
    ) {
      navigation.navigate("Login");
    }

    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
        axios
          .get(`${baseUrl}user/me`, {
            headers: { Authorization: `Bearer ${res}` },
          })
          .then((user) => {
            setUserProfile(user.data.user);
            setLoading(false);
          });

        axios
          .get(`${baseUrl}orders/me`, {
            headers: { Authorization: `Bearer ${res}` },
          })
          .then((res) => {
            setOrderList(res?.data?.orders);
          });
      })
      .catch((error) => console.log(error));

    // console.log(userProfile)

    return () => {
      setUserProfile();
      setOrderList([]);
    };
  }, [context.stateUser.isAuthenticated, context.stateUser.userProfile]);

  const myCustomShare = async () => {
    // const shareOptions = {
    //   message:
    //     "Order your next meal from FoodFinder App. I've already ordered more than 10 meals on it.",
    //   url: files.appLogo,
    //   // urls: [files.image1, files.image2]
    // }
    // try {
    //   const ShareResponse = await Share.open(shareOptions)
    //   console.log(JSON.stringify(ShareResponse))
    // } catch (error) {
    //   console.log("Error => ", error)
    // }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <Header /> */}
      {
        !loading && userProfile ? (
          <>
            <ScrollView>
              <View style={styles.userInfoSection}>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 15,
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Avatar.Image
                    source={{
                      uri: `${userProfile?.avatar?.url}`,
                    }}
                    size={80}
                  />
                  <View
                    style={{
                      // backgroundColor: "red",
                      paddingHorizontal: 10,
                      flex: 1,
                    }}
                  >
                    <Title
                      style={[
                        styles.title,
                        {
                          // alignSelf: "center",
                          marginTop: 15,
                          marginBottom: 5,
                        },
                      ]}
                    >
                      {userProfile?.name}
                    </Title>

                    {/* <Caption style={styles.caption}>@j_doe</Caption> */}
                  </View>
                </View>
              </View>

              <View style={styles.userInfoSection}>
                {/* <View style={styles.row}>
          <Icon name='map-marker-radius' color='#777777' size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            Kolkata, India
          </Text>
        </View> */}
                <View style={styles.row}>
                  <Icon name='phone' color='#777777' size={20} />
                  <Text style={{ color: "#777777", marginLeft: 20 }}>
                    {userProfile?.phoneNumber}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Icon name='email' color='#777777' size={20} />
                  <Text style={{ color: "#777777", marginLeft: 20 }}>
                    {userProfile?.email}
                  </Text>
                </View>
              </View>

              <View style={styles.infoBoxWrapper}>
                <View
                  style={[
                    styles.infoBox,
                    {
                      borderRightColor: "#dddddd",
                      borderRightWidth: 1,
                    },
                  ]}
                >
                  <Title>$100.00</Title>
                  <Caption>Wallet</Caption>
                </View>
                <TouchableOpacity
                  style={styles.infoBox}
                  onPress={() => {
                    navigation.navigate("MyOrders", { token: token });
                  }}
                >
                  {/* <View> */}
                  <Title>{orderList?.length}</Title>
                  {orderList?.length > 1 ? (
                    <Caption>Orders</Caption>
                  ) : (
                    <Caption>Order</Caption>
                  )}

                  {/* </View> */}
                </TouchableOpacity>
              </View>

              <View style={styles.menuWrapper}>
                <TouchableRipple onPress={() => {}}>
                  <View style={styles.menuItem}>
                    <Icon name='heart-outline' color='#A7790C' size={25} />
                    <Text style={styles.menuItemText}>Your Favorites</Text>
                  </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => {}}>
                  <View style={styles.menuItem}>
                    <Icon name='credit-card' color='#A7790C' size={25} />
                    <Text style={styles.menuItemText}>Payment</Text>
                  </View>
                </TouchableRipple>
                <TouchableRipple onPress={myCustomShare}>
                  <View style={styles.menuItem}>
                    <Icon name='share-outline' color='#A7790C' size={25} />
                    <Text style={styles.menuItemText}>Tell Your Friends</Text>
                  </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => {}}>
                  <View style={styles.menuItem}>
                    <Icon
                      name='account-check-outline'
                      color='#A7790C'
                      size={25}
                    />
                    <Text style={styles.menuItemText}>Support</Text>
                  </View>
                </TouchableRipple>
                <TouchableRipple
                  onPress={() => [
                    AsyncStorage.removeItem("jwt"),
                    logoutUser(context.dispatch),
                  ]}
                >
                  <View style={styles.menuItem}>
                    <Ionicons name='exit-outline' color='#A7790C' size={25} />
                    <Text style={[styles.menuItemText, { color: "red" }]}>
                      Sign Out
                    </Text>
                  </View>
                </TouchableRipple>
              </View>
            </ScrollView>
          </>
        ) : (
          <View
            style={[styles.center, { backgroundColor: "#f2f2f2", flex: 1 }]}
          >
            <ActivityIndicator size={"large"} color='red' />
          </View>
        )
        // : (
        //   <View
        //     style={{
        //       flex: 1,
        //       justifyContent: "center",
        //       alignItems: "center",
        //       height: Dimensions.get("window").height,
        //       paddingTop: 90,
        //     }}
        //   >
        //     {/* <View>
        //       <Text style={{ alignSelf: "center", color: "black" }}>
        //         Sign In to access this page
        //       </Text>
        //     </View> */}

        //     <View style={{ width: "80%" }}>
        //       <FormButton
        //         buttonTitle={"Sign In"}
        //         // disabled={loading}
        //         // loader={loading}
        //         onPress={() => navigation.navigate("Login")}
        //       />
        //     </View>
        //   </View>
        // )
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});
export default ProfileScreen;
