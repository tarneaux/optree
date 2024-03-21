export const operators = ['+', '-', '*', '/'];

function calculate(node: Element): number {
    if (!node.textContent) {
        return NaN;
    }
    if (!operators.includes(node.textContent)) {
        return parseFloat(node.textContent);
    } else {
        const leftChild = node.nextElementSibling?.firstChild?.firstChild;
        const rightChild = node.nextElementSibling?.firstChild?.nextSibling?.firstChild;
        if (!(leftChild instanceof Element && rightChild instanceof Element)) {
          throw new Error('Node has no children');
        }
        switch (node.textContent) {
          case '+': return calculate(leftChild) + calculate(rightChild);
          case '-': return calculate(leftChild) - calculate(rightChild);
          case '*': return calculate(leftChild) * calculate(rightChild);
          case '/': return calculate(leftChild) / calculate(rightChild);
        }
    }
}

export function calculateAndShow() {
    const root = document.querySelector('.tree')?.querySelector('ul')?.querySelector('li')?.querySelector('.node');
    if (root instanceof Element) {
        let result = calculate(root);
        if (isNaN(result)) {
            result = "Arbre incomplet";
        } else {
            result = "Résultat: " + result.toString();
        }
        console.log(result);
        document.getElementById('result')!.textContent = result;
    }
}
