const path = require('path');
const fs = require('fs');

const __prefix = 's@';
// const __approot = path.resolve(__dirname, '..');
const { __approot } = require('../approot');

function getfilename(call) {
    let ext = "";
    if (process.platform === 'win32') {
        ext = '.cmd';
    }
    else if (process.platform === 'linux') {
        ext = '';
    }
    return __prefix + call + ext;
}

exports.getfilename = getfilename;
/**
 * create new shellcut.
 * @param {string} call 
 * @param {string} command 
 */
exports.create = function (call, command) {
    const filename = getfilename(call);
    fs.writeFileSync(path.join(__approot, filename), command);
}

/**
 * remove existed shellcut.
 * @param {string} call 
 */
exports.remove = function (call) {
    const filename = getfilename(call);
    fs.unlinkSync(path.join(__approot, filename));
}

/**
 * @param {string} call contains by call name.
 * @param {string} call contains by original command line.
 * @returns {Array} returns shellcut files name. filename started $$
 */
exports.list = function (call, command) {
    let result = [];
    fs.readdirSync(__approot).forEach((file) => {
        if (file.includes(__prefix)) {
            result.push(file);
        }
    });
    return result;
}