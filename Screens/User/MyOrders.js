import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import { useFocusEffect } from "@react-navigation/native";
import OrderCard from "../../components/OrderCard";

let { height } = Dimensions.get("window");

const MyOrders = (props) => {
  const [orderList, setOrderList] = useState([]);

  const [loading, setLoading] = useState(true);

  // console.log(props.route.params.token);

  useFocusEffect(
    useCallback(() => {
      getOrders();
      return () => {
        setOrderList([]);
      };
    }, [setOrderList])
  );

  // console.log(context.stateUser.user.id);
  // console.log(context);

  const getOrders = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${props.route.params.token}`,
      },
    };

    await axios
      .get(`${baseURL}orders/me`, config)
      .then((res) => {
        // console.log(res.data.orders);
        if (res?.data?.orders.length > 0) {
          setOrderList(res?.data?.orders);
        } else {
          setOrderList([]);
        }

        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.spinner}>
          <ActivityIndicator size={"large"} color='red' />
        </View>
      ) : orderList?.length > 0 ? (
        <FlatList
          data={orderList}
          renderItem={({ item }) => (
            <OrderCard token={props?.route?.params?.token} {...item} />
          )}
          keyExtractor={(item) => item?._id}
        />
      ) : (
        <View style={styles.spinner}>
          <Text>You have no orders</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  spinner: {
    height: height / 2,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MyOrders;
