<script lang="ts">

    export let id: number;
    export let cpu: string;
    export let gpu: string;
    export let ram: string;
    export let motherboard: string;
    export let psu: string;
    export let cooler: string;
    export let ssd: string;
    export let hdd: string;
    export let tower: string;
    export let total: number;

    export let selected: boolean;
</script>


<div style="background-color: {selected ? 'var(--eblue)' : 'var(--dpurple)'}; border-color: {selected ? 'black' : 'transparent'}; color: {selected ? 'black' : 'white'};">
    <h1>Opción: {id}</h1>
    <p>CPU: {cpu}</p>
    <p>GPU: {gpu}</p>
    <p>RAM: {ram}</p>
    <p>Motherboard: {motherboard}</p>
    <p>PSU: {psu}</p>
    <p>Cooler: {cooler}</p>
    <p>SSD: {ssd}</p>
    <p>HDD: {hdd}</p>
    <p>Tower: {tower}</p>
    {#if selected}
        <p class="selected-prompt">Seleccionado</p>
    {/if}
    <p id="total">Total: {total}</p>
</div>

<style>
    .selected-prompt {
        float: left;
        margin: 1em 0;
        font-weight: bold;
        font-size: 1.5em;
    }

    div {
        background-color: var(--dpurple);
        border-radius: 30px;
        border-style: solid;
        border-width: 3px;
        padding: 2em;
        margin: 2em;
        transition: all 0.2s ease;
    }

    p {
        color: var(--white);
        font-size: 1.2em;
        margin: 0;
    }

    #total {
        font-size: 1.5em;
        font-weight: bold;
        margin-top: 1em;
        text-align: end;
    }
</style>