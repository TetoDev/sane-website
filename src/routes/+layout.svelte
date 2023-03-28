<script>
    
</script>

<svelte:head>
    <title>SANE BUILDS  |  Construye tu propio Gaming PC</title>
    <html lang="es"/>
</svelte:head>

<nav>
    <ul>
        <li><a href="/">Build</a></li>
        <li><a href="/">FAQ</a></li>
        <li><img src="src/lib/img/squareblanco.png" alt="SANE"></li>
        <li><a href="/">Soporte</a></li>
        <li><a href="/">Nosotros</a></li>
    </ul>
</nav>

<main>
    <slot/>
</main>

<footer>
    <div id="wrapper">
        <div id="pages">
            <a href="/">Build</a>
            <a href="/">FAQ</a>
            <a href="/">Soporte</a>
            <a href="/">Nosotros</a>
        </div>
        <div id="media">
            <a href="/">Instagram</a>
            <a href="/">Youtube</a>
            <a href="/">Twitter</a>
        </div>
    </div>
    <div id="copyright">
        Copyright <img src="src/lib/img/negro300.png" alt="sane"/> <p>SANE 2023</p> todos los derechos reservados.
    </div>
</footer>

<style>
    nav {
        display: flex;
        margin: 0 0;
        position: absolute;
        left: 50%;
        right: 50%;
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
        margin: 0 2vw;
    }

    nav li a{
        padding: 3px 1.5vw;
    }

    nav li a:hover {
        transition: 0.3s all ease;
        background-color: var(--eblue);
        color: black;
        border-radius: 10px;
        
    }

    nav li a:active {
        transition: 0.1s all ease;
        background-color: var(--nblue);
        border-radius: 10px;
        color: white
    }

    img {
        width: 65px;
    }

    a {
        text-decoration: none;
        color: white;
        font-size: 22px;
    }

    footer {
        font-size: 22px;
        display: block;
        margin: 0 auto;
        width: 100%;
        text-align: center;
        color: black;
        background-color: white;
    }

    #copyright {
        font-family: "Poppins";
        font-size: 22px;
        text-align: center;
    }

    #copyright p {
        font-family: "Oswald";
        margin: 0;
        display: inline-block;
    }

    #pages a, #media a{
        color: black;
        display: block;
        font-family: "Poppins";
    }

    #pages, #media {
        display: inline-block;
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
        --nwhite: rgb(230,230,230);
        --blacktext: rgb(58,58,58)
    }



    :global(body) {
        margin: 0;
    }

</style>