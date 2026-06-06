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

export interface FormRegisterParams {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterForm = () => {
  const navigation =
    useNavigation<StackNavigationProp<PublicStackParamsList>>();

  const { handleRegister } = useAuthContext();
  const { errorHandler } = useErrorHandler();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormRegisterParams>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (userData: FormRegisterParams) => {
    try {
      await handleRegister(userData);
    } catch (error) {
      errorHandler(error, "Falha ao cadastrar usuário");
    }
  };

  return (
    <>
      <AppInput
        control={control}
        name="name"
        label="NOME"
        leftIconName="person"
        placeholder="Seu nome"
      />

      <AppInput
        control={control}
        name="email"
        label="E-MAIL"
        leftIconName="mail-outline"
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

      <AppInput
        control={control}
        name="confirmPassword"
        label="SENHA"
        leftIconName="lock-outline"
        placeholder="Confirme sua senha"
        secureTextEntry
      />

      <View className="flex-1 justify-between mt-8 mb-8 min-h-[250px]">
        <AppButton iconName="arrow-forward" onPress={handleSubmit(onSubmit)}>
          {isSubmitting ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            "Cadastrar"
          )}
        </AppButton>

        <Text className="mb-6 text-gray-300 text-base">
          Já possui uma conta?
        </Text>

        <AppButton mode="outline" onPress={() => navigation.navigate("Login")}>
          Acessar
        </AppButton>
      </View>
    </>
  );
};
