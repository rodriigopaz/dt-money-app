import { Transaction } from "@/shared/interfaces/transaction";
import { TotalTransactions } from "@/shared/interfaces/total-transactions";

export interface GetTransactionsResponse {
  data: Transaction[];
  totalTransactions: TotalTransactions;
  page: number;
  perPage: number;
  totalPages: number;
  totalRows: number;
}
