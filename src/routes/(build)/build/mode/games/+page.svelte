<script lang="ts">
    import Game from './game.svelte'
    import Loadingscreen from '../../../loadingscreen.svelte'
    import {goto} from "$app/navigation";
    import {pcStore} from "../../pcstore";

    export let data;
    const games = data.post;

    let tier = 1;
    let error = '';
    let budget: number;
    let rgb = false;
    let size: string = 'ATX';

    const options = [
        {title: "Menos que mínimo", value: 0},
        {title: "Mínimo", value: 1},
        {title: "Intermedio", value: 2},
        {title: "Alto", value: 3},
        {title: "Mega", value: 4},
        {title: "Omega", value: 5},
    ]

    let loading: boolean = false;

    async function submit(){
        const selectedGames = games.filter(game => game.selected);
        const selectedGamesIds = selectedGames.map(game => game.id);

        if (selectedGamesIds.length === 0) {
            error = 'Selecciona al menos un juego';
            return;
        }
        if (tier < 0 || tier > 5) {
            error = 'Selecciona un tier válido';
            return;
        }
        if (budget < 300000) {
            error = 'Selecciona un presupuesto válido. Arriba de $300.000';
            return;
        }
        if (!['ATX', 'Micro ATX'].includes(size)) {
            error = 'Selecciona un tamaño de gabinete válido';
            return;
        }

        error = ''

        loading = true;

        const response = await fetch('/build/mode/games', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                games: selectedGamesIds,
                tier: tier,
                size: size,
                rgb: rgb,
                budget: budget
            })
        });

        pcStore.set((await response.json()).pcs)
        loading = false;

        await goto('/build/checkout')
    }

</script>

<div class="wrapper">
    <p id="desc">Primero selecciona los juegos que quieras jugar en tu futura PC, luego el rendimiento que quieras en los juegos seleccionados, y finalmente tu presupuesto ideal!</p>
    {#each games as game}
        <button class="game-button {game.selected ? 'selected' : ''}" on:click={() => game.selected = !game.selected}>
            <Game title={game.title} imgUrl={game.imgUrl} selected={game.selected ? "1" : "0"}></Game>
        </button>
    {/each}
    <div class="bottom-wrapper">
        <h2>RENDIMIENTO:</h2>
        <div class="button-wrapper">
            {#each options as option}
                <button
                        class="tier-option"
                        on:click={() => tier = option.value}
                        style="background-color: {tier === option.value ? 'var(--eblue)' : 'var(--dpurple}'}; color: {tier === option.value ? 'black' : 'white'};"
                >
                    {option.title}
                </button>
            {/each}
            <span>
                <h2>PRESUPUESTO:</h2>
                <input id="budget" type="number" bind:value={budget}>
            </span>
            <span>
                <h2>GABINETE:</h2>
                <label>
                    Importa la estética (RGB, Panel transparente)?
                    <input type="checkbox" bind:checked={rgb}>
                </label>
                <br>
                <label>
                    Que tamaño de gabinete quiere?
                    <select name="size" id="size" bind:value={size}>
                        <option value="ATX">Estándar (Recomendado)</option>
                        <option value="Micro ATX">Mediano</option>
                    </select>
                </label>
            </span>
        </div>
        <button class="submit" on:click={submit}>GENERAR PC</button>
    </div>
    {#if error !== ''}
        <p class="error">{error}</p>
    {/if}
</div>
{#if loading}
    <Loadingscreen text="Generando PCs"></Loadingscreen>
{/if}

<style>
    #budget {
        width: 100%;
        height: 2em;
        border-radius: 10px;
        border: none;
        background-color: var(--mgray);
        color: white;
        font-size: 1.5em;
        text-align: center;
        margin-bottom: 1em;
    }

    span {
        margin: 0 2em;
        text-align: center;
        border-style: solid;
        border-width: 2px;
        border-color: var(--eblue);
        padding: 1em 2em;
        border-radius: 30px;
        background-color: var(--dpurple);
    }


    .error {
        color: red;
        font-size: 2em;
        font-weight: bold;
        text-align: center;
    }

    .submit {
        border: none;
        border-radius: 10px;
        width: 250px;
        height: 80px;
        font-family: "Oswald", sans-serif;
        text-transform: uppercase;
        font-size: 30px;
        font-weight: bold;
        margin: 50px auto;
        background-color: var(--dpurple);
        color: white;
        cursor: pointer;
    }

    .bottom-wrapper{
        text-align: left;
        margin: 1em 3em;
    }

    .bottom-wrapper h2 {
        font-size: 2em;
    }

    .button-wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-bottom: 2em;
    }

    .tier-option {
        background-color: var(--dpurple);
        font-size: 30px;
        margin: 0.5em;
        border-color: transparent;
        border-radius: 30px;
        transition: all 0.3s ease;
        min-width: 3em;
        font-family: 'Oswald', sans-serif;
        text-transform: uppercase;
        cursor: pointer;
        padding: 1em 1.75em;
    }


    .game-button {
        background: none;
        padding: 0;
        margin: 1em;
        border-style: solid;
        border-width: 4px;
        border-color: transparent;
        border-radius: 10%;
        transition: all 0.3s ease-in-out;
    }

    #desc {
        font-size: 1.4em;
        margin-bottom: 0.5em;
        font-weight: bold;
    }

    .selected{
        border-color: var(--eblue);
    }

    .wrapper {
        margin-top: 2em;
        background-color: var(--nblue);
        padding: 2em;
        text-align: center;
        border-radius: 30px;
    }

</style>