import {Button, Paragraph, Title} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Space} from '../view';
import {createUseModal} from '../../../src/create-use-modal';

export const useAlertModal = createUseModal<
  void,
  {title: string; message: string}
>(({confirm, cancel, param}) => {
  return (
    <View style={styles.container}>
      <Title>{param.title}</Title>
      <Paragraph>{param.message}</Paragraph>
      <Space height={16} />
      <View style={styles.buttonContainer}>
        <Button onPress={confirm}>Ok</Button>
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
    paddingVertical: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
});
