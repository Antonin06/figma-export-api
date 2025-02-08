class FigmaApiClient {
    constructor(token) {
        this.token = token;
    }

    async getFile(fileKey) {
        const url = `https://api.figma.com/v1/files/${fileKey}`;
        const headers = { 'X-FIGMA-TOKEN': this.token };
        
        const response = await fetch(url, { headers });
        if (!response.ok) {
            throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }
        return response.json();
    }
}

export default FigmaApiClient;