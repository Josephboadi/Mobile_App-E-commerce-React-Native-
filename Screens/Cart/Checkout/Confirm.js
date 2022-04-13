import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { COLORS, FONTS } from "../../../constants";
import * as actions from "../../../Redux/Actions/cartActions";
import FormButton from "../../../components/FormButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import axios from "axios";
import baseURL from "../../../assets/common/baseUrl";

let { height, width } = Dimensions.get("window");

const Confirm = (props) => {
  // const finalOrder = props.route.params;
  const confirm = props.route.params;
  const [token, setToken] = useState();

  let properListItems = [];

  confirm?.order?.order?.orderItems.forEach((item) => {
    properListItems.push({
      product: item.product._id,
      name: item.product.name,
      price: item.product.price,
      image: item.product.image.url,
      quantity: item.quantity,
    });
  });

  const navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));
  }, []);

  const confirmOrder = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const itemsPrice = confirm?.order?.order?.orderItems.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0
    );

    // console.log(properListItems);

    const taxPrice = 5;
    const shippingPrice = 10;
    const totalPrice = itemsPrice + taxPrice + shippingPrice;

    // confirm?.order?.order?.orderItems.forEach((item) => {
    //   return properListItems.push({
    //     product: item.product._id,
    //     name: item.product.name,
    //     price: item.product.price,
    //     image: item.product.image.url,
    //     quantity: item.quantity,
    //   });
    // });

    const order = {
      itemsPrice: itemsPrice,
      taxPrice: taxPrice,
      shippingPrice: shippingPrice,
      totalPrice: totalPrice,
      orderItems: properListItems,
      shippingInfo: confirm.order.order.shippingInfo,
      paymentInfo: {
        id: "sample paymentInfo",
        status: "succeeded",
      },
    };

    axios
      .post(`${baseURL}order/new`, order, config)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Order Completed",
            text2: <Text></Text>,
          });
          setTimeout(() => {
            props.clearCart();
            navigation.navigate("Cart");
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={{ ...FONTS.h2, fontWeight: "bold" }}>Confirm Order</Text>

        {props.route.params ? (
          <View style={{ borderWidth: 1, borderColor: "orange" }}>
            <Text style={styles.title}>Shipping to:</Text>
            <View style={{ padding: 8 }}>
              <Text>Address: {confirm.order.order.shippingInfo.address}</Text>
              <Text>City: {confirm.order.order.shippingInfo.city}</Text>
              <Text>Zip Code: {confirm.order.order.shippingInfo.pinCode}</Text>
              <Text>State: {confirm.order.order.shippingInfo.state}</Text>
              <Text>Country: {confirm.order.order.shippingInfo.country}</Text>
            </View>
            <Text style={styles.title}>Items:</Text>
            {confirm.order.order.orderItems.map((x) => {
              return (
                <View key={Math.random()} style={styles.listItem}>
                  {/* left */}
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      // padding: 10,
                      marginRight: 15,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={{
                        uri: x.product.image
                          ? x.product.image.url
                          : "https://res.cloudinary.com/dblprzex8/image/upload/v1647965404/ahguxi89hovqxblrvnk1.png",
                      }}
                      // resizeMode='contain'
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        // marginRight: 8,
                      }}
                    />
                  </View>

                  {/* Right */}
                  <View style={styles.body}>
                    {/* left */}
                    <View
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <Text style={{ ...FONTS.body3 }}>{x.product.name}</Text>
                    </View>

                    {/* right */}
                    <View
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <Text style={{ ...FONTS.body3 }}>
                        $ {x.product.price}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        ) : null}
        <View style={{ width: "80%", alignItems: "center", margin: 20 }}>
          <FormButton buttonTitle={"Place order"} onPress={confirmOrder} />
          {/* <Button title='Place order' onPress={confirmOrder} /> */}
        </View>
      </View>
    </ScrollView>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
  };
};

const styles = StyleSheet.create({
  container: {
    height: height,
    padding: 8,
    alignContent: "center",
    backgroundColor: "white",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  title: {
    alignSelf: "center",
    margin: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  listItem: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
    padding: 10,
    paddingVertical: 6,
    // marginBottom: 2,
  },
  body: {
    flex: 1,
    // margin: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray10,
  },
});

export default connect(null, mapDispatchToProps)(Confirm);
