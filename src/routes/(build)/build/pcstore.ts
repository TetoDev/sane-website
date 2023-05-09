import { writable } from "svelte/store";
import type { PC } from "$lib/server/database/pcbuilder";


export const pcStore = writable<PC[]>();