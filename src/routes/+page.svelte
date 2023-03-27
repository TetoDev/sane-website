<script>
    import Hero from "./hero.svelte";
    import Popups from "./popups.svelte";
    import Reviews from "./reviews.svelte";
    import Mission from "./mission.svelte";
    import Startnow from "./startnow.svelte";
</script>

<Hero></Hero>
<Popups></Popups>

<div class="semi-bg1"></div>
<div class="semi-bg2"></div>
<Reviews></Reviews>
<Mission></Mission>
<Startnow></Startnow>

<style>
    .semi-bg1 {
        background-color: var(--nwhite);
        position: absolute;
        display: block;
        width: 100vw;
        height: 400px;
        transform: translateY(-92%);
        z-index: -2;
        overflow: hidden;
    }
    .semi-bg2 {
        background-color: white;
        position: absolute;
        display: block;
        width: 100vw;
        height: 900px;
        transform: translateY(3.5%);
        z-index: -2;
        overflow: hidden;
    }
</style>