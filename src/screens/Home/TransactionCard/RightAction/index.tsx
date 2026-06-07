import { useSnackbarContext } from "@/context/snackbar.context";
import { useTransactionContext } from "@/context/transaction.context";
import { colors } from "@/shared/colors";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import * as TransactionService from "@/shared/services/dtMoney/transaction.service";
import { MaterialIcons } from "@expo/vector-icons";
import { FC, useState } from "react";
import { TouchableOpacity } from "react-native";

import { DeleteModal } from "./DeleteModal";

interface RightActionProps {
  transactionId: number;
}

export const RightAction: FC<RightActionProps> = ({ transactionId }) => {
  const { errorHandler } = useErrorHandler();
  const { notify } = useSnackbarContext();
  const { refreshTransactions } = useTransactionContext();

  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const handleDeleteTransaction = async () => {
    try {
      setLoading(true);

      await TransactionService.deleteTransaction(transactionId);
      await refreshTransactions();

      notify({
        message: "Transação deletada com sucesso",
        messageType: "success",
      });

      hideModal();
    } catch (error) {
      errorHandler(error, "Falha ao deletar a transação");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TouchableOpacity
        className="h-[140px] bg-accent-red-background-primary w-[80px] rounded-r-6 items-center justify-center"
        onPress={showModal}
      >
        <MaterialIcons name="delete-outline" color={colors.white} size={30} />
      </TouchableOpacity>

      <DeleteModal
        visible={modalVisible}
        hideModal={hideModal}
        handleDeleteTransaction={handleDeleteTransaction}
        loading={loading}
      />
    </>
  );
};
