const path = require('path');
const fs = require('fs');

const __FILE_NAME = 'cmd.json';
const __SAVE_PATH = path.join(__dirname, __FILE_NAME);

let shellcut = [
    {
        call: "call",
        command: "command",
        insertdate: Date.now()
    }
];

function createFileifNeed() {
    if(fs.existsSync(__SAVE_PATH) !== false) {
        fs.writeFileSync(__SAVE_PATH, []);
    }
}

function exportCMD() {
    createFileifNeed();
    JSON.parse(fs.readFileSync(__SAVE_PATH));
}

function importCMD(cmd, command) {
    createFileifNeed();
}

/**
 * create new shellcut.
 * @param {string} call 
 * @param {string} command 
 */
exports.create = function(call, command) {
    
}

/**
 * remove existed shellcut.
 * @param {string} call 
 */
exports.remove = function(call) {

}

/**
 * @param {string} call contains by call name.
 * @param {string} call contains by original command line.
 */
exports.list = function(call, command) {

}