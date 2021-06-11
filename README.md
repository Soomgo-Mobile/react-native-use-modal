# react-native-use-modal

Way to encapsulate your modal and get result by promise

## Feature

- Show modal and get result as promise
- Easy to show multiple modal continuously
- Pass parameters to modal when call `show`
- Get result data from modal when hide (as promise)
- modal encapsulation
- No need to explicitly place modal at component tree
- Fully customizable

## Installation

```sh
yarn add react-native-use-modal

# or

npm i react-native-use-modal
```

### Place `ModalProvider` at your app's root component

```tsx
// App.tsx
import {ModalProvider} from 'react-native-use-modal';

const App = () => {
  return <ModalProvider>
    // ...
  </ModalProvider>;
};
```

## Usage

### Declare modal as hook with `createUseModal`

`createUseModal` function receives a functional component of the specified type as the first argument.
This component will later be displayed as a modal.

```tsx
// useSimpleModal.tsx
import {createUseModal} from 'react-native-use-modal';

// createUseModal creates a hook and returns it.
const useSimpleModal = createUseModal(
  ({
    confirm, // Call this function to finish (confirm) modal
    cancel, // Call this function to finish (cancel) modal
  }) => {
    // return react node to show as modal
    return (
      <View>
        /* any view to presentation */
        <Button onPress={confirm}>Ok</Button>
        <Button onPress={cancel}>Cancel</Button>
      </View>
    );
  },
);
```

### Show modal using hook

..from any other react component

```tsx
// FooView.tsx

const FooView = () => {
  // Call the hook you declared earlier
  // By calling the hook created with createUseModal, you can get an object that can display modal.
  const simpleModal = useSimpleModal();

  const handlePressButton = () => {
    // Show modal!
    // This returns a Promise<ModalResult>
    simpleModal.show();
  };
};
```

### Handling the modal's result

You can wait for modal to return the result with await

```tsx
// FooView.tsx
const handlePressButton = async () => {
  // Show modal!
  // This returns a Promise<ModalResult>
  const result = await simpleModal.show();
  if (result.type === ModalResultType.CONFIRM) {
    // handle confirm here
    // ...
  } else {
    // handle cancel here
    // ...
  }
};
```

### Declare modal that require parameters

We sometimes need parameters to configure the modal.

```tsx
// useAlertModal.tsx
import {createUseModal} from 'react-native-use-modal';

const useAlertModal = createUseModal<
  void,
  {title: string; message: string} // Declare parameters type
  >(({confirm, cancel, param}) => {
  return (
    <View>
      <Title>{param.title}</Title>
      <Paragraph>{param.message}</Paragraph>
      <View>
        <Button onPress={confirm}>Ok</Button>
        <Button onPress={cancel}>Cancel</Button>
      </View>
    </View>
  );
});
```

### Show modal that require parameters

```tsx
// BarView.tsx
const BarView = () => {
  // Call the hook you declared earlier
  const alertModal = useAlertModal();

  const handlePressButton = () => {
    // Show modal!
    // This returns a Promise<ModalResult>
    alertModal.show({
      title: 'Title',
      message: 'Message',
    });
  };
};
```

### Declare modal that return values

Sometimes we may want to return a result from Modal.
```tsx
export const useTextInputModal = createUseModal<string>(({confirm, cancel}) => {
  const [value, setValue] = useState('');

  const handlePressConfirm = () => confirm(value);

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={setValue}
      />
      <View >
        <Button onPress={handlePressConfirm}>Confirm</Button>
        <Button onPress={cancel}>Cancel</Button>
      </View>
    </View>
  );
});
```

### Handling the modal's result with value
```tsx
// BazView.tsx
const BazView = () => {
  const textInputModal = useTextInputModal();

  const handlePressButton = async () => {
    // Show modal!
    // This returns a Promise<ModalResult<string>>
    const result = await textInputModal.show();
    if (result.type === ModalResultType.CONFIRM) {
      // handle confirm here
      // You can find the entered value in result
      console.log('entered: ' + result.data);
    } else {
      // handle cancel here
      // ...
    }
  };
};
```

### Customize modal config
This package depends on `react-native-modal` and accept all its props.
You can set this in the second argument of the `createUseModal`.
For example, an animation could be set up like this:

```tsx
export const useSimpleModal = createUseModal(
  ({confirm, cancel}) => {
    /* render here */
  },
  {
    modalProps: {
      animationIn: 'fadeIn',
      animationOut: 'fadeOut',
    },
  },
);
```
`createUseModal` supports all props, except for the `isVisible` property. We internally manage this property.

### Make cancelable when press backdrop or back button
With these option, modal will cancel when press backdrop or back button.
Each option can be set independently.
```tsx
export const useSimpleModal = createUseModal(
  ({confirm, cancel}) => {
    /* render here */
  },
  {
    cancelOnBackButtonPress: true, // Default is false
    cancelOnBackdropPress: true, // Default is false
  },
);
```

## Workflow example

- [Alert modal](example/src/alert-modal-example)
- [Simple modal](example/src/simple-modal-example)
- [Text input modal](example/src/text-input-modal-example)
- [Show modal continuously](example/src/show-modal-continuously-example)

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
