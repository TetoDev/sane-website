/*
  Warnings:

  - You are about to drop the column `type` on the `ram` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ram" DROP COLUMN "type",
ADD COLUMN     "ddr5" BOOLEAN NOT NULL DEFAULT false;
