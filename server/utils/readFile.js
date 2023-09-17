// In this modules, Read HTML, CSS, JavaScript code
const fs = require('fs');
const path = require('path');
const address = '../../client/';

function readFile(url, func) {
    const filePath = path.join(__dirname, address, url);
    fs.readFile(filePath, func);
}

module.exports = { readFile };