import type { RequestHandler } from './$types';
import { getPCByTier } from '$lib/server/database/pcbuilder';
import type {PC} from "../../../../../lib/server/database/pcbuilder";

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
        if (budgetInt > 2000000){
            data.errors.push("Budget too high for tier")
        }
    }

    const looksMatter = looks === "yes";

    if (data.errors.length > 0){
        return new Response(JSON.stringify(data),{"status": 400,"headers":{"content-type":"application/json"}});
    }

    data.pcs.push(await getPCByTier(tier, size, parseInt(budget), looksMatter));

    return new Response(JSON.stringify(data),{"status": 200, "headers":{"content-type":"application/json"}});
};