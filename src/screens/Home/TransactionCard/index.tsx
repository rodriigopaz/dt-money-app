import { colors } from "@/shared/colors";
import { TransactionTypes } from "@/shared/enums/transactionTypes";
import { Transaction } from "@/shared/interfaces/transaction";
import { moneyMapper } from "@/shared/utils/moneyMapper";
import { MaterialIcons } from "@expo/vector-icons";
import clsx from "clsx";
import { format } from "date-fns";
import { FC } from "react";
import { Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { LeftAction } from "./LeftAction";
import { RightAction } from "./RightAction";

const ACTION_WIDTH = 80;
const SWIPE_THRESHOLD = 40;

interface TransactionCardParams {
  transaction: Transaction;
}

export const TransactionCard: FC<TransactionCardParams> = ({ transaction }) => {
  const translateX = useSharedValue(0);
  const isExpense = transaction.type.id === TransactionTypes.expense;

  const panGesture = Gesture.Pan()
    .activeOffsetX([-5, 5])
    .onUpdate((e) => {
      translateX.value = Math.max(
        -ACTION_WIDTH,
        Math.min(ACTION_WIDTH, e.translationX),
      );
    })
    .onEnd((e) => {
      if (e.translationX < -SWIPE_THRESHOLD) {
        translateX.value = withSpring(-ACTION_WIDTH);
      } else if (e.translationX > SWIPE_THRESHOLD) {
        translateX.value = withSpring(ACTION_WIDTH);
      } else {
        translateX.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View
      style={{
        alignSelf: "center",
        width: "90%",
        marginBottom: 16,
        overflow: "hidden",
      }}
    >
      {/* Editar — revelado ao arrastar para a direita */}
      <View style={{ position: "absolute", left: 0, top: 0, bottom: 0 }}>
        <LeftAction transaction={transaction} />
      </View>

      {/* Excluir — revelado ao arrastar para a esquerda */}
      <View style={{ position: "absolute", right: 0, top: 0, bottom: 0 }}>
        <RightAction transactionId={transaction.id} />
      </View>

      <GestureDetector gesture={panGesture}>
        <Animated.View style={animatedStyle}>
          <View className="h-[140px] bg-background-tertiary rounded-6 p-6">
            <Text className="text-white text-base">
              {transaction.description}
            </Text>

            <Text
              className={clsx(
                "text-2xl font-bold mt-2",
                isExpense ? "text-accent-red" : "text-accent-brand-light",
              )}
            >
              {isExpense && "- "}
              R$ {moneyMapper(transaction.value)}
            </Text>

            <View className="flex-row w-full justify-between">
              <View className="items-center flex-row mt-3">
                <MaterialIcons
                  name="label-outline"
                  color={colors.gray[700]}
                  size={23}
                />
                <Text className="text-gray-700 text-base ml-2">
                  {transaction.category.name}
                </Text>
              </View>

              <View className="items-center flex-row mt-3">
                <MaterialIcons
                  name="calendar-today"
                  color={colors.gray[700]}
                  size={20}
                />
                <Text className="text-gray-700 text-base ml-2">
                  {format(transaction.createdAt, "dd/MM/yyyy")}
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};
