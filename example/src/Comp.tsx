import React from 'react';
import {Text, View} from 'react-native';
import {useInter} from '@react-native-fonts/fonts';

const Comp = () => {
  useInter({
    weight: '500',
  });
  return (
    <View>
      <Text style={{fontFamily: 'Ojuju'}}>test</Text>
    </View>
  );
};

export default Comp;
