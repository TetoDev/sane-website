import type {cpu} from "@prisma/client";

export function pickCpu(score: number, processors: cpu[], exceptions: number[]){
    const filtered = processors.filter(processor => processor.score >= score && processor.price !== 0)
        .filter(processor => !exceptions.includes(processor.id))
        .sort((cpu1, cpu2) => cpu1.price - cpu2.price);

    if (filtered[0] == undefined){
        filtered.concat(processors.filter(processor => exceptions.includes(processor.id)));
    }

    return filtered[0];
}