import type { RequestHandler } from './$types';
import { getPCsByTier } from '$lib/server/database/pcbuilder';

type Data = {
    success: boolean,
    errors: Record<string, string>,
}

export const POST: RequestHandler = async ({ request }) => {
    const formData = await request.formData();
    const tier = formData.get('tier') as string;
    const size = formData.get('size') as string;
    const budget = formData.get('budget') as string;
    const looks = formData.get('looks') as string;

    await getPCsByTier(tier, size, parseInt(budget), looks, 5)

    return new Response();
};