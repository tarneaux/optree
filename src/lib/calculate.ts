import { Houra } from './confetti';

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
        let distance = NaN;
        if (isNaN(result)) {
            distance = target_number;
            result_text = "Arbre incomplet";
            distance_text = "Distance : " + distance.toString();
        } else {
            distance = Math.abs(result - target_number)
            result_text = "Résultat : " + result.toString();
            distance_text = "Distance : " + distance.toString();    
        }
        const distanceElement = document.getElementById('distance')!;
        const resultElement = document.getElementById('result')!;
        distanceElement.textContent = distance_text;
        resultElement.textContent = result_text;

        if (distance === 0) {
            
            distanceElement.style.animation = "rainbow 2s"
            resultElement.style.animation = "rainbow 2s"

            new Audio("/good_result.wav").play();
            Houra();
        } 
        else {
            distanceElement.style.animation = "none"
            resultElement.style.animation = "none"

        }
    

    }
}
