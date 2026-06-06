import { TransactionTypes } from "@/shared/enums/transactionTypes";

import { TransactionCardType } from "..";

interface CardData {
  label: string;
  bgColor: string;
}

export const cardData: Record<TransactionCardType, CardData> = {
  [TransactionTypes.expense]: {
    label: "Saída",
    bgColor: "background-tertiary",
  },
  [TransactionTypes.revenue]: {
    label: "Entrada",
    bgColor: "background-tertiary",
  },
  total: {
    label: "Total",
    bgColor: "accent-brand-background-primary",
  },
};
