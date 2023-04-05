
<nav>
    <ul>
        <li><a class="nav-button" href="/build/">Build</a></li>
        <li><a class="nav-button" href="/faq/">FAQ</a></li>
        <li><a href="/"><img src="src/lib/img/squareblanco.png" alt="SANE"></a></li>
        <li><a class="nav-button" href="/soporte/">Soporte</a></li>
        <li><a class="nav-button" href="/nosotros/">Nosotros</a></li>
    </ul>
</nav>

<main>
    <slot/>
</main>

<footer>
    <div id="wrapper">
        <div id="pages">
            <p>Ir a</p>
            <a href="/build/">Build</a>
            <a href="/faq/">FAQ</a>
            <a href="/soporte/">Soporte</a>
            <a href="/nosotros/">Nosotros</a>
        </div>
        <div id="mid-panel">
            <a href="/"><img src="src/lib/img/nblue300.png" alt="sane"></a>
        </div>
        <div id="media">
            <p>Redes Sociales</p>
            <a href="/">Instagram</a>
            <a href="/">Youtube</a>
            <a href="/">Twitter</a>
            <a href="/">Linkedin</a>
        </div>
    </div>
    <div id="copyright">
        Copyright <p>SANE 2023</p> todos los derechos reservados.
    </div>
</footer>

<style>
    nav {
        display: flex;
        margin: 0 0;
        position: absolute;
        left: 50%;
        right: 50%;
        top: 2%;
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

    .nav-button{
        padding: 3px 1.5vw;
        border-radius: 10px;
    }

    #mid-panel {
        display: inline-block;
        max-width: 190px;
    }

    .nav-button:hover {
        transition: 0.3s all ease;
        background-color: var(--eblue);
        color: black;
        
        
    }

    .nav-button:active {
        transition: 0.1s all ease;
        background-color: var(--nblue);
        color: white
    }

    #mid-panel img {
        width: 100px;
        display: block;
        margin: 50px auto;
    }

    nav ul li img {
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
        color: black;
        text-align: center;
        background-color: white;
    }

    #pages, #media {
        margin: 50px 10vw;
        text-align: left;
    }

    #pages p, #media p {
        color: var(--nblue);
        font-size: 22px;
        margin: 0;
    }

    #pages a, #media a {
        font-size: 16px;
    }

    #copyright {
        font-family: "Poppins";
        font-size: 16px;
        text-align: center;
        transform: translateX(-50px);
        color: var(--nblue);
    }

    #copyright p {
        font-family: "Oswald";
        margin: 0;
        display: inline-block;
        color: var(--nblue);
    }

    #pages a, #media a{
        color: var(--nblue);
        display: block;
        font-family: "Poppins";
    }

    #pages, #media {
        display: inline-block;
    }

    footer img {
        width: 20px;
    }

</style>