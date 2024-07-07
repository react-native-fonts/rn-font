import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Comp from './src/Comp';
import {useAbel, useLora} from '@react-native-fonts/fonts';

export default function App() {
  const {} = useAbel({
    weight: '400',
  });

  const {} = useLora({
    weight: '400',
  });

  return (
    <View style={styles.container}>
      <Text style={{fontFamily: 'Lora'}}>{'test234'}</Text>
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
