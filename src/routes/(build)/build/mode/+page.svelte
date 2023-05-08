<script lang="ts">
    import Loadingscreen from '../../loadingscreen.svelte'

    let loading: boolean = false;
</script>

<span>Escoge tu modo preferido para construir tu PC</span>

<div>
    <a href="/build/mode/tiers">
        <h2>EASY</h2>
        <p>Dínos tu presupuesto y la gama de tu futuro PC y te daremos opciones de baja a alta gama</p>
    </a>
    
    <a href="/build/mode/games" on:click={() => loading = true}>
        <h2>ADVANCED</h2>
        <p>Selecciona los juegos que quieres jugar y a qué FPS y te daremos la mejor opción acorde a tu presupuesto</p>
    </a>
</div>
{#if loading}
    <Loadingscreen text="Cargando Juegos"/>
{/if}

<style>

    span {
        font-family: "Poppins";
        display: block;
        font-size: 30px;
        color: var(--nblue);
        font-weight: bold;
        margin: 12px 40px 23px 40px;
    }

    div {
        display: block;
        width: 80vw;
        text-align: center;
        margin: 0 auto;
    }
    a {
        transition: all 0.2s ease;
        background-color: var(--mgray);
        display: inline-block;
        padding: 30px;
        border-radius: 30px; 
        text-align: center;
        text-decoration: none;
        color: white;
        max-width: 35%;
        min-width: 300px;
        border-width: 10px;
        border-style: solid;
        border-color: transparent;
        margin: 20px 15px;
    }

    a:hover {
        transition: all 0.2s ease;
        border-color: white;
    }

    h2 {
        font-family: "Oswald";
        font-size: 60px;
        margin: 10px 0;
        overflow: hidden;
    }

    p {
        font-family: "Poppins";
        font-size: 18px;
        margin: 0 2%;
    }
</style>