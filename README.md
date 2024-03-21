# react-native-simple-fonts
**A React Native library that makes using fonts much easier.**
<br/>
With one import you can use a font from Google Fonts or use your own font from a file. Without having to worry about linking or downloading a font from Google Fonts

## Installation

```sh
npm install react-native-simple-fonts # or yarn add react-native-simple-fonts
```
 <br/>

> [!CAUTION]
> ### Add *react-native-simple-fonts* plugin inside ```babel.config.js```

```js
module.exports = function (api) {
  // ...

  return {
    // ...
    plugins: [
      // ...
      "react-native-simple-fonts/plugin"
    ],
  };
};

```
## Using fonts from Google Fonts
You can just use font from google fonts by using the following code:
```tsx
// ...
import { useInter, usePoppins } from 'react-native-simple-fonts';

export default function App() {
  const { fontFamily } = useInter({
    weight: '400',
  });

  const { fontFamily: poppinsFontFamily } = usePoppins({
    weight: ['400', '500'],
    style: 'normal', // Or with many styles like style: ['normal', 'italic'] etc.
  });

  return (
    <View>
      <Text style={{ fontFamily }}>Hello,</Text>
      <Text style={{ fontFamily: poppinsFontFamily, fontWeight: '500' }}>World!</Text>
    </View>
  );
}
```


## Using local fonts
If you want to use local fonts, you can use the following code:
```tsx
// ...
import { useLocalFont } from 'react-native-simple-fonts';

export default function App() {
  const { fontFamily } = useLocalFont({
    source: "path/to/font.ttf",
  });

  // if you want to use font with different weight and style
  const { fontFamily: anotherFontFamily } = useLocalFont([
    {
      source: "path/to/font2.ttf",
      weight: '400',
      style: 'normal',
    },
    {
      source: "path/to/font2-bold.ttf",
      weight: '800',
      style: 'normal',
    },
    {
      source: "path/to/font2-italic.ttf",
      weight: '400',
      style: 'italic',
    }
  ]);

  return (
    <View>
      <Text style={{ fontFamily }}>Hello,</Text>
      <Text style={{ fontFamily: anotherFontFamily, fontWeight: '800' }}>World!</Text>
    </View>
  );
}
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
