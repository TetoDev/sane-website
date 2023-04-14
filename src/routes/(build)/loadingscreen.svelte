<script lang="ts">

    export let text: string;
</script>

<div class="loading-screen">
    <div class="loading-screen-content">
        <h1>{text}</h1>
        <div class="loading-bar">
        </div>
    </div>
</div>

<style>
    .loading-screen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 100;
    }

    .loading-screen-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
    }

    .loading-bar {
        width: 100%;
        height: 20px;
        background-color: #fff;
        border-radius: 10px;
        margin-top: 20px;
        margin: 0 auto;
        animation: loading 2s infinite;
    }

    h1 {
        font-size: 40px;
        font-weight: bold;
    }

    @keyframes loading {
        0% {
            width: 10%;
        }
        50% {
            width: 100%;
        }
        100% {
            width: 10%;
        }
    }
</style>