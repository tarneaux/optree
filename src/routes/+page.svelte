<script>
import Tree from '$lib/Tree.svelte';
import { onMount } from 'svelte';
import { operators } from '../lib/calculate.ts';

onMount(() => {
    document.querySelectorAll(".droppables").forEach((droppable) => {
        Array.from(droppable.children).forEach((el) => {
            el.addEventListener("dragstart", (event) => {
                if (event instanceof DragEvent && event.target && event.target instanceof HTMLElement && event.dataTransfer) {
                    event.dataTransfer.setData("content", event.target.textContent || '')
                    event.dataTransfer?.setData("element", event.target.id);
                }
            })
        })
    })
})
</script>



<div class="tree-container">
    <div class="droppables">
        {#each Array.from(Array(10).keys()) as number}
            <div class="box" draggable="true" id="top-box-{number}">{number}</div>
        {/each}
    </div>
    <div class="droppables">
        {#each operators as operator}
            <div class="box" draggable="true" id="top-box-{operator}">{operator}</div>
        {/each}
    </div>
    <Tree />
    <div />
    <div>
        <p class="box" id="result" />
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
}

.droppables {
    display: flex;
    flex-direction: row;
}
</style>
