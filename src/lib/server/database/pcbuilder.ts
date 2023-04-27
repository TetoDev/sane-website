import {
    getChipset,
    getCpusByScore,
    getGpusByScore,
    getMotherboards,
    getPsus,
    getRams,
    getSsds,
    getTowers
} from "./database";
import type {chipset, cpu, gpu, motherboard, psu, ram, tower} from "@prisma/client";


interface Cpu {
    name: string,
    price: number,
    id: number,
}

interface Cooler {
    name: string,
    price: number,
    height: number,
    id: number,
}

interface Motherboard {
    name: string,
    price: number,
    memorySlots: number,
    id: number,
}

interface Ram {
    name: string,
    price: number,
    ddr: string,
    id: number,
}

interface Gpu {
    name: string,
    price: number,
    bus: string,
    id: number,
}

interface Psu {
    name: string,
    price: number,
    wattage: number,
    id: number,
}

interface Hdd {
    name: string,
    price: number,
    capacity: number,
    id: number,
}

interface Ssd {
    name: string,
    price: number,
    capacity: number,
    bus: string,
    id: number,
}

interface Case {
    name: string,
    price: number,
    size: string,
    id: number,
}

interface Fan {
    name: string,
    price: number,
    size: string,
    id: number,
}

export interface PC {
    cpu: Cpu,
    cooler?: Cooler,
    motherboard: Motherboard,
    ram: Ram,
    gpu: Gpu,
    psu: Psu,
    hdd?: Hdd,
    ssd: Ssd,
    case: Case,
    fans: Fan[],
    total: number,
}

export async function getPCByTier(tier: string, size: string, budget: number, looks: boolean): Promise<PC> {

    const targetCpu = tier === 'low'? 10000 : (tier === 'mid' ? 25000 : 45000);
    const targetGpu =  tier === 'low' ? 8000 : (tier === 'mid' ? 17000 : 30000);
    const targetRam = tier === 'low' ? 8 : 16;

    const cpus = await getCpusByScore(targetCpu) as cpu[];
    const gpus = await getGpusByScore(targetGpu) as gpu[];

    const cpu = cpus[0];
    const gpu = gpus[0];

    const ddr5 = cpu.generation === "R7" || (cpu.generation === "ALDER" && tier === "high") || (cpu.generation === "ROCKET" && tier === "high");
    const motherboards = await getMotherboards(cpu, ddr5, 2, size, []) as motherboard[];

    const motherboard = motherboards[0];
    const chipset = await getChipset(motherboard.chipsetid) as chipset;

    const ramSpeed = ddr5 ? chipset.ddr5 - 2000 : chipset.ddr4 - 1000;
    const rams = await getRams(ddr5, targetRam, ramSpeed, 2, []) as ram[];
    const ram = rams[0];

    const ssds = await getSsds(tier === "high" ? 1000 : 500, tier === "high" || tier === "mid" ? "M.2" : "2.5\"", tier === "high" || tier === "mid" ? "PCIe" : "SATA 3",[]) as Ssd[];
    const ssd = ssds[0];

    const towers = await getTowers(size, looks, []) as tower[];
    const tower = towers[0]

    const psus = await getPsus(tier === "high" ? 800 : 600, []) as psu[];
    const psu = psus[0];

    const cpuObj: Cpu = {
        name: cpu.name,
        price: cpu.price,
        id: cpu.id,
    }
    const motherboardObj: Motherboard = {
        name: motherboard.name,
        price: motherboard.price,
        memorySlots: motherboard.memoryslots,
        id: motherboard.id,
    }
    const ramObj: Ram = {
        name: ram.name,
        price: ram.price,
        ddr: ram.ddr5 ? "DDR5" : "DDR4",
        id: ram.id,
    }
    const gpuObj: Gpu = {
        name: gpu.name,
        price: gpu.price,
        bus: gpu.bus,
        id: gpu.id,
    }
    const psuObj: Psu = {
        name: psu.name,
        price: psu.price,
        wattage: psu.power,
        id: psu.id,
    }
    const ssdObj: Ssd = {
        name: ssd.name,
        price: ssd.price,
        capacity: ssd.capacity,
        bus: ssd.bus,
        id: ssd.id,
    }
    const caseObj: Case = {
        name: tower.name,
        price: tower.price,
        size: tower.size,
        id: tower.id,
    }

    return {
        cpu: cpuObj,
        motherboard: motherboardObj,
        ram: ramObj,
        gpu: gpuObj,
        psu: psuObj,
        ssd: ssdObj,
        case: caseObj,
        fans: [],
        total: cpu.price + motherboard.price + ram.price + gpu.price + psu.price + ssd.price + tower.price,
    };
}