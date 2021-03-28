const path = require('path');
const spawnSync = require('cross-spawn').sync;

exports.__prefix = '__';
exports.__cmdpath = (() => { 
    let npm_path = "";
    if(process.env.NODE_ENV == "development") {
        npm_path = spawnSync('npm', ['root']).stdout.toString();
    }
    else {
        npm_path = spawnSync('npm', ['root', '-g']).stdout.toString();
    }
    let result = path.resolve(npm_path, '..');
    return result;
 })();
