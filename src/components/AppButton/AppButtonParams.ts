import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacityProps, Text, TouchableOpacity } from "react-native";
import { FC, PropsWithChildren } from "react";
import clsx from "clsx";

type AppButtonMode = "fill" | "outline";

interface AppButtonParams extends TouchableOpacityProps {
  mode?: AppButtonMode;
  iconName?: keyof typeof MaterialIcons.glyphMap;
}

export default AppButtonParams;
