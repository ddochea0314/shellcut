const path = require('path');
const spawnSync = require('cross-spawn').sync;

exports.__prefix = '__';
exports.__cmdpath = (() => { 
    let result = path.resolve(spawnSync('npm', ['root', '-g']).stdout.toString(), '..');
    return result;
 })();
