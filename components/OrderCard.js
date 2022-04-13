import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import EasyButton from "./StyledComponents/EasyButton";
import TrafficLight from "./StyledComponents/TrafficLight";
EasyButton;
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import baseURL from "../assets/common/baseUrl";

const codes = [
  {
    name: "processing",
    code: "Processing",
  },
  {
    name: "shipped",
    code: "Shipped",
  },
  {
    name: "delivered",
    code: "Delivered",
  },
];

const OrderCard = (props) => {
  const navigation = useNavigation();
  const [orderStatus, setOrderStatus] = useState();
  const [statusText, setStatusText] = useState();
  const [statusChange, setStatusChange] = useState();
  const [token, setToken] = useState();
  const [cardColor, setCardColor] = useState();

  useEffect(() => {
    if (props?.orderStatus == "Processing") {
      setOrderStatus(<TrafficLight unavailable></TrafficLight>);
      setStatusText("processing");
      setCardColor("#FFB3AF");
    } else if (props?.orderStatus == "Shipped") {
      setOrderStatus(<TrafficLight limited></TrafficLight>);
      setStatusText("shipped");
      setCardColor("#FEC160");
    } else {
      setOrderStatus(<TrafficLight available></TrafficLight>);
      setStatusText("delivered");
      setCardColor("#4CDAC2");
    }

    return () => {
      setOrderStatus();
      setStatusText();
      setCardColor();
    };
  }, []);

  const updateOrder = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    };

    const orderStat = {
      status: orderStatus,
    };

    // console.log(orderStat);

    axios
      .put(`${baseURL}admin/order/${props._id}`, orderStat, config)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Order Edited",
            text2: <Text></Text>,
          });
          setTimeout(() => {
            navigation.navigate("Products");
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again",
        });
      });
  };

  return (
    <View
      style={{
        backgroundColor: cardColor,

        padding: 20,
        margin: 10,
        borderWidth: 1,
        borderColor: "gainsboro",
        borderRadius: 20,
      }}
    >
      <View style={styles.container1}>
        <Text>Order Number: #{props?._id}</Text>
      </View>
      <View style={{ marginTop: 10, justifyContent: "center" }}>
        <Text>
          Status: {statusText} {orderStatus}
        </Text>
        <Text>Address: {props.shippingInfo.address}</Text>
        <Text>City: {props.shippingInfo.city}</Text>
        <Text>Country: {props.shippingInfo.country}</Text>
        <Text>Date Ordered: {props.createdAt.split("T")[0]}</Text>
        <View style={styles.priceContainer}>
          <Text>Price: </Text>
          <Text style={styles.price}>$ {props.totalPrice}</Text>
        </View>
        {props.editMode ? (
          <>
            <SelectDropdown
              data={codes}
              buttonStyle={{
                // width: "50%",
                backgroundColor: "transparent",
                // alignSelf: "center",
              }}
              buttonTextStyle={{
                marginLeft: 5,
                textAlign: "left",
                color: "#5e5a4b",
              }}
              onSelect={(selectedItem, index) => {
                setStatusChange(selectedItem.code);
                setOrderStatus(selectedItem.code);
              }}
              defaultButtonText='Change Status'
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.name;
              }}
              renderDropdownIcon={() => (
                <FontAwesome name='caret-down' size={25} color='#007aff' />
              )}
              dropdownStyle={
                {
                  // height: 450,
                }
              }
              rowTextStyle={{
                marginLeft: 20,
                textAlign: "left",
                color: "grey",
              }}
              dropdownIconPosition='right'
              rowTextForSelection={(item, index) => {
                return item.name;
              }}
            />
            <EasyButton secondary large onPress={() => updateOrder()}>
              <Text style={{ color: "white" }}>Update</Text>
            </EasyButton>
          </>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  //   container: {
  //     padding: 20,
  //     margin: 10,
  //     // borderRadius: 10,
  //   },
  container1: {
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  title: {
    backgroundColor: "#6281F6",
    padding: 5,
  },
  priceContainer: {
    marginTop: 10,
    alignSelf: "flex-end",
    flexDirection: "row",
  },
  price: {
    color: "white",
    fontWeight: "bold",
  },
});

export default OrderCard;
