<script>
    import Question from "./question.svelte";
    import { onMount } from "svelte";
    
    let questions = new Map(
        [
            [0,["Pregunta 1","respuesta 1"]],
            [1,["Pregunta 2","respuesta 2 danwiooo ooooooo oooooooo ooooooo oooo oooooo oo ooooo oooooooooooooooo ooooooooo oooooo oooooo oooooo danwiooo ooooooo oooooooo ooooooo oooo oooooo oo ooooo oooooooooooooooo ooooooooo oooooo oooooo oooooo danwiooo ooooooo oooooooo ooooooo oooo oooooo oo ooooo oooooooooooooooo ooooooooo oooooo oooooo oooooo danwiooo ooooooo oooooooo ooooooo oooo oooooo oo ooooo oooooooooooooooo ooooooooo oooooo oooooo oooooo danwiooo ooooooo oooooooo ooooooo oooo oooooo oo ooooo oooooooooooooooo ooooooooo oooooo oooooo oooooo danwiooo ooooooo oooooooo ooooooo oooo oooooo oo ooooo oooooooooooooooo ooooooooo oooooo oooooo oooooo danwiooo ooooooo oooooooo ooooooo oooo oooooo oo ooooo oooooooooooooooo ooooooooo oooooo oooooo oooooo danwiooo ooooooo oooooooo ooooooo oooo oooooo oo ooooo oooooooooooooooo ooooooooo oooooo oooooo oooooo danwiooo ooooooo oooooooo ooooooo oooo oooooo oo ooooo oooooooooooooooo ooooooooo oooooo oooooo oooooo danwiooo ooooooo oooooooo ooooooo oooo oooooo oo ooooo oooooooooooooooo ooooooooo oooooo oooooo oooooo danwiooo ooooooo oooooooo ooooooo oooo oooooo oo ooooo oooooooooooooooo ooooooooo oooooo oooooo oooooo danwiooo ooooooo oooooooo ooooooo oooo oooooo oo ooooo oooooooooooooooo ooooooooo oooooo oooooo oooooo danwiooo ooooooo oooooooo ooooooo oooo oooooo oo ooooo oooooooooooooooo ooooooooo oooooo oooooo oooooo danwiooo ooooooo oooooooo ooooooo oooo oooooo oo ooooo oooooooooooooooo ooooooooo oooooo oooooo oooooo danwiooo ooooooo oooooooo ooooooo oooo oooooo oo ooooo oooooooooooooooo ooooooooo oooooo oooooo oooooo danwiooo ooooooo oooooooo ooooooo oooo oooooo oo ooooo oooooooooooooooo ooooooooo oooooo oooooo oooooo danwiooo ooooooo oooooooo ooooooo oooo oooooo oo ooooo oooooooooooooooo ooooooooo oooooo oooooo oooooo danwiooo ooooooo oooooooo ooooooo oooo oooooo oo ooooo oooooooooooooooo ooooooooo oooooo oooooo oooooo danwiooo ooooooo oooooooo ooooooo oooo oooooo oo ooooo oooooooooooooooo ooooooooo oooooo oooooo oooooo danwiooo ooooooo oooooooo ooooooo oooo oooooo oo ooooo oooooooooooooooo ooooooooo oooooo oooooo oooooo danwiooo ooooooo oooooooo ooooooo oooo oooooo oo ooooo oooooooooooooooo ooooooooo oooooo oooooo oooooo danwiooo ooooooo oooooooo ooooooo oooo oooooo oo ooooo oooooooooooooooo ooooooooo oooooo oooooo oooooo danwiooo ooooooo oooooooo ooooooo oooo oooooo oo ooooo oooooooooooooooo ooooooooo oooooo oooooo oooooo "]],
            [2,["Pregunta 3","respuesta 3"]]
        ]
    );

    var id = 0;
    // @ts-ignore
    let previousButton;
    // @ts-ignore
    let nextButton;


    function toggleArrows () {
        // @ts-ignore
        previousButton.style.visibility = id === 0 ? "hidden" : "visible";
        // @ts-ignore
        nextButton.style.visibility = id === questions.size -1 ? "hidden" : "visible";
        
    }

    function decreaseId (){
        id = id > 0 ? id - 1 : id;
        toggleArrows();
    }

    function increaseId (){
        id = id < questions.size - 1 ? id + 1 : id;
        toggleArrows();
    }

    onMount(() => toggleArrows())
    
</script>

<h1>Preguntas frecuentes:</h1>

<div id="wrapper">
    <button bind:this={previousButton} on:click={decreaseId}>
        <img draggable="false" id="previous" src="src/lib/img/arrow.png" alt="arrow">
        <p>Anterior</p>
    </button>

    <div>
        <Question question={(questions.get(id) ?? "N")[0]} answer={(questions.get(id) ?? " N")[1]}></Question>
    </div>

    <button bind:this={nextButton} on:click={increaseId}>
        <img draggable="false" id="next" src="src/lib/img/arrow.png" alt="arrow">
        <p>Siguiente</p>
    </button>
</div>



<style>
    h1 {
        font-size: 80px;
        font-family: "Oswald";
        text-transform: uppercase;
        display: block;
        margin: 250px 0px 100px 100px;
    }

    #wrapper {
        margin-top: 50px;
        margin-bottom: 250px;
        display: flex;
        align-items: flex-start;
        justify-content: center;
    }

    #wrapper div {
        display: inline-block;
        width: 70vw;
    }

    #wrapper button {
        background-color: rgba(0, 0, 0, 0);
        border: none;
        border-radius: 30px;
        padding: 0 15px;
    }

    #wrapper button:hover{
        transition: 0.2s all ease;
        background-color: var(--dpurple);
        color: black;
    }

    #wrapper button:active{
        transition: 0.2s all ease;
        background-color: var(--eblue);
        color: black;
    }

    #wrapper button p {
        color: white;
        font-family: "Poppins";
        font-size: 18px;
        margin: 0;
        transform: translateY(-12px);
    }

    #previous, #next {
        width: 100px;
    }

    #previous {
        transform: rotate(180deg);
    }

</style>