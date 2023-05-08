import type {hdd} from "@prisma/client";

export function pickHdd(capacity: number, hdds: hdd[], exceptions: number[]){
    const filter = hdds.filter(hdd => hdd.capacity >= capacity && !exceptions.includes(hdd.id))
        .filter(hdd => hdd.price !== 0)
        .sort((hdd1, hdd2) => hdd1.price - hdd2.price);

    if (filter[0] == undefined){
        filter.concat(hdds.filter(hdd => exceptions.includes(hdd.id)));
    }

    return filter[0];
}