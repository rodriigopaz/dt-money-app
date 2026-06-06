export interface Transaction {
  id: number;
  description: string;
  type: { id: number; name: string };
  category: { id: number; name: string };
  value: number;
  createdAt: string;
}
