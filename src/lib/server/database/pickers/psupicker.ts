import type {psu, gpu} from "@prisma/client";

export function pickPsu(gpu: gpu, psus: psu[], exceptions: number[]) {

    const power = gpu.score > 39000 ? 800 : gpu.score > 30000 ? 750 : gpu.score > 20000 ? 650 : gpu.score > 10000 ? 550 : 450;

    const filtered = psus.filter(psu => psu.power >= power && psu.price !== 0)
        .filter(psu => power >= 650 ? psu.price > 47000 : true)
        .filter(psu => !exceptions.includes(psu.id))
        .sort((psu1, psu2) => psu1.price - psu2.price);

    return filtered[0];
}