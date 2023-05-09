<script lang="ts">

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

</script>


<div>
    <h1>PC</h1>
    <p>CPU: {cpu}</p>
    <p>GPU: {gpu}</p>
    <p>RAM: {ram}</p>
    <p>Motherboard: {motherboard}</p>
    <p>PSU: {psu}</p>
    <p>Cooler: {cooler}</p>
    <p>SSD: {ssd}</p>
    <p>HDD: {hdd}</p>
    <p>Tower: {tower}</p>
    <p id="total">Total: {total}</p>
</div>

<style>
    div {
        background-color: var(--dpurple);
        border-radius: 30px;
        padding: 2em;
        margin: 2em;
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