import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Comp from './src/Comp';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{fontFamily: 'ojuju_extralight'}}>
        {' asdasadwadfaafdassqfaaf '}
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
