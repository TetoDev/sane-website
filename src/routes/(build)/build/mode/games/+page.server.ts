import {getGames} from "$lib/server/database/database";
import type {game} from "@prisma/client";


export async function load() {
    interface Game {
        title: string,
        imgUrl: string,
        selected: boolean
    }

    const games = await getGames() as game[];

    const gameList: Game[] = games.map((game) => {
        return {
            title: game.name,
            imgUrl: game.imglink,
            id: game.id,
            selected: false
        }
    });

    return {
        post: gameList,
    };
}