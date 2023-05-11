<script lang="ts">
    export let total: number;
    export let id: number;
</script>


<div class="wrapper">
    <p class="order">Orden:</p>
    <p class-="">Opción: {id}</p>
    <p>Total: {total}</p>
</div>


<style>
    .wrapper {
        display: inline-block;
        background-color: var(--nblue);
        height: 50vh;
        width: 15vw;
    }

    .order {
        color: white;
        font-size: 1.5rem;
        font-weight: bold;
    }
</style>