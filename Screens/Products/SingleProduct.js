import React, { useState, useEffect, useContext } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  Button,
  TouchableOpacity,
  // FlatList,
  Dimensions,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Swiper from "react-native-swiper/src";
import Toast from "react-native-toast-message";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Rating } from "react-native-ratings";

import { COLORS, FONTS } from "../../constants";
import NavBack from "../../components/NavBack";
import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";
import EasyButton from "../../components/StyledComponents/EasyButton";
import TrafficLight from "../../components/StyledComponents/TrafficLight";
import AuthGlobal from "../../Context/store/AuthGlobal";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import Input from "../../components/Form/Input";
import { FlatList } from "react-native-gesture-handler";
import ReviewCard from "./ReviewCard";

let { width } = Dimensions.get("window");

function SingleProduct(props) {
  const context = useContext(AuthGlobal);
  const navigation = useNavigation();
  const [item, setItem] = useState(props.route.params.item);
  const [availability, setavailability] = useState(null);
  const [availabilityText, setavailabilityText] = useState("");
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [token, setToken] = useState();

  function ratingCompleted(rating) {
    setRating(rating);
  }

  useEffect(async () => {
    // if (context.stateUser.isAuthenticated) {
    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));

    await axios(`${baseURL}reviews/${props.route.params.item._id}`)
      .then((res) => {
        // console.log(res.data.reviews);
        setReviews(res.data.reviews);
      })
      .catch((error) => {
        console.log(error);
      });
    // }

    if (props.route.params.item.stock == 0) {
      setavailability(<TrafficLight unavailable></TrafficLight>);
      setavailabilityText("Unavailable");
    } else if (props.route.params.item.stock <= 5) {
      setavailability(<TrafficLight limited></TrafficLight>);
      setavailabilityText("Limited Stock");
    } else {
      setavailability(<TrafficLight available></TrafficLight>);
      setavailabilityText("Available");
    }

    return () => {
      setavailability(null);
      setavailabilityText("");
      setReviews([]);
    };
  }, [context.stateUser.isAuthenticated]);

  const addReview = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const reviewData = {
      productId: props.route.params.item._id,
      comment: comment,
      rating: rating,
    };

    // console.log(reviewData);
    // console.log(config);

    await axios
      .put(`${baseURL}review`, reviewData, config)
      .then((res) => {
        // const newReview = reviews.filter(
        //   (i) => i.user._id !== res.data.review.user._id
        // );
        // setReviews([...newReview, res.data.review]);
      })
      .catch((error) => {
        return console.log(error.message);
      });

    await axios
      .get(`${baseURL}reviews/${props.route.params.item._id}`)
      .then((res) => {
        // console.log(res.data.reviews);
        setReviews(res.data.reviews);
      })
      .catch((error) => {
        console.log(error);
      });

    await axios
      .get(`${baseURL}product/${props.route.params.item._id}`)
      .then((res) => {
        // console.log(res.data.reviews);
        setItem(res.data.product);
      })
      .catch((error) => {
        console.log(error);
      });

    setComment("");
    setRating(0);
  };

  // console.log(reviews);
  // console.log(comment);

  return (
    <SafeAreaView style={styles.container}>
      <NavBack />
      <ScrollView style={{ marginBottom: 80 }}>
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
              <Rating
                imageSize={40}
                startingValue={0}
                // readonly={true}
                // onChangeText={(text) => setRating(text)}
                onFinishRating={ratingCompleted}
                minValue={0}
                style={{ paddingHorizontal: 10, paddingBottom: 20 }}
              />
              <Input
                textStyle={{ width: 200, borderColor: "gold" }}
                multiline={true}
                numberOfLines={4}
                placeholder={"Type a comment"}
                name={"comment"}
                value={comment}
                onChangeText={(text) => setComment(text)}
              />
              <EasyButton
                medium
                secondary
                style={{
                  backgroundColor: "#B8860B",
                  width: 180,
                  marginTop: 20,
                }}
                onPress={() => [addReview(), setModalVisible(false)]}
              >
                <Text style={{ color: "white" }}>Submit</Text>
              </EasyButton>
            </View>
          </View>
        </Modal>
        <View>
          {/* <Swiper
            style={{
              height: 250,
              alignItems: "center",
              justifyContent: "center",
            }}
            // horizontal={false}
            showButtons={false}
            autoplay={true}
            autoplayTimeout={4}
          >
            {item?.images?.length > 0 &&
              item?.images?.map((item) => {
                return (
                  <Image
                    style={styles.image}
                    key={item.url}
                    resizeMode='contain'
                    source={{ uri: item.url }}
                  />
                )
              })}
          </Swiper> */}
          <Image
            source={{
              uri: item.image
                ? item.image.url
                : "https://res.cloudinary.com/dblprzex8/image/upload/v1647965404/ahguxi89hovqxblrvnk1.png",
            }}
            resizeMode='contain'
            style={styles.image}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.contentHeader}>{item.name}</Text>
          {/* <Text style={styles.contentText}>{item.company}</Text> */}
        </View>
        <View style={styles.availabilityContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Rating
              imageSize={20}
              startingValue={item.ratings}
              readonly={true}
              minValue={0}
              style={{ paddingHorizontal: 10 }}
            />

            <Text style={{ marginRight: 5 }}>
              {item.numOfReviews}{" "}
              {item.numberOfReviews > 1 ? "Reviews" : "Review"}
            </Text>

            <View>
              {context.stateUser.isAuthenticated ? (
                <EasyButton
                  medium
                  // primary
                  style={{
                    borderWidth: 1,
                    borderColor: "#5cb85c",
                    borderRadius: 20,
                    backgroundColor: "transparent",
                    paddingHorizontal: 5,
                    width: 80,
                    // elevation: 1,
                  }}
                  onPress={() => {
                    setModalVisible(true);
                  }}
                >
                  <Text style={{ color: "#5cb85c" }}>Submit</Text>
                </EasyButton>
              ) : (
                <EasyButton
                  medium
                  // primary
                  style={{
                    borderWidth: 1,
                    borderColor: "#5cb85c",
                    borderRadius: 20,
                    backgroundColor: "transparent",
                    paddingHorizontal: 5,
                    width: 150,
                    // elevation: 1,
                  }}
                  onPress={() => {
                    navigation.navigate("Profile2", { screen: "Login" });
                  }}
                >
                  <Text style={{ color: "#5cb85c" }}>Login to comment</Text>
                </EasyButton>
              )}
            </View>
          </View>
          <View style={styles.availability}>
            <Text style={{ marginRight: 10 }}>In Stock: {item.stock}</Text>
            {availability}
          </View>

          <Text>{item.description}</Text>
        </View>
        <View>
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>Reviews</Text>
          </View>
          {/* {context.stateUser.isAuthenticated ? ( */}
          <View>
            {reviews?.length > 0 ? (
              reviews?.map((item) => {
                return <ReviewCard key={item?._id} item={item} />;
              })
            ) : (
              <View>
                <Text>No review available</Text>
              </View>
            )}
          </View>
          {/* // ) : (
          //   <View style={{ marginBottom: 40, alignItems: "center" }}>
          //     <EasyButton
          //       medium
          //       // primary
          //       style={{
          //         borderWidth: 1,
          //         borderColor: "#5cb85c",
          //         borderRadius: 20,
          //         backgroundColor: "transparent",
          //         paddingHorizontal: 5,
          //         width: 120,
          //         // elevation: 1,
          //       }}
          //       onPress={() => {
                  // navigation.navigate("Profile2", { screen: "Login" });
          //       }}
          //     >
          //       <Text style={{ color: "#5cb85c" }}>
          //         Login to create a review
          //       </Text>
          //     </EasyButton>
          //   </View>
          // )} */}
        </View>
      </ScrollView>

      <View
        style={{
          width: "100%",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "white",
        }}
      >
        <View style={styles.bottomContainer}>
          <View>
            <Text style={styles.price}>$ {item.price}</Text>
          </View>
          <View>
            <EasyButton
              medium
              primary
              // style={{ marginRight: 40 }}
              onPress={() => {
                props.addItemToCart(item);
                Toast.show({
                  topOffset: 60,
                  type: "success",
                  text1: `${item.name} added to Cart`,
                  text2: "Go to your cart to complete order",
                });
              }}
            >
              <Text style={{ color: "white" }}>Add</Text>
            </EasyButton>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) =>
      dispatch(actions.addToCart({ quantity: 1, product })),
  };
};
const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
    paddingTop: 40,
    backgroundColor: "white",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    // alignContent: "center",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 10,
    // paddingTop: 20,
    // marginTop: 80,
  },
  imageContainer: {
    backgroundColor: "white",
    padding: 0,
    margin: 0,
  },
  image: {
    width: "100%",
    height: 250,
  },
  contentContainer: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  contentHeader: {
    fontWeight: "bold",
    marginBottom: 10,
    ...FONTS.h1,
  },
  contentText: {
    fontWeight: "bold",
    // marginBottom: 10,
    textDecorationLine: "underline",
    ...FONTS.body2,
  },
  bottomContainer: {
    width: "95%",
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "space-between",
  },
  price: {
    fontSize: 24,
    margin: 20,
    color: "red",
  },
  availabilityContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  availability: {
    flexDirection: "row",
    marginBottom: 10,
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

export default connect(null, mapDispatchToProps)(SingleProduct);
