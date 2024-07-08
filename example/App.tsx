import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Comp from './src/Comp';
import {useAbyssinica_SIL} from 'react-native-simple-fonts';

export default function App() {
  const {} = useAbyssinica_SIL({
    weight: '400',
  });

  return (
    <View style={styles.container}>
      <Text style={{fontFamily: 'Ojuju'}}>{'test123ma'}</Text>
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
