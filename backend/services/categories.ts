import prisma from '../utils/prisma';

export const getCategories = (userId: string) => {
  return prisma.category.findMany({ where: { userId } });
};

export const createCategory = (data: any) => {
  return prisma.category.create({ data });
};