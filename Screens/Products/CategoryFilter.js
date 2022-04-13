import React from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { COLORS, FONTS, SIZES, icons } from "../../constants";

import TextButton from "../../components/TextButton";

const CategoryFilter = (props) => {
  return (
    <ScrollView
      bounces={true}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{ backgroundColor: "#f2f2f2" }}
    >
      <TextButton
        //   key={`createdWithin-${index}`}
        label={"All"}
        contentContainerStyle={{
          height: 45,
          paddingHorizontal: SIZES.radius + 5,
          marginLeft: SIZES.padding,
          // marginLeft: index % 3 == 0 ? 0 : SIZES.base,
          marginTop: SIZES.radius,
          marginBottom: SIZES.radius,
          borderWidth: 1,
          borderRadius: SIZES.padding,
          borderColor: COLORS.gray20,
          // backgroundColor: COLORS.primary3,
          backgroundColor: props.active == -1 ? COLORS.primary3 : COLORS.gray10,
        }}
        labelStyle={{
          // color: COLORS.white,
          color: props.active == -1 ? COLORS.white : COLORS.gray80,
          ...FONTS.body3,
        }}
        onPress={() => {
          props.categoryFilter("all"), props.setActive(-1);
        }}
      />
      {props.categories.map((item) => (
        <TextButton
          key={item._id}
          label={item.name}
          contentContainerStyle={{
            // paddingVertical: SIZES.radius,
            paddingHorizontal: SIZES.radius,
            // marginLeft: SIZES.padding,
            marginTop: SIZES.radius,
            marginBottom: SIZES.radius,
            marginLeft:
              props.categories.indexOf(item) == 0 ? SIZES.radius : SIZES.radius,
            marginRight:
              props.categories.indexOf(item) == props.categories.length - 1
                ? SIZES.padding
                : 0,
            borderRadius: SIZES.padding,
            // backgroundColor: COLORS.gray10,
            backgroundColor:
              props.active == props.categories.indexOf(item)
                ? COLORS.primary3
                : COLORS.gray10,
          }}
          labelStyle={{
            // color: COLORS.gray90,
            color:
              props.active == props.categories.indexOf(item)
                ? COLORS.white
                : COLORS.gray80,
            ...FONTS.h3,
          }}
          onPress={() => {
            props.categoryFilter(item._id),
              props.setActive(props.categories.indexOf(item));
          }}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default CategoryFilter;
