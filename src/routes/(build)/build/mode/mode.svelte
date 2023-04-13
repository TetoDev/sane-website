<script lang="ts">
	import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let isEasyMode: boolean;

    const title = isEasyMode ? "EASY" : "ADVANCED";
    const text = isEasyMode ? "Dínos tu presupuesto y la gama de tu futuro PC y te daremos opciones de baja a alta gama" : "Selecciona los juegos que quieres jugar y a qué FPS y te daremos la mejor opción acorde a tu presupuesto";

    function nextStep () {
        dispatch("mode",{
            state: isEasyMode
        });
    }
</script>

<button on:click={nextStep}>
    <div>
        <h2>{title}</h2>
        <p>{text}</p>
    </div>
</button>


<style>
    div {
        background-color: var(--nblue);
        display: inline-block;
        padding: 30px;
        border-radius: 30px; 
        text-align: center;
        
        
    }

    div:hover {
        transition: all 0.2s ease;
        border-width: 5px;
        border-color: white;
        border-style: solid;
        transform: scale(0.985);
    }

    h2 {
        font-family: "Oswald";
        font-size: 60px;
        margin: 10px 0;
    }

    p {
        font-family: "Poppins";
        font-size: 18px;
        margin: 0 2%;
    }
    button {
        background-color: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        color: white;
        margin: 0 40px;
        max-width: 35%;
        min-height: 200px;
    }
</style>