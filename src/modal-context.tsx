import React from 'react';

export const ModalContext = React.createContext<{
  set: (id: string, node: React.ReactNode) => void; // add or update modal
  delete: (id: string) => void; // remove modal
}>({
  set: () => {},
  delete: () => {},
});
