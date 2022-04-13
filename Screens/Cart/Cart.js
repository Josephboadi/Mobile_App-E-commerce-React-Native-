import React, { useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SwipeListView } from "react-native-swipe-list-view";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";

import * as actions from "../../Redux/Actions/cartActions";

import Header from "../../components/Header";
import { COLORS, FONTS } from "../../constants";
import CartItem from "./CartItem";
import EasyButton from "../../components/StyledComponents/EasyButton";
import AuthGlobal from "../../Context/store/AuthGlobal";

let { width, height } = Dimensions.get("window");

const Cart = (props) => {
  const context = useContext(AuthGlobal);
  const navigation = useNavigation();
  let total = 0;

  props.cartItems.forEach((cart) => {
    return (total += cart.product.price);
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        width: width,
        paddingTop: 45,
        backgroundColor: "white",
      }}
    >
      <Header />
      {props.cartItems.length ? (
        <View style={{ flex: 1 }}>
          <View>
            <Text style={{ alignSelf: "center", ...FONTS.h2 }}>Cart</Text>
          </View>
          <View style={{ flex: 1, width: width }}>
            <SwipeListView
              data={props.cartItems}
              keyExtractor={(item) => Math.random()}
              renderItem={(data) => <CartItem item={data} />}
              renderHiddenItem={(data) => (
                <View style={styles.hiddenContainer}>
                  <TouchableOpacity
                    style={styles.hiddenButton}
                    onPress={() => props.removeFromCart(data.item)}
                  >
                    <FontAwesome name='trash' color={"white"} size={30} />
                  </TouchableOpacity>
                </View>
              )}
              disableRightSwipe={true}
              previewOpenDelay={3000}
              friction={1000}
              tension={40}
              leftOpenValue={75}
              stopLeftSwipe={75}
              rightOpenValue={-75}
            />

            <View style={styles.bottomContainer}>
              {/* left */}
              <View>
                <Text style={styles.price}> $ {total}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: width / 2 + 30,
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingRight: 5,
                }}
              >
                {/* right */}
                <View>
                  <EasyButton medium danger onPress={() => props.clearCart()}>
                    <Text style={{ color: "white" }}>Clear</Text>
                  </EasyButton>
                </View>
                {/* right */}
                <View>
                  {context.stateUser.isAuthenticated ? (
                    <EasyButton
                      medium
                      primary
                      onPress={() => navigation.navigate("Checkout")}
                    >
                      <Text style={{ color: "white" }}>Checkout</Text>
                    </EasyButton>
                  ) : (
                    <EasyButton
                      medium
                      secondary
                      onPress={() => {
                        navigation.navigate("Profile2", { screen: "Login" });
                      }}
                    >
                      <Text style={{ color: "white" }}>Login</Text>
                    </EasyButton>
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text>Your cart is empty</Text>
          <Text>Add products to your cart to get started</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: (item) => dispatch(actions.removeFromCart(item)),
  };
};

const styles = StyleSheet.create({
  emptyContainer: {
    height: height,
    alignItems: "center",
    justifyContent: "center",
  },

  bottomContainer: {
    width: width,
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    elevation: 20,
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 10,
  },
  price: {
    fontSize: 18,
    margin: 20,
    color: "red",
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
  },
  hiddenButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 25,
    height: 70,
    width: width / 1.2,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
