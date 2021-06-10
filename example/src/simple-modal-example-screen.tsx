import {Button, StyleSheet, View} from 'react-native';
import React, {useCallback} from 'react';
import {useSimpleModal} from './simple-modal';
import {ModalResultType} from 'react-native-use-modal';

export const SimpleModalExampleScreen = () => {
  const simpleModal = useSimpleModal();

  const handlePress = useCallback(async () => {
    const result = await simpleModal.show();
    if (result.type === ModalResultType.CONFIRM) {
      // modal finished by confirm action
    } else {
      // modal finished by cancel action
    }
  }, [simpleModal]);

  return (
    <View style={styles.container}>
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
});
