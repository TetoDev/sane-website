<script>
    import Pricepopup from "./pricepopup.svelte";
    import Deliverypopup from "./deliverypopup.svelte";
    import Performancepopup from "./performancepopup.svelte";
</script>

<div>
    <div>
        <Pricepopup></Pricepopup>
        <Deliverypopup></Deliverypopup>
        <Performancepopup></Performancepopup>
    </div>
    <a href="/build/mode"><button>Empieza aquí</button></a>
</div>


<style>



    div div{
        display: block;
        align-items: center;
        text-align: center;
        overflow: hidden;
        margin: 0;
        padding: 0;
        max-width: 100vw;
    }
    div {
        text-align: center;
        max-width: 100vw;
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
        margin: 50px 0 50px 0;
        background-color: var(--dpurple);
        color: white;
        cursor: pointer;
    }

    button:hover {
        transition: 0.2s all ease;
        background-color: white;
        color: black;
    }

    button:active {
        transition: all ease 0.2s;
        background-color: var(--nblue);
        color: white;
    }

</style>