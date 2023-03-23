<script>

</script>

<nav>
    <a href="/">My site</a>
</nav>

<main>
    <slot/>
</main>

<footer>Hola buenos dias</footer>

<style>
    nav {
        background-color: var(--dpurple);
        display: block;
        margin: 0 0;
        padding: 1em;
        text-decoration: none;
    }

    a {
        text-decoration: none;
        color: white;
    }

    footer {
        font-size: 20px;
        display: block;
        margin: 0 auto;
        width: 100%;
        text-align: center;
        background-color: var(--dpurple);
    }

    :global(html) {
        background-color: var(--mgray);
        color: white;
        font-family: Poppins;
    }

    :global(:root){
        --nblue: rgb(10,25,47);
        --pblue: rgb(176,224,230);
        --mgray: rgb(44,53,57);
        --eblue: rgb(39,248,249);
        --dpurple: rgb(74,0,130);
        --nwhite: rgb(240,240,240);
        --blacktext: rgb(58,58,58)
    }

    :global(body) {
        margin: 0;
    }

    main {
        width: 100%;
        margin: 1em 2em;
    }
</style>