function calculate(node: Element): number {
    if (!node.textContent) {
        throw new Error('Node has no value');
    }
    if (!["+", "-", "*", "/"].includes(node.textContent)) {
        return parseFloat(node.textContent);
    } else {
        const leftChild = node.nextElementSibling?.firstChild?.firstChild;
        const rightChild = node.nextElementSibling?.firstChild?.nextSibling?.firstChild;
        if (leftChild instanceof Element && rightChild instanceof Element) {
            switch (node.textContent) {
                case '+':
                    return calculate(leftChild) + calculate(rightChild);
                case '-':
                    return calculate(leftChild) - calculate(rightChild);
                case '*':
                    return calculate(leftChild) * calculate(rightChild);
                case '/':
                    return calculate(leftChild) / calculate(rightChild);
            }
        } else {
            throw new Error('Node has no children');
        }
    }
}

export default function calculateAndShow() {
    const root = document.querySelector('.tree')?.querySelector('ul')?.querySelector('li')?.querySelector('.node');
    if (root instanceof Element) {
        document.getElementById('result')!.textContent = calculate(root).toString();
        console.log(calculate(root));
    }
}
