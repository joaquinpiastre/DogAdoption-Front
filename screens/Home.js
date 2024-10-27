import React from 'react'
import { Header } from 'react-native/Libraries/NewAppScreen'
import { View } from 'react-native'
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Colors from '../constants/Colors'


export const Home = () => {
  return (
    <view>
        <Header />
        <View style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            padding: 20,
            marginTop: 20,
            backgroundColor:Colors.LIGHT_PRIMARY,
            borderColor: Colors.PRIMARY,
            borderRadio: 15,
            orderStyle: "dashed",
            justifyContent: "center",
        }}
        >
        <MaterialIcons name="pets" size={24} color="black" />    
            <text Style={{
                fontFamily: "outfit-medium",
                color: Colors.PRIMARY,
            }}
            >Add new Dog</text>
        </View>    
    </view>
  )
}
