import React, {useCallback} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {useAlertModal} from './alert-modal';
import {ModalResultType} from 'react-native-use-modal';

export const AlertModalExampleScreen = () => {
  const alertModal = useAlertModal();

  const handlePress = useCallback(async () => {
    const result = await alertModal.show({
      title: 'Title passed by param',
      message:
        'Message passed by param.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget lectus tortor.',
    });

    if (result.type === ModalResultType.CONFIRM) {
      // handle confirm
    } else {
      // handle cancel
    }
  }, [alertModal]);

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
  space: {
    height: 48,
  },
});
