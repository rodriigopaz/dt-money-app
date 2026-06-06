import { colors } from "@/shared/colors";
import { TransactionTypes } from "@/shared/enums/transactionTypes";
import { MaterialIcons } from "@expo/vector-icons";

import { TransactionCardType } from "..";

interface IconData {
  name: keyof typeof MaterialIcons.glyphMap;
  color: string;
}

export const icons: Record<TransactionCardType, IconData> = {
  [TransactionTypes.revenue]: {
    name: "arrow-circle-up",
    color: colors["accent-brand-light"],
  },
  [TransactionTypes.expense]: {
    name: "arrow-circle-down",
    color: colors["accent-red"],
  },
  total: {
    name: "attach-money",
    color: colors.white,
  },
};
