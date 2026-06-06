import { AppButton } from "@/components/AppButton";
import { AppInput } from "@/components/AppInput";
import { useAuthContext } from "@/context/auth.context";
import { PublicStackParamsList } from "@/routes/PublicRoutes";
import { colors } from "@/shared/colors";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Text, View } from "react-native";

import { schema } from "./schema";

export interface FormLoginParams {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const navigation =
    useNavigation<StackNavigationProp<PublicStackParamsList>>();

  const { handleAuthenticate } = useAuthContext();
  const { errorHandler } = useErrorHandler();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormLoginParams>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (userData: FormLoginParams) => {
    try {
      await handleAuthenticate(userData);
    } catch (error) {
      errorHandler(error, "Falha ao logar");
    }
  };

  return (
    <>
      <AppInput
        control={control}
        name="email"
        label="E-MAIL"
        leftIconName="email"
        placeholder="mail@example.br"
      />

      <AppInput
        control={control}
        name="password"
        label="SENHA"
        leftIconName="lock-outline"
        placeholder="Sua senha"
        secureTextEntry
      />

      <View className="flex-1 justify-between mt-8 mb-8 min-h-[250px]">
        <AppButton iconName="arrow-forward" onPress={handleSubmit(onSubmit)}>
          {isSubmitting ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            "Login"
          )}
        </AppButton>

        <Text className="mb-6 text-gray-300 text-base">
          Ainda não possui uma conta?
        </Text>

        <AppButton
          mode="outline"
          onPress={() => navigation.navigate("Register")}
        >
          Cadastrar
        </AppButton>
      </View>
    </>
  );
};
