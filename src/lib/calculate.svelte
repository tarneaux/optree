<script lang="ts">
    import { onMount } from 'svelte';

    export function calculate(node: Element): number {

        let leftChild = node.nextElementSibling?.firstChild?.firstChild;
        let rightChild = node.nextElementSibling?.firstChild?.nextSibling?.firstChild;

        if (leftChild instanceof Element && rightChild instanceof Element) {
            let leftValue: number;
            let rightValue: number;

            if (leftChild.textContent && ["+", "-", "*", "/"].includes(leftChild.textContent)) {
                leftValue = calculate(leftChild);
            } else if (leftChild.textContent) {
                leftValue = parseFloat(leftChild.textContent);
            } else {
                throw new Error('Left child has no value');
            }

            if (rightChild.textContent && ["+", "-", "*", "/"].includes(rightChild.textContent)) {
                rightValue = calculate(rightChild);
            } else if (rightChild.textContent) {
                rightValue = parseFloat(rightChild.textContent);
            } else {
                throw new Error('Right child has no value');
            }

            if (node.textContent) {
                switch (node.textContent) {
                    case '+':
                        return leftValue + rightValue;
                    case '-':
                        return leftValue - rightValue;
                    case '*':
                        return leftValue * rightValue;
                    case '/':
                        return leftValue / rightValue;
                    default:
                        throw new Error(`Unknown operator: ${node.textContent}`);
                }
            } else {
                throw new Error('Node has no operator');
            }
        } else {

            throw new Error('Node has no children or children are not elements');
        }
    }

    onMount(() => {
        let root = document.querySelector('.tree')?.querySelector('ul')?.querySelector('li')?.querySelector('.node');
        if (root instanceof Element) {
            console.log(calculate(root));
        }
    });

</script>
