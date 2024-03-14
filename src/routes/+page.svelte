<script>
import Tree from '$lib/Tree.svelte';
import { onMount } from 'svelte';

onMount(() => {
    let droppables = document.querySelectorAll(".droppables").forEach((droppable) => {
        Array.from(droppable.children).forEach((el) => {
            el.addEventListener("dragstart", (event) => {
                // Assurez-vous que l'événement est un DragEvent
                if (event instanceof DragEvent) {
                    // Vérifiez si event.target est null et si c'est un HTMLElement
                    if (event.target && event.target instanceof HTMLElement) {
                        // Vérifiez si dataTransfer n'est pas null
                        if (event.dataTransfer) {
                            event.dataTransfer.setData("content", event.target.textContent || '')
                            console.log("an element as been dragged : ",event.target.textContent)
                        }
                    }
                }
            })
        })
    })
})
</script>



<div class="tree-container">
    <div class="droppables">
        {#each Array.from(Array(10).keys()) as number}
            <div class="box" draggable="true">{number}</div>
        {/each}
    </div>
    <div class="droppables">
        {#each ['+', '-', '*', '/'] as operator}
            <div class="box" id={operator} draggable="true">{operator}</div>
        {/each}
    </div>
    <Tree />
    <div />
    <div>
        <p class="box">
            Résultat :
            <span id="result">
            </span>
        </p>
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
