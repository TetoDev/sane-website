<script lang="ts">
    import {pcStore} from "../pcstore";
    import type {PC} from "$lib/server/database/pcbuilder";
    import Pc from "./pc.svelte";

    const PCs: PC[] = [];

</script>

{#each $pcStore as pc}
    <Pc cpu={pc.cpu.name} gpu={pc.gpu.name} ram={pc.ram.name} motherboard={pc.motherboard.name} psu={pc.psu.name} cooler={pc.cooler?.name} ssd={pc.ssd.name} hdd={pc.hdd.name} tower={pc.case.name} total={pc.total}></Pc>
{/each}