import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseUrl from "../../assets/common/baseUrl";
import axios from "axios";
import mime from "mime";

import FormContainer from "../../components/Form/FormContainer";
import Input from "../../components/Form/Input";
import EasyButton from "../../components/StyledComponents/EasyButton";
import Error from "../../components/Error";
import FormButton from "../../components/FormButton";

const ProductForm = (props) => {
  const navigation = useNavigation();
  const [pickerValue, setPickerValue] = useState();
  const [brand, setBrand] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [mainImage, setMainImage] = useState();
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState([]);
  const [token, setToken] = useState();
  const [err, setError] = useState();
  const [countInStock, setCountInStock] = useState();
  const [rating, setRating] = useState(0);
  const [isFeatured, setIsFeatured] = useState(false);
  const [richDescription, setRichDescription] = useState();
  const [numReviews, setNumReviews] = useState(0);
  const [item, setItem] = useState(null);
  const [newImage, setNewImage] = useState(false);

  // console.log(props.route.params.item);

  useEffect(async () => {
    if (!props.route.params) {
      setItem(null);
    } else {
      setItem(props.route.params.item);
      setBrand(props.route.params.item.company);
      setName(props.route.params.item.name);
      setPrice(props.route.params.item.price.toString());
      setDescription(props.route.params.item.description);
      setMainImage(props.route.params.item.image.url);
      setImage(props.route.params.item.image.url);
      setCategory(props.route.params.item.category._id);
      setPickerValue(props?.route?.params?.item?.category?.name);
      setCountInStock(props.route.params.item.stock.toString());
    }

    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));

    // Categories
    await axios
      .get(`${baseUrl}categories`)
      .then((res) => setCategories(res.data.categories))
      .catch((error) => alert("Error to load categories"));

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
      setCategories([]);
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

  const addProduct = async () => {
    if (
      !name ||
      !brand ||
      !price ||
      !description ||
      !category ||
      !countInStock ||
      !image
    ) {
      setError("Please fill in the  form correctly");
    }

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
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("company", brand);
    formData.append("stock", countInStock);
    formData.append("newImage", newImage);

    // formData.append("richDescription", richDescription);
    // formData.append("rating", rating);
    // formData.append("numReviews", numReviews);
    // formData.append("isFeatured", isFeatured);

    const data = {
      name: name,
      price: price,
      description: description,
      category: category,
      company: brand,
      stock: countInStock,
    };
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      transformRequest: (data, headers) => {
        return formData;
      },
    };

    if (item !== null) {
      axios
        .put(`${baseUrl}product/${item?._id}`, formData, config)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            Toast.show({
              topOffset: 60,
              type: "success",
              text1: "Product Updated",
              text2: "Product updated successfully",
            });
            setTimeout(() => {
              navigation.navigate("Products");
            }, 500);
          }
        })
        .catch((error) => {
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Something went wrong",
            text2: "Please try again",
          });
        });
    } else {
      axios
        .post(`${baseUrl}product/create`, formData, config)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            Toast.show({
              topOffset: 60,
              type: "success",
              text1: "New Product added",
              text2: "Product added successfully",
            });
            setTimeout(() => {
              navigation.navigate("Products");
            }, 500);
            navigation.navigate("Products");
          }
        })
        .catch((error) => {
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Something went wrong",
            text2: "Please try again",
          });
        });
    }
  };

  return (
    <FormContainer title='Add Product'>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: mainImage }} />
        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
          <FontAwesome style={{ color: "white" }} name='camera' />
        </TouchableOpacity>
      </View>
      <View style={styles.label}>
        <Text style={{}}>Brand</Text>
      </View>
      <Input
        placeholder='Brand'
        name='brand'
        id='brand'
        value={brand}
        onChangeText={(text) => setBrand(text)}
      />

      <View style={styles.label}>
        <Text style={{}}>Name</Text>
      </View>
      <Input
        placeholder='Name'
        name='name'
        id='name'
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <View style={styles.label}>
        <Text style={{}}>Price</Text>
      </View>
      <Input
        placeholder='Price'
        name='price'
        id='price'
        value={price}
        keyboardType={"numeric"}
        onChangeText={(text) => setPrice(text)}
      />

      <View style={styles.label}>
        <Text style={{}}>Count in Stock</Text>
      </View>
      <Input
        placeholder='Stock'
        name='stock'
        id='stock'
        value={countInStock}
        keyboardType={"numeric"}
        onChangeText={(text) => setCountInStock(text)}
      />

      <View style={styles.label}>
        <Text style={{}}>Description</Text>
      </View>
      <Input
        placeholder='Description'
        name='description'
        id='description'
        value={description}
        onChangeText={(text) => setDescription(text)}
      />

      <SelectDropdown
        data={categories}
        buttonStyle={{
          width: "80%",
          backgroundColor: "#eee",
          alignSelf: "center",
        }}
        buttonTextStyle={{
          // left: 120,
          marginLeft: 5,
          textAlign: "left",
          color: "grey",
        }}
        onSelect={(selectedItem, index) => {
          // console.log(selectedItem.id, index);
          setPickerValue(selectedItem?.name);
          setCategory(selectedItem?._id);
        }}
        defaultButtonText={pickerValue ? pickerValue : "Select Category"}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected

          return pickerValue;
        }}
        renderDropdownIcon={() => (
          <FontAwesome name='caret-down' size={25} color='#007aff' />
        )}
        dropdownStyle={{
          height: 450,
        }}
        rowTextStyle={{
          // alignItems: 'flex-start',
          // right: 110,
          marginLeft: 20,
          textAlign: "left",
          color: "grey",
        }}
        dropdownIconPosition='right'
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item?.name;
        }}
      />
      {err ? <Error message={err} /> : null}
      <View
        style={{
          width: "80%",
          alignItems: "center",
          marginTop: 10,
          marginBottom: 80,
        }}
      >
        <FormButton buttonTitle={"Confirm"} onPress={() => addProduct()} />
        {/* <EasyButton large primary onPress={() => addProduct()}>
          <Text>Confirm</Text>
        </EasyButton> */}
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  label: {
    width: "80%",
    marginTop: 10,
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
});

export default ProductForm;
