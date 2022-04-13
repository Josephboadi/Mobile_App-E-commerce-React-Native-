import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import Toast from "react-native-toast-message";
import { Rating } from "react-native-ratings";
import * as actions from "../../Redux/Actions/cartActions";
import EasyButton from "../../components/StyledComponents/EasyButton";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const { width } = Dimensions.get("window");

const ProductCard = (props) => {
  const { name, price, image, stock, ratings, numOfReviews } = props;

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        // resizeMode='contain'
        source={{
          uri: image
            ? image.url
            : "https://res.cloudinary.com/dblprzex8/image/upload/v1647965404/ahguxi89hovqxblrvnk1.png",
        }}
      />
      <View style={styles.card} />
      <Text style={styles.title}>
        {name.length > 15 ? name.substring(0, 15 - 3) + "..." : name}
      </Text>
      <Text style={styles.price}>${price}</Text>
      <View
        style={{
          position: "absolute",
          bottom: 18,
          left: 10,
          // flexDirection: "row",
          // alignItems: "center",
        }}
      >
        <Rating
          imageSize={15}
          startingValue={ratings}
          readonly={true}
          minValue={0}
          style={{ marginRight: 4 }}
        />
        {/* <Text>({numOfReviews})</Text> */}
      </View>
      {
        stock > 0 ? (
          <View style={{ position: "absolute", bottom: 15, right: 15 }}>
            <TouchableOpacity
              onPress={() => {
                props.addItemToCart(props);
                Toast.show({
                  topOffset: 60,
                  type: "success",
                  text1: `${name} added to Cart`,
                  text2: "Go to your cart to complete order",
                });
              }}
            >
              <FontAwesome name='cart-plus' size={24} color={"#AB274F"} />
            </TouchableOpacity>
          </View>
        ) : null
        // <Text style={{ marginTop: 20 }}>Currently Unavailable</Text>
      }
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) =>
      dispatch(actions.addToCart({ quantity: 1, product })),
  };
};

const styles = StyleSheet.create({
  container: {
    width: width / 2 - 20,
    height: width / 1.7,
    padding: 10,
    borderRadius: 10,
    marginTop: 55,
    marginBottom: 5,
    marginLeft: 10,
    alignItems: "center",
    elevation: 8,
    backgroundColor: "white",
  },
  image: {
    width: width / 2 - 20 - 20,
    height: width / 2 - 20 - 30,
    backgroundColor: "transparent",
    // borderTopRightRadius: width / 4 - 20 - 40,
    position: "absolute",
    top: -45,
  },
  card: {
    marginBottom: 10,
    height: width / 2 - 20 - 90,
    backgroundColor: "transparent",
    width: width / 2 - 20 - 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  price: {
    fontSize: 20,
    color: "#7CB9E8",
    marginTop: 10,
  },
});

export default connect(null, mapDispatchToProps)(ProductCard);
