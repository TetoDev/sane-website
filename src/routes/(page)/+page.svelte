<script>
    import Hero from "./hero.svelte";
    import Popups from "./popups.svelte";
    import Reviews from "./reviews.svelte";
    import Mission from "./mission.svelte";
    import Startnow from "./startnow.svelte";
    import Socialmedia from "./socialmedia.svelte";
</script>

<div>
    <div class="transparency"></div>
    <video autoplay muted loop>
        <source src="src/lib/videos/bg.mp4">
    </video>
    <Hero></Hero>
    <Popups></Popups>
    <div class="semi-bg1"></div>
</div>



<div class="semi-bg2"><Reviews></Reviews></div>

<Socialmedia></Socialmedia>
<Mission></Mission>
<Startnow></Startnow>

<style>

    video {
        position: absolute;
        top:0%;
        bottom: 0%;
        z-index: -19;
    }

    .transparency {
        background-color: rgba(37,37,37,0.6);
        height: 200%;
        position: absolute;
        width: 100%;
        z-index: -10;
    }

    .semi-bg1 {
        background-color: var(--nwhite);
        position: absolute;
        display: block;
        max-width: 100vw;
        min-width: 100vw;
        height: 400px;
        transform: translateY(-92%);
        z-index: -2;
        overflow: hidden;
    }
    @media (max-width:1717px) {
        .semi-bg1 {
            height: 900px;
        }
    }

    @media (max-width: 1149px) {
        .semi-bg1 {
            height: 1280px;
        }
    }

    @media (max-width: 1003px){
        .semi-bg1{
            height: 1550px;
        }
    }

    @media (max-width: 592px) {
        .semi-bg1 {
            height: 1900px;
        }
    }
    .semi-bg2 {
        background-color: white;
        display: block;
        max-width: 100vw;
        min-width: 99vw;
        overflow: hidden;
        padding-bottom: 50px;
    }
</style>