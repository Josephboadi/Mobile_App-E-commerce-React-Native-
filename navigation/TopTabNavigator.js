import React from "react"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"

// Screens
import Checkout from "../Screens/Cart/Checkout/Checkout"
import Payment from "../Screens/Cart/Checkout/Payment"
import Confirm from "../Screens/Cart/Checkout/Confirm"

const Tab = createMaterialTopTabNavigator()

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Shipping'
        component={Checkout}
        // options={{
        //   tabBarIcon: ({ color }) => (
        //     <FontAwesome name='cog' color={color} size={30} />
        //   ),
        // }}
      />
      <Tab.Screen
        name='Payment'
        component={Payment}
        // options={{
        //   tabBarIcon: ({ color }) => (
        //     <FontAwesome name='user' color={color} size={30} />
        //   ),
        // }}
      />
      <Tab.Screen
        name='Confirm'
        component={Confirm}
        // options={{
        //   tabBarIcon: ({ color }) => (
        //     <FontAwesome name='user' color={color} size={30} />
        //   ),
        // }}
      />
    </Tab.Navigator>
  )
}

const TopTabNavigator = () => {
  return <MyTabs />
}

export default TopTabNavigator
