<script lang="ts">

    let success: HTMLElement;
    let error: HTMLElement;
    
    async function submitIssue (event: Event){
        const formElement = event.target as HTMLFormElement;
        const data = new FormData(formElement);
        
        const response = await fetch(formElement.action, {
            method: 'POST',
            body: data,
        })

        const responseData = await response.json();

        if (responseData.success) {
            success.style.visibility = "visible";
            error.style.visibility = "hidden";
        } else {
            error.style.visibility = "visible";
            success.style.visibility = "hidden";
        }      
        
        formElement.reset();
    }
</script>

<div id="head">
    <h1>Contáctanos</h1>
    <p>Si tienes o tuviste algún problema con nuestros servicios háznoslo saber. Llena este formulario para conocer tu problema y poder ayudarte lo antes possible.</p>
</div>

<div id="form-wrapper">
    <form method="POST" on:submit|preventDefault={submitIssue}>
        <input type="text" name="name" id="name" placeholder="Nombre Completo" required>
        <input type="text" name="email" id="email" placeholder="Email" required>
        <input type="text" name="phone" id="phone" placeholder="Teléfono" required>
        <input type="text" name="order" id="order" placeholder="Número orden">
        <textarea name="description" id="description" placeholder="Describe tu problema." required></textarea>
        <button type="submit">Enviar</button>
    </form>
</div>

<div class="prompt-wrapper">
    <div class="prompt" id="success" bind:this={success}>
        <img src="src/lib/img/tick.png" alt="Success">
        <p>Tu petición se ha enviado correctamente, estaremos en contacto contigo lo antes possible.</p>
    </div>
</div>

<div class="prompt-wrapper">
    <div class="prompt" id="error" bind:this={error}>
        <img src="src/lib/img/cross.png" alt="Error">
        <p>Se ha producido un problema al enviar su petición, intente nuevamente.</p>
    </div>
</div>
    




<style>
    #form-wrapper {
        display: flex;
        justify-content: center;
    }

    form {
        background-color: var(--nwhite);
        width: 70vw;
        display: block;
        border-radius: 40px;
        padding: 30px;
        margin-bottom: 50px;
    }
    form input {
        display: block;
        margin: 15px 0;
        background-color: var(--mgray);
        border: none;
        padding: 10px;
        color: white;
        font-size: 16px;
        border-radius: 20px;
    }

    #name {
        width: 250px;
    }

    #phone {
        display: inline-block;
        width: 15%;
    }

    #order {
        display: inline-block;
    }

    #email {
        display: inline-block;
        width: 25%;
    }

    #description {
        width: 98%;
        height: 400px;
        display: block;
        font-family: "Poppins";
        font-size: 16px;
        background-color: var(--mgray);
        color: white;
        border: none;
        border-radius: 20px;
        padding: 10px;
    }

    form button {
        border: none;
        border-radius: 10px;
        width: 250px;
        height: 80px;
        font-family: "Oswald";
        text-transform: uppercase;
        font-size: 30px;
        font-weight: bold;
        margin: 50px 0 30px 40%;
        background-color: var(--mgray);
        color: white;
        cursor: pointer;
    }

    button:hover {
        transition: 0.2s all ease;
        background-color: white;
        color: black;
    }

    button:active {
        transition: 0.2s all ease;
        background-color: var(--nblue);
        color: white;
    }

    #head {
        margin-top: 170px;
        margin-left: 50px;
        margin-right: 50px;
        margin-bottom: 100px;
    }

    #head h1 {
        font-size: 80px;
        margin: 0;
    }

    #head p {
        font-size: 18px;
    }

    .prompt-wrapper {
        display: flex;
        justify-content: center;
    }
    #success {
        background-color: var(--eblue);
        visibility: hidden;
    }

    #error {
        background-color: crimson;
        visibility: hidden;
    }

    .prompt {
        width: 50vw;
        display: flex;
        vertical-align: middle;
        align-items: center;
        padding: 20px;
        border-radius: 40px;
    }
    .prompt img {
        height: 100px;
        display: inline-block;
    }
    .prompt p {
        display: inline-block;
        margin: 20px;
        color: black;
    }

</style>