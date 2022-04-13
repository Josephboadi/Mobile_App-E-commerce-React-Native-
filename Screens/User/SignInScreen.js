import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import FormInput from "../../components/FormInput";
import FormInputPass from "../../components/FormInputPass";
import FormButton from "../../components/FormButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useDispatch, useSelector } from "react-redux";

import Ionicons from "react-native-vector-icons/Ionicons";
import * as Animatable from "react-native-animatable";
import Error from "../../components/Error";

// Context
import AuthGlobal from "../../Context/store/AuthGlobal";
import { loginUser } from "../../Context/actions/Auth.actions";

const SignInScreen = () => {
  const context = useContext(AuthGlobal);
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const route = useRoute();

  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      navigation.navigate("Profile");
    }
  }, [context.stateUser.isAuthenticated]);

  const onPress = () => {
    navigation.navigate("Register");
  };

  const onReset = () => {
    navigation.navigate("Reset");
  };

  const dispatch = useDispatch();

  const loginHandle = (props) => {
    const userData = {
      email: email,
      password: password,
    };

    if (email === "" || password === "") {
      setError("Please fill in your credential");
    } else {
      // console.log("Success")
      loginUser(userData, context.dispatch);
      // dispatch(loginAction(userData));
    }
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    loginHandle();
  };

  const onDetails = () => {
    setEmail("customer@gmail.com");
    setPassword("12345678");
  };

  const onAdmin = () => {
    setEmail("admin@gmail.com");
    setPassword("123456789");
  };

  return (
    <>
      <KeyboardAwareScrollView
        viewIsInsideTabBar={true}
        extraHeight={200}
        enableOnAndroid={true}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Animatable.View
            style={{
              marginTop: 30,
              width: 90,
              height: 90,
              borderRadius: 45,
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center",
            }}
            animation='flipInY'
          >
            <Image
              source={require("../../assets/logo.png")}
              style={styles.logo}
            />
          </Animatable.View>

          <Animatable.View
            animation='fadeInUpBig'
            style={{
              marginTop: 50,
              backgroundColor: "#f8f8f8",
              flex: 1,
              padding: 20,
              paddingTop: 30,
              alignItems: "center",
              borderTopLeftRadius: 70,
              // justifyContent: 'center',
              width: "100%",
            }}
          >
            <TouchableOpacity
              onPress={onDetails}
              style={{
                padding: 4,
                fontSize: 15,
                // alignItems: 'center',
                marginBottom: 5,
                borderWidth: 1,
                borderColor: "#A7790C",
                borderRadius: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  alignItems: "center",
                  // marginBottom: 20,
                  color: "#A7790C",
                }}
              >
                {`Email:    customer@gmail.com`}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  alignItems: "center",
                  // marginBottom: 20,
                  color: "#A7790C",
                }}
              >
                {`Pass:  12345678`}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onAdmin}
              style={{
                padding: 4,
                fontSize: 15,
                // alignItems: 'center',
                marginBottom: 20,
                borderWidth: 1,
                borderColor: "#A7790C",
                borderRadius: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  alignItems: "center",
                  // marginBottom: 10,
                  color: "#A7790C",
                }}
              >
                {`Email:    admin@gmail.com`}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  alignItems: "center",
                  // marginBottom: 20,
                  color: "#A7790C",
                }}
              >
                {`Pass:  123456789`}
              </Text>
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 30,
                alignItems: "center",
                marginBottom: 20,
                color: "#A7790C",
              }}
            >
              Signin
            </Text>
            <FormInput
              labelValue={email}
              onChangeText={(userEmail) => setEmail(userEmail)}
              placeholderText='Email'
              iconType='mail'
              keyboardType='email-address'
              autoCapitalize='none'
              autoCorrect={false}
            />

            <FormInputPass
              // styles={marginTop: 50}
              labelValue={password}
              onChangeText={(userPassword) => setPassword(userPassword)}
              placeholderText='Password'
              iconType='lock'
              // iconType1="md-eye"
              // secureTextEntry={true}
            />

            {error ? <Error message={error} /> : null}
            <FormButton
              // style={{width: '100%'}}
              buttonTitle={loading ? "Loading..." : "Sign In"}
              disabled={loading}
              // loader={loading}
              onPress={() => handleSubmit()}
              // onPress={() => login(email, password)}
            />

            <TouchableOpacity style={styles.forgotButton} onPress={onReset}>
              <Text style={styles.navButtonText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onPress}>
              <Text style={styles.navButtonText}>
                Don't have an acount? Create here
              </Text>
            </TouchableOpacity>

            <Text
              style={{
                color: "gray",
                fontSize: 18,
                fontWeight: "bold",
                marginTop: 50,
              }}
            >
              Powered by Sesafrica
            </Text>
          </Animatable.View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  containerloader: {
    justifyContent: "center",
    alignItems: "center",
    // padding: 20,
    // paddingTop: 50,
    // backgroundColor: 'transparent',
    // opacity: 0.1,
    backgroundColor: "transparent",
    backfaceVisibility: "visible",
    height: Dimensions.get("screen").height,
    zIndex: 10000,
  },
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    // padding: 20,
    paddingTop: 40,
    backgroundColor: "#A7790C",
    height: Dimensions.get("screen").height,
  },
  logo: {
    height: 80,
    width: 80,
    borderRadius: 40,
    resizeMode: "cover",
  },
  text: {
    // fontFamily: "Kufam-SemiBoldItalic",
    marginTop: 60,
    fontSize: 38,
    fontWeight: "bold",
    // marginBottom: 10,
    color: "#fff",
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 15,
    marginTop: 55,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#A7790C",
    // fontFamily: "Lato-Regular",
  },
});
