<div class="tree">
<ul>
<li>
<div class="node"></div>
	<ul><li><div class="node"></div><ul><li><div class="node"></div><ul><li><div class="node"></div><ul><li><div class="node"></div></li><li><div class="node"></div></li></ul></li><li><div class="node"></div><ul><li><div class="node"></div></li><li><div class="node"></div></li></ul></li></ul></li><li><div class="node"></div><ul><li><div class="node"></div><ul><li><div class="node"></div></li><li><div class="node"></div></li></ul></li><li><div class="node"></div><ul><li><div class="node"></div></li><li><div class="node"></div></li></ul></li></ul></li></ul></li><li><div class="node"></div><ul><li><div class="node"></div><ul><li><div class="node"></div><ul><li><div class="node"></div></li><li><div class="node"></div></li></ul></li><li><div class="node"></div><ul><li><div class="node"></div></li><li><div class="node"></div></li></ul></li></ul></li><li><div class="node"></div><ul><li><div class="node"></div><ul><li><div class="node"></div></li><li><div class="node"></div></li></ul></li><li><div class="node"></div><ul><li><div class="node"></div></li><li><div class="node"></div></li></ul></li></ul></li></ul></li></ul>
</li>
</ul>
</div>
<script lang="ts">
	import { onMount } from 'svelte';
	import { calculateAndShow, operators } from './calculate.ts';

    function getParentNode(node: Element): Element | null {
        let firstChild = node.parentElement?.parentElement?.parentElement?.firstChild;
        if (firstChild instanceof Element) {
            return firstChild;
        }
        return null;
    }

    function elIsNode(el: Element | undefined | null): boolean {
        if (el === undefined || el === null) {
            return false;
        }
        return el.classList.contains('node');
    }

    function goHome(node: HTMLElement) {
        // Put the content back to its original position
        let initial = document.getElementById("top-box-" + node.textContent);
        if (initial !== null) {
            if (initial.textContent !== "") {
                console.error("Initial node is not empty! This is a bug.");
            }
            initial.style.display = "block";
            initial.textContent = node.textContent;
        }
        node.textContent = "";
    }

    function greyOutNode(node: HTMLElement) {
        let should = shouldBeGreyedOut(node);
        if (should) {
            // Node should be greyed out
            node.style.borderColor = "red";
            node.style.backgroundColor = "lightpink";
            node.draggable = false;
            if (node.textContent != "") {
                goHome(node);
            }
        } else {
            // Node should not be greyed out (= its content can be changed)
            node.style.backgroundColor = "white";
            node.style.borderColor = "black";
            if (node.textContent === " ") {
                node.textContent = "";
            }
            if (node.textContent !== "") {
                // Node has content
                node.draggable = true;
            }
        }
    }

    function shouldBeGreyedOut(node: Element): boolean {
        if (node instanceof HTMLElement) {
            let parent = getParentNode(node);
            if (parent instanceof Element && elIsNode(parent) && parent.textContent !== null && !operators.includes(parent.textContent)) {
                return true;
            }
        }
        return false;
    }

    function isGreyedOut(node: HTMLElement): boolean | undefined {
        if (node.style.backgroundColor === "lightpink") {
            return true;
        } else if (node.style.backgroundColor === "white") {
            return false;
        } else {
            return undefined;
        }
    }

    function setupEventListeners(node: Element, index: number) {
        if (!(node instanceof HTMLElement)) {
            throw new Error("node is not an HTMLElement");
        }
        node.ondrop = onDrop;
        // Add a unique id to the node to be able to identify it
        node.id = "node-" + index.toString();
        node.ondragover = function(event: DragEvent) {
            if (isGreyedOut(node)) {
                return;
            }
            event.preventDefault();
        }
        node.ondragstart = function(event: DragEvent) {
            if (event.target instanceof HTMLElement) {
                event.dataTransfer?.setData("content", event.target.textContent ?? "");
                event.dataTransfer?.setData("element", event.target.id);
            }
        }
    }

    function onDrop(event: DragEvent) {
        event.preventDefault();
        var data = event.dataTransfer?.getData("content");
        if (data === undefined) {
            throw new Error("data is undefined");
        }
        let source_id = event.dataTransfer?.getData("element");
        let source = document.getElementById(source_id!);
        if (source_id && source) {
            if (/\d$/.test(source_id)) {
            source.textContent = "";
            source.style.display = "none";
            }
        }
        let target = event.target as HTMLElement;
        if (target.textContent != "") {
            goHome(target);
        }
        target.textContent = data;
        getNodes().forEach(greyOutNode);
        calculateAndShow();
    };

    function getNodes(): HTMLElement[] {
        const nodes = document.querySelector('.tree')?.querySelector('ul')?.querySelector('li')?.querySelectorAll('.node');
        if (nodes === undefined) {
            throw new Error("nodes is undefined");
        }
        return Array.from(nodes) as HTMLElement[];
    }

	onMount(() => {
        const nodes = getNodes();
        calculateAndShow();
        nodes.forEach(setupEventListeners);
        nodes.forEach(greyOutNode);
	});
</script>


<style>

* {margin: 0; padding: 0;}

.tree{
  width: max-content;
  overflow: hidden;

}

.tree ul {
  
	padding-top: 20px; position: relative;
	
	transition: all 0.5s;
	-webkit-transition: all 0.5s;
	-moz-transition: all 0.5s;
}

.tree li {
	float: left; text-align: center;
	list-style-type: none;
	position: relative;
	padding: 20px 5px 0 5px;
	
	transition: all 0.5s;
	-webkit-transition: all 0.5s;
	-moz-transition: all 0.5s;
}

/*We will use ::before and ::after to draw the connectors*/

.tree li::before, .tree li::after{
	content: '';
	position: absolute; top: 0; right: 50%;
	border-top: 1px solid black;
	width: 50%; height: 20px;
}
.tree li::after{
	right: auto; left: 50%;
	border-left: 1px solid black;
}

/*We need to remove left-right connectors from elements without 
any siblings*/
.tree li:only-child::after, .tree li:only-child::before {
	display: none;
}

/*Remove space from the top of single children*/
.tree li:only-child{ padding-top: 0;}

/*Remove left connector from first child and 
right connector from last child*/
.tree li:first-child::before, .tree li:last-child::after{
	border: 0 none;
}
/*Adding back the vertical connector to the last nodes*/
.tree li:last-child::before{
	border-right: 1px solid black;
	border-radius: 0 5px 0 0;
	-webkit-border-radius: 0 5px 0 0;
	-moz-border-radius: 0 5px 0 0;
}
.tree li:first-child::after{
	border-radius: 5px 0 0 0;
	-webkit-border-radius: 5px 0 0 0;
	-moz-border-radius: 5px 0 0 0;
}

/*Time to add downward connectors from parents*/
.tree ul ul::before{
	content: '';
	position: absolute; top: 0; left: 50%;
	border-left: 1px solid black;
	width: 0; height: 20px;
}

.tree li .node {
	border: 1px solid #ccc;
	padding: 5px 10px;
	text-decoration: none;
	font-size: 1.2rem;
	display: inline-block;
	
	border-radius: 5px;
	-webkit-border-radius: 5px;
	-moz-border-radius: 5px;

    border-width: 2px;
    border-color: black;
	
	transition: all 0.5s;
	-webkit-transition: all 0.5s;
	-moz-transition: all 0.5s;

    width: 1.5em;
    height: 1.5em;
}
</style>
