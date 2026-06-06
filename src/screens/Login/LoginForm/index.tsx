import { useForm } from "react-hook-form";
import { AppInput } from "@/components/AppInput";
import { AppButton } from "@/components/AppButton";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { PublicStackParamsList } from "@/routes/PublicRoutes";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";

export interface FormLoginParams {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const navigation =
    useNavigation<StackNavigationProp<PublicStackParamsList>>();
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

  const onSubmit = async (data: FormLoginParams) => {
    console.log("Dados do formulário:", data);
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
        <AppButton
          iconName="arrow-forward"
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          Login
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
