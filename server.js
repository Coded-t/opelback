const express = require('express');
const cors = require('cors');
const scraper = require('./scraper');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Endpoints
app.get('/api/models', async (req, res) => {
    try {
        const models = await scraper.getGlobalModels();
        res.json(models);
    } catch (error) {
        res.status(500).json({ error: 'Failed to scrape models' });
    }
});

app.get('/api/specs', async (req, res) => {
    const { url } = req.query;
    if (!url) {
        return res.status(400).json({ error: 'URL parameter is required' });
    }
    try {
        const specs = await scraper.getVehicleSpecs(url);
        res.json(specs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to scrape vehicle specifications' });
    }
});

app.get('/api/catalog', async (req, res) => {
    const { url } = req.query;
    if (!url) {
        return res.status(400).json({ error: 'URL parameter is required' });
    }
    try {
        const categories = await scraper.getModelCatalog(url);
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Failed to scrape catalog' });
    }
});

app.get('/api/parts', async (req, res) => {
    const { url } = req.query;
    if (!url) {
        return res.status(400).json({ error: 'URL parameter is required' });
    }
    try {
        const parts = await scraper.getCategoryParts(url);
        res.json(parts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to scrape parts' });
    }
});

app.post('/api/vin-lookup', async (req, res) => {
    const { vin } = req.body;
    if (!vin || vin.length !== 17) {
        return res.status(400).json({ error: 'Valid 17-digit VIN is required' });
    }
    try {
        const result = await scraper.searchByVin(vin);
        res.json(result);
    } catch (error) {
        const msg = error.message || '';
        if (msg.includes('Network error') || msg.includes('Could not resolve host')) {
            return res.json({
                found: false,
                message: 'Cannot connect to the parts database. Please check your internet connection and try again.'
            });
        }
        res.status(500).json({ error: 'VIN lookup failed' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
