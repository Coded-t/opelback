const scraper = require('./scraper');

async function test() {
    console.log('--- Testing Models ---');
    const models = await scraper.getGlobalModels();
    console.log('Models found:', models.length);
    if (models.length > 0) {
        const firstModel = models[0];
        console.log('Testing with model:', firstModel.name, firstModel.url);

        console.log('\n--- Testing Categories ---');
        const categories = await scraper.getModelCatalog(firstModel.url);
        console.log('Categories found:', categories.length);

        if (categories.length > 0) {
            const firstCategory = categories[0];
            console.log('Testing with category:', firstCategory.name, firstCategory.url);

            console.log('\n--- Testing Parts ---');
            const parts = await scraper.getCategoryParts(firstCategory.url);
            console.log('Parts found:', parts.length);
            if (parts.length > 0) {
                console.log('Sample part:', parts[0]);
            }
        }
    }
}

test().catch(err => console.error('Test failed:', err));
