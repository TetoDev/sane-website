/*
  Warnings:

  - Added the required column `format` to the `ssd` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ssd" ADD COLUMN     "format" TEXT NOT NULL;
