import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Image,
  Modal,
  Alert,
  Dimensions,
} from "react-native";

// import {useTheme} from 'react-native-paper';

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
import Feather from "react-native-vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseUrl from "../../assets/common/baseUrl";
import axios from "axios";
import mime from "mime";

import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import FormButton from "../../components/FormButton";
import FormInputPass from "../../components/FormInputPass";
import FormInput from "../../components/FormInput";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AuthGlobal from "../../Context/store/AuthGlobal";
import EasyButton from "../../components/StyledComponents/EasyButton";
import { getUserProfile } from "../../Context/actions/Auth.actions";

// import ImagePicker from "react-native-image-crop-picker"

const EditProfileScreen = (props) => {
  const context = useContext(AuthGlobal);
  const navigation = useNavigation();
  const [pickerValue, setPickerValue] = useState();
  const [image, setImage] = useState();
  const [mainImage, setMainImage] = useState();
  const [newImage, setNewImage] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const validateEmail = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  // console.log(props?.route?.params?.item?.phone);
  useEffect(async () => {
    if (
      context.stateUser.isAuthenticated === false ||
      context.stateUser.isAuthenticated === null ||
      context.stateUser.isAuthenticated === undefined
    ) {
      navigation.navigate("Login");
    }

    setName(props?.route?.params?.item?.name);
    setPhone(props?.route?.params?.item?.phoneNumber.toString());
    setEmail(props?.route?.params?.item?.email);
    setMainImage(props?.route?.params?.item?.avatar?.url);
    setImage(props?.route?.params?.item?.avatar?.url);

    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));

    // Categories
    // await axios
    //   .get(`${baseUrl}categories`)
    //   .then((res) => setCategories(res.data.categories))
    //   .catch((error) => alert("Error to load categories"));

    // Image Picker
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();

    return () => {
      // setCategories([]);
    };
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setMainImage(result.uri);
      setImage(result.uri);
      setNewImage(true);
    }
  };

  const userUpdateHandle = () => {
    setLoading(true);
    let newImageUri;
    if (Platform.OS === "ios") {
      newImageUri = "file:///" + image.split("file:/").join("");
    } else {
      newImageUri = image;
    }

    const formData = new FormData();

    formData.append("image", {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: new Date() + "_image",
    });
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phoneNumber", phone);
    formData.append("newImage", newImage);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      transformRequest: (data, headers) => {
        return formData;
      },
    };

    if (name === "") {
      Alert.alert("Alert", "Provide Name");
    } else if (phone === "") {
      Alert.alert("Alert", "Provide Phone Number");
    } else if (phone.length < 10) {
      Alert.alert("Alert", "Phone Number Cannot be less than 10 digit");
    } else if (email === "") {
      Alert.alert("Alert", "Provide Email");
    } else if (!validateEmail(email)) {
      Alert.alert("Alert", "Provide a valid email");
    } else {
      axios
        .put(`${baseUrl}user/me/update`, formData, config)
        .then((res) => {
          getUserProfile(token, context.dispatch);
          if (res.status == 201 || res.status == 200) {
            Toast.show({
              topOffset: 60,
              type: "success",
              text1: "Profile Updated",
              text2: "Profile Updated Successfully",
            });
            navigation.navigate("Profile");
            setLoading(false);
          }
        })
        .catch((error) => {
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Something went wrong",
            text2: error.message,
          });
          setLoading(false);
        });
    }
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    userUpdateHandle();
  };

  const updatePassword = () => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const passWordData = {
      oldPassword: oldPassword,
      newPassword: password,
      confirmPassword: confirmPassword,
    };

    if (oldPassword === "") {
      Alert.alert("Alert", "Provide a Password");
    } else if (oldPassword.length < 8) {
      Alert.alert("Alert", "Password should not be less than 6 digits");
    } else if (password === "") {
      Alert.alert("Alert", "Provide a Password");
    } else if (password.length < 8) {
      Alert.alert("Alert", "Password should not be less than 6 digits");
    } else if (confirmPassword === "") {
      Alert.alert("Alert", "Confirm Password");
    } else if (password !== confirmPassword) {
      Alert.alert("Alert", "Password Mismatch");
    } else {
      axios
        .put(`${baseUrl}user/password/update`, passWordData, config)
        .then((res) => {
          if (res.status == 201 || res.status == 200) {
            Toast.show({
              topOffset: 60,
              type: "success",
              text1: "Passwoord updated",
              text2: "Password Updated Successfully",
            });
            navigation.navigate("Profile");
            setLoading(false);
          }
        })
        .catch((error) => {
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Something went wrong",
            text2: "Please try again",
          });
          setLoading(false);
        });
    }
  };
  // const {colors} = useTheme();

  // const takePhotoFromCamera = () => {
  // ImagePicker.openCamera({
  //   compressImageMaxWidth: 300,
  //   compressImageMaxHeight: 300,
  //   cropping: true,
  //   compressImageQuality: 0.7,
  // }).then((image) => {
  //   console.log(image)
  //   setImage(image.path)
  //   this.bs.current.snapTo(1)
  // })
  // };

  // const choosePhotoFromLibrary = () => {
  // ImagePicker.openPicker({
  //   width: 300,
  //   height: 300,
  //   cropping: true,
  //   compressImageQuality: 0.7,
  // }).then((image) => {
  //   console.log(image)
  //   setImage(image.path)
  //   this.bs.current.snapTo(1)
  // })
  // };

  // renderInner = () => (
  //   <View style={styles.panel}>
  //     <View style={{ alignItems: "center" }}>
  //       <Text style={styles.panelTitle}>Upload Photo</Text>
  //       <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
  //     </View>
  //     <TouchableOpacity
  //       style={styles.panelButton}
  //       onPress={takePhotoFromCamera}
  //     >
  //       <Text style={styles.panelButtonTitle}>Take Photo</Text>
  //     </TouchableOpacity>
  //     <TouchableOpacity
  //       style={styles.panelButton}
  //       onPress={choosePhotoFromLibrary}
  //     >
  //       <Text style={styles.panelButtonTitle}>Choose From Library</Text>
  //     </TouchableOpacity>
  //     <TouchableOpacity
  //       style={styles.panelButton}
  //       onPress={() => this.bs.current.snapTo(1)}
  //     >
  //       <Text style={styles.panelButtonTitle}>Cancel</Text>
  //     </TouchableOpacity>
  //   </View>
  // );

  // renderHeader = () => (
  //   <View style={styles.header}>
  //     <View style={styles.panelHeader}>
  //       <View style={styles.panelHandle} />
  //     </View>
  //   </View>
  // );

  // bs = React.createRef();
  // fall = new Animated.Value(1);

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
      style={styles.container}
    >
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              underlayColor={"#E8E8E8"}
              onPress={() => {
                setModalVisible(false);
              }}
              style={{
                alignSelf: "flex-end",
                position: "absolute",
                top: 5,
                right: 10,
              }}
            >
              <FontAwesome name='close' size={20} />
            </TouchableOpacity>
            <FormInputPass
              labelValue={oldPassword}
              onChangeText={(userOldPassword) =>
                setOldPassword(userOldPassword)
              }
              placeholderText='Current Password'
              iconType='lock'
              required
            />

            <FormInputPass
              labelValue={password}
              onChangeText={(userPassword) => setPassword(userPassword)}
              placeholderText='New Password'
              iconType='lock'
              required
            />

            <FormInputPass
              labelValue={confirmPassword}
              onChangeText={(userPassword) => setConfirmPassword(userPassword)}
              placeholderText='Confirm New Password'
              iconType='lock'
              // iconType1="md-eye"
              // secureTextEntry={true}
              required
            />
            <EasyButton
              medium
              secondary
              style={{
                backgroundColor: "#B8860B",
                width: 180,
                marginTop: 20,
              }}
              onPress={() => [updatePassword(), setModalVisible(false)]}
            >
              <Text style={{ color: "white" }}>Update</Text>
            </EasyButton>
          </View>
        </View>
      </Modal>
      {/* <BottomSheet
        ref={this.bs}
        snapPoints={[330, 0]}
        renderContent={this.renderInner}
        renderHeader={this.renderHeader}
        initialSnap={1}
        callbackNode={this.fall}
        enabledGestureInteraction={true}
      /> */}
      {/* <Animated.View
        style={{
          margin: 20,
          opacity: Animated.add(0.1, Animated.multiply(this.fall, 1.0)),
        }}
      > */}
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: image }} />
          <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
            <FontAwesome style={{ color: "white" }} name='camera' />
          </TouchableOpacity>
        </View>
        {/* <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
          John Doe
        </Text> */}
      </View>

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
        labelValue={phone}
        onChangeText={(userPhone) => setPhone(userPhone)}
        placeholderText='Phone Number'
        iconType='phone'
        keyboardType='numeric'
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

      <View style={{ marginTop: 10 }}>
        <FormButton
          // style={{ marginTop: 10 }}
          buttonTitle={loading ? "Updating..." : "Update Profile"}
          disabled={loading}
          onPress={() => handleSubmit()}
        />
      </View>

      <View style={{ alignItems: "center", marginTop: 20 }}>
        <EasyButton
          medium
          // primary
          style={{
            borderWidth: 1,
            borderColor: "#A7790C",
            borderRadius: 20,
            backgroundColor: "white",
            // paddingHorizontal: 5,
            width: "100%",
            // elevation: 1,
          }}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Text style={{ color: "#A7790C", fontSize: 20 }}>
            Update Password
          </Text>
        </EasyButton>
      </View>

      {/* </Animated.View> */}
    </KeyboardAwareScrollView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderStyle: "solid",
    borderWidth: 8,
    padding: 0,
    justifyContent: "center",
    borderRadius: 100,
    borderColor: "#EDEDED",
    elevation: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  imagePicker: {
    position: "absolute",
    right: 5,
    bottom: 5,
    backgroundColor: "grey",
    padding: 8,
    borderRadius: 100,
    elevation: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
