import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Comp from './src/Comp';
import {useAbel, useCustomFont} from 'react-native-simple-fonts';

export default function App() {
  const {} = useAbel({
    weight: '400',
  });

  const {fontFamily} = useCustomFont({
    source: './assets/fonts/Ojuju-Regular.ttf',
    fontName: 'Ojuju',
  });

  React.useEffect(() => {
    console.log(fontFamily);
  }, [fontFamily]);

  return (
    <View style={styles.container}>
      <Text style={{fontFamily: 'Ojuju'}}>{'test123'}</Text>
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
