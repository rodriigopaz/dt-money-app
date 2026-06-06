import { useForm } from "react-hook-form";
import { AppInput } from "@/components/AppInput";
import { AppButton } from "@/components/AppButton";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { PublicStackParamsList } from "@/routes/PublicRoutes";
import type { FormRegisterParams } from "./FormRegisterParams";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";

export const RegisterForm = () => {
  const navigation =
    useNavigation<StackNavigationProp<PublicStackParamsList>>();
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

  const onSubmit = async () => {};

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
          Cadastrar
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
