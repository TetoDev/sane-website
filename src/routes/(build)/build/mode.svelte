<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import Mode from "./mode/mode.svelte";

    const dispatch = createEventDispatcher();
    
    function eventPassthrough (event: any) {
        dispatch("mode", event.detail);
    }
</script>

<p>Escoge tu modo preferido para armar tu PC</p>
<div class="wrapper">
    <Mode on:mode={eventPassthrough} isEasyMode={true}></Mode>
    <Mode on:mode={eventPassthrough} isEasyMode={false}></Mode>
</div>

<style>
    p {
        font-size: 20px;
        margin-top: 0;
        margin-bottom: 20px;
        color: black;
        overflow: hidden;
    }

    .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 50px;
        position: relative;
    }
</style>