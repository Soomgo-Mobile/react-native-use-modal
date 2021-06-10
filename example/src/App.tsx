import * as React from 'react';
import {ModalProvider} from 'react-native-use-modal';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {HomeScreen} from './home-screen';
import {SimpleModalExampleScreen} from './simple-modal-example';
import {ModalWithInputExampleScreen} from './modal-with-input-example';

type RootStackParamList = {
  SIMPLE_MODAL_EXAMPLE: undefined;
  HOME: undefined;
  MODAL_WITH_INPUT_EXAMPLE: undefined;
};

export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <ModalProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'HOME'}>
          <Stack.Screen name={'HOME'} component={HomeScreen} />
          <Stack.Screen
            name={'SIMPLE_MODAL_EXAMPLE'}
            component={SimpleModalExampleScreen}
          />
          <Stack.Screen
            name={'MODAL_WITH_INPUT_EXAMPLE'}
            component={ModalWithInputExampleScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ModalProvider>
  );
}
