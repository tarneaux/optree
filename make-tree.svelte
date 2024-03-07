<!--move this into lib/Tree.svelte to generate a tree of input elements -->
<script>
	import { onMount } from 'svelte';
  
	onMount(() => {
	  const tree = document.querySelector('.tree').querySelector('ul').querySelector('li').querySelector('.node');
	  function addLevel(parent, level) {

		const ul = document.createElement('ul');
		parent.appendChild(ul);

		for (let i = 0; i < 2; i++) {

		  const li = document.createElement('li');
		  ul.appendChild(li);

		  const node = document.createElement('div');
		  node.classList.add('node');
		  node.ondrop="drop(event)"
		  node.ondragover="event.preventDefault()"
		  
		  li.appendChild(node);
		  if (level > 1) {
			addLevel(li, level - 1);
		  }
		}
	  }
	  addLevel(tree, 4);
	});
  </script>