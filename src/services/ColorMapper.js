export default class ColorMapper {
    constructor(getNearestColor) {
        this.getNearestColor = getNearestColor;
    }

    mapColors(colors) {
        return colors.map(hex => {
            const nearest = this.getNearestColor(hex);
            return {
                hex,
                name: nearest.name
                .toLowerCase()
                .replace(/\s+/g, '-')         
                .replace(/['’]/g, '')         
                .replace(/[^a-z0-9\-]/g, '')
            };
        });
    }
}