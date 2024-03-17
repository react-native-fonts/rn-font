import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useAbhaya_Libre, useAdamina, useInter} from '@react-native-fonts/fonts';
import Comp from './src/Comp';

export default function App() {
  const {} = useAdamina({
    weight: ['400'],
    style: ['normal'],
  });
  const {fontFamily, isLoaded} = useInter({
    weight: ['400', '100', '300', '500'],
    style: ['normal'],
  });
  const {} = useAbhaya_Libre({
    weight: ['400'],
    style: ['normal'],
  });

  return (
    <View style={styles.container}>
      <Text style={{fontFamily, fontWeight: '500'}}>
        {isLoaded.toString() + ' awsddawaghf '}
      </Text>
      <Text style={{fontFamily: 'abeezee_regularitalic'}}>
        {isLoaded.toString() + ' as '}
      </Text>
      <Text style={{fontFamily: 'ojuju_extralight'}}>
        {isLoaded.toString() + ' asdasafaafdasfaaf '}
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
