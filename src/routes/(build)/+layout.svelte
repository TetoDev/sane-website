<script lang="ts">
    let stage = "Hola";
</script>
<div id="wrapper">
    <div>
        <a href="/">◀ Página principal</a>
        <h1 class="shine">BUILD: {stage}</h1>
    </div>
    
    
    <main>
        <slot></slot>
    </main>
</div>



<style>
    #wrapper {
        background-color: var(--eblue);
        --text: rgba(20,20,20,0.2);
        height: 100vh;
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
        color: var(--text);
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