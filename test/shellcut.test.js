const shellcut = require('../src/shellcut');
const fs = require('fs');
const path = require('path');
const __approot = path.resolve(__dirname, '..');

test('create shellcut test', () => {
    const call = 'test';
    const command = 'echo shellcut test';
    let filename = shellcut.getfilename(call);
    shellcut.create(call, command);
    path.parse("npm");
    expect(fs.existsSync(path.join(__approot, filename))).toBe(true);
});