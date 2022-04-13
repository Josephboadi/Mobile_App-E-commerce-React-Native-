import React, { useState, useCallback, useEffect } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import OrderCard from "../../components/OrderCard";

let { width, height } = Dimensions.get("window");

const Orders = (props) => {
  const [orderList, setOrderList] = useState([]);

  const [loading, setLoading] = useState(true);

  // console.log(props.route.params.token);

  useFocusEffect(
    useCallback(() => {
      getOrders();
      return () => {
        setOrderList();
      };
    }, [setOrderList])
  );

  const getOrders = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${props.route.params.token}`,
      },
    };

    await axios
      .get(`${baseURL}admin/orders`, config)
      .then((res) => {
        // console.log(res.data.orders);
        setOrderList(res?.data?.orders);
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
      ) : (
        <FlatList
          data={orderList}
          renderItem={({ item }) => (
            <OrderCard
              token={props.route.params.token}
              {...item}
              editMode={true}
            />
          )}
          keyExtractor={(item) => item?._id}
        />
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

export default Orders;
