<div id="wrapper">
    <div>
        <p>¡Síguenos en nuestras redes sociales!</p>
        <img id="ig" src="src/lib/img/instagram.png" alt="IG">
        <img id="yt" src="src/lib/img/youtube.png" alt="YT">
        <img id="tw" src="src/lib/img/twitter.png" alt="TW">
    </div>
    
</div>


<style>
    #wrapper {

        background-color: var(--nwhite);
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 200px;
        margin: 0;
        padding: 20px;
    }
    #wrapper div {
        text-align: center;
    }

    #ig, #yt, #tw {
        margin: 0 50px;
        cursor: pointer;
    }

    #ig {
        width: 30px;
    }

    #yt {
        height: 30px;
    }

    #tw {
        height: 32px;
    }

    p {
        color: black;
        font-size: 30px;
        font-weight: bold;
        display: block;
        font-family: "Oswald";
        text-transform: uppercase;
    }
</style>