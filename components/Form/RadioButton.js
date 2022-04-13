import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { connect } from "react-redux"
import Ionicons from "react-native-vector-icons/Ionicons"

import { COLORS, FONTS, SIZES } from "../../constants"
import LineDivider from "../LineDivider"

const RadioButton = ({
  containerStyle,
  radioLabel,
  isLastItem,
  isSelected,
  onPress,
}) => {
  return (
    <>
      <TouchableOpacity
        style={{
          width: "100%",
          flexDirection: "row",
          height: 50,
          alignItems: "center",
          // alignContent: "center",
          justifyContent: "center",
          paddingHorizontal: 10,
          ...containerStyle,
        }}
        onPress={onPress}
      >
        <View
          style={{
            // width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              // justifyContent: "flex-end",
              // alignItems: "flex-end",
              // backgroundColor: "red",
            }}
          >
            <Text
              style={{
                color: COLORS.gray60,
                // flex: 1,
                // alignSelf: "flex-start",

                ...FONTS.body3,
              }}
            >
              {radioLabel?.label}
            </Text>
          </View>

          <View>
            {
              isSelected && (
                <Ionicons
                  name='checkmark-sharp'
                  size={25}
                  color={COLORS.primary}
                />
              )
              // : (
              //   <Ionicons
              //     name='radio-button-off'
              //     size={20}
              //     color={COLORS.primary}
              //   />
              // )
            }
          </View>
        </View>
      </TouchableOpacity>
      <LineDivider />
    </>
  )
}

export default RadioButton
