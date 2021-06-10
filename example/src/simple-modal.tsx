import {createModal, useModal} from 'react-native-use-modal';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';

export const SimpleModal = createModal(({confirm, cancel}) => {
  return (
    <View style={styles.container}>
      <Text>Title of modal</Text>
      <Text>Content of modal</Text>
      <Button onPress={confirm}>Ok</Button>
      <Button onPress={cancel}>Cancel</Button>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 16,
  },
  button: {
    margin: 16,
  },
});

export const useSimpleModal = () =>
  useModal<typeof SimpleModal>(<SimpleModal />);
