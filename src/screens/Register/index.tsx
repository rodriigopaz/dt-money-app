import { AuthHeader } from "@/components/AuthHeader";
import { DismissKeyBoardView } from "@/components/DismissKeyboard";
import { View } from "react-native";

import { RegisterForm } from "./RegisterForm";

export const Register = () => {
  return (
    <DismissKeyBoardView>
      <View className="flex-1 w-[82%] self-center">
        <AuthHeader />

        <RegisterForm />
      </View>
    </DismissKeyBoardView>
  );
};
