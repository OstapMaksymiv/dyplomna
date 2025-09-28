import { getTransactions } from './transactions';

export const exportToJSON = async (userId: string) => {
  const transactions = await getTransactions(userId);
  return JSON.stringify(transactions);
};