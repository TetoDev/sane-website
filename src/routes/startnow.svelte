<div id="wrapper">
    <div>
        <h2>¿Qué esperas? ¡Cotiza ahora!</h2>
        <p>Sin dolores de cabeza, nuestro sistema te llevará de la mano para descubrir las mejores partes para tu futuro pc y al menor precio posible</p>
    </div>
    <button>Cotizar</button>
</div>


<style>
    #wrapper {
        background-color: var(--nblue);
        margin: 0 0;
        align-items: center;
        justify-content: center;
        padding: 20px 0;
        min-height: 400px;
        display: flex;

    }

    h2 {
        display: inline-block;
        font-size: 30px;
        margin-right: 200px;
    }
    p {
        max-width: 600px;
    }

    div button {
        border: none;
        border-radius: 10px;
        width: 250px;
        height: 80px;
        font-family: "Oswald";
        text-transform: uppercase;
        font-size: 30px;
        font-weight: bold;
        margin: 5px 0 0 0;
        background-color: var(--dpurple);
        color: white;
    }

    button:hover {
        transition: 0.2s all ease;
        background-color: white;
        color: black;
    }

    button:active {
        transition: 0.2 all ease;
        background-color: var(--nblue);
        color: white;
    }
</style>