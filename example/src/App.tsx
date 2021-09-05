import * as React from 'react';
import {ModalProvider} from 'react-native-use-modal';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {HomeScreen} from './home-screen';
import {SimpleModalExampleScreen} from './simple-modal-example';
import {TextInputModalExampleScreen} from './text-input-modal-example';
import {AlertModalExampleScreen} from './alert-modal-example';
import {ShowModalContinuouslyExampleScreen} from './show-modal-continuously-example';
import {ForwardedAlertModalExampleScreen} from './forwarded-alert-modal-example/forwarded-alert-modal-example-screen';
import {SimpleBottomSheetModalExampleScreen} from './simple-bottom-sheet-modal-example';
import {SafeAreaProvider} from 'react-native-safe-area-context';

type RootStackParamList = {
  SIMPLE_MODAL_EXAMPLE: undefined;
  HOME: undefined;
  TEXT_INPUT_MODAL_EXAMPLE: undefined;
  ALERT_MODAL_EXAMPLE: undefined;
  SHOW_MODAL_CONTINUOUSLY_EXAMPLE: undefined;
  FORWARDED_ALERT_MODAL_EXAMPLE: undefined;
  SIMPLE_BOTTOM_SHEET_MODAL_EXAMPLE: undefined;
};

export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <ModalProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={'HOME'}>
            <Stack.Screen name={'HOME'} component={HomeScreen} />
            <Stack.Screen
              name={'SIMPLE_MODAL_EXAMPLE'}
              component={SimpleModalExampleScreen}
            />
            <Stack.Screen
              name={'TEXT_INPUT_MODAL_EXAMPLE'}
              component={TextInputModalExampleScreen}
            />
            <Stack.Screen
              name={'ALERT_MODAL_EXAMPLE'}
              component={AlertModalExampleScreen}
            />
            <Stack.Screen
              name={'SHOW_MODAL_CONTINUOUSLY_EXAMPLE'}
              component={ShowModalContinuouslyExampleScreen}
            />
            <Stack.Screen
              name={'FORWARDED_ALERT_MODAL_EXAMPLE'}
              component={ForwardedAlertModalExampleScreen}
            />
            <Stack.Screen
              name={'SIMPLE_BOTTOM_SHEET_MODAL_EXAMPLE'}
              component={SimpleBottomSheetModalExampleScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ModalProvider>
    </SafeAreaProvider>
  );
}
