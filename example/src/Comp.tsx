import React from 'react';
import {Text, View} from 'react-native';
import {usePoppins} from 'rn-font';

const Comp = () => {
  const {} = usePoppins({
    weight: '400',
    style: 'normal',
    display: 'swap',
    subsets: ['latin'],
  });

  return (
    <View>
      <Text>aslmasjgfga</Text>
    </View>
  );
};

export default Comp;
