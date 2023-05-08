import type {motherboard, cpu, chipset} from "@prisma/client";
import {getChipset} from "$lib/server/database/database";

export async function pickMotherboard(cpu: cpu, motherboards: motherboard[], exceptions: number[]) {

    const ddr5 = cpu.generation == "R7" || ["ALDER","RAPTOR"].includes(cpu.generation) && cpu.score >= 30000;

    const filtered = motherboards.filter(motherboard => !exceptions.includes(motherboard.id))
        .filter(motherboard => motherboard.ddr5 === ddr5)
        .filter(motherboard => motherboard.socketid === cpu.socketid)
        .filter(motherboard => motherboard.price !== 0)
        .filter(async motherboard => (await getChipset(motherboard.chipsetid) as chipset).supportedgenerations.includes(cpu.generation))
        .sort((motherboard1, motherboard2) => motherboard1.price - motherboard2.price);

    return filtered[0];
}