const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

function readInput (filePath) {
    return readFile(filePath, 'utf8')
        .then((data) => data.split(/\n/))
        .catch((err) => Promise.reject(
            new Error(`read(${filePath} failed due to ${util.inspect(err)}`)
        ));
}

module.exports = readInput;
