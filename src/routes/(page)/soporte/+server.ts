import type { RequestHandler } from './$types';
import { postIssue } from '$lib/server/database/database';
import { json } from '@sveltejs/kit';

type Data = {
    success: boolean,
    errors: Record<string, string>,
}

export const POST: RequestHandler = async ({ request }) => {
    const formData = await request.formData();
    const name = String(formData.get('name'));
    const phone = String(formData.get('phone'));
    const email = String(formData.get('email'));
    const orderNumber = String(formData.get('order'));
    const description = String(formData.get('description'));

    const data: Data = {
        success: false,
        errors: {},
    }

    if (!name) data.errors.name = 'required';
    if (!phone) data.errors.phone = 'required';
    if (!description) data.errors.description = 'required';
    

    postIssue(name,phone,email,description,orderNumber);
    data.success = true;
    
    return json(data);
};