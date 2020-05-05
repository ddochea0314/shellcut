const path = require('path');
const fs = require('fs');

const __prefix = '$$';
const __approot = path.resolve(__dirname, '..');
exports.__prefix = () => __prefix;

// let shellcut = [
//     {
//         call: "call",
//         command: "command",
//         insertdate: Date.now()
//     }
// ];

// function createFileifNeed() {
//     if(fs.existsSync(__SAVE_PATH) !== false) {
//         fs.writeFileSync(__SAVE_PATH, []);
//     }
// }

// function exportCMD() {
//     createFileifNeed();
//     return JSON.parse(fs.readFileSync(__SAVE_PATH));
// }

// function importCMD(cmd, command) {
//     createFileifNeed();
// }

function getfilename(call) {
    let ext = "";
    if(process.platform === 'win32') {
        ext = '.cmd';
    }
    else if(process.platform === 'linux') {
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
exports.create = function(call, command) {
    const filename = getfilename(call);
    fs.writeFileSync(path.join(__approot, filename), command);
}

/**
 * remove existed shellcut.
 * @param {string} call 
 */
exports.remove = function(call) {
    fs.unlinkSync(path.join(__approot, __prefix + call));
}

/**
 * @param {string} call contains by call name.
 * @param {string} call contains by original command line.
 */
exports.list = function(call, command) {

}