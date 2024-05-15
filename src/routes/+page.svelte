<script lang=ts>
import Tree from '$lib/Tree.svelte';
import { onMount } from 'svelte';
import { operators } from '../lib/calculate.ts';

onMount(() => {
    document.querySelectorAll(".draggable").forEach((el) => {
        el.addEventListener("dragstart", (event) => {
            if (event instanceof DragEvent && event.target && event.target instanceof HTMLElement && event.dataTransfer) {
                // play sound
                new Audio('/bloop.mp3').play();
                event.dataTransfer.setData("content", event.target.textContent || '')
                event.dataTransfer?.setData("element", event.target.id);
            }
        })
    })
})

function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getNumbers(){
    let arr: number[] = [];
    let upper_bounds = [4,6,8,12,20]
    upper_bounds.forEach(upper => {
        let num;
        do {
            num = getRandomNumber(1, upper);
        } while (arr.includes(num))
        arr.push(num);
    });
    return arr;
}
</script>

<div class="flex">
    <div class="flex-row">
        {#each operators as operator}
            <div class="box draggable" draggable="true" id="top-box-{operator}">{operator}</div>
        {/each}
    </div>

    <div class="flex-row">
        {#each getNumbers() as number}
            <div class="box draggable" draggable="true" id="top-box-{number}">{number}</div>
        {/each}
    </div>

    <Tree />

    <div class="text-box" id="target_number">Objectif : {getRandomNumber(1, 100)}</div>
    <div class="text-box" id="result" />

    <button class="text-box" id="reload" onClick="window.location.reload();">Relancer les dés</button>
</div>


<style>
* {
    font-family: 'sans-serif';
}

.flex {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1em;
}

.flex-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1em;
}

.box {
    border: 1px solid #000;
    border-radius: 5px;
    padding: 0.5em;
    text-align: center;
    aspect-ratio: 1.618;
    height: 1em;
}

.text-box {
    border: 1px solid #000;
    border-radius: 5px;
    padding: 0.5em;
    box-sizing: content;
}

.draggable {
    cursor: pointer;
}

@keyframes -global-rainbow {
    0% {color: black; border-color: black;}
    5% {color: hsl(0, 100%, 50%); border-color: hsl(0, 100%, 50%);}
    10% {color: hsl(36, 100%, 50%); border-color: hsl(36, 100%, 50%);}
    20% {color: hsl(72, 100%, 50%); border-color: hsl(72, 100%, 50%);}
    30% {color: hsl(108, 100%, 50%); border-color: hsl(108, 100%, 50%);}
    40% {color: hsl(144, 100%, 50%); border-color: hsl(144, 100%, 50%);}
    50% {color: hsl(180, 100%, 50%); border-color: hsl(180, 100%, 50%);}
    60% {color: hsl(216, 100%, 50%); border-color: hsl(216, 100%, 50%);}
    70% {color: hsl(252, 100%, 50%); border-color: hsl(252, 100%, 50%);}
    80% {color: hsl(288, 100%, 50%); border-color: hsl(288, 100%, 50%);}
    90% {color: hsl(324, 100%, 50%); border-color: hsl(324, 100%, 50%);}
    95% {color: hsl(360, 100%, 50%); border-color: hsl(360, 100%, 50%);}
    100% {color: black; border-color: black;}
}
</style>
