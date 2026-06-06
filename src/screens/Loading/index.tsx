import { useAuthContext } from "@/context/auth.context";
import { useEffect } from "react";
import { ActivityIndicator, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type LoadingProps = {
  setLoading: (value: boolean) => void;
};

export const Loading = ({ setLoading }: LoadingProps) => {
  const { restoreUserSession } = useAuthContext();

  useEffect(() => {
    restoreUserSession().finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-background-primary">
      <Image
        source={require("@/assets/logo.png")}
        className="h-[48px] w-[255px] mb-8"
      />
      <ActivityIndicator color="white" size="large" />
    </SafeAreaView>
  );
};
