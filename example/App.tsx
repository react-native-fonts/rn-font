import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Comp from './src/Comp';
import {useMonoton} from 'react-native-simple-fonts';

export default function App() {
  const {fontFamily} = useMonoton({
    weight: '400',
  });

  return (
    <View style={styles.container}>
      <Text style={{fontFamily}}>{'Everyone has gówno'}</Text>
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
