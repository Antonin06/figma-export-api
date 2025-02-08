import FigmaApiClient from './api/FigmaApiClient.js';
import ThemeGenerator from './generators/ThemeGenerator.js';
import ScssGenerator from './generators/ScssGenerator.js';
import { 
    rgbToHex,
    isColorRelevant,
    extractColors,
    getColorMapper
} from './utils/ColorUtils.js';
import ColorMapper from './services/ColorMapper.js';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config({path: '../.env'});

const fileKey = process.env.FIGMA_FILE_ID;
const token = process.env.FIGMA_API_TOKEN;
const outputPath = process.env.GENERATED_FILES_PATH || '../generated-files';

const colorMapper = new ColorMapper(getColorMapper());

async function main() {
    try {
        const apiClient = new FigmaApiClient(token);
        const data = await apiClient.getFile(fileKey);

        // Extraction des couleurs
        const colors = extractColors(data.document);
        const namedColors = colorMapper.mapColors(colors);

        // Générer theme.json
        const themeJson = {
            ...ThemeGenerator.generate(namedColors),
        };
        fs.writeFileSync(`${outputPath}/theme.json`, JSON.stringify(themeJson, null, 2));
        console.log('Fichier theme.json généré.');

        // Générer colors.scss
        const scssVariables = ScssGenerator.generate(namedColors);
        fs.writeFileSync(`${outputPath}/colors.scss`, scssVariables);
        console.log('Fichier colors.scss généré.');

    } catch (error) {
        console.error('Erreur:', error);
    }
}

main();