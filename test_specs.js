const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'adam_red.html'), 'utf8');
const $ = cheerio.load(html);

const specs = [];
$('tr').each((i, el) => {
    const cells = $(el).find('td');
    if (cells.length >= 3) {
        const year = cells.eq(0).text().trim();
        const engine = cells.eq(1).text().trim();
        const transmission = cells.eq(2).text().trim();
        const url = $(el).find('a').attr('href');

        if (year && engine && transmission && url) {
            specs.push({ year, engine, transmission, url });
        }
    }
});

console.log(JSON.stringify(specs.slice(0, 5), null, 2));
console.log('Total specs found:', specs.length);
