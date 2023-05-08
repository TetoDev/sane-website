import type {ram, cpu, chipset} from "@prisma/client";

export function pickRam(cpu: cpu, chipset: chipset, dims: number, ddr5: boolean, capacity: number, rams: ram[], exceptions: number[]) {

    const speed = chipset.brand === "AMD" || cpu.generation === "RAPTOR" ? (ddr5 ? chipset.ddr5 : chipset.ddr4)
        : (cpu.generation === "ALDER" ? (ddr5 ? chipset.ddr5 - 1000 : chipset.ddr4 - 400)
            : cpu.generation === "ROCKET" ? chipset.ddr4 : chipset.ddr4 - 400);

    const filtered = rams.filter(ram => ram.dims <= dims && speed >= 3200 ? ram.dims > 1 : true)
        .filter(ram => ram.ddr5 === ddr5)
        .filter(ram => ram.capacity >= capacity/ram.dims)
        .filter(ram => ram.speed >= speed - (ddr5 ? 2000: 400) && ram.speed <= speed + (ddr5 ? 2000: 400))
        .filter(ram => ram.price !== 0)
        .filter(ram => !exceptions.includes(ram.id))
        .sort((ram1, ram2) => ram1.price - ram2.price);

    return filtered[0];
}