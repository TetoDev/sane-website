import type { WithId } from "mongodb";
import { getCpuFromRanking, getGpuFromRanking } from "./database"

interface Cpu {
    name: string,
    price: number,
    socket: string,
    link: string,
}

interface Cooler {
    name: string,
    price: number,
    height: number,
    link: string,
}

interface Motherboard {
    name: string,
    price: number,
    socket: string,
    memory_slots: number,
    link: string,
}

interface Ram {
    name: string,
    price: number,
    ddr: string,
    link: string,
}

interface Gpu {
    name: string,
    price: number,
    bus: string,
    link: string,
}

interface Psu {
    name: string,
    price: number,
    wattage: number,
    link: string,
}

interface Hdd {
    name: string,
    price: number,
    capacity: number,
    link: string,
}

interface Ssd {
    name: string,
    price: number,
    capacity: number,
    bus: string,
    link: string,
}

interface Case {
    name: string,
    price: number,
    size: string,
    link: string,
}

interface Fan {
    name: string,
    price: number,
    size: string,
    link: string,
}

interface PC {
    cpu: Cpu,
    cooler: Cooler,
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

export async function getPCsByTier(tier: string, size: string, budget: number, looks: string, amount: number): Promise<PC[]> {
    const pcs: PC[] = [];

    const targetCpu = tier === 'low'? 10000 : (tier === 'mid' ? 25000 : 45000);
    const targetGpu =  tier === 'low' ? 8000 : (tier === 'mid' ? 17000 : 30000);

    for (let i = 0; i < amount; i++) {
        const cpuranking = await getCpuFromRanking(targetCpu);
        const gpuranking = await getGpuFromRanking(targetGpu);
        
        
    }

    return []
}