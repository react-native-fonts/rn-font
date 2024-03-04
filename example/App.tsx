import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {usePoppins} from '@react-native-fonts/fonts';
import Comp from './src/Comp';

export default function App() {
  const {isLoaded} = usePoppins({
    weight: ['400'],
    style: ['normal'],
    subsets: ['latin'],
  });

  console.log('asd');

  return (
    <View style={styles.container}>
      <Text>{isLoaded.toString()}</Text>
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
