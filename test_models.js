const scraper = require('./scraper');

async function test() {
    try {
        console.log('Fetching global models...');
        const models = await scraper.getGlobalModels();
        console.log('Found models:', models.length);
        console.log('Sample:', JSON.stringify(models.slice(0, 3), null, 2));
    } catch (e) {
        console.error('Test failed:', e.message);
    }
}

test();
