import {Button, StyleSheet, View} from 'react-native';
import React, {useCallback} from 'react';
import {useSimpleBottomSheetModal} from './simple-bottom-sheet-modal';
import {Title} from 'react-native-paper';

export const SimpleBottomSheetModalExampleScreen = () => {
  const simpleModal = useSimpleBottomSheetModal();

  const handlePress = useCallback(() => {
    simpleModal.show();
  }, [simpleModal]);

  return (
    <View style={styles.container}>
      <Title>Simple Bottom Sheet</Title>
      <View style={styles.space} />
      <Button title={'show'} onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  space: {
    height: 48,
  },
});
