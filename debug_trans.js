const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'adam_red.html'), 'utf8');
const search = 'Transmission';
const pos = html.indexOf(search);

if (pos !== -1) {
    console.log(`Found "${search}" at position ${pos}`);
    // Log context (increased range)
    console.log('Context:', html.substring(pos - 200, pos + 2000));
} else {
    console.log(`"${search}" not found`);
}
