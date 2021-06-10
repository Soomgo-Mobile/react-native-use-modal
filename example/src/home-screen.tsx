import {Button, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import type {RootStackNavigationProp} from './App';

export const HomeScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Button
          title={'Simple modal example'}
          onPress={() => {
            navigation.push('SIMPLE_MODAL_EXAMPLE');
          }}
        />
        <Button
          title={'Text input modal example'}
          onPress={() => {
            navigation.push('TEXT_INPUT_MODAL_EXAMPLE');
          }}
        />
        <Button
          title={'Alert modal example'}
          onPress={() => {
            navigation.push('ALERT_MODAL_EXAMPLE');
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
});
