import type {cpu, ssd} from "@prisma/client";

export function pickSsd(capacity: number, cpu: cpu, ssds: ssd[], exceptions: number[]) {

    const format = cpu.score >= 13000 ? "M.2" : "2.5\"";

    const filter = ssds.filter(ssd => ssd.capacity >= capacity && ssd.format === format && !exceptions.includes(ssd.id))
        .filter(ssd => ssd.price !== 0)
        .sort((ssd1, ssd2) => ssd1.price - ssd2.price);

    return filter[0];
}