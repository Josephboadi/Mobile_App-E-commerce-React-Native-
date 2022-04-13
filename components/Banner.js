import React, { useState, useEffect } from "react";
import { Image, ScrollView, Dimensions, View, StyleSheet } from "react-native";
import Swiper from "react-native-swiper/src";

const { width } = Dimensions.get("window");

const Banner = () => {
  const [bannerData, setBannerData] = useState([]);

  useEffect(() => {
    setBannerData([
      "https://res.cloudinary.com/dblprzex8/image/upload/v1608045958/hufh3y7kc9yl5oxsoohc.jpg",
      "https://res.cloudinary.com/dblprzex8/image/upload/v1608045957/w0kn3f66qkzu1uim3s7m.jpg",
      "https://res.cloudinary.com/dblprzex8/image/upload/v1625056879/rtnp4r8myw0p4h1m8u7w.jpg",
    ]);

    return () => {
      setBannerData([]);
    };
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.swiper}>
          <Swiper
            style={{
              height: width / 2,
              alignItems: "center",
              justifyContent: "center",
            }}
            showButtons={false}
            autoplay={true}
            autoplayTimeout={2}
          >
            {bannerData.map((item) => {
              return (
                <Image
                  style={styles.imageBanner}
                  key={item}
                  // resizeMode='contain'
                  source={{ uri: item }}
                />
              );
            })}
          </Swiper>
          <View style={{ height: 20 }}></View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gainsboro",
    alignItems: "center",
    justifyContent: "center",
  },
  swiper: {
    width: width,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  imageBanner: {
    height: width / 2,
    width: width - 20,
    borderRadius: 10,
    marginHorizontal: 30,
    alignSelf: "center",
  },
});

export default Banner;
