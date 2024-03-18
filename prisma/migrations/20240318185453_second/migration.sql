/*
  Warnings:

  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sale` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Status` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_ProductId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_SaleId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_StatusId_fkey";

-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_StatusId_fkey";

-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_UserId_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "Sale";

-- DropTable
DROP TABLE "Status";
