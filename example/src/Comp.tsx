import React from 'react';
import {Text, View} from 'react-native';
import {useAcme} from 'react-native-simple-fonts';

const Comp = () => {
  const {} = useAcme({
    weight: '400',
    style: 'normal',
  });
  return (
    <View>
      <Text>test</Text>
    </View>
  );
};

export default Comp;
