import { View, Text } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'

export default function DogSuInforCard({icon, title, value}) {
  return (
    <View>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: Colors.WHITE,
                padding: 10,
                margin: 5,
                borderRadius: 10,
                gap: 10,
                flex: 1,
            }}>
                <Image source={icon}
                style={{
                    width: 40,
                    height: 40,
                }}/>
                <View>
                    <Text style={{
                        fontFamily: 'outfit',
                        fontSize: 16,
                        color: Colors.GRAY,
                    }}>{title}</Text>
                    <Text style={{
                        fontFamily: 'outfit-medium',
                        fontSize: 20,
                    }}>{value}</Text>
                </View>
            
            </View> 
    </View>
  )
}