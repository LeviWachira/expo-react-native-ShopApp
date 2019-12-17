import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import productsReducer from './src/store/reducers/products';
import cartReducer from './src/store/reducers/cart';
import ShopNavigators from './src/navigation/ShopNavigators';

const rootReducer = combineReducers({
  products: productsReducer ,
  cart : cartReducer
});


const store = createStore(rootReducer);

const fetchFont = () => {

  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [fontLoaded, SetFontLoaded] = useState(false);



  if (!fontLoaded) {
    <AppLoading
      startAsync={fetchFont}
      onFinish={() => SetFontLoaded(true)}
    />
  }

  return (
    <Provider store={store}>
      <ShopNavigators />
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
