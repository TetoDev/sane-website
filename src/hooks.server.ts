import { createConnection } from "$lib/server/database/database";

// @ts-ignore
export const handle = async ({event, resolve}) => {
    await createConnection();
    return await resolve(event)
}