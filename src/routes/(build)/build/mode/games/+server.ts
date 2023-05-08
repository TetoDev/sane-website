import type {RequestHandler} from "@sveltejs/kit";
import type {PC} from "$lib/server/database/pcbuilder";
import type {game} from "@prisma/client";
import {getGames} from "$lib/server/database/database";
import {getPCs} from "$lib/server/database/pcbuilder";

type Data = {
    success: boolean,
    pcs: PC[],
    errors: String[],
}

export const POST: RequestHandler = async ({ request }) => {
    const requestData = await request.json();
    const tier = requestData.tier as number;
    const gameIds = requestData.games as number[];

    const data: Data = {
        success: false,
        pcs: [],
        errors: [],
    }

    if (gameIds.length < 1){
        data.errors.push("No games selected")
        return new Response(JSON.stringify(data),{"status": 400,"headers":{"content-type":"application/json"}});
    }
    if (tier < 0 || tier > 5) {
        data.errors.push("Invalid tier")
        return new Response(JSON.stringify(data),{"status": 400,"headers":{"content-type":"application/json"}});
    }

    const allGames = await getGames() as game[];

    const selectedGames = allGames.filter(game => gameIds.includes(game.id));

    const highestCpuScore = Math.max(...selectedGames.map(game => game.cpuscore));
    const highestGpuScore = Math.max(...selectedGames.map(game => game.gpuscore));

    const targetCpu = highestCpuScore + (tier+1)*3000; // CHANGE
    const targetGpu = highestGpuScore + (tier+1)*3000; // CHANGE
    const targetRam = 16;
    const ssdStorage = 500;
    const hddStorage = 1000;

    data.pcs = await getPCs(targetCpu, targetGpu, targetRam, ssdStorage, hddStorage, "ATX", 1000000, true, 1);

    return new Response(JSON.stringify(data),{"status": 200,"headers":{"content-type":"application/json"}});
}