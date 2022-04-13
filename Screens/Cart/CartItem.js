import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { FONTS, COLORS } from "../../constants";

function CartItem(props) {
  const data = props.item.item.product;
  const [quantity, setQuantity] = useState(props.item.item.quantity);

  return (
    <View key={Math.random()} style={styles.listItem}>
      {/* left */}
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          // padding: 10,
          marginRight: 15,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{
            uri: data.image
              ? data.image.url
              : "https://res.cloudinary.com/dblprzex8/image/upload/v1647965404/ahguxi89hovqxblrvnk1.png",
          }}
          // resizeMode='contain'
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            // marginRight: 8,
          }}
        />
      </View>

      {/* Right */}
      <View style={styles.body}>
        {/* left */}
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ ...FONTS.body3 }}>{data.name}</Text>
        </View>

        {/* right */}
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ ...FONTS.body3 }}>$ {data.price}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  listItem: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
    padding: 10,
    paddingVertical: 6,
    // marginBottom: 2,
  },
  body: {
    flex: 1,
    // margin: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray10,
  },
});

export default CartItem;
