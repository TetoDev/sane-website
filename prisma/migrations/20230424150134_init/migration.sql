/*
  Warnings:

  - You are about to drop the `Case` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Chipset` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Cooler` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Cpu` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CpuRanking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Fan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Game` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Gpu` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Hdd` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Issue` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Motherboard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Psu` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ram` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Socket` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ssd` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Status` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `gpuRanking` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Chipset" DROP CONSTRAINT "Chipset_socketId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropTable
DROP TABLE "Case";

-- DropTable
DROP TABLE "Chipset";

-- DropTable
DROP TABLE "Cooler";

-- DropTable
DROP TABLE "Cpu";

-- DropTable
DROP TABLE "CpuRanking";

-- DropTable
DROP TABLE "Fan";

-- DropTable
DROP TABLE "Game";

-- DropTable
DROP TABLE "Gpu";

-- DropTable
DROP TABLE "Hdd";

-- DropTable
DROP TABLE "Issue";

-- DropTable
DROP TABLE "Motherboard";

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "Psu";

-- DropTable
DROP TABLE "Ram";

-- DropTable
DROP TABLE "Socket";

-- DropTable
DROP TABLE "Ssd";

-- DropTable
DROP TABLE "Status";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "gpuRanking";

-- CreateTable
CREATE TABLE "chipset" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL DEFAULT 'nobrand',
    "supportedGenerations" TEXT[],
    "socketid" INTEGER NOT NULL,

    CONSTRAINT "chipset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "socket" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "socket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cpu" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "socketid" INTEGER NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "generation" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "cpu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gpu" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "bus" TEXT NOT NULL,
    "vram" INTEGER NOT NULL DEFAULT 0,
    "score" INTEGER NOT NULL DEFAULT 0,
    "link" TEXT NOT NULL,

    CONSTRAINT "gpu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ram" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "type" TEXT NOT NULL,
    "speed" INTEGER NOT NULL DEFAULT 0,
    "dims" INTEGER NOT NULL DEFAULT 1,
    "capacity" INTEGER NOT NULL DEFAULT 0,
    "link" TEXT NOT NULL,

    CONSTRAINT "ram_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "motherboard" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "chipsetid" INTEGER NOT NULL,
    "socketid" INTEGER NOT NULL,
    "format" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "motherboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hdd" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "capacity" INTEGER NOT NULL DEFAULT 0,
    "link" TEXT NOT NULL,

    CONSTRAINT "hdd_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ssd" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "capacity" INTEGER NOT NULL DEFAULT 0,
    "bus" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "ssd_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "psu" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "power" INTEGER NOT NULL DEFAULT 0,
    "link" TEXT NOT NULL,

    CONSTRAINT "psu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tower" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "size" TEXT NOT NULL,
    "panel" TEXT NOT NULL,
    "lighting" BOOLEAN NOT NULL DEFAULT false,
    "includedfans" INTEGER NOT NULL DEFAULT 0,
    "link" TEXT NOT NULL,

    CONSTRAINT "tower_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cooler" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "type" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "cooler_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fan" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "size" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "fan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cpu_ranking" (
    "id" SERIAL NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL,

    CONSTRAINT "cpu_ranking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gpu_ranking" (
    "id" SERIAL NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL,

    CONSTRAINT "gpu_ranking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "reqcpuid" INTEGER NOT NULL,
    "reqgpuid" INTEGER NOT NULL,
    "reqram" INTEGER NOT NULL DEFAULT 8,
    "storage" INTEGER NOT NULL DEFAULT 0,
    "imglink" TEXT NOT NULL,

    CONSTRAINT "game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "adress" TEXT NOT NULL,
    "postalcode" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "cpuid" INTEGER NOT NULL,
    "gpuid" INTEGER NOT NULL,
    "ramid" INTEGER NOT NULL,
    "motherboardid" INTEGER NOT NULL,
    "hddid" INTEGER,
    "ssdid" INTEGER NOT NULL,
    "psuid" INTEGER NOT NULL,
    "towerid" INTEGER NOT NULL,
    "coolerid" INTEGER,
    "fanid" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'pending',

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "issue" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "issue" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'pending',

    CONSTRAINT "issue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "status" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "status_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "chipset" ADD CONSTRAINT "chipset_socketid_fkey" FOREIGN KEY ("socketid") REFERENCES "socket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
