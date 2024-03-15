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
	import calculateAndShow from './calculate.ts';

    function parentSibling(node: Element): Element | null {
        return node.parentElement?.parentElement?.parentElement?.firstChild;
    }

    function elIsNode(el: Element): boolean {
        return el.classList.contains('node');
    }

    function greyOutNodes(nodes) {
        console.log("greyOutNodes");
        console.log(nodes);
        nodes.forEach((node: Element) => {
            if (node instanceof HTMLElement) {
                let ps = parentSibling(node);
                if (ps instanceof Element && elIsNode(ps) && !["+", "-", "*", "/"].includes(ps.textContent)) {
                    node.style.borderColor = "red";
                    node.style.backgroundColor = "lightpink";
                    node.textContent = " ";
                } else {
                    node.style.backgroundColor = "white";
                    node.style.borderColor = "black";
                }
                if (node.textContent === "") {
                    node.textContent = " ";
                }
            }
        });
    }

	onMount(() => {
		const nodes = document.querySelector('.tree')?.querySelector('ul')?.querySelector('li')?.querySelectorAll('.node');
        greyOutNodes(nodes);
		nodes?.forEach((node: Element) => {
			if (node instanceof HTMLElement) {
				node.ondrop = function(event: DragEvent) {
					event.preventDefault();
					var data = event.dataTransfer?.getData("content");
					if (data === undefined) {
						return;
					}
                    if (event.target instanceof HTMLElement) {
                        if (event.target.style.backgroundColor !== "white") {
                            console.log("Vous ne pouvez pas déposer un nombre ici sans une opération au-dessus de lui.");
                            return;
                        }
                        event.target.textContent = data;
                        greyOutNodes(nodes);
                        try {calculateAndShow();} catch (e) {console.log(e);}
                        return;
                    }
					else {
						console.log("Vous ne pouvez pas déposer un nombre ici sans une opération au-dessus de lui.");
					}
				};
				node.ondragover = function(event: DragEvent) {
					event.preventDefault();
				};
			}
		});
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
	font-size: 1.5rem;
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
