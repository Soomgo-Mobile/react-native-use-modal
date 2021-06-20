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
          title={'Simple modal'}
          onPress={() => {
            navigation.push('SIMPLE_MODAL_EXAMPLE');
          }}
        />
        <Button
          title={'Text input modal'}
          onPress={() => {
            navigation.push('TEXT_INPUT_MODAL_EXAMPLE');
          }}
        />
        <Button
          title={'Alert modal'}
          onPress={() => {
            navigation.push('ALERT_MODAL_EXAMPLE');
          }}
        />
        <Button
          title={'Show modal continuously'}
          onPress={() => {
            navigation.push('SHOW_MODAL_CONTINUOUSLY_EXAMPLE');
          }}
        />
        <Button
          title={'An example of converting an existing modal into a hook'}
          onPress={() => {
            navigation.push('FORWARDED_ALERT_MODAL_EXAMPLE');
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
