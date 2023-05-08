import type {gpu} from "@prisma/client";

export function pickGpu (score: number, graphics: gpu[], exceptions: number[]) {
    const filtered = graphics.filter(graphic => graphic.score >= score && graphic.price !== 0)
        .filter(graphic => !exceptions.includes(graphic.id))
        .sort((gpu1, gpu2) => gpu1.price - gpu2.price);

    if (filtered[0] == undefined){
        filtered.concat(graphics.filter(graphic => exceptions.includes(graphic.id)));
    }

    return filtered[0];
}