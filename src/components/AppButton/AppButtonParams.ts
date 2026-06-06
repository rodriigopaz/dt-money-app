import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacityProps } from "react-native";

type AppButtonMode = "fill" | "outline";

interface AppButtonParams extends TouchableOpacityProps {
  mode?: AppButtonMode;
  iconName?: keyof typeof MaterialIcons.glyphMap;
}

export default AppButtonParams;
