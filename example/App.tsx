import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useABeeZee} from 'rn-font';
import Comp from './src/Comp';

export default function App() {
  const {isLoaded} = useABeeZee({
    weight: ['400', '400'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
  });

  console.log('test');

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
