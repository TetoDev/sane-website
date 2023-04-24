-- CreateTable
CREATE TABLE "Chipset" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL DEFAULT 'nobrand',
    "socketId" INTEGER NOT NULL,

    CONSTRAINT "Chipset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Socket" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Socket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CpuInfo" (
    "id" SERIAL NOT NULL,
    "socketId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "generation" TEXT NOT NULL,

    CONSTRAINT "CpuInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cpu" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "cpuInfoId" INTEGER NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "Cpu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GpuInfo" (
    "id" SERIAL NOT NULL,
    "bus" TEXT NOT NULL,
    "vram" INTEGER NOT NULL DEFAULT 0,
    "score" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "GpuInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gpu" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "gpuInfoId" INTEGER NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "Gpu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RamInfo" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "speed" INTEGER NOT NULL DEFAULT 0,
    "dims" INTEGER NOT NULL DEFAULT 1,
    "capacity" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "RamInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ram" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "ramInfoId" INTEGER NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "Ram_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MotherboardInfo" (
    "id" SERIAL NOT NULL,
    "chipsetId" INTEGER NOT NULL,
    "socketId" INTEGER NOT NULL,
    "format" TEXT NOT NULL,

    CONSTRAINT "MotherboardInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Motherboard" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "motherboardInfoId" INTEGER NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "Motherboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hddInfo" (
    "id" SERIAL NOT NULL,
    "capacity" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "hddInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hdd" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "hddInfoId" INTEGER NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "Hdd_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SsdInfo" (
    "id" SERIAL NOT NULL,
    "capacity" INTEGER NOT NULL DEFAULT 0,
    "bus" TEXT NOT NULL,

    CONSTRAINT "SsdInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ssd" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "ssdInfoId" INTEGER NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "Ssd_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PsuInfo" (
    "id" SERIAL NOT NULL,
    "power" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PsuInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Psu" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "psuInfoId" INTEGER NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "Psu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaseInfo" (
    "id" SERIAL NOT NULL,
    "size" TEXT NOT NULL,
    "panel" TEXT NOT NULL,
    "lighting" BOOLEAN NOT NULL DEFAULT false,
    "includedFans" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CaseInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Case" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "caseInfoId" INTEGER NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "Case_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoolerInfo" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "size" TEXT NOT NULL,

    CONSTRAINT "CoolerInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cooler" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "coolerInfoId" INTEGER NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "Cooler_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FanInfo" (
    "id" SERIAL NOT NULL,
    "size" TEXT NOT NULL,

    CONSTRAINT "FanInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fan" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "fanInfoId" INTEGER NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "Fan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CpuRanking" (
    "id" SERIAL NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL,

    CONSTRAINT "CpuRanking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gpuRanking" (
    "id" SERIAL NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL,

    CONSTRAINT "gpuRanking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "reqCpuId" INTEGER NOT NULL,
    "reqGpuId" INTEGER NOT NULL,
    "reqRam" INTEGER NOT NULL DEFAULT 8,
    "storage" INTEGER NOT NULL DEFAULT 0,
    "imgLink" TEXT NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "cpuId" INTEGER NOT NULL,
    "gpuId" INTEGER NOT NULL,
    "ramId" INTEGER NOT NULL,
    "motherboardId" INTEGER NOT NULL,
    "hddId" INTEGER,
    "ssdId" INTEGER NOT NULL,
    "psuId" INTEGER NOT NULL,
    "caseId" INTEGER NOT NULL,
    "coolerId" INTEGER,
    "fanId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'pending',

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Issue" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "issue" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'pending',

    CONSTRAINT "Issue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Status" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Chipset_socketId_key" ON "Chipset"("socketId");

-- CreateIndex
CREATE UNIQUE INDEX "CpuInfo_socketId_key" ON "CpuInfo"("socketId");

-- CreateIndex
CREATE UNIQUE INDEX "Cpu_cpuInfoId_key" ON "Cpu"("cpuInfoId");

-- CreateIndex
CREATE UNIQUE INDEX "Gpu_gpuInfoId_key" ON "Gpu"("gpuInfoId");

-- CreateIndex
CREATE UNIQUE INDEX "Ram_ramInfoId_key" ON "Ram"("ramInfoId");

-- CreateIndex
CREATE UNIQUE INDEX "MotherboardInfo_chipsetId_key" ON "MotherboardInfo"("chipsetId");

-- CreateIndex
CREATE UNIQUE INDEX "MotherboardInfo_socketId_key" ON "MotherboardInfo"("socketId");

-- CreateIndex
CREATE UNIQUE INDEX "Motherboard_motherboardInfoId_key" ON "Motherboard"("motherboardInfoId");

-- CreateIndex
CREATE UNIQUE INDEX "Hdd_hddInfoId_key" ON "Hdd"("hddInfoId");

-- CreateIndex
CREATE UNIQUE INDEX "Ssd_ssdInfoId_key" ON "Ssd"("ssdInfoId");

-- CreateIndex
CREATE UNIQUE INDEX "Psu_psuInfoId_key" ON "Psu"("psuInfoId");

-- CreateIndex
CREATE UNIQUE INDEX "Case_caseInfoId_key" ON "Case"("caseInfoId");

-- CreateIndex
CREATE UNIQUE INDEX "Cooler_coolerInfoId_key" ON "Cooler"("coolerInfoId");

-- CreateIndex
CREATE UNIQUE INDEX "Fan_fanInfoId_key" ON "Fan"("fanInfoId");

-- AddForeignKey
ALTER TABLE "Chipset" ADD CONSTRAINT "Chipset_socketId_fkey" FOREIGN KEY ("socketId") REFERENCES "Socket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CpuInfo" ADD CONSTRAINT "CpuInfo_socketId_fkey" FOREIGN KEY ("socketId") REFERENCES "Socket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cpu" ADD CONSTRAINT "Cpu_cpuInfoId_fkey" FOREIGN KEY ("cpuInfoId") REFERENCES "CpuInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gpu" ADD CONSTRAINT "Gpu_gpuInfoId_fkey" FOREIGN KEY ("gpuInfoId") REFERENCES "GpuInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ram" ADD CONSTRAINT "Ram_ramInfoId_fkey" FOREIGN KEY ("ramInfoId") REFERENCES "RamInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Motherboard" ADD CONSTRAINT "Motherboard_motherboardInfoId_fkey" FOREIGN KEY ("motherboardInfoId") REFERENCES "MotherboardInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hdd" ADD CONSTRAINT "Hdd_hddInfoId_fkey" FOREIGN KEY ("hddInfoId") REFERENCES "hddInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ssd" ADD CONSTRAINT "Ssd_ssdInfoId_fkey" FOREIGN KEY ("ssdInfoId") REFERENCES "SsdInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Psu" ADD CONSTRAINT "Psu_psuInfoId_fkey" FOREIGN KEY ("psuInfoId") REFERENCES "PsuInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_caseInfoId_fkey" FOREIGN KEY ("caseInfoId") REFERENCES "CaseInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cooler" ADD CONSTRAINT "Cooler_coolerInfoId_fkey" FOREIGN KEY ("coolerInfoId") REFERENCES "CoolerInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fan" ADD CONSTRAINT "Fan_fanInfoId_fkey" FOREIGN KEY ("fanInfoId") REFERENCES "FanInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
