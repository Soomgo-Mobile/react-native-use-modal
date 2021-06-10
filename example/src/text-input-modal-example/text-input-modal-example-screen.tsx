import React, {useCallback, useState} from 'react';
import {ModalResultType} from 'react-native-use-modal';
import {Button, StyleSheet, View} from 'react-native';
import {Paragraph, Title} from 'react-native-paper';
import {useTextInputModal} from './text-input-modal';

export const TextInputModalExampleScreen = () => {
  const modalWithInput = useTextInputModal();

  const [modalResultText, setModalResultText] = useState('not yet');

  const handlePress = useCallback(async () => {
    const result = await modalWithInput.show();
    if (result.type === ModalResultType.CONFIRM) {
      // modal finished by confirm action
      setModalResultText('Your name is: ' + result.data);
    } else {
      // modal finished by cancel action
      setModalResultText('User canceled name entry.');
    }
  }, [modalWithInput]);

  return (
    <View style={styles.container}>
      <Title>Result</Title>
      <Paragraph>{modalResultText}</Paragraph>
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
