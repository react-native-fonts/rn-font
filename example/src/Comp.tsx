import React from 'react';
import {Text, View} from 'react-native';
import {useInter} from 'rn-font';

const Comp = () => {
  const {} = useInter({
    weight: ['400'],
    style: 'normal',
    display: 'swap',
    subsets: ['latin'],
  });

  return (
    <View>
      <Text>asastmmzcxa</Text>
    </View>
  );
};

export default Comp;
