import { MaterialIcons } from "@expo/vector-icons";
import { Control, FieldValues, Path, Controller } from "react-hook-form";
import { TextInputProps, View, Text, TextInput, TouchableOpacity, TouchableOpacityProps} from "react-native";

interface AppInputParams<T extends FieldValues> extends TextInputProps {
  control: Control<T>;
  name: Path<T>;
  leftIconName?: keyof typeof MaterialIcons.glyphMap;
  label?: string;
}

export const AppInput = <T extends FieldValues>({
  control,
  name,
  label,
  leftIconName,
  ...rest
}: AppInputParams<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        return (
          <View className="w-full">
            {label && <Text className="text-white">{label}</Text>}
            <TouchableOpacity className="flex-row items-center justify-between border-b border-gray-600 px-3 py-2 h-16">
            <TextInput {...rest} value={value} onChangeText={onChange}/>
            <TouchableOpacity/>
          </View>
        );
      }}
    />
  );
};