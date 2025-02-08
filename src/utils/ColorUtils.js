import nearestColor from 'nearest-color';
import { colornames } from 'color-name-list';

export function rgbToHex({ r, g, b }) {
    return (
        '#' +
        [r, g, b]
            .map(x => Math.round(x * 255).toString(16).padStart(2, '0'))
            .join('')
    );
}

export function isColorRelevant(hex) {
    const irrelevantColors = ['#000000', '#ffffff'];
    return !irrelevantColors.includes(hex);
}

export function extractColors(node) {
    const colorSet = new Set();

    function traverse(node) {
        if (node.type === 'TEXT') return;

        if (node.fills && node.fills.length > 0) {
            const fill = node.fills[0];

            if (fill.type === 'SOLID') {
                const hex = rgbToHex(fill.color);

                if (isColorRelevant(hex)) {
                    colorSet.add(hex);
                }
            }
        }

        if (node.children) {
            node.children.forEach(traverse);
        }
    }

    traverse(node);
    return Array.from(colorSet);
}

export function getColorMapper() {
    const colorsList = colornames.reduce((acc, { name, hex }) => {
        acc[name] = hex;
        return acc;
    }, {});

    return nearestColor.from(colorsList);
}