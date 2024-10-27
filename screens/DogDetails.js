import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { DogInfo } from '../components/DogInfo';
import { DogSubInfo } from '../components/DogSubInfo';

export const DogDetails = () => {
    const pet=useLocalSearchParams();
    const navigation=useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerTransparent: true,
            headerTitle: '',
        })
    } ,[])
  return (
    <View>
        <DogInfo pet={pet}/>
        <DogSubInfo pet={pet}/>
        
    </View>
  )
}
