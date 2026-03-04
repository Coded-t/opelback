const cheerio = require('cheerio');
const fs = require('fs');

const html = fs.readFileSync('adam_red.html', 'utf8');
const $ = cheerio.load(html);

console.log('Total a tags:', $('a').length);
$('a').each((i, el) => {
    const href = $(el).attr('href');
    const name = $(el).text().trim();
    if (href && href.includes('/parts-catalog/')) {
        console.log(`[${i}] Name: "${name}" | Href: "${href}"`);
    }
});
