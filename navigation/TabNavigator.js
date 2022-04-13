import React, { useContext } from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

import AuthGlobal from "../Context/store/AuthGlobal";

import ProductContainer from "../Screens/Products/ProductContainer";
import SingleProduct from "../Screens/Products/SingleProduct";
import CartScreen from "../Screens/Cart/Cart";
import CheckoutScreen from "../Screens/Cart/Checkout/Checkout";
import SettingsScreen from "../Screens/Admin/Admin";
import ProfileScreen from "../Screens/User/ProfileScreen";
import EditProfileScreen from "../Screens/User/EditProfileScreen";
import SignInScreen from "../Screens/User/SignInScreen";
import SignUpScreen from "../Screens/User/SignUpScreen";
import ResetScreen from "../Screens/User/Reset";

import Orders from "../Screens/Admin/Orders";
import Products from "../Screens/Admin/Products";
import Categories from "../Screens/Admin/Categories";
import ProductForm from "../Screens/Admin/ProductForm";

import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { COLORS, FONTS } from "../constants";
import { connect } from "react-redux";

import TopTabNavigator from "./TopTabNavigator";
import MyOrders from "../Screens/User/MyOrders";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const CartSStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const AdminStack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Home'
        component={ProductContainer}
        options={{
          headerShown: false,
          // headerTitle: "",
        }}
      />
      <Stack.Screen
        name='SingleProduct'
        component={SingleProduct}
        options={({ route }) => ({
          // title: route.params?.title,
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
};

const SettingStack = () => {
  const navigation = useNavigation();

  return (
    <AdminStack.Navigator>
      <AdminStack.Screen
        name='Products'
        component={Products}
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <View
                style={{
                  marginLeft: 10,
                  // backgroundColor: "red",
                  // alignItems: "flex-start",
                  // marginTop: -20,
                  // zIndex: 100,
                }}
              >
                <Feather name='sidebar' size={20} color={COLORS.gray40} />
              </View>
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
          headerTitle: () => (
            <View style={{ flexDirection: "column" }}>
              <Image
                source={require("../assets/logo.png")}
                resizeMode='contain'
                style={{ width: 135, height: 50 }}
              />
              {/* <View></View> */}
              <Text
                style={{ alignSelf: "center", ...FONTS.h2, marginVertical: 4 }}
              >
                Products
              </Text>
            </View>
          ),
        }}
      />
      <AdminStack.Screen
        name='Categories'
        component={Categories}
        options={({ route }) => ({
          // title: route.params?.title,
          // title: "Checkout",
          // headerShown: false,
          headerTitleAlign: "center",
          headerTitle: () => (
            <View style={{ flexDirection: "column" }}>
              <Image
                source={require("../assets/logo.png")}
                resizeMode='contain'
                style={{ width: 135, height: 50 }}
              />
              {/* <View></View> */}
              <Text
                style={{ alignSelf: "center", ...FONTS.h2, marginVertical: 4 }}
              >
                Categories
              </Text>
            </View>
          ),
        })}
      />
      <AdminStack.Screen
        name='Orders'
        component={Orders}
        options={({ route }) => ({
          // title: route.params?.title,
          // title: "Checkout",
          // headerShown: false,
          headerTitleAlign: "center",
          headerTitle: () => (
            <View style={{ flexDirection: "column" }}>
              <Image
                source={require("../assets/logo.png")}
                resizeMode='contain'
                style={{ width: 135, height: 50 }}
              />
              {/* <View></View> */}
              <Text
                style={{ alignSelf: "center", ...FONTS.h2, marginVertical: 4 }}
              >
                Orders
              </Text>
            </View>
          ),
        })}
      />
      <AdminStack.Screen
        name='ProductForm'
        component={ProductForm}
        options={({ route }) => ({
          // title: route.params?.title,
          // title: "Checkout",
          // headerShown: false,
          headerTitleAlign: "center",
          headerTitle: () => (
            <View style={{ flexDirection: "column" }}>
              <Image
                source={require("../assets/logo.png")}
                resizeMode='contain'
                style={{ width: 135, height: 50 }}
              />
              {/* <View></View> */}
              <Text
                style={{ alignSelf: "center", ...FONTS.h2, marginVertical: 4 }}
              >
                Product Form
              </Text>
            </View>
          ),
        })}
      />
    </AdminStack.Navigator>
  );
};

const CartStack = () => {
  return (
    <CartSStack.Navigator>
      <CartSStack.Screen
        name='Cart'
        component={CartScreen}
        options={{
          headerShown: false,
          // headerTitle: "",
        }}
      />
      <CartSStack.Screen
        name='Checkout'
        component={TopTabNavigator}
        options={({ route }) => ({
          // title: route.params?.title,
          // title: "Checkout",
          // headerShown: false,
          headerTitleAlign: "center",
          headerTitle: () => (
            <View style={{ flexDirection: "column" }}>
              <Image
                source={require("../assets/logo.png")}
                resizeMode='contain'
                style={{ width: 135, height: 50 }}
              />
              {/* <View></View> */}
              <Text
                style={{ alignSelf: "center", ...FONTS.h2, marginVertical: 4 }}
              >
                Checkout
              </Text>
            </View>
          ),
        })}
      />
    </CartSStack.Navigator>
  );
};

const UserStack = () => {
  const context = useContext(AuthGlobal);
  const navigation = useNavigation();
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          headerTitleAlign: "center",
          headerTitle: () => (
            <View style={{ flexDirection: "column" }}>
              <Image
                source={require("../assets/logo.png")}
                resizeMode='contain'
                style={{ width: 50, height: 50 }}
              />
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <View style={{ marginLeft: 10 }}>
                <Feather name='sidebar' size={20} color={COLORS.gray40} />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("EditProfile", {
                  item: context?.stateUser?.userProfile,
                })
              }
            >
              <View style={{ marginRight: 10 }}>
                <MaterialCommunityIcons
                  name='account-edit'
                  size={25}
                  backgroundColor={"#ffffff"}
                  color={"#333333"}
                />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <AdminStack.Screen
        name='MyOrders'
        component={MyOrders}
        options={({ route }) => ({
          // title: route.params?.title,
          // title: "Checkout",
          // headerShown: false,
          headerTitleAlign: "center",
          headerTitle: () => (
            <View style={{ flexDirection: "column" }}>
              <Image
                source={require("../assets/logo.png")}
                resizeMode='contain'
                style={{ width: 135, height: 50 }}
              />
              {/* <View></View> */}
              <Text
                style={{ alignSelf: "center", ...FONTS.h2, marginVertical: 4 }}
              >
                My Orders
              </Text>
            </View>
          ),
        })}
      />
      <ProfileStack.Screen
        name='Login'
        component={SignInScreen}
        options={({ route }) => ({
          // title: route.params?.title,
          headerShown: false,
        })}
      />

      <ProfileStack.Screen
        name='Register'
        component={SignUpScreen}
        options={({ route }) => ({
          // title: route.params?.title,
          headerShown: false,
        })}
      />

      <ProfileStack.Screen
        name='Reset'
        component={ResetScreen}
        options={({ route }) => ({
          // title: route.params?.title,
          headerShown: false,
        })}
      />

      <ProfileStack.Screen
        name='EditProfile'
        component={EditProfileScreen}
        options={({ route }) => ({
          // title: route.params?.title,
          // headerShown: false,
          title: "Edit Profile",
        })}
      />
    </ProfileStack.Navigator>
  );
};

const TabNavigator = (props) => {
  const context = useContext(AuthGlobal);

  // console.log(context.stateUser.userProfile)
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          // backgroundColor: "#AD40AF"
        },
        tabBarInactiveTintColor: COLORS.gray30,
        tabBarActiveTintColor: "#A7790C",
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name='Home2'
        component={HomeStack}
        options={({ route }) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
            // backgroundColor: "#AD40AF",
          },
          tabBarIcon: ({ color }) => (
            <FontAwesome name='home' color={color} size={30} />
          ),
        })}
      />

      {props.cartItems.length > 0 ? (
        <Tab.Screen
          name='Cart2'
          component={CartStack}
          options={{
            tabBarBadge: props.cartItems.length,
            tabBarBadgeStyle: { backgroundColor: "yellow" },
            tabBarIcon: ({ color }) => (
              <FontAwesome name='shopping-cart' color={color} size={30} />
            ),
          }}
        />
      ) : (
        <Tab.Screen
          name='Cart2'
          component={CartStack}
          options={{
            // tabBarBadge: 3,
            // tabBarBadgeStyle: { backgroundColor: "yellow" },
            tabBarIcon: ({ color }) => (
              <FontAwesome name='shopping-cart' color={color} size={30} />
            ),
          }}
        />
      )}

      {context?.stateUser?.userProfile?.role === "admin" ? (
        <Tab.Screen
          name='Settings'
          component={SettingStack}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome name='cog' color={color} size={30} />
            ),
          }}
        />
      ) : null}

      <Tab.Screen
        name='Profile2'
        component={UserStack}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name='user' color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const getTabBarVisibility = (route) => {
  // console.log(route);
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";
  // console.log(routeName);

  if (routeName == "GameDetails") {
    return "none";
  }
  return "flex";
};
export default connect(mapStateToProps, null)(TabNavigator);
// export default TabNavigator
