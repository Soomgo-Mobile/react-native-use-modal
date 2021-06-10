import {Button, StyleSheet, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import type {RootStackNavigationProp} from './App';

export const HomeScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <View style={styles.container}>
      <Button
        title={'Simple modal example'}
        onPress={() => {
          navigation.push('SIMPLE_MODAL_EXAMPLE');
        }}
      />
      <Button
        title={'Modal with input example'}
        onPress={() => {
          navigation.push('MODAL_WITH_INPUT_EXAMPLE');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
