<script lang="ts">
    import Loadingscreen from "../../../loadingscreen.svelte";
    import {pcStore} from "../../pcstore";
    import {goto} from "$app/navigation";

    let selectedButton = "";
    let errorMessage = "";
    let pricePlaceholder = "Selecciona una gama";
    let loadingScreen = false;

    let lowButton: HTMLElement;
    let mediumButton: HTMLElement;
    let highButton: HTMLElement;

    function selectButton(tier: string) {
        switch (tier){
            case "low":
                pricePlaceholder = "Presupuesto: de 400.000$ a 800.000$";
                lowButton.style.backgroundColor = "var(--dpurple)";
                lowButton.style.color = "white";

                mediumButton.style.backgroundColor = "white";
                mediumButton.style.color = "black";

                highButton.style.backgroundColor = "white";
                highButton.style.color = "black";
                break;
            case "mid":
            pricePlaceholder = "Presupuesto: de 800.000$ a 1.500.000$";
                mediumButton.style.backgroundColor = "var(--dpurple)";
                mediumButton.style.color = "white";

                lowButton.style.backgroundColor = "white";
                lowButton.style.color = "black";

                highButton.style.backgroundColor = "white";
                highButton.style.color = "black";
                break;
            case "high":
                pricePlaceholder = "Presupuesto: de 1.500.000$ a 2.500.000";
                highButton.style.backgroundColor = "var(--dpurple)";
                highButton.style.color = "white";

                lowButton.style.backgroundColor = "white";
                lowButton.style.color = "black";

                mediumButton.style.backgroundColor = "white";
                mediumButton.style.color = "black";
                break;
        }

        selectedButton = tier;
    }

    async function onFormSubmit(event: Event) {
        const formElement = event.target as HTMLFormElement;
        const data = new FormData(formElement);

        if (selectedButton === "") {
            errorMessage = "Por favor, seleccione una gama de PC";
            return;
        }
        if (data.get("looks") === "") {
            errorMessage = "Por favor, seleccione su preferencia de diseño";
            return;
        }
        if (data.get("budget") === "") {
            errorMessage = "Por favor, seleccione su presupuesto";
            return;
        }
        if (data.get("size") === "") {
            errorMessage = "Por favor, seleccione el tamaño de su PC";
            return;
        }

    const budget = parseInt((data.get("budget") as string).replace(/\.,/g, ""));

        if (selectedButton === "low") {
            if (budget < 400000 || budget > 800000) {
                errorMessage = "Por favor, seleccione un presupuesto dentro de la gama baja (400.000 - 800.000)";
                return;
            }
        }
        if (selectedButton === "mid") {
            if (budget < 800000 || budget > 1500000) {
                errorMessage = "Por favor, seleccione un presupuesto dentro de la gama media  (800.000 - 1.500.000)";
                return;
            }
        }
        if (selectedButton === "high") {
            if (budget < 1500000 || budget > 3500000) {
                errorMessage = "Por favor, seleccione un presupuesto dentro de la gama alta (1.500.000 - 3.500.000)";
                return;
            }
        }
        loadingScreen = true;

        const looks = data.get("looksMatter");
        const size = data.get("size") as string;
        const response = await fetch(formElement.action, {
            method: "POST",
            body: JSON.stringify({
                tier: selectedButton,
                looks: looks,
                size: size,
                budget: budget
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        loadingScreen = false;

        pcStore.set((await response.json()).pcs);

        await goto("/build/checkout")
    }
</script>

{#if loadingScreen}
    <Loadingscreen text="Generando PCs..."></Loadingscreen>
{/if}
<div class="page-wrapper">
    <div class="button-wrapper">
        <button class="selected" bind:this={lowButton} on:click|preventDefault={() => {selectButton("low")}}>
            <img src="" alt="IMG">
            <span>
                <h2>Gama baja</h2>
                <br>
                <p>PC de calidad con todo lo necesario para jugar al menor precio posible. <strong>De 400.000$ a 800.000$</strong></p>
            </span>
        </button>
        <button bind:this={mediumButton} on:click|preventDefault={() => {selectButton("mid")}}>
            <img src="" alt="IMG">
            <span>
                <h2>Gama media</h2>
                <br>
                <p>PC balanceado y equipado para operar en todo propósito con comodidad. <strong>De 800.000$ a 1.500.000$</strong></p>
            </span>
        </button>
        <button bind:this={highButton} on:click|preventDefault={() => {selectButton("high")}}>
            <img src="" alt="IMG">
            <span>
                <h2>Gama alta</h2>
                <br>
                <p>PC equipado con lo mejor de lo mejor para entusiastas y amantes del gaming. <strong>De 1.500.00$ a 3.500.000$</strong></p>
            </span>
        </button>
    </div>
    <form on:submit|preventDefault={onFormSubmit}>
        <label for="looksMatter">¿Importa la estética?</label>
        <select id="looksMatter" name="looksMatter">
            <option value="yes">Si</option>
            <option value="no">No</option>
        </select>
        <label for="size">Tamaño preferido</label>
        <select name="size" id="size">
            <option value="ATX">Estándar (Recomendado)</option>
            <option value="Micro ATX">Mediano</option>
            <option value="Mini ITX">Muy pequeño (Más caro)</option>
        </select>
        <label for="budget">Precio de preferencia</label>
        <input id="budget" name="budget" type="text" placeholder={pricePlaceholder}>
        <button type="submit">Generar PC</button>
    </form>
    {#if errorMessage !== ""}
        <p id="error-message">{errorMessage}</p>
    {/if}
</div>


<style>

    form {
        display: flex;
        flex-direction: column;
        align-items: start;
        width: 95%;
        margin: 10px 0;
    }

    label {
        margin-top: 15px;
        font-size: 20px;
        font-weight: bold;
    }

    select, input {
        max-width: 400px;
        font-family: "Poppins", sans-serif;
        padding: 5px;
    }

    form button {
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

    form button:hover {
        transition: 0.2s all ease;
        background-color: white;
        color: black;
    }

    form button:active {
        transition: 0.2s all ease;
        background-color: var(--nblue);
        color: white;
    }

    div {
        background-color: var(--mgray);
    }

    span {
        display: inline-block;
    }


    .page-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 20px;
        padding: 15px;
    }

    .button-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 95%;
        margin: 10px 0;
    }

    #error-message {
        color: red;
        font-size: 25px;
        font-weight: bold;
    }

    .button-wrapper button img, .button-wrapper button h2, .button-wrapper button p {
        display: inline-block;
    }

    .button-wrapper button {
        transition: all 0.2s ease;
        text-align: left;
        display: block;
        width: 100%;
        margin: 10px;
        background-color: white;
        border: none;
        border-radius: 10px;
        padding: 10px;
        box-shadow: 0 0 10px 0 black;
        color: black;
    }

    .button-wrapper span h2 {
        font-family: "Oswald", sans-serif;
        text-transform: uppercase;
        font-size: 60px;
        margin: 0;
    }

    .button-wrapper span p {
        font-family: "Poppins", sans-serif;
        font-size: 18px;
    }
</style>