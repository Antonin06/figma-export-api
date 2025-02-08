class ThemeGenerator {
    static generate(colors) {
        return {
            settings: {
                color: {
                    palette: colors.map(({ hex, name }) => ({
                        slug: name,
                        color: hex,
                        name
                    }))
                }
            }
        };
    }
}

export default ThemeGenerator;