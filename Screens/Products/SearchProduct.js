import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
export default function SearchProduct(props) {
  const { productsFiltered } = props;

  const navigation = useNavigation();
  return (
    <>
      {productsFiltered.length > 0 ? (
        productsFiltered.map((item) => (
          <TouchableOpacity
            key={item._id}
            onPress={() => navigation.navigate("SingleProduct", { item: item })}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
                marginHorizontal: 10,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
              >
                <Image
                  source={{
                    uri: item.image
                      ? item.image.url
                      : "https://res.cloudinary.com/dblprzex8/image/upload/v1647965404/ahguxi89hovqxblrvnk1.png",
                  }}
                  style={{
                    width: 55,
                    height: 55,
                    borderRadius: 10,
                    marginRight: 8,
                  }}
                />
                <View style={{ flex: 1 }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      color: "#333",
                      // fontFamily: 'Roboto-Medium',
                      fontWeight: "bold",
                      fontSize: 14,
                      textTransform: "uppercase",
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      color: "#333",
                      // fontFamily: 'Roboto-Medium',
                      fontSize: 14,
                    }}
                  >
                    {item.description}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <View style={styles.center}>
          <Text style={{ alignSelf: "center" }}>
            No products match the selected criteria
          </Text>
        </View>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {},
  center: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
});
