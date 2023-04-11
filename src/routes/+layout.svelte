
<svelte:head>
    <title>SANE BUILDS | Construye tu GAMING PC optimizada a tu presupuesto</title>
</svelte:head>



<main>
    <slot/>
</main>


<style>

    :global(html) {
        background-color: var(--nblue);
        color: white;
        font-family: "Poppins";
    }

    :global(:root){
        --nblue: rgb(10,25,47);
        --pblue: rgb(176,224,230);
        --mgray: rgb(44,53,57);
        --eblue: rgb(39,248,249);
        --dpurple: rgb(74,0,130);
        --nwhite: rgb(230,230,230);
        --blacktext: rgb(58,58,58)
    }



    :global(body) {
        margin: 0;
        overflow-x: hidden;
    }

</style>