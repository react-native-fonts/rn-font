import React from 'react';
import {Text, View} from 'react-native';
import {usePoppins} from '@react-native-fonts/fonts';

const Comp = () => {
  const {} = usePoppins({
    weight: '500',
    style: 'italic',
    display: 'swap',
    subsets: ['latin'],
  });

  return (
    <View>
      <Text>dd</Text>
    </View>
  );
};

export default Comp;
