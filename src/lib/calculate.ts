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
        return NaN;
    }
}

export function calculateAndShow() {
    const target_number = parseInt(document.getElementById('target_number')?.textContent?.slice(-2) || '0');

    const root = document.querySelector('.tree')?.querySelector('ul')?.querySelector('li')?.querySelector('.node');
    if (root instanceof Element) {
        const result = calculate(root);
        let result_text: string;
        let distance_text: string;
        if (isNaN(result)) {
            result_text = "Arbre incomplet";
            distance_text = "Distance : " + target_number.toString();
        } else {
            result_text = "Résultat : " + result.toString();
            distance_text = "Distance : " + Math.abs(result - target_number).toString();    
        }
        console.log(result_text);
        console.log(distance_text);
        document.getElementById('distance')!.textContent = distance_text;
        document.getElementById('result')!.textContent = result_text;

    }
}
