import React, { useEffect, useState, useContext } from "react";
import { View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

import FormContainer from "../../../components/Form/FormContainer";
import Input from "../../../components/Form/Input";

import { connect } from "react-redux";
import FormButton from "../../../components/FormButton";
import AuthGlobal from "../../../Context/store/AuthGlobal";

const countries = require("../../../assets/data/countries.json");

// let { width } = Dimensions.get("window")

const Checkout = (props) => {
  const context = useContext(AuthGlobal);
  const [orderItems, setOrderItems] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [zip, setZip] = useState();
  const [country, setCountry] = useState(null);
  const [countryState, setCountryState] = useState(null);
  const [state1, setState1] = useState(null);
  const [phone, setPhone] = useState();
  const [user, setUser] = useState();

  const navigation = useNavigation();

  useEffect(() => {
    setOrderItems(props.cartItems);

    if (context.stateUser.isAuthenticated) {
      setUser(context.stateUser.user.id);
    } else {
      navigation.navigate("Cart");
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Please Login to Checkout",
        text2: <Text></Text>,
      });
    }

    return () => {
      setOrderItems();
    };
  }, []);

  const checkOut = () => {
    let order = {
      shippingInfo: {
        address: address,
        city: city,
        state: state1,
        country: country,
        pinCode: zip,
        phoneNo: phone,
      },
      orderItems,
    };

    navigation.navigate("Payment", { order: order });
  };

  const states = async (text) => {
    if (countries !== undefined) {
      setCountryState(
        await countries?.filter(
          (i) => i.country.toLowerCase() === text.toLowerCase()
        )
      );
      // console.log(countryState && countryState[0]?.states)
    }
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={"Shipping Address"}>
        <Input
          placeholder={"Phone"}
          name={"phone"}
          value={phone}
          keyboardType={"numeric"}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          placeholder={"Shipping Address"}
          name={"shippingaddress"}
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <Input
          placeholder={"City"}
          name={"city"}
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        <Input
          placeholder={"Zip Code"}
          name={"zip"}
          value={zip}
          keyboardType={"numeric"}
          onChangeText={(text) => setZip(text)}
        />

        <SelectDropdown
          data={countries}
          buttonStyle={{
            width: "80%",
            backgroundColor: "#eee",
            alignSelf: "center",
            // marginLeft: 30,
            // justifyContent: 'space-between',
            // alignItems: 'flex-start',

            // left: 20,
            // top: 50,
          }}
          buttonTextStyle={{
            // left: 120,
            marginLeft: 5,
            textAlign: "left",
            color: "grey",
          }}
          onSelect={(selectedItem, index) => {
            // console.log(selectedItem.id, index);
            setCountry(selectedItem.country);
            states(selectedItem?.country);
          }}
          defaultButtonText='Select your country'
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected

            // if (countryState === "null") {
            //   return "Select your country"
            // } else {
            //   return selectedItem.country
            // }

            return selectedItem.country;
          }}
          renderDropdownIcon={() => (
            <FontAwesome name='caret-down' size={25} color='#007aff' />
          )}
          dropdownStyle={{
            height: 450,
          }}
          rowTextStyle={{
            // alignItems: 'flex-start',
            // right: 110,
            marginLeft: 20,
            textAlign: "left",
            color: "grey",
          }}
          dropdownIconPosition='right'
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item.country;
          }}
        />

        {countryState != null && (
          <SelectDropdown
            data={countryState[0]?.states}
            buttonStyle={{
              width: "80%",
              backgroundColor: "#eee",
              alignSelf: "center",
              // marginLeft: 30,
              // justifyContent: 'space-between',
              // alignItems: 'flex-start',

              // left: 20,
              // top: 50,
            }}
            buttonTextStyle={{
              // left: 120,
              marginLeft: 5,
              textAlign: "left",
              color: "grey",
            }}
            onSelect={(selectedItem, index) => {
              // console.log(selectedItem.id, index);
              setState1(selectedItem);
            }}
            defaultButtonText='Select your state'
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected

              return selectedItem;
            }}
            renderDropdownIcon={() => (
              <FontAwesome name='caret-down' size={25} color='#007aff' />
            )}
            dropdownStyle={{
              height: 450,
            }}
            rowTextStyle={{
              // alignItems: 'flex-start',
              // right: 110,
              marginLeft: 20,
              textAlign: "left",
              color: "grey",
            }}
            dropdownIconPosition='right'
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
          />
        )}

        <View style={{ width: "80%", alignItems: "center", marginTop: 10 }}>
          <FormButton buttonTitle={"Confirm"} onPress={() => checkOut()} />
          {/* <Button title='Confirm' onPress={() => checkOut()} /> */}
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

export default connect(mapStateToProps, null)(Checkout);

// import React from "react"
// import { View, StyleSheet } from "react-native"

// function Checkout() {
//   return <View style={styles.container}></View>
// }

// const styles = StyleSheet.create({
//   container: {},
// })

// export default Checkout
