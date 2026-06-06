import { colors } from "@/shared/colors";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import React, {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { TouchableWithoutFeedback, View } from "react-native";

interface BottomSheetContextType {
  openBottomSheet: (content: React.ReactNode, index: number) => void;
  closeBottomSheet: () => void;
}

export const BottomSheetContext = createContext(
  {} as BottomSheetContextType,
);

export const BottomSheetProvider: FC<PropsWithChildren> = ({ children }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [content, setContent] = useState<React.ReactNode | null>(null);
  const [index, setIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  const snapPoints = ["70%", "90%"];

  const openBottomSheet = useCallback(
    (newContent: React.ReactNode, newIndex: number) => {
      setContent(newContent);
      setIndex(newIndex);
      setIsOpen(true);

      requestAnimationFrame(() => {
        bottomSheetRef.current?.snapToIndex(newIndex);
      });
    },
    [],
  );

  const closeBottomSheet = useCallback(() => {
    setIsOpen(false);
    setIndex(-1);
    setContent(null);

    bottomSheetRef.current?.close();
  }, []);

  const handleSheetChanges = useCallback((sheetIndex: number) => {
    if (sheetIndex === -1) {
      setIsOpen(false);
    }
  }, []);

  return (
    <BottomSheetContext.Provider
      value={{
        openBottomSheet,
        closeBottomSheet,
      }}
    >
      {children}

      {isOpen && (
        <TouchableWithoutFeedback onPress={closeBottomSheet}>
          <View className="absolute inset-0 bg-black/70 z-[1]" />
        </TouchableWithoutFeedback>
      )}

      <BottomSheet
        ref={bottomSheetRef}
        index={index}
        snapPoints={snapPoints}
        enablePanDownToClose
        style={{ zIndex: 2 }}
        backgroundStyle={{
          backgroundColor: colors["background-secondary"],
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          elevation: 9,
        }}
        onChange={handleSheetChanges}
      >
        <BottomSheetScrollView>{content}</BottomSheetScrollView>
      </BottomSheet>
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheetContext = () => {
  const context = useContext(BottomSheetContext);

  return context;
};
