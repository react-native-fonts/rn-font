import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useAbhaya_Libre} from '@react-native-fonts/fonts';
import Comp from './src/Comp';

export default function App() {
  const {fontFamily, isLoaded} = useAbhaya_Libre({
    weight: ['400'],
    style: ['normal'],
  });

  console.log('test', fontFamily.toLowerCase());

  return (
    <View style={styles.container}>
      <Text style={{fontFamily: fontFamily}}>
        {isLoaded.toString() + ' asdasdasdaf '}
      </Text>
      <Text style={{fontFamily: 'abeezee_regularitalic'}}>
        {isLoaded.toString() + ' as '}
      </Text>
      <Text style={{fontFamily: 'ojuju_extralight'}}>
        {isLoaded.toString() + ' asdasafaafdasfaaf '}
      </Text>
      <Comp />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
