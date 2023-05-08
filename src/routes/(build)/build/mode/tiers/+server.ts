import type { RequestHandler } from './$types';
import { getPCs } from '$lib/server/database/pcbuilder';
import type {PC} from "$lib/server/database/pcbuilder";

type Data = {
    success: boolean,
    pcs: PC[],
    errors: String[],
}

export const POST: RequestHandler = async ({ request }) => {
    const requestData = await request.json();
    const tier = requestData.tier as string;
    const size = requestData.size as string;
    const budget = requestData.budget as string;
    const looks = requestData.looks as string;

    const data: Data = {
        success: false,
        pcs: [],
        errors: [],
    }



    const budgetInt = parseInt(budget);

    if (tier == "low"){
        if (budgetInt < 400000){
            data.errors.push("Budget too low for tier")
        }
        if (budgetInt > 800000){
            data.errors.push("Budget too high for tier")
        }
    } else if (tier == "mid") {
        if (budgetInt < 800000){
            data.errors.push("Budget too low for tier")
        }
        if (budgetInt > 1200000){
            data.errors.push("Budget too high for tier")
        }
    } else if (tier == "high") {
        if (budgetInt < 1200000){
            data.errors.push("Budget too low for tier")
        }
        if (budgetInt > 3500000){
            data.errors.push("Budget too high for tier")
        }
    }

    if (data.errors.length > 0){
        return new Response(JSON.stringify(data),{"status": 400,"headers":{"content-type":"application/json"}});
    }

    const looksMatter = looks === "yes";

    const targetCpu = tier === 'low'? 10000 : (tier === 'mid' ? 17000 : 40000);
    const targetGpu =  tier === 'low' ? 8000 : (tier === 'mid' ? 13000 : 30000);
    const targetRam = tier === 'low' ? 8 : 16;
    const ssdStorage = tier === 'low' ? 500 : (tier === 'mid' ? 500 : 1000);
    const hddStorage = tier === 'low' ? 0 : (tier === 'mid' ? 1000 : 2000);

    data.pcs = await getPCs(targetCpu, targetGpu ,targetRam, ssdStorage, hddStorage, size, parseInt(budget), looksMatter, 5);

    return new Response(JSON.stringify(data),{"status": 200, "headers":{"content-type":"application/json"}});
};