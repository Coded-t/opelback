const scraper = require('./scraper');

async function testVin() {
    console.log('Testing VIN search...');
    // Real VIN from 7zap screenshot (Opel Astra G + Zafira A, 2002)
    const result = await scraper.searchByVin('W0L0TGF7522148841');
    console.log('Result:', result);
}

testVin();
