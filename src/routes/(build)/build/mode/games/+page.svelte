<script lang="ts">
    import Game from './game.svelte'

    export let data;
    const games = data.post;

    let tier = 1;

    const options = [
        {title: "Menos que mínimo", value: 0},
        {title: "Mínimo", value: 1},
        {title: "Intermedio", value: 2},
        {title: "Alto", value: 3},
        {title: "Mega", value: 4},
        {title: "Omega", value: 5},
    ]

    async function submit(){
        const selectedGames = games.filter(game => game.selected);
        const selectedGamesIds = selectedGames.map(game => game.id);

        const response = await fetch('/build/mode/games', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                games: selectedGamesIds,
                tier: tier
            })
        });

        console.log(response)
    }

</script>

<div class="wrapper">
    <p id="desc">Primero selecciona los juegos que quieras jugar en tu futura PC, luego el rendimiento que quieras en los juegos seleccionados, y finalmente tu presupuesto ideal!</p>
    {#each games as game}
        <button class="game-button {game.selected ? 'selected' : ''}" on:click={() => game.selected = !game.selected}>
            <Game  title={game.title} imgUrl={game.imgUrl} selected={game.selected ? "1" : "0"}></Game>
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
        </div>
        <button class="submit" on:click={submit}>GENERAR PC</button>
    </div>
</div>

<style>
    .submit {
        border: none;
        border-radius: 10px;
        width: 250px;
        height: 80px;
        font-family: "Oswald";
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