<style>
/* TODO use https://svelte.dev/docs#svelte_transition */
    .container {
        display: flex;
        flex-direction: column;
        text-align: center;
        justify-items: center;
        align-items: center;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.4);
    }
    .content {
        position: absolute;
        top: 50%;
    }
    svg {
        
        animation: 2s linear infinite svg-animation;
        max-width: 50px;
    }

    @keyframes svg-animation {
        0% {
        transform: rotateZ(0deg);
        }
        100% {
        transform: rotateZ(360deg);
        }
    }

    circle {
        animation: 1.4s ease-in-out infinite both circle-animation;
        display: block;
        fill: transparent;
        stroke: #2f3d4c;
        stroke-linecap: round;
        stroke-dasharray: 283;
        stroke-dashoffset: 280;
        stroke-width: 0.5em;
        transform-origin: 50% 50%;
    }

    @keyframes circle-animation {
        0%,
        25% {
            stroke-dashoffset: 280;
            transform: rotate(0);
        }

        50%,
        75% {
            stroke-dashoffset: 75;
            transform: rotate(45deg);
        }

        100% {
            stroke-dashoffset: 280;
            transform: rotate(360deg);
        }
    }
</style>

<div class='container'>
    <div class='content'>
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" />
        </svg>
        <slot />
    </div>
</div>
