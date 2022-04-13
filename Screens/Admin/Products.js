import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions,
  TextInput,
  ScrollView,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import axios from "axios";
import baseUrl from "../../assets/common/baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import ListItem from "./ListItem";
import EasyButton from "../../components/StyledComponents/EasyButton";

let { width, height } = Dimensions.get("window");

const ListHeader = () => {
  return (
    <View elevation={1} style={styles.listHeader}>
      <View style={styles.headerItem}></View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "bold" }}>Brand</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "bold" }}>Name</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "bold" }}>Category</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "bold" }}>Price</Text>
      </View>
    </View>
  );
};

const Products = (props) => {
  const navigation = useNavigation();
  const [focus, setFocus] = useState();
  const [productList, setProductList] = useState();
  const [productFilter, setProductFilter] = useState();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();

  useFocusEffect(
    useCallback(() => {
      // Get Token
      AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res);
        })
        .catch((error) => console.log(error));

      axios.get(`${baseUrl}products`).then((res) => {
        setProductList(res.data.products);
        setProductFilter(res.data.products);
        setLoading(false);
      });
      return () => {
        setProductList();
        setProductFilter();
        setLoading(true);
      };
    }, [])
  );

  //   console.log(productFilter)

  const searchProduct = (text) => {
    if (text == "") {
      setProductFilter(productList);
    }

    setProductFilter(
      productList.filter((i) =>
        i.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const deleteProduct = (id) => {
    // console.log(`${baseUrl}product/${id}`)
    axios
      .delete(`${baseUrl}product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const products = productFilter.filter((item) => item._id !== id);
        setProductFilter(products);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <View style={styles.buttonContainer}>
        <EasyButton
          secondary
          medium
          onPress={() => navigation.navigate("Orders", { token: token })}
        >
          <FontAwesome name='shopping-bag' size={18} color='white' />
          <Text style={styles.buttonText}>Orders</Text>
        </EasyButton>
        <EasyButton
          secondary
          medium
          onPress={() => navigation.navigate("ProductForm")}
        >
          <FontAwesome name='plus' size={18} color='white' />
          <Text style={styles.buttonText}>Product</Text>
        </EasyButton>
        <EasyButton
          secondary
          medium
          onPress={() => navigation.navigate("Categories")}
        >
          <FontAwesome name='plus' size={18} color='white' />
          <Text style={styles.buttonText}>Category</Text>
        </EasyButton>
      </View>
      <View>
        {/* Header */}
        <View
          style={{
            width: width,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            // marginBottom: 10,
            // marginTop: 10,
            backgroundColor: "white",
            paddingVertical: 10,
            paddingTop: 20,
          }}
        >
          <View
            style={{
              width: width - 20,
              flexDirection: "row",
              alignItems: "center",
              borderColor: "#c6c6c6",
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 10,
              paddingVertical: 6,
              marginBottom: 8,
            }}
          >
            <Feather
              name='search'
              size={20}
              color='#c6c6c6'
              style={{ marginRight: 5 }}
            />
            <TextInput
              style={{ flex: 1 }}
              // onFocus={openList}
              onChangeText={(text) => searchProduct(text)}
              placeholder='Search'
            />
          </View>
        </View>
      </View>

      {loading ? (
        <View style={styles.spinner}>
          <ActivityIndicator size={"large"} color='red' />
        </View>
      ) : (
        <ScrollView>
          <FlatList
            style={{ marginBottom: 10 }}
            data={productFilter}
            ListHeaderComponent={ListHeader}
            renderItem={({ item, index }) => (
              <ListItem {...item} index={index} delete={deleteProduct} />
            )}
            keyExtractor={(item) => item._id}
          />
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  listHeader: {
    flexDirection: "row",
    padding: 5,
    backgroundColor: "gainsboro",
  },
  headerItem: {
    margin: 3,
    width: width / 6,
  },
  spinner: {
    height: height / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    marginBottom: 160,
    backgroundColor: "white",
  },
  buttonContainer: {
    // backgroundColor: "white",
    margin: 20,
    alignSelf: "center",
    flexDirection: "row",
  },
  buttonText: {
    marginLeft: 4,
    color: "white",
  },
});

export default Products;
