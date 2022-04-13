import React from "react"
import { TouchableOpacity, View, Text, Dimensions } from "react-native"
import { useNavigation } from "@react-navigation/native"

import ProductCard from "./ProductCard"

const { width } = Dimensions.get("window")

const ProductList = (props) => {
  const { item } = props
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      style={{ width: "50%" }}
      onPress={() => navigation.navigate("SingleProduct", { item: item })}
    >
      <View style={{ width: width / 2, backgroundColor: "gainsboro" }}>
        <ProductCard {...item} />
      </View>
    </TouchableOpacity>
  )
}

export default ProductList
