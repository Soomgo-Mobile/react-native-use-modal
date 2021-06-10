import * as React from 'react';
import {ModalProvider} from 'react-native-use-modal';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {SimpleModalExampleScreen} from './simple-modal-example-screen';
import {HomeScreen} from './home-screen';

type RootStackParamList = {
  'simple-modal-example': undefined;
  home: undefined;
};

export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <ModalProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'home'}>
          <Stack.Screen name={'home'} component={HomeScreen} />
          <Stack.Screen
            name={'simple-modal-example'}
            component={SimpleModalExampleScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ModalProvider>
  );
}
