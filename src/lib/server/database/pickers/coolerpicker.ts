import type {cooler, cpu} from "@prisma/client";

export function pickCooler (cpu: cpu, coolers: cooler[], slim: boolean, exceptions: number[]){

    const water = cpu.generation === "R7" && (cpu.name.includes("Ryzen 7") || cpu.name.includes("Ryzen 9")) || ["RAPTOR"].includes(cpu.generation) && cpu.score >= 30000 || cpu.score >= 40000;
    const minHeight = slim && !water ? 0 : 85;
    const minPrice = cpu.score >= 40000 ? 120000 : cpu.score >= 35000 ? 40000 : cpu.score  >= 25000 ? 28000 : (cpu.score >= 15000 ? 18000 : 0);

    const filtered = coolers.filter(cooler => cooler.socketids.includes(cpu.socketid) && cooler.price !== 0 && cooler.price >= minPrice)
        .filter(cooler => cooler.type === (water ? "water" : "air"))
        .filter(cooler => cooler.type === "air" ? (parseInt(cooler.size.replace(' mm.', '')) >= minHeight) : true)
        .filter(cooler => !exceptions.includes(cooler.id))
        .sort((cooler1, cooler2) => cooler1.price - cooler2.price);

    return filtered[0];
}