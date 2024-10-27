import React from 'react'
import { View } from 'react-native'

export default function DogSubInfo({pet}) {
  return (
    <View stylre={{
        padding: 20,
    }}>
        <View style={{
            display: 'flex',
            flexDirection: 'row'
        }}>
            <DogSubInfoCard 
            icon={require('./../assets/Data.png')} 
            title={'age'}
            value={pet?.age}
            />
            <DogSubInfoCard 
            icon={require('./../assets/Data.png')} 
            title={'breed'}
            value={pet?.breed}
            />
        </View>
    </View>
  )
};
