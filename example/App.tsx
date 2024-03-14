import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useOjuju} from '@react-native-fonts/fonts';
import Comp from './src/Comp';

export default function App() {
  const {isLoaded} = useOjuju({
    weight: ['200', '400'],
    style: ['normal'],
  });

  console.log('test');

  return (
    <View style={styles.container}>
      <Text style={{fontFamily: 'poppins_regular'}}>
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
