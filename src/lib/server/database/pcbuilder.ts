import {
    getChipset, getCoolers,
    getCpus, getFans,
    getGpus, getHdds,
    getMotherboards,
    getPsus,
    getRams,
    getSsds,
    getTowers
} from "./database";
import type {chipset, cooler, cpu, gpu, motherboard, psu, ram, tower, hdd, ssd, fan} from "@prisma/client";
import {pickCpu} from "$lib/server/database/pickers/cpupicker";
import {pickGpu} from "$lib/server/database/pickers/gpupicker";
import {pickRam} from "$lib/server/database/pickers/rampicker";
import {pickMotherboard} from "$lib/server/database/pickers/mbpicker";
import {pickSsd} from "$lib/server/database/pickers/ssdpicker";
import {pickTower} from "$lib/server/database/pickers/towerpicker";
import {pickPsu} from "$lib/server/database/pickers/psupicker";
import {pickHdd} from "$lib/server/database/pickers/hddpicker";
import {pickFan} from "$lib/server/database/pickers/fanpicker";
import {pickCooler} from "$lib/server/database/pickers/coolerpicker";



export interface PC {
    cpu: cpu,
    cooler?: cooler,
    motherboard: motherboard,
    ram: ram,
    gpu: gpu,
    psu: psu,
    hdd?: hdd,
    ssd: ssd,
    case: tower,
    fan?: fan,
    total: number,
}

export async function getPCs(targetCpu: number, targetGpu: number, targetRam: number, ssdStorage: number, hddStorage: number, size: string, budget: number, looks: boolean, amount: number): Promise<PC[]> {

    const pcs: PC[] = [];

    let cpuScore = targetCpu;
    let gpuScore = targetGpu;

    const allCpus = await getCpus() as cpu[];
    const allGpus = await getGpus() as gpu[];
    const allCooler = await getCoolers() as cooler[];
    const allRams = await getRams() as ram[];
    const allSsds = await getSsds() as ssd[];
    const allHdds = await getHdds() as hdd[];
    const allTowers = await getTowers(size) as tower[];
    const allPsus = await getPsus() as psu[];
    const allMotherboards = await getMotherboards(size) as motherboard[];
    const allFans = await getFans() as fan[];

    const towerExceptions: number[] = [];
    const motherboardExceptions: number[] = [];
    const fanExceptions: number[] = [];
    const ssdExceptions: number[] = [];
    const hddExceptions: number[] = [];


    let motherboardUndefined: boolean;
    for (let i = 0; i < amount; i++) {

        const cpu = pickCpu(cpuScore, allCpus, []);
        const gpu = pickGpu(gpuScore, allGpus, []);
        const cooler = pickCooler(cpu, allCooler, size === "Mini ITX", []);
        const motherboard = await pickMotherboard(cpu, allMotherboards, motherboardExceptions);

        motherboardUndefined = motherboard === undefined;
        if(motherboardUndefined) {
            motherboardExceptions.splice(0, motherboardExceptions.length);
            continue;
        }

        const chipset = await getChipset(motherboard.chipsetid) as chipset;

        const ram = pickRam(cpu, chipset, motherboard.memoryslots, motherboard.ddr5, targetRam, allRams, []);

        const ssd = pickSsd(ssdStorage, cpu, allSsds, ssdExceptions);
        const hdd = pickHdd(hddStorage, allHdds, hddExceptions);
        const tower = pickTower(cpu, allTowers, looks, towerExceptions);
        const psu = pickPsu(gpu, allPsus, []);
        const fan = pickFan("120", allFans, fanExceptions);


        towerExceptions.push(tower.id);

        if (!motherboardUndefined) motherboardExceptions.push(motherboard.id);

        fanExceptions.push(fan.id);

        const pc: PC = {
            cpu: cpu,
            motherboard: motherboard,
            cooler: cooler,
            ram: ram,
            gpu: gpu,
            psu: psu,
            ssd: ssd,
            hdd: hddStorage === 0 ? undefined : hdd,
            case: tower,
            fan: tower.includedfans === 0 ? fan : undefined,
            total: cpu.price + motherboard.price + ram.price + gpu.price + psu.price + ssd.price + tower.price + (hddStorage === 0 ? 0 : hdd.price) + (cooler === undefined ? 0 : cooler.price) + (tower.includedfans === 0 ? fan.price : 0),
        };

        console.log("--------------------------------- PC: " + i + "------------------------------------");
        console.log(pc)

        if(pc.total > budget + 100000) {
            console.log("PC: " + i + " is too expensive");
            cpuScore -= 2000;
            gpuScore -= 2000;
        }
        if (pc.total < budget + 100000) {
            console.log("PC: " + i + " is too cheap")
            cpuScore += 3000;
            gpuScore += 3000;
            ssdExceptions.push(ssd.id);
            hddExceptions.push(hdd.id);
        }

        pcs.push(pc)
    }
    return pcs;
}