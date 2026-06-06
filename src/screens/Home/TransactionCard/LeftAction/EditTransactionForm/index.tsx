import { AppButton } from "@/components/AppButton";
import { ErrorMessage } from "@/components/ErrorMessage";
import { SelectCategoryModal } from "@/components/SelectCategoryModal";
import { TransactionTypeSelector } from "@/components/TransactionTypeSelector";
import { useBottomSheetContext } from "@/context/bottom-sheet.context";
import { useTransactionContext } from "@/context/transaction.context";
import { colors } from "@/shared/colors";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { UpdateTransactionRequest } from "@/shared/interfaces/http/createTransactionRequest";
import { Transaction } from "@/shared/interfaces/transaction";
import { MaterialIcons } from "@expo/vector-icons";
import { FC, useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CurrencyInput from "react-native-currency-input";
import * as yup from "yup";

import { transactionSchema } from "./schema";

type ValidationErrorsTypes = Record<keyof UpdateTransactionRequest, string>;

interface EditTransactionFormProps {
  transaction: Transaction;
}

export const EditTransactionForm: FC<EditTransactionFormProps> = ({
  transaction: transactionToUpdate,
}) => {
  const { closeBottomSheet } = useBottomSheetContext();
  const { updateTransaction } = useTransactionContext();
  const { errorHandler } = useErrorHandler();

  const [transaction, setTransaction] = useState<UpdateTransactionRequest>({
    id: transactionToUpdate.id,
    description: transactionToUpdate.description,
    typeId: transactionToUpdate.type.id,
    categoryId: transactionToUpdate.category.id,
    value: transactionToUpdate.value,
  });

  const [validationErrors, setValidationErrors] =
    useState<ValidationErrorsTypes>({} as ValidationErrorsTypes);

  const [loading, setLoading] = useState(false);

  const setTransactionData = (
    key: keyof UpdateTransactionRequest,
    value: string | number,
  ) => {
    setTransaction((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleUpdateTransaction = async () => {
    try {
      setLoading(true);

      await transactionSchema.validate(transaction, {
        abortEarly: false,
      });

      await updateTransaction(transaction);
      closeBottomSheet();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errors = {} as ValidationErrorsTypes;

        error.inner.forEach((err) => {
          if (err.path) {
            errors[err.path as keyof UpdateTransactionRequest] = err.message;
          }
        });

        setValidationErrors(errors);
      } else {
        errorHandler(error, "Falha ao atualizar transação");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="px-8">
      <View className="w-full flex-row items-center justify-between">
        <Text className="text-white text-xl font-bold">Editar transação</Text>

        <TouchableOpacity onPress={closeBottomSheet}>
          <MaterialIcons name="close" color={colors.gray[700]} size={20} />
        </TouchableOpacity>
      </View>

      <View className="flex-1 mt-8 mb-8">
        <TextInput
          className="text-white text-lg h-[50px] bg-background-primary my-2 rounded-md pl-4"
          placeholder="Descrição"
          placeholderTextColor={colors.gray[700]}
          value={transaction.description}
          onChangeText={(text) => setTransactionData("description", text)}
        />

        {validationErrors.description && (
          <ErrorMessage>{validationErrors.description}</ErrorMessage>
        )}

        <CurrencyInput
          className="text-white text-lg h-[50px] bg-background-primary my-2 rounded-md pl-4"
          value={transaction.value}
          prefix="R$ "
          delimiter="."
          separator=","
          precision={2}
          minValue={0}
          onChangeValue={(value) => setTransactionData("value", value ?? 0)}
        />

        {validationErrors.value && (
          <ErrorMessage>{validationErrors.value}</ErrorMessage>
        )}

        <SelectCategoryModal
          selectedCategory={transaction.categoryId}
          onSelect={(categoryId) =>
            setTransactionData("categoryId", categoryId)
          }
        />

        {validationErrors.categoryId && (
          <ErrorMessage>{validationErrors.categoryId}</ErrorMessage>
        )}

        <TransactionTypeSelector
          typeId={transaction.typeId}
          setTransactionType={(typeId) => setTransactionData("typeId", typeId)}
        />

        {validationErrors.typeId && (
          <ErrorMessage>{validationErrors.typeId}</ErrorMessage>
        )}

        <View>
          <AppButton onPress={handleUpdateTransaction}>
            {loading ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              "Atualizar"
            )}
          </AppButton>
        </View>
      </View>
    </View>
  );
};
