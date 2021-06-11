import {
  Button,
  HelperText,
  Paragraph,
  TextInput,
  Title,
} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Space} from '../view';
import _ from 'lodash';
import {createUseModal} from '../../../src/create-use-modal';

const isNameValid = (value: string) => value.length > 2;

export const useTextInputModal = createUseModal<string>(({confirm, cancel}) => {
  const [name, setName] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const handlePressConfirm = useCallback(() => {
    if (isNameValid(name)) {
      setErrorMessage('');
      confirm(name);
    } else {
      setErrorMessage('Name must be at least three letters long');
    }
  }, [confirm, name]);

  return (
    <View style={styles.container}>
      <Title>Enter your name</Title>
      <Paragraph>Will display your name on the screen.</Paragraph>
      <Space height={16} />
      <TextInput
        label={'Name'}
        value={name}
        onChangeText={setName}
        mode={'outlined'}
        error={!_.isEmpty(errorMessage)}
      />
      <HelperText type={'error'}>{errorMessage}</HelperText>
      <Space height={16} />
      <View style={styles.buttonContainer}>
        <Button onPress={handlePressConfirm}>Confirm</Button>
        <Button onPress={cancel}>Cancel</Button>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
});
