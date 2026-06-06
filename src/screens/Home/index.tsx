import { useTransactionContext } from "@/context/transaction.context";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { colors } from "@/shared/colors";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { EmptyList } from "./EmptyList";
import { ListHeader } from "./ListHeader";
import { TransactionCard } from "./TransactionCard";

export const Home = () => {
  const {
    fetchCategories,
    fetchTransactions,
    transactions,
    refreshTransactions,
    loadMoreTransactions,
    loadings,
    handleLoadings,
  } = useTransactionContext();

  const { errorHandler } = useErrorHandler();

  const handleFetchCategories = async () => {
    await fetchCategories();
  };

  const handleFetchInitialTransactions = async () => {
    try {
      handleLoadings({ key: "initial", value: true });
      await fetchTransactions({ page: 1 });
    } catch (error) {
      errorHandler(error, "Falha ao buscar transações");
    } finally {
      handleLoadings({ key: "initial", value: false });
    }
  };

  const handleLoadMoreTransactions = async () => {
    try {
      handleLoadings({ key: "loadMore", value: true });
      await loadMoreTransactions();
    } catch (error) {
      errorHandler(error, "Falha ao carregar novas transações");
    } finally {
      handleLoadings({ key: "loadMore", value: false });
    }
  };

  const handleRefreshTransactions = async () => {
    try {
      handleLoadings({ key: "refresh", value: true });
      await refreshTransactions();
    } catch (error) {
      errorHandler(error, "Falha ao recarregar as transações");
    } finally {
      handleLoadings({ key: "refresh", value: false });
    }
  };

  const fetchInitialData = async () => {
    try {
      await Promise.all([
        handleFetchCategories(),
        handleFetchInitialTransactions(),
      ]);
    } catch (error) {
      errorHandler(error, "Falha ao buscar dados iniciais");
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <FlatList
        className="bg-background-secondary"
        data={transactions}
        renderItem={({ item }) => <TransactionCard transaction={item} />}
        keyExtractor={(item) => `transaction-${item.id}`}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={() =>
          loadings.initial ? null : <EmptyList />
        }
        ListFooterComponent={() =>
          loadings.loadMore ? (
            <ActivityIndicator
              color={colors["accent-brand-light"]}
              size="large"
            />
          ) : null
        }
        refreshControl={
          <RefreshControl
            refreshing={loadings.refresh}
            onRefresh={handleRefreshTransactions}
          />
        }
        onEndReached={handleLoadMoreTransactions}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
};
