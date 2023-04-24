/*
  Warnings:

  - You are about to drop the column `caseInfoId` on the `Case` table. All the data in the column will be lost.
  - You are about to drop the column `coolerInfoId` on the `Cooler` table. All the data in the column will be lost.
  - You are about to drop the column `cpuInfoId` on the `Cpu` table. All the data in the column will be lost.
  - You are about to drop the column `fanInfoId` on the `Fan` table. All the data in the column will be lost.
  - You are about to drop the column `gpuInfoId` on the `Gpu` table. All the data in the column will be lost.
  - You are about to drop the column `hddInfoId` on the `Hdd` table. All the data in the column will be lost.
  - You are about to drop the column `motherboardInfoId` on the `Motherboard` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `postalCode` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `psuInfoId` on the `Psu` table. All the data in the column will be lost.
  - You are about to drop the column `ramInfoId` on the `Ram` table. All the data in the column will be lost.
  - You are about to drop the column `ssdInfoId` on the `Ssd` table. All the data in the column will be lost.
  - You are about to drop the `CaseInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CoolerInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CpuInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FanInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GpuInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MotherboardInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PsuInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RamInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SsdInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `hddInfo` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `panel` to the `Case` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Case` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Cooler` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Cooler` table without a default value. This is not possible if the table is not empty.
  - Added the required column `generation` to the `Cpu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `socketId` to the `Cpu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Fan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bus` to the `Gpu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chipsetId` to the `Motherboard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `format` to the `Motherboard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `socketId` to the `Motherboard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Ram` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bus` to the `Ssd` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Case" DROP CONSTRAINT "Case_caseInfoId_fkey";

-- DropForeignKey
ALTER TABLE "Cooler" DROP CONSTRAINT "Cooler_coolerInfoId_fkey";

-- DropForeignKey
ALTER TABLE "Cpu" DROP CONSTRAINT "Cpu_cpuInfoId_fkey";

-- DropForeignKey
ALTER TABLE "CpuInfo" DROP CONSTRAINT "CpuInfo_socketId_fkey";

-- DropForeignKey
ALTER TABLE "Fan" DROP CONSTRAINT "Fan_fanInfoId_fkey";

-- DropForeignKey
ALTER TABLE "Gpu" DROP CONSTRAINT "Gpu_gpuInfoId_fkey";

-- DropForeignKey
ALTER TABLE "Hdd" DROP CONSTRAINT "Hdd_hddInfoId_fkey";

-- DropForeignKey
ALTER TABLE "Motherboard" DROP CONSTRAINT "Motherboard_motherboardInfoId_fkey";

-- DropForeignKey
ALTER TABLE "Psu" DROP CONSTRAINT "Psu_psuInfoId_fkey";

-- DropForeignKey
ALTER TABLE "Ram" DROP CONSTRAINT "Ram_ramInfoId_fkey";

-- DropForeignKey
ALTER TABLE "Ssd" DROP CONSTRAINT "Ssd_ssdInfoId_fkey";

-- DropIndex
DROP INDEX "Case_caseInfoId_key";

-- DropIndex
DROP INDEX "Chipset_socketId_key";

-- DropIndex
DROP INDEX "Cooler_coolerInfoId_key";

-- DropIndex
DROP INDEX "Cpu_cpuInfoId_key";

-- DropIndex
DROP INDEX "Fan_fanInfoId_key";

-- DropIndex
DROP INDEX "Gpu_gpuInfoId_key";

-- DropIndex
DROP INDEX "Hdd_hddInfoId_key";

-- DropIndex
DROP INDEX "Motherboard_motherboardInfoId_key";

-- DropIndex
DROP INDEX "Psu_psuInfoId_key";

-- DropIndex
DROP INDEX "Ram_ramInfoId_key";

-- DropIndex
DROP INDEX "Ssd_ssdInfoId_key";

-- AlterTable
ALTER TABLE "Case" DROP COLUMN "caseInfoId",
ADD COLUMN     "includedFans" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lighting" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "panel" TEXT NOT NULL,
ADD COLUMN     "size" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Chipset" ADD COLUMN     "supportedGenerations" TEXT[];

-- AlterTable
ALTER TABLE "Cooler" DROP COLUMN "coolerInfoId",
ADD COLUMN     "size" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Cpu" DROP COLUMN "cpuInfoId",
ADD COLUMN     "generation" TEXT NOT NULL,
ADD COLUMN     "score" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "socketId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Fan" DROP COLUMN "fanInfoId",
ADD COLUMN     "size" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Gpu" DROP COLUMN "gpuInfoId",
ADD COLUMN     "bus" TEXT NOT NULL,
ADD COLUMN     "score" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "vram" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Hdd" DROP COLUMN "hddInfoId",
ADD COLUMN     "capacity" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Motherboard" DROP COLUMN "motherboardInfoId",
ADD COLUMN     "chipsetId" INTEGER NOT NULL,
ADD COLUMN     "format" TEXT NOT NULL,
ADD COLUMN     "socketId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "address",
DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "phone",
DROP COLUMN "postalCode",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Psu" DROP COLUMN "psuInfoId",
ADD COLUMN     "power" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Ram" DROP COLUMN "ramInfoId",
ADD COLUMN     "capacity" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "dims" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "speed" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Ssd" DROP COLUMN "ssdInfoId",
ADD COLUMN     "bus" TEXT NOT NULL,
ADD COLUMN     "capacity" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "CaseInfo";

-- DropTable
DROP TABLE "CoolerInfo";

-- DropTable
DROP TABLE "CpuInfo";

-- DropTable
DROP TABLE "FanInfo";

-- DropTable
DROP TABLE "GpuInfo";

-- DropTable
DROP TABLE "MotherboardInfo";

-- DropTable
DROP TABLE "PsuInfo";

-- DropTable
DROP TABLE "RamInfo";

-- DropTable
DROP TABLE "SsdInfo";

-- DropTable
DROP TABLE "hddInfo";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "adress" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
