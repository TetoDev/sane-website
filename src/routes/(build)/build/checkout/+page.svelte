<script lang="ts">
    import {pcStore} from "../pcstore";
    import Pc from "./pc.svelte";
    import Preview from "./preview.svelte";

    let selected: number;

    $: total = $pcStore[selected]?.total ?? 0;

</script>
<div>
    <div>
        {#each $pcStore as pc}
            <button on:click={() => selected = $pcStore.indexOf(pc)}>
                <Pc id={$pcStore.indexOf(pc)+1} cpu={pc.cpu.name} gpu={pc.gpu.name} ram={pc.ram.name} motherboard={pc.motherboard.name} psu={pc.psu.name} cooler={pc.cooler?.name} ssd={pc.ssd.name} hdd={pc.hdd.name} tower={pc.case.name} total={pc.total} selected={$pcStore.indexOf(pc) === selected}></Pc>
            </button>
        {/each}
    </div>
    <div id="preview-wrapper">
        <Preview total={total} id={selected + 1}></Preview>
    </div>
</div>

<style>
    button {
        border: none;
        background: none;
        padding: 0;
        margin: 0;
    }
</style>