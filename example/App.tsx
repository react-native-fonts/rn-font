import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Comp from './src/Comp';
import {useOjuju} from 'react-native-simple-fonts';

export default function App() {
  const {fontFamily} = useOjuju({
    weight: '400',
  });

  return (
    <View style={styles.container}>
      <Text style={{fontFamily}}>{'test123ma'}</Text>
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
