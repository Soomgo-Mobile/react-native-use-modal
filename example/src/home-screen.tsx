import { Button, StyleSheet, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import type { RootStackNavigationProp } from './App';

export const HomeScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <View style={styles.container}>
      <Button
        title={'show'}
        onPress={() => {
          navigation.push('simple-modal-example');
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
