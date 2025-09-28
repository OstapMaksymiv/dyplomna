import prisma from '../utils/prisma';

export const getTransactions = (userId: string) => {
  return prisma.transaction.findMany({ where: { userId } });
};
export const createTransaction = (data: any) => {
    return prisma.transaction.create({ data });
  };