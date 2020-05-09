const path = require('path');
const fs = require('fs');
const { __cmdpath, __prefix } = require('../define');

// const __prefix = '__';
// const __approot = path.resolve(__dirname, '..');

function getfilename(call) {
    let ext = "";
    if (process.platform === 'win32') {
        ext = '.cmd';
    }
    // else if (process.platform === 'linux') {
    //     ext = '';
    // }
    return __prefix + call + ext;
}

exports.getfilename = getfilename;
/**
 * create new shellcut.
 * @param {string} call 
 * @param {string[]} command 
 * @returns {string} created shell file name.
 */
exports.create = function (call, command) {
    const filename = getfilename(call);
    fs.writeFileSync(path.join(__cmdpath, filename), command);
    return filename;
}

/**
 * remove existed shellcut.
 * @param {string} call 
 */
exports.remove = function (call) {
    const filename = getfilename(call);
    fs.unlinkSync(path.join(__cmdpath, filename));
}

/**
 * @param {string} call contains by call name.
 * @param {string} call contains by original command line.
 * @returns {Array} returns shellcut files name. filename started __prefix
 */
exports.list = function (call, command) {
    let result = [];
    fs.readdirSync(__cmdpath).forEach((file) => {
        const notvalue = [undefined, null];
        let isContainCall = notvalue.includes(call);
        let isContainCmd = notvalue.includes(command);
        if (file.includes(__prefix)) {
            if(!isContainCall) {
                isContainCall = file.includes(call);
            }
            if(!isContainCmd) {
                isContainCmd = fs.readFileSync(path.join(__cmdpath, file)).toString().includes(command);
            }
            if(isContainCall && isContainCmd){
                result.push(file);
            }
        }
    });
    return result;
}

/**
 * check cmd file exist.
 * @param {string} call
 */
exports.isExist = function(call) {
    return fs.existsSync(path.join(__cmdpath, getfilename(call)));
}