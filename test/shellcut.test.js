const shellcut = require('../src/shellcut');
const fs = require('fs');

test('create shellcut test', () => {
    shellcut.create('test','echo shellcut test');
    expect(fs.existsSync(shellcut.__SAVE_PATH)).toBe(true);
    
});