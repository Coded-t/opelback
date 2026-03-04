const cheerio = require('cheerio');
const fs = require('fs');

const html = fs.readFileSync('C:/Users/ACER/3D Objects/first/adam_catalog.html', 'utf8');
const $ = cheerio.load(html);

const categories = [];
$('a[href*="/parts-catalog/"]').each((i, el) => {
    const href = $(el).attr('href');
    const name = $(el).text().trim();
    if (href && name && name.length > 2) {
        categories.push({ name, href });
    }
});

console.log('Total links found:', categories.length);
console.log('Sample links:', categories.slice(0, 20));
