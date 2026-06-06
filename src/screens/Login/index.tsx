import { AuthHeader } from "@/components/AuthHeader";
import { DismissKeyBoardView } from "@/components/DismissKeyboard";
import { View } from "react-native";

import { LoginForm } from "./LoginForm";

export const Login = () => {
  return (
    <DismissKeyBoardView>
      <View className="flex-1 w-[82%] self-center">
        <AuthHeader />

        <LoginForm />
      </View>
    </DismissKeyBoardView>
  );
};
