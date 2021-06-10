import {Button, StyleSheet, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useSimpleModal} from './simple-modal';
import {ModalResultType} from 'react-native-use-modal';
import {Paragraph, Title} from 'react-native-paper';

export const SimpleModalExampleScreen = () => {
  const simpleModal = useSimpleModal();

  const [modalResultText, setModalResultText] = useState('not yet');

  const handlePress = useCallback(async () => {
    const result = await simpleModal.show();
    if (result.type === ModalResultType.CONFIRM) {
      // modal finished by confirm action
      setModalResultText('User confirmed.');
    } else {
      // modal finished by cancel action
      setModalResultText('User canceled.');
    }
  }, [simpleModal]);

  return (
    <View style={styles.container}>
      <Title>Last modal result</Title>
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
