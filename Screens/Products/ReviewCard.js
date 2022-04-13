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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";

const { width } = Dimensions.get("window");

const ReviewCard = (props) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Image
          style={styles.image}
          // resizeMode='contain'
          source={{
            uri: props?.item?.user?.avatar
              ? props?.item?.user?.avatar?.url
              : "https://res.cloudinary.com/dblprzex8/image/upload/v1647965404/ahguxi89hovqxblrvnk1.png",
          }}
        />
        {/* <View style={styles.card} /> */}
        <View style={{ flex: 1, marginLeft: width / 2 - 20 - 85 }}>
          <View
            style={{
              // backgroundColor: "red",
              flex: 1,
              flexDirection: "row",
              alignItems: "space-between",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={{ fontWeight: "bold" }}>
                {/* {name.length > 15 ? name.substring(0, 15 - 3) + "..." : name} */}
                {props?.item?.name}
              </Text>
            </View>
            <View style={{ justifyContent: "flex-end", flexDirection: "row" }}>
              <MaterialCommunityIcons name='timelapse' size={20} color='gray' />
              <Text style={{ marginLeft: 2, color: "gray" }}>
                {moment(`${props?.item?.createdAt}`).fromNow()}
              </Text>
            </View>
          </View>
          <View
            style={{
              // position: "absolute",
              // bottom: 18,
              // left: 10,
              // flexDirection: "row",
              alignItems: "flex-start",
              marginTop: 4,
            }}
          >
            <Rating
              imageSize={20}
              startingValue={props?.item?.rating}
              readonly={true}
              minValue={0}
              // style={{ marginRight: 4 }}
            />
            {/* <Text>({numOfReviews})</Text> */}
          </View>
        </View>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text>{props?.item?.comment}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width - 20,
    // height: width / 1.7,
    padding: 10,
    borderRadius: 10,
    marginTop: 35,
    marginBottom: 5,
    marginLeft: 10,
    // alignItems: "center",
    elevation: 8,
    backgroundColor: "white",
  },
  image: {
    width: width / 2 - 20 - 90,
    height: width / 2 - 20 - 90,
    backgroundColor: "transparent",
    // borderTopRightRadius: width / 4 - 20 - 40,
    position: "absolute",
    borderRadius: width / 2 - 20 - 60,
    top: -25,
    marginBottom: 10,
  },
  // card: {
  //   marginBottom: 10,
  //   // height: width / 2 - 20 - 90,
  //   backgroundColor: "transparent",
  //   width: width /  20,
  // },
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

export default ReviewCard;
