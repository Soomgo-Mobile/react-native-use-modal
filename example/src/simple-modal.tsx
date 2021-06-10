import {createModal, useModal} from 'react-native-use-modal';
import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';

export const SimpleModal = createModal(({confirm, cancel}) => {
  return (
    <View style={styles.container}>
      <Text>Title of modal</Text>
      <Text>Content of modal</Text>
      <Button title={'Ok'} onPress={confirm} />
      <Button title={'Cancel'} onPress={cancel} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export const useSimpleModal = () =>
  useModal<typeof SimpleModal>(<SimpleModal />);
