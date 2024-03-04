import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {usePoppins, useInter} from 'rn-font';

export default function App() {
  const {} = usePoppins({
    weight: '600',
    style: 'normal',
    display: 'swap',
    subsets: ['latin'],
  });

  const {isLoaded} = useInter({
    weight: ['500', '300'],
    style: ['normal'],
    subsets: ['latin-ext'],
  });

  console.log('dwaawadd1tg');

  return (
    <View style={styles.container}>
      <Text>{isLoaded.toString()}</Text>
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
