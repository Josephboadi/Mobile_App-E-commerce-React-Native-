import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
  Image,
  Button,
  Modal,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import EasyButton from "../../components/StyledComponents/EasyButton";

let { width, height } = Dimensions.get("window");
const ListItem = (props) => {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);

  // console.log(props.delete(props._id))

  return (
    <ScrollView>
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
            <EasyButton
              medium
              secondary
              onPress={() => [
                navigation.navigate("ProductForm", { item: props }),
                setModalVisible(false),
              ]}
            >
              <Text style={styles.textStyle}>Edit</Text>
            </EasyButton>
            <EasyButton
              medium
              danger
              onPress={() => [props.delete(props._id), setModalVisible(false)]}
            >
              <Text style={styles.textStyle}>Delete</Text>
            </EasyButton>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={[
          styles.container,
          {
            backgroundColor: props.index % 2 == 0 ? "white" : "gainsboro",
          },
        ]}
        onPress={() => {
          navigation.navigate("SingleProduct", { item: props });
        }}
        onLongPress={() => setModalVisible(true)}
      >
        <Image
          source={{
            uri: props.image
              ? props.image.url
              : "https://res.cloudinary.com/dblprzex8/image/upload/v1647965404/ahguxi89hovqxblrvnk1.png",
          }}
          resizeMode='contain'
          style={styles.image}
        />
        <Text style={styles.item}>{props.company}</Text>
        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.item}>
          {props.name}
        </Text>
        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.item}>
          {props.category.name}
        </Text>
        <Text style={styles.item}>$ {props.price}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 5,
    width: width,
  },
  image: {
    borderRadius: 50,
    width: width / 6,
    height: 20,
    margin: 2,
  },
  item: {
    flexWrap: "wrap",
    margin: 3,
    width: width / 6,
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
  textStyle: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ListItem;
