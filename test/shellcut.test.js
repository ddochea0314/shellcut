const shellcut = require('../src/shellcut');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const { __approot } = require('../define');

test('create and remove shellcut.', () => {
    const call = 'test';
    const command = 'echo shellcut test';
    const filename = shellcut.create(call, command);
    expect(fs.existsSync(path.join(__approot, filename))).toBe(true);
    shellcut.remove(call);
    expect(fs.existsSync(path.join(__approot, filename))).toBe(false);
});

test('show list shellcut.', () => {
    const getfilename = shellcut.getfilename;
    const calls = ['test', 'hello', 'nodev', 'test2'];
    const commands = ['echo shellcut test', 'echo hello world!', 'node --version', 'echo test2'];
    let filenames = [];
    let i = 0;
    calls.forEach(call => {
        filenames.push(shellcut.create(call, commands[i]));
        i++;
    });
    let result = shellcut.list();
    let target = [];
    expect(_.isEqual(_.xor(result, filenames), target)).toBe(true); // show all list
    
    result = shellcut.list('test').sort();
    target = [getfilename('hello'), getfilename('nodev')].sort();
    expect(_.isEqual(_.xor(result, filenames), target)).toBe(true); // search by call name
    
    result = shellcut.list(undefined, 'echo').sort();
    target = [getfilename('nodev')].sort();
    expect(_.isEqual(_.xor(result, filenames), target)).toBe(true); // search by command

    result = shellcut.list('test', 'shell').sort();
    target = [getfilename('test')].sort();
    expect(_.isEqual(_.intersection(result, filenames), target)).toBe(true); // search by both

    calls.forEach(call => {
        shellcut.remove(call);
    });
});