<script lang="ts">
    import Mode from "./mode.svelte";
    import Tierselector from "./tierselector.svelte";
    import Gameselector from "./gameselector.svelte";


    let stages: boolean[] = [true,false];
    let showTierSelector = false;

    function back() {
        if (stages[1]) {
            stages[1] = false;
            stages[0] = true;
        }
        if (stages[2]) {
            stages[2] = false;
            stages[1] = true;
        }
        if (showTierSelector) {
            showTierSelector = false;
            stages[0] = true;
        }
    }
    function modeSelector(event: any) {
        stages[0] = false;
        showTierSelector = event.detail.state;
        stages[1] = !event.detail.state;
    }

</script>

{#if stages[0]}
    <Mode on:mode={modeSelector}></Mode>
{/if}
{#if showTierSelector}
    <Tierselector></Tierselector>
{/if}
{#if stages[1]}
    <Gameselector></Gameselector>
{/if}

{#if !stages[0]}
    <button on:click={back}>Back</button>
{/if}
