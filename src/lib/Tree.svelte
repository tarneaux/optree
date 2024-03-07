<div class="tree">
<ul>
<li>
<div class="node"></div>
	<ul><li><div class="node"></div><ul><li><div class="node"></div><ul><li><div class="node"></div><ul><li><div class="node"></div></li><li><div class="node"></div></li></ul></li><li><div class="node"></div><ul><li><div class="node"></div></li><li><div class="node"></div></li></ul></li></ul></li><li><div class="node"></div><ul><li><div class="node"></div><ul><li><div class="node"></div></li><li><div class="node"></div></li></ul></li><li><div class="node"></div><ul><li><div class="node"></div></li><li><div class="node"></div></li></ul></li></ul></li></ul></li><li><div class="node"></div><ul><li><div class="node"></div><ul><li><div class="node"></div><ul><li><div class="node"></div></li><li><div class="node"></div></li></ul></li><li><div class="node"></div><ul><li><div class="node"></div></li><li><div class="node"></div></li></ul></li></ul></li><li><div class="node"></div><ul><li><div class="node"></div><ul><li><div class="node"></div></li><li><div class="node"></div></li></ul></li><li><div class="node"></div><ul><li><div class="node"></div></li><li><div class="node"></div></li></ul></li></ul></li></ul></li></ul>
</li>
</ul>
</div>


<script>
  import { onMount } from 'svelte';

  onMount(() => {
    let nodes = document.querySelector('.tree').querySelector('ul').querySelector('li')?.querySelectorAll('.node');
	
	// Convert nodes to a list
    nodes.forEach(node => {
      node.ondrop = function(event) {
		event.preventDefault();
		var data = event.dataTransfer.getData("content");
		event.target.textContext = data;
	  }
	  node.ondragover = function(event) {
	  }
    });
  });

  function drop(event) {
	// playsound
	event.preventDefault();
	var data = event.dataTransfer.getData("number");
	event.target.textContext = data;
	// calc
  }
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
	border-top: 1px solid #ccc;
	width: 50%; height: 20px;
}
.tree li::after{
	right: auto; left: 50%;
	border-left: 1px solid #ccc;
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
	border-right: 1px solid #ccc;
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
	border-left: 1px solid #ccc;
	width: 0; height: 20px;
}

.tree li .node {
	border: 1px solid #ccc;
	padding: 5px 10px;
	text-decoration: none;
	color: #666;
	font-family: arial, verdana, tahoma;
	font-size: 11px;
	display: inline-block;
	
	border-radius: 5px;
	-webkit-border-radius: 5px;
	-moz-border-radius: 5px;
	
	transition: all 0.5s;
	-webkit-transition: all 0.5s;
	-moz-transition: all 0.5s;
}

/*Time for some hover effects*/
/*We will apply the hover effect the the lineage of the element also*/
.tree li .node:hover, .tree li .node:hover+ul li .node {
	background: #c8e4f8; color: #000; border: 1px solid #94a0b4;
}
/*Connector styles on hover*/
.tree li .node:hover+ul li::after, 
.tree li .node:hover+ul li::before, 
.tree li .node:hover+ul::before, 
.tree li .node:hover+ul ul::before{
	border-color:  #94a0b4;
}
</style>
