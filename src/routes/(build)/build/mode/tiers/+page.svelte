<script lang="ts">
    
    function onFormSubmit(event: Event) {
        console.log("Form submitted");
    }
</script>


<div>
    <form on:submit|preventDefault={onFormSubmit}>
    </form>
</div>


<style>
    div {
        background-color: var(--mgray);
    }
</style>