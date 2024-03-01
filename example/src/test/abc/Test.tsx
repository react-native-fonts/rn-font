import React from 'react';
import {Text, View} from 'react-native';
import {useInter} from 'rn-font';

const TestComp = () => {
  const {} = useInter({
    weight: ['400', '500'],
    style: 'normal',
    display: 'swap',
    subsets: ['latin'],
  });
  return (
    <View>
      <Text>aslddjhgsaspaasdslk</Text>
    </View>
  );
};

export default TestComp;
