import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useInter} from '@react-native-fonts/fonts';
import Comp from './src/Comp';

export default function App() {
  const {isLoaded, style} = useInter({
    weight: ['300'],
    style: ['normal'],
  });

  return (
    <View style={styles.container}>
      <Text style={style}>{isLoaded.toString()}</Text>
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
