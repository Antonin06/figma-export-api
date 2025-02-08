class ScssGenerator {
    static generate(colors) {
        return colors.map(({ hex, name }) => `$${name}: ${hex};`).join('\n');
    }
}

export default ScssGenerator;