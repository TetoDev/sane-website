<script>
    import Hero from "./hero.svelte";
    import Popups from "./popups.svelte";
    import Reviews from "./reviews.svelte";
    import Mission from "./mission.svelte";
    import Startnow from "./startnow.svelte";
    import Socialmedia from "./socialmedia.svelte";
</script>

<Hero></Hero>
<Popups></Popups>

<div class="semi-bg1"></div>
<div class="semi-bg2"><Reviews></Reviews></div>

<Socialmedia></Socialmedia>
<Mission></Mission>
<Startnow></Startnow>

<style>
    .semi-bg1 {
        background-color: var(--nwhite);
        position: absolute;
        display: block;
        max-width: 100vw;
        min-width: 99vw;
        height: 400px;
        transform: translateY(-92%);
        z-index: -2;
        overflow: hidden;
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