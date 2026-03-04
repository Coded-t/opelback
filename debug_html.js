const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'adam_red.html'), 'utf8');
const $ = cheerio.load(html);

// Search for all links that look like they lead to catalog sections
const links = [];
$('a').each((i, el) => {
    const href = $(el).attr('href');
    const text = $(el).text().trim();
    if (href && (href.includes('parts-catalog') || href.includes('section'))) {
        links.push({ text, href });
    }
});

console.log('Sample links:', JSON.stringify(links.slice(0, 10), null, 2));

// Log text content around "L2Z" (one of the engines in the user screenshot)
const l2zPos = html.indexOf('L2Z');
if (l2zPos !== -1) {
    console.log('Content around L2Z:', html.substring(l2zPos - 50, l2zPos + 200));
} else {
    console.log('L2Z not found');
}

// Log 2013 year content
const yearPos = html.indexOf('2013');
if (yearPos !== -1) {
    console.log('Content around 2013:', html.substring(yearPos - 50, yearPos + 200));
}
