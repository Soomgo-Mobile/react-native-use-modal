import React, { ContextType, useMemo, useState } from 'react';
import { ModalContext } from './modal-context';
import { View } from 'react-native';

export const ModalProvider: React.FC = ({ children }) => {
  const [modalMap, setModalMap] = useState<Map<string, React.ReactNode>>(
    new Map()
  );

  const modalContext = useMemo<ContextType<typeof ModalContext>>(() => {
    return {
      // 모달 추가/업데이트
      set: (id, node) => {
        console.log('ModalProvider', 'set', id, node);
        // ID에 입력받은 노드 매핑
        setModalMap((prevState) => new Map(prevState).set(id, node));
      },
      // 모달 제거
      delete: (id) => {
        // 주어진 ID에 해당하는 모달 제거
        setModalMap((prevState) => {
          const nextMap = new Map(prevState);
          nextMap.delete(id);
          return nextMap;
        });
      },
    };
  }, []);

  const modalList = useMemo(() => {
    return [...modalMap.entries()]
      .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
      .map(([key, modal]) => <View key={key}>{modal}</View>);
  }, [modalMap]);

  console.log('modalList', modalList);
  console.log('modalMap', modalMap);

  return (
    <ModalContext.Provider value={modalContext}>
      {children}
      {modalList}
    </ModalContext.Provider>
  );
};
