import prisma from '../utils/prisma';

export const getBudgets = (userId: string) => {
  return prisma.budget.findMany({ where: { userId } });
};

export const createBudget = (data: any) => {
  return prisma.budget.create({ data });
};