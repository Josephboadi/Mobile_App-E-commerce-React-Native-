import React, { useState, useEffect, useCallback } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Banner from "../../components/Banner";

import Header from "../../components/Header";
import CategoryFilter from "./CategoryFilter";
import ProductList from "./ProductList";
import SearchProduct from "./SearchProduct";

import baseUrl from "../../assets/common/baseUrl";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const data = require("../../assets/data/products.json");
const catData = require("../../assets/data/categories.json");

const { width, height } = Dimensions.get("window");

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);
  const [loading, setLoading] = useState(true);

  // useFocusEffect(
  //   useCallback(async () => {
  //     setFocus(false)
  //     setCategories(catData)
  //     setActive(-1)

  //     // console.log(baseURL)
  //     await axios.get(`${baseUrl}products`).then((res) => {
  //       // console.log(res.data.products)
  //       setProducts(res.data.products)
  //       setProductsFiltered(res.data.products)
  //       setProductsCtg(res.data.products)
  //       setInitialState(res.data.products)
  //       setLoading(false)
  //     })

  //     return () => {
  //       setProducts([])
  //       setProductsFiltered([])
  //       setFocus()
  //       setCategories([])
  //       setProductsCtg([])
  //       setActive()
  //       setInitialState()
  //     }
  //   }, [])
  // )

  useEffect(async () => {
    setFocus(false);
    setCategories(catData);
    setActive(-1);

    // console.log(baseURL)
    await axios.get(`${baseUrl}products`).then((res) => {
      // console.log(res.data.products)
      setProducts(res.data.products);
      setProductsFiltered(res.data.products);
      setProductsCtg(res.data.products);
      setInitialState(res.data.products);
      setLoading(false);
    });

    return () => {
      setProducts([]);
      setProductsFiltered([]);
      setFocus();
      setCategories([]);
      setProductsCtg([]);
      setActive();
      setInitialState();
    };
  }, []);

  const searchProduct = (text) => {
    setProductsFiltered(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };
  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  // Categories
  const changeCtg = (ctg) => {
    {
      ctg === "all"
        ? [setProductsCtg(initialState), setActive(true)]
        : setProductsCtg(
            products.filter((i) => i.category._id === ctg),
            setActive(true)
          );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, width: width, paddingTop: 40 }}>
      <Header />

      {loading == false ? (
        <>
          <View
            style={{
              width: width,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 10,
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
                onFocus={openList}
                onChangeText={(text) => searchProduct(text)}
                placeholder='Search'
              />

              {focus == true ? (
                <TouchableOpacity onPress={onBlur}>
                  <MaterialIcons
                    name='close'
                    size={20}
                    color='#c6c6c6'
                    style={{ marginRight: 5 }}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>

          {focus == true ? (
            <SearchProduct productsFiltered={productsFiltered} />
          ) : (
            <>
              <ScrollView>
                <View>
                  <Banner />
                </View>
                <View>
                  <CategoryFilter
                    categories={categories}
                    categoryFilter={changeCtg}
                    productsCtg={productsCtg}
                    active={active}
                    setActive={setActive}
                  />
                </View>
                {productsCtg.length > 0 ? (
                  <ScrollView contentContainerStyle={styles.listContainer}>
                    {productsCtg.map((item) => {
                      return <ProductList key={item._id} item={item} />;
                    })}
                  </ScrollView>
                ) : (
                  <View style={[styles.center, { height: height / 2 }]}>
                    <Text>No products found</Text>
                  </View>
                )}
              </ScrollView>
            </>
          )}
        </>
      ) : (
        <View style={[styles.center, { backgroundColor: "#f2f2f2", flex: 1 }]}>
          <ActivityIndicator size={"large"} color='red' />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "gainsboro",
  },
  listContainer: {
    // height: height,
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductContainer;
