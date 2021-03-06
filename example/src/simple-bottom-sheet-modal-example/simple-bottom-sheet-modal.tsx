import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Button, Paragraph, Title} from 'react-native-paper';
import {createUseBottomSheetModal} from 'react-native-use-modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const useSimpleBottomSheetModal = createUseBottomSheetModal(
  ({confirm, cancel}) => {
    const safeAreaInsets = useSafeAreaInsets();
    return (
      <View
        style={[
          styles.container,
          {
            paddingBottom: safeAreaInsets.bottom,
          },
        ]}>
        <Title>Title of modal</Title>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed ex
          scelerisque, consectetur magna id, pulvinar mauris. Duis eu aliquet
          diam. Vestibulum congue est lacus, eu ullamcorper arcu eleifend a.
          Pellentesque habitant morbi tristique senectus et netus et malesuada
          fames ac turpis egestas. Pellentesque habitant morbi tristique
          senectus et netus et malesuada fames ac turpis egestas. Sed vitae nunc
          in nibh venenatis luctus.
        </Paragraph>
        <View style={styles.buttonContainer}>
          <Button onPress={confirm}>Ok</Button>
          <Button onPress={cancel}>Cancel</Button>
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
});
