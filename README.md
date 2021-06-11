# react-native-use-modal

Way to encapsulation your modal and get result by promise

## Feature

- show modal and get result as promise
- easy to show multiple modal continuously
- pass parameters to modal when call `show`
- get result data from modal when hide (as promise)
- encapsulation modal component
- no need to explicitly place modal at component tree
- fully customizable

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
}
```

## Usage

### Declare modal with `createModal`

```tsx
// SimpleModal.tsx
import {createModal, useModal} from 'react-native-use-modal';

const SimpleModal = createModal(({confirm, cancel}) => {
  return <View>
    /* any view to presentation */
    <Button onPress={confirm}>Ok</Button>
    <Button onPress={cancel}>Cancel</Button>
  </View>
});
```

### Show modal with `useModal`

```tsx
// FooScreen.tsx

const FooScreen = () => {
  const simpleModal = useModal


};

```

## Workflow example


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
