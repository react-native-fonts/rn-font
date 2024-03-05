import React from 'react';
import {Text, View} from 'react-native';
import {useInter} from '@react-native-fonts/fonts';

const Comp = () => {
  const {} = useInter({
    weight: '500',
    style: 'normal',
  });

  return (
    <View>
      <Text>testaf</Text>
    </View>
  );
};

export default Comp;
