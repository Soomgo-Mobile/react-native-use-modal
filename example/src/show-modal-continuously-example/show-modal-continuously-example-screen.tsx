import {useSimpleModal} from '../simple-modal-example/simple-modal';
import React, {useCallback} from 'react';
import {ModalResultType} from 'react-native-use-modal';
import {Button, StyleSheet, View} from 'react-native';
import {Title} from 'react-native-paper';
import {useAlertModal} from '../alert-modal-example/alert-modal';
import {useTextInputModal} from '../text-input-modal-example/text-input-modal';

export const ShowModalContinuouslyExampleScreen = () => {
  const simpleModal = useSimpleModal();
  const alertModal = useAlertModal();
  const textInputModal = useTextInputModal();

  const handlePress = useCallback(async () => {
    const simpleModalResult = await simpleModal.show();
    if (simpleModalResult.type === ModalResultType.CANCEL) {
      return;
    }

    const textInputModalResult = await textInputModal.show();
    if (textInputModalResult.type === ModalResultType.CANCEL) {
      return;
    }

    const alertModalResult = await alertModal.show({
      title: 'Last modal',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer suscipit dignissim consectetur.',
    });
    if (alertModalResult.type === ModalResultType.CANCEL) {
      return;
    }
  }, [alertModal, simpleModal, textInputModal]);

  return (
    <View style={styles.container}>
      <Title>Show modal continuously if confirmed</Title>
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
