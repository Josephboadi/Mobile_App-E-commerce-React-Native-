import React, { useContext, useState } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  ScrollView,
  Alert,
  Dimensions,
  Image,
} from "react-native"
import axios from "axios"
import Toast from "react-native-toast-message"
import FormInput from "../../components/FormInput"
import FormInputPass from "../../components/FormInputPass"
import FormButton from "../../components/FormButton"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import baseUrl from "../../assets/common/baseUrl"

// import SocialButton from '../../components/SocialButton';
// import {AuthContext} from '../../router/AuthProvider';
// import {signupUser} from '../../redux/actions/authActions';
import { useDispatch, useSelector } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import Ionicons from "react-native-vector-icons/Ionicons"
import * as Animatable from "react-native-animatable"

const SignUpScreen = () => {
  const [name, setName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSecureEntry, setIsSecureEntry] = useState(true)

  const [loading, setLoading] = useState()

  const validateEmail = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }

  // const {register} = useContext(AuthContext);
  //   const {loading, serverError, errors} = useSelector(state => state.UI);
  //   const dispatch = useDispatch();
  // const history = useHistory();
  const navigation = useNavigation()

  const signupHandle = () => {
    let userDetail1 = {
      email: email,
      name: name,
      phoneNumber: phoneNumber,
      role: "ROLE_USER",
      password: password,
      confirmPassword: confirmPassword,
    }

    console.log(userDetail1)

    if (name === "") {
      Alert.alert("Alert", "Provide Name")
    } else if (phoneNumber === "") {
      Alert.alert("Alert", "Provide Phone Number")
    } else if (phoneNumber.length < 10) {
      Alert.alert("Alert", "Phone Number Cannot be less than 10 digit")
    } else if (email === "") {
      Alert.alert("Alert", "Provide Email")
    } else if (!validateEmail(email)) {
      Alert.alert("Alert", "Provide a valid email")
    } else if (password === "") {
      Alert.alert("Alert", "Provide a Password")
    } else if (password.length < 8) {
      Alert.alert("Alert", "Password should not be less than 6 digits")
    } else if (confirmPassword === "") {
      Alert.alert("Alert", "Confirm Password")
    } else if (password !== confirmPassword) {
      Alert.alert("Alert", "Password Mismatch")
    } else {
      axios
        .post(`${baseUrl}user/register`, userDetail1)
        .then((res) => {
          if (res.status == 201) {
            Toast.show({
              topOffset: 60,
              type: "success",
              text1: "Account Created Successfully",
              text2: "Please login into your account",
            })
            setTimeout(() => {
              navigation.navigate("Login")
            }, 500)
          }
        })
        .catch((error) => {
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Something went wrong",
            text2: "Please try again",
          })
        })
    }
  }

  const handleSubmit = (event) => {
    if (event) event.preventDefault()
    signupHandle()
  }

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
              marginTop: 20,
              backgroundColor: "#f8f8f8",
              flex: 1,
              padding: 20,
              paddingTop: 20,
              alignItems: "center",
              borderTopLeftRadius: 70,
              width: "100%",
            }}
          >
            <Text
              style={{
                fontSize: 30,
                alignItems: "center",
                marginBottom: 15,
                color: "#A7790C",
              }}
            >
              Create an Account
            </Text>
            <FormInput
              labelValue={name}
              onChangeText={(userName) => setName(userName)}
              placeholderText='Name'
              iconType='user'
              // keyboardType="text"
              autoCapitalize='none'
              autoCorrect={false}
              required
            />

            <FormInput
              labelValue={phoneNumber}
              onChangeText={(userPhoneNumber) =>
                setPhoneNumber(userPhoneNumber)
              }
              placeholderText='Phone Number'
              iconType='phone'
              keyboardType='number-pad'
              // autoCapitalize="none"
              autoCorrect={false}
              required
            />

            <FormInput
              labelValue={email}
              onChangeText={(userEmail) => setEmail(userEmail)}
              placeholderText='Email'
              iconType='mail'
              keyboardType='email-address'
              autoCapitalize='none'
              autoCorrect={false}
              required
            />

            <FormInputPass
              labelValue={password}
              onChangeText={(userPassword) => setPassword(userPassword)}
              placeholderText='Password'
              iconType='lock'
              required
            />

            <FormInputPass
              labelValue={confirmPassword}
              onChangeText={(userPassword) => setConfirmPassword(userPassword)}
              placeholderText='Confirm Password'
              iconType='lock'
              // iconType1="md-eye"
              // secureTextEntry={true}
              required
            />

            <FormButton
              buttonTitle={loading ? "Loading..." : "Sign Up"}
              disabled={loading}
              onPress={() => handleSubmit()}
            />

            <View style={styles.textPrivate}>
              <Text style={styles.color_textPrivate}>
                By registering, you confirm that you accept our{" "}
              </Text>
              <TouchableOpacity onPress={() => alert("Terms Clicked!")}>
                <Text style={[styles.color_textPrivate, { color: "#e88832" }]}>
                  Terms of service
                </Text>
              </TouchableOpacity>
              <Text style={styles.color_textPrivate}> and </Text>
              <Text style={[styles.color_textPrivate, { color: "#e88832" }]}>
                Privacy Policy
              </Text>
            </View>

            <TouchableOpacity
              style={styles.navButton}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.navButtonText}>Have an account? Sign In</Text>
            </TouchableOpacity>
            <Text
              style={{
                color: "gray",
                fontSize: 15,
                fontWeight: "bold",
                marginTop: 5,
              }}
            >
              Powered by Sesafrica
            </Text>
          </Animatable.View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    // padding: 20,
    paddingTop: 40,
    backgroundColor: "#A7790C",
    // height: Dimensions.get('screen').height,
    // height: '100%',
  },
  logo: {
    height: 80,
    width: 80,
    borderRadius: 40,
    resizeMode: "cover",
  },
  text: {
    // fontFamily: 'Kufam-SemiBoldItalic',
    marginTop: 30,
    fontSize: 38,
    fontWeight: "bold",
    // marginBottom: 10,
    color: "#fff",
  },
  navButton: {
    // marginTop: 15,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#A7790C",
    // fontFamily: 'Lato-Regular',
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
    justifyContent: "center",
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: "400",
    // fontFamily: 'Lato-Regular',
    color: "grey",
  },
})
