import { Image, View } from "react-native";
import { useKeyboardVisible } from "@/shared/hooks/useKeyboardVisible";

export const AuthHeader = () => {
  const keyboardIsVisible = useKeyboardVisible();

  if (keyboardIsVisible) {
    return <></>;
  }

  return (
    <View className="items-center justify-center h-4">
      <Image
        source={require("@/assets/logo.png")}
        className="h-[48px] w-[255px]"
      />
    </View>
  );
};
