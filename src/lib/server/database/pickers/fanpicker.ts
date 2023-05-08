import type {fan} from "@prisma/client";

export function pickFan(size: string, fans: fan[], exceptions: number[]) {

    const filter = fans.filter(fan => fan.size === size && !exceptions.includes(fan.id))
        .filter(fan => fan.price !== 0)
        .sort((fan1, fan2) => fan1.price - fan2.price);

    if (filter[0] == undefined){
        filter.concat(fans.filter(fan => exceptions.includes(fan.id)));
    }

    return filter[0]
}