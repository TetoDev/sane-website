/*
  Warnings:

  - You are about to drop the column `reqcpuid` on the `game` table. All the data in the column will be lost.
  - You are about to drop the column `reqgpuid` on the `game` table. All the data in the column will be lost.
  - You are about to drop the column `coolerid` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `cpuid` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `fanid` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `gpuid` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `hddid` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `motherboardid` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `psuid` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `ramid` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `ssdid` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `towerid` on the `order` table. All the data in the column will be lost.
  - Added the required column `cpuscore` to the `game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gpuscore` to the `game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buildid` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chipset" ADD COLUMN     "score" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "cooler" ADD COLUMN     "socketids" INTEGER[] DEFAULT ARRAY[]::INTEGER[];

-- AlterTable
ALTER TABLE "game" DROP COLUMN "reqcpuid",
DROP COLUMN "reqgpuid",
ADD COLUMN     "cpuscore" INTEGER NOT NULL,
ADD COLUMN     "gpuscore" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "order" DROP COLUMN "coolerid",
DROP COLUMN "cpuid",
DROP COLUMN "fanid",
DROP COLUMN "gpuid",
DROP COLUMN "hddid",
DROP COLUMN "motherboardid",
DROP COLUMN "psuid",
DROP COLUMN "ramid",
DROP COLUMN "ssdid",
DROP COLUMN "towerid",
ADD COLUMN     "buildid" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "socket" ADD COLUMN     "coolerId" INTEGER;

-- CreateTable
CREATE TABLE "build" (
    "id" SERIAL NOT NULL,
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

    CONSTRAINT "build_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "socket" ADD CONSTRAINT "socket_coolerId_fkey" FOREIGN KEY ("coolerId") REFERENCES "cooler"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_buildid_fkey" FOREIGN KEY ("buildid") REFERENCES "build"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "build" ADD CONSTRAINT "build_cpuid_fkey" FOREIGN KEY ("cpuid") REFERENCES "cpu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "build" ADD CONSTRAINT "build_gpuid_fkey" FOREIGN KEY ("gpuid") REFERENCES "gpu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "build" ADD CONSTRAINT "build_ramid_fkey" FOREIGN KEY ("ramid") REFERENCES "ram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "build" ADD CONSTRAINT "build_motherboardid_fkey" FOREIGN KEY ("motherboardid") REFERENCES "motherboard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "build" ADD CONSTRAINT "build_hddid_fkey" FOREIGN KEY ("hddid") REFERENCES "hdd"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "build" ADD CONSTRAINT "build_ssdid_fkey" FOREIGN KEY ("ssdid") REFERENCES "ssd"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "build" ADD CONSTRAINT "build_psuid_fkey" FOREIGN KEY ("psuid") REFERENCES "psu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "build" ADD CONSTRAINT "build_towerid_fkey" FOREIGN KEY ("towerid") REFERENCES "tower"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "build" ADD CONSTRAINT "build_coolerid_fkey" FOREIGN KEY ("coolerid") REFERENCES "cooler"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "build" ADD CONSTRAINT "build_fanid_fkey" FOREIGN KEY ("fanid") REFERENCES "fan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
