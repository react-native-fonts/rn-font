import * as React from 'react';

import {StyleSheet, View, Text} from 'react-native';
import {usePoppins} from 'rn-font';

export default function App() {
  const {isLoaded} = usePoppins({
    weight: ['400'],
  });

  return (
    <View style={styles.container}>
      <Text>{isLoaded.toString()} asd</Text>
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
