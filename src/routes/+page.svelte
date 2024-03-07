<script>
import Tree from '$lib/Tree.svelte';

import { onMount } from 'svelte';

onMount(() => {
    let droppables = document.querySelectorAll("droppables").forEach((droppable) => {
        Array.from(droppable.children).forEach((el) => {
            el.addEventListener("dragstart", (event) => {
                event.target.dataTransfer.setData("content", event.target.textContext)
            })
        })
    })
})
</script>





<div class="tree-container">
    <div class="droppables">
        <div class="number"  draggable="true">1</div>
        <div class="number"  draggable="true">0</div>
        <div class="number"  draggable="true">2</div>
        <div class="number"  draggable="true">3</div>
        <div class="number"  draggable="true">4</div>
        <div class="number"  draggable="true">5</div>
        <div class="number"  draggable="true">6</div>
        <div class="number"  draggable="true">7</div>
        <div class="number"  draggable="true">8</div>
        <div class="number"  draggable="true">9</div>
    </div>
    <div class="droppables">
        <div class="operator" id="plus" draggable="true">+</div>
        <div class="operator" id="minus" draggable="true">-</div>
        <div class="operator" id="multiply" draggable="true">*</div>
        <div class="operator" id="divide" draggable="true">/</div>
    </div>
<Tree />
</div>

<style>
.tree-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

}
.number {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin-right: 10px;
    cursor: pointer;
}

.operator {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin-right: 10px;
    cursor: pointer;
}

.droppables {
    display: flex;
    flex-direction: row;
    margin: 10px;
}
</style>
