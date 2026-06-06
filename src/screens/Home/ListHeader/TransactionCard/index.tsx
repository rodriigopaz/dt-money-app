import { useTransactionContext } from "@/context/transaction.context";
import { TransactionTypes } from "@/shared/enums/transactionTypes";
import { moneyMapper } from "@/shared/utils/moneyMapper";
import { MaterialIcons } from "@expo/vector-icons";
import clsx from "clsx";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FC } from "react";
import { Text, View } from "react-native";

import { cardData } from "./strategies/cardDataStrategy";
import { icons } from "./strategies/iconStrategy";

export type TransactionCardType = TransactionTypes | "total";

interface TransactionCardProps {
  type: TransactionCardType;
  amount: number;
}

export const TransactionCard: FC<TransactionCardProps> = ({ amount, type }) => {
  const { transactions } = useTransactionContext();

  const iconData = icons[type];
  const data = cardData[type];

  const lastTransaction = transactions.find(
    ({ type: transactionType }) => transactionType.id === type,
  );

  return (
    <View
      className={clsx(
        `bg-${data.bgColor} min-w-[280px] rounded-6 px-8 py-6 justify-between mr-6`,
        {
          "mr-12": type === "total",
        },
      )}
    >
      <View className="flex-row justify-between items-center mb-1">
        <Text className="text-white text-base">{data.label}</Text>

        <MaterialIcons name={iconData.name} color={iconData.color} size={26} />
      </View>

      <View>
        <Text className="text-2xl text-gray-400 font-bold">
          R$ {moneyMapper(amount)}
        </Text>

        {type !== "total" && (
          <Text className="text-gray-700">
            {lastTransaction?.createdAt
              ? format(
                  lastTransaction.createdAt,
                  `'Última ${data.label.toLowerCase()} em' d 'de' MMMM`,
                  {
                    locale: ptBR,
                  },
                )
              : "Nenhuma transação encontrada"}
          </Text>
        )}
      </View>
    </View>
  );
};
