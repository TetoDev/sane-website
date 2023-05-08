import type {tower, cpu} from "@prisma/client";

export function pickTower (cpu: cpu, towers: tower[], looks: boolean, exceptions: number[]){

    let filter = towers.filter(tower => tower.includedfans > 0 && !exceptions.includes(tower.id) && tower.price !== 0);

    if (cpu.score > 40000){
        filter = filter.filter(tower => tower.price > 90000);
    }
    if (cpu.score > 31000){
        filter = filter.filter(tower => tower.price > 55000);
    }

    if (looks) {
        filter = filter.filter(tower => tower.panel === "Vidrio templado" || tower.panel === "Acrílico");
        if (cpu.score > 15000){
            filter = filter.filter(tower => tower.lighting);
        }
    }

    filter = filter.sort((tower1, tower2) => tower1.price - tower2.price);

    if (filter[0] == undefined){
        filter.concat(towers.filter(tower => exceptions.includes(tower.id)));
    }

    return filter[0];
}