/*
  Warnings:

  - You are about to drop the column `supportedGenerations` on the `chipset` table. All the data in the column will be lost.
  - Added the required column `ddr4` to the `chipset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chipset" DROP COLUMN "supportedGenerations",
ADD COLUMN     "ddr4" INTEGER NOT NULL,
ADD COLUMN     "ddr5" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "supportedgenerations" TEXT[];
