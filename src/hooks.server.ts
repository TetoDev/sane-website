import { createConnection } from "$lib/server/database/database";

export const handle = async ({event, resolve}) => {
    createConnection();
    return await resolve(event)
}