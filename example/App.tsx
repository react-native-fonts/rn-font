import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useOjuju} from '@react-native-fonts/fonts';
import Comp from './src/Comp';

export default function App() {
  const {isLoaded} = useOjuju({
    weight: ['400', '300'],
    style: ['normal'],
  });

  console.log('test23456');

  return (
    <View style={styles.container}>
      <Text style={{fontFamily: 'ojuju-400-normal'}}>
        {isLoaded.toString() + ' asdasd '}
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
