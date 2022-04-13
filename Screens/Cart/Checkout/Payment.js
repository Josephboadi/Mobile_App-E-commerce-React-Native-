import React, { useState } from "react"
import { Text, View, StyleSheet, Button } from "react-native"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import SelectDropdown from "react-native-select-dropdown"
import { useNavigation } from "@react-navigation/native"
import RadioButton from "../../../components/Form/RadioButton"
import LineDivider from "../../../components/LineDivider"
import { COLORS, FONTS, SIZES } from "../../../constants"
import FormButton from "../../../components/FormButton"

const methods = [
  { label: "Cash on Delivery", value: 1 },
  { label: "Bank Transfer", value: 2 },
  { label: "Card Payment", value: 3 },
]

const paymentCards = [
  { label: "Wallet", value: 1 },
  { label: "Visa", value: 2 },
  { label: "MasterCard", value: 3 },
  { label: "Other", value: 4 },
]

function Payment(props) {
  const order = props.route.params
  const navigation = useNavigation()
  const [method, setMethod] = useState()
  const [methodValue, setMethodValue] = useState("")
  const [payCard, setPayCard] = useState("")
  const [payCardValue, setPayCardValue] = useState("")
  return (
    <>
      <View
        style={{
          marginTop: SIZES.padding,
        }}
      >
        <Text
          style={{
            color: COLORS.black,
            ...FONTS.h2,
            alignSelf: "center",
            paddingBottom: SIZES.radius,
            fontWeight: "bold",
          }}
        >
          Choose your payment method
        </Text>
        <LineDivider />

        <View>
          {methods.map((item, index) => {
            return (
              <RadioButton
                key={`PayType-${index}`}
                radioLabel={item}
                isLastItem={index == methods.length - 1}
                isSelected={method == item?.value}
                onPress={() => {
                  setMethod(item.value)
                  setMethodValue(item.label)
                }}
                containerStyle={{}}
              />
            )
          })}
        </View>
      </View>
      {method == 3 ? (
        <SelectDropdown
          data={paymentCards}
          buttonStyle={{
            width: "80%",
            backgroundColor: "#eee",
            alignSelf: "center",
            // flex: 1,
            // marginLeft: 30,
            // justifyContent: 'space-between',
            // alignItems: 'flex-start',

            // left: 20,
            // top: 50,
          }}
          buttonTextStyle={{
            // left: 120,
            marginLeft: 5,
            textAlign: "left",
            color: "grey",
          }}
          onSelect={(selectedItem, index) => {
            // console.log(selectedItem.id, index);
            setPayCardValue(selectedItem.label)
          }}
          defaultButtonText='Select a Card'
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected

            return selectedItem.label
          }}
          renderDropdownIcon={() => (
            <FontAwesome name='caret-down' size={25} color='#007aff' />
          )}
          dropdownStyle={{
            // marginTop: 200,
            height: 250,
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
            return item.label
          }}
        />
      ) : null}
      <View style={{ width: "80%", marginTop: 60, alignSelf: "center" }}>
        <FormButton
          buttonTitle={"Confirm"}
          onPress={() => navigation.navigate("Confirm", { order })}
        />
        {/* <Button
          title='Confirm'
          onPress={() => navigation.navigate("Confirm", { order })}
        /> */}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default Payment
