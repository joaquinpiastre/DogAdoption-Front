import React from 'react'
import { View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';

export const DogInfo = ({pet}) => {
  return (
    <View>
        <Image source={{uri: pet.image}}
        style= {{
            widht: '100%',
            height:400,
            objectFit: 'cover',
        }}/>
        <View style={{
            padding: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
        }}>
            <View style={{
                fontSize: 27,
                fontFamily: 'outfit-bold',
            }}
            >{pet?.name}</View>
                <Text style={{
                    fontSize: 16,
                    fontFamily: 'outfit',
                    color: colors.GRAY,
                }}>{pet?.address}</Text>
            </View>
            <AntDesign name="hearto" size={24} color="black" />
        </View>
  )
}
