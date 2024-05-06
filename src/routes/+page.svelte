<script lang=ts>
import Tree from '$lib/Tree.svelte';
import { onMount } from 'svelte';
import { operators } from '../lib/calculate.ts';

onMount(() => {
    document.querySelectorAll(".droppables").forEach((droppable) => {
        Array.from(droppable.children).forEach((el) => {
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
})

function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

</script>


<div class="tree-container">
    <div>   
        <p class="text-box" id="target_number">Target Number: {getRandomNumber(1, 100)}</p>
    </div>

    <div class="droppables">
        {#each [getRandomNumber(1, 4), getRandomNumber(1, 6), getRandomNumber(1, 8), getRandomNumber(1, 12), getRandomNumber(1, 20)] as number}
            <div class="box" draggable="true" id="top-box-{number}">{number}</div>
        {/each}
    </div>
    <div class="droppables">
        {#each operators as operator}
            <div class="box" draggable="true" id="top-box-{operator}">{operator}</div>
        {/each}
    </div>
    <Tree />

    <div>
        <p class="text-box" id="result" />
    </div>
    <div>
        <p class="text-box" id="distance" />
    </div>
</div>



<style>


.tree-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.box {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin-right: 10px;
    cursor: pointer;
    font-family: 'Nunito';
}

.text-box {
    border: 2px solid #000;
    border-radius: 5px;
    padding: 10px;
    margin-right: 10px;
    font-family: 'Nunito';

  }
    
.droppables {
    display: flex;
    flex-direction: row;
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
