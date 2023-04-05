<div class="parallax">
    <div class="transparency"></div>
    <video autoplay muted loop>
        <source src="src/lib/videos/bt.mp4">
    </video>
    <h1>SANE BUILDS construye tu <p id="highlight">pc de ensueño</p> al mejor precio y sin recortes</h1>
</div>



<style>
    .parallax {
        height: 700px;
        display: flex;
        align-items: center;
    }

    .parallax video{ 
        min-width: 100%;
        position: fixed;
        top:0;
        z-index: -20;
    }
    p{
        display: inline-block;
        overflow: hidden;

        text-transform: uppercase;
        font-family: "Oswald";
        margin: 0;
        font-size: 80px;

        transform: translateY(22px);

        text-shadow: 3px 3px var(--nblue);
    }

    #highlight {
        color: var(--eblue);
    }

    .transparency {
        background-color: rgba(37,37,37,0.6);
        height: 100%;
        position: absolute;
        width: 100%;
        z-index: -10;
    }

    h1 {
        display: block;
        text-align: center;
        font-size: 80px;
        overflow: hidden;
        margin: 0;
        text-transform: uppercase;
        font-family: "Oswald";
        text-shadow: 3px 3px var(--nblue);
        max-height: 700px;
    }

</style>