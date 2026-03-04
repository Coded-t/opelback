const scraper = require('./scraper');

async function test() {
    console.log('Testing global model scraping with CURL fallback...');
    try {
        const models = await scraper.getGlobalModels();
        console.log(`Successfully found ${models.length} models.`);
        if (models.length > 0) {
            console.log('Sample model:', models[0]);
        }
    } catch (error) {
        console.error('Test failed with error:', error.message);
        if (error.stderr) {
            console.error('Stderr:', error.stderr.toString());
        }
    }
}

test();
