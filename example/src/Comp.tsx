import React from 'react';
import {Text, View} from 'react-native';
import {useInter} from 'rn-font';
import TestComp from './test/abc/Test';

const Comp = () => {
  const {} = useInter({
    weight: ['400', '500'],
    style: 'normal',
    display: 'swap',
    subsets: ['latin'],
  });
  return (
    <View>
      <Text>tsgkjhk</Text>
      <TestComp />
    </View>
  );
};

export default Comp;
