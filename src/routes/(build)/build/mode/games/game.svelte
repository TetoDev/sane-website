<script lang="ts">

    export let title: string;
    export let imgUrl: string;
    export let selected: string = "0";

</script>


<div class="img-bg" style="background-image: url({imgUrl});">
    <div class="transparency-bg" style="background-color: rgba(0, 0, 0, {selected === '0' ? 0.5 : 0.2});">
        <h2>{title}</h2>
        <div class="img-wrapper" style="opacity: {parseInt(selected)};">
            <img src="/img/tick.png" alt="SELECTED">
        </div>
    </div>
</div>

<style>
    div {
        margin: 0;
    }

    .img-bg {
        background-size: cover;
        background-position: center;
        width: 200px;
        height: 300px;
        position: relative;
        cursor: pointer;
        border-radius: 10%;
        transition: opacity 0.3s ease;
    }

    .transparency-bg {
        background-color: rgba(0, 0, 0, 0.5);
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        transition: opacity 0.3s ease;
        border-radius: 10%;

    }

    h2 {
        font-size: 2rem;
        margin-bottom: 1rem;
    }

    .img-wrapper {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: white;
        border-style: solid;
        border-width: 10px;
        position: relative;
    }

    .img-wrapper img {
        width: 50px;
        height: 50px;
        position: absolute;
        top: -4%;
        left: -4%;
        transition: opacity 0.3s ease;
    }
</style>