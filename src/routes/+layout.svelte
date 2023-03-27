<script>
    
</script>

<nav>
    <ul>
        <li><a href="/">Build</a></li>
        <li><a href="/">FAQ</a></li>
        <li><a href="/"><img src="src/lib/img/negro300.png" alt="SANE"/></a></li>
        <li><a href="/">Soporte</a></li>
        <li><a href="/">Nosotros</a></li>
    </ul>
</nav>

<main>
    <slot/>
</main>

<footer><img src="src/lib/img/negro300.png" alt="sane"/> SANE 2022</footer>

<style>
    nav {
        background-color: white;
        display: flex;
        margin: 0 0;
        padding: 1em;
        text-decoration: none;
        justify-items: center;
        justify-content: center;
    }

    nav ul {
        list-style: none;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 5px auto;
    }

    nav li {
        margin: 0 20%;
    }

    img {
        width: 65px;
    }

    a {
        text-decoration: none;
        color: var(--nblue);
        font-size: 22px;
    }

    footer {
        font-size: 22px;
        display: block;
        margin: 0 auto;
        width: 100%;
        text-align: center;
        background-color: var(--nwhite);
        color: black;
        font-family: "Oswald";
    }

    footer img {
        width: 20px;
    }

    :global(html) {
        background-color: var(--dpurple);
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

</style>