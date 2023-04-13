<script lang="ts">
    import Buildtransition from "./buildtransition.svelte";
    import {navigating, page} from "$app/stores";

    let stage = "MODO";

    function updateHeader() {
        switch ($page.url.pathname) {
            case "/build/mode":
                stage = "MODO";
                break;
            case "/build/mode/tiers":
                stage = "ELIGE TU GAMA";
                break;
            case "/build/summary":
                stage = "RESUMEN";
                break;
            case "/build/mode/games":
                stage = "ELIGE TUS JUEGOS";
                break;
            case "/build":
                stage = "COMIENZA AHORA";
                break;
            default:
                stage = "ESCOGE";
                break;
        }
    }

    $: if ($navigating == null) {
        updateHeader();
    }
    

    
</script>
<div id="wrapper">
    <div>
        <a href="/">◀ Página principal</a>
        <h1 class="shine">BUILD: {stage}</h1>
    </div>
    
    
    <main>
        <Buildtransition url={$page.url}>
            <slot></slot>
        </Buildtransition>
        
    </main>


    {#if !($page.url.pathname === "/build")}
        <a id="back" href=".">Ir atrás</a>
    {/if}
</div>



<style>
    #wrapper {
        --text: rgba(20,20,20,0.2);
        background-color: var(--eblue);
        height: 100vh;
    }

    #back {
        float: right;
        margin-top: 1.5%;
        margin-right: 12%;
    }

    a {
        text-decoration: none;
        color: var(--nblue);
        font-size: 20px;
        margin: 0;
    }

    a:hover {
        color: var(--dpurple);
    }

    h1 {
        color: var(--nblue);
        font-family: "Oswald";
    }
    
    div {
        padding: 20px 40px;
    }

    .shine {
	    position: relative;
        background: #262626 -webkit-gradient(linear, left top, right top, from(var(--nwhite)), to(var(--nwhite)),color-stop(0.5,#fff)) 0 0 no-repeat;
        background-size: 20px;
        color: rgba(10,25,47,0.6);
        -webkit-background-clip: text;
        background-clip: text;
        animation: shining 3s infinite;
        font-size: 120px;
        font-family: "Oswald";
        margin: 0 25px;
    }

    @keyframes shining {
        0%{
            background-position: -1000px;
        }
        20% {
            background-position: top left;
        }
        100%{
            background-position: top right;

            background-position: 1000px;
        }
    }
</style>