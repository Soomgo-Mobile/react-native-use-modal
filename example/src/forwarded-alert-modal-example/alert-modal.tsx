/**
 * This is an example of converting an existing alert modal into a hook using createUseForwardedModal.
 */

import {createUseForwardedModal} from 'react-native-use-modal';
import Modal from 'react-native-modal';
import {Button, Paragraph, Title} from 'react-native-paper';
import {Space} from '../view';
import {StyleSheet, View} from 'react-native';
import React from 'react';

/**
 * The existing modal
 */
const ExistingModal = ({
  title,
  isVisible,
  onConfirm,
  onCancel,
  message,
}: {
  title?: string;
  message?: string;
  onCancel: () => void;
  onConfirm: () => void;
  isVisible: boolean;
}) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.container}>
        <Title>{title}</Title>
        <Paragraph>{message}</Paragraph>
        <Space height={16} />
        <View style={styles.buttonContainer}>
          <Button onPress={onConfirm}>Ok</Button>
          <Button onPress={onCancel}>Cancel</Button>
        </View>
      </View>
    </Modal>
  );
};

/**
 * Convert existing modal to hook
 */
export const useAlertModal = createUseForwardedModal<
  void,
  {title: string; message: string}
>(({confirm, cancel, param, isVisible}) => {
  return (
    <ExistingModal
      title={param?.title}
      message={param?.message}
      onCancel={cancel}
      onConfirm={confirm}
      isVisible={isVisible}
    />
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
