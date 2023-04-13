<div id="hero">
    <h1 id="first">La mejor gaming pc</h1>
    <h1 id="second">Optimizada a tu presupuesto</h1>
</div>
<a href="/build/mode"><button><p class="shine">BUILD</p></button></a>


<style>

    #hero {
        display: inline-block;
        margin: 0 0 150px 100px;
    }
    #first, #second {
        font-size: 80px;
        font-family: "Oswald";
        text-transform: uppercase;
        display: block;
        text-shadow: 3px 3px var(--nblue);
    }

    #first {
        font-size: 100px;
        margin: 200px 0 0 0;
    }

    #second {
        font-size: 67px;
        margin: 0 0 250px 0;
    }

    button {
        font-family: "Oswald";
        font-weight: bold;
        background-color: var(--eblue);
        border-radius: 20px;
        padding: 5px 30px;
        width: 225px;
        height: 100px;
        border: none;
        position: absolute;
        left: 75%;
        top: 60%;
        cursor: pointer;
    }

    button:hover, button:hover p {
        transition: 0.3s all ease;
        background-color: white;
        color: black;
    }

    button:active, button:active p {
        transition: 0.1 all ease;
        background-color: var(--nblue);
        color: white;
    }

    .shine {
	    position: relative;
        background: #262626 -webkit-gradient(linear, left top, right top, from(var(--nwhite)), to(var(--nwhite)),color-stop(0.5,#fff)) 0 0 no-repeat;
        background-size: 20px;
        color: rgba(20,20,20,0.2);
        -webkit-background-clip: text;
        background-clip: text;
        animation: shining 3s infinite;
        font-size: 60px;
        font-family: "Oswald";
        margin: 0 0;
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