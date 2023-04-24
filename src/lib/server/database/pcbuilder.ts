import type {ObjectId} from "mongodb";
import {
    getCpuFromRanking,
    getGpuFromRanking,
    getCpuFromStoreByScore,
    getGpuFromStoreByScore,
    getRam,
    getPsu, getCase, getSsd, getMotherboard
} from "./database"

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
    memorySlots: number,
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

export async function getPCsByTier(tier: string, size: string, budget: number, looks: boolean, amount: number): Promise<PC[]> {
    const pcs: PC[] = [];

    const targetCpu = tier === 'low'? 10000 : (tier === 'mid' ? 25000 : 45000);
    const targetGpu =  tier === 'low' ? 8000 : (tier === 'mid' ? 17000 : 30000);

    const cpuExceptions: ObjectId[] = [];
    const gpuExceptions: ObjectId[] = [];
    const ramExceptions: ObjectId[] = [];
    const caseExceptions: ObjectId[] = [];

    for (let i = 0; i < amount; i++) {
        const cpuDoc = await getCpuFromStoreByScore(targetCpu,1000*i, cpuExceptions);
        const gpuDoc = await getGpuFromStoreByScore(targetGpu,1000*i, gpuExceptions);
        const mbDoc = await getMotherboard("am4", "x570", 4, "atx",[]);
        const ramDoc = await getRam("ddr4", 2, 8, 4200, ramExceptions);
        const psuDoc = await getPsu(650,[]);
        const caseeDoc = await getCase(tier, size, looks,  caseExceptions);
        const ssdDoc = await getSsd("m2nvme", 480, []);

        const cpu: Cpu = {
            name: cpuDoc?.name ?? "No CPU found",
            price: cpuDoc?.price ?? "No CPU found",
            socket: cpuDoc?.info.socket ?? "No CPU found",
            link: cpuDoc?.link ?? "No CPU found",
        }
        const gpu: Gpu = {
            name: gpuDoc?.name ?? "No GPU found",
            price: gpuDoc?.price ?? "No GPU found",
            bus: gpuDoc?.info.bus ?? "No GPU found",
            link: gpuDoc?.link ?? "No GPU found",
        }
        const motherboard: Motherboard = {
            name: mbDoc?.name ?? "No Motherboard found",
            price: mbDoc?.price ?? "No Motherboard found",
            socket: mbDoc?.info.socket ?? "No Motherboard found",
            memorySlots: parseInt(mbDoc?.info.vram[1] ?? "0"),
            link: mbDoc?.link ?? "No Motherboard found",
        }
        const ram: Ram = {
            name: ramDoc.name,
            price: ramDoc.price,
            ddr: "ddr4",
            link: ramDoc.link,
        }
        const psu: Psu = {
            name: psuDoc.name,
            price: psuDoc.price,
            wattage: psuDoc.info.wattage,
            link: psuDoc.link,
        }
        const casee: Case = {
            name: caseeDoc.name,
            price: caseeDoc.price,
            size: caseeDoc.info.size,
            link: caseeDoc.link,
        }
        const ssd: Ssd = {
            name: ssdDoc.name,
            price: ssdDoc.price,
            capacity: ssdDoc.info.capacity,
            bus: ssdDoc.info.bus,
            link: ssdDoc.link,
        }
        const pc: PC = {
            cpu: cpu,
            motherboard: motherboard,
            ram: ram,
            gpu: gpu,
            psu: psu,
            case: casee,
            ssd: ssd,
            fans: [],
            total: cpu.price + gpu.price + motherboard.price + ram.price + psu.price + casee.price + ssd.price,
        }
        pcs.push(pc);
    }

    return pcs;
}