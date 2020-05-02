const cli = require('commander');
const inquirer = require('inquirer');
const pkg = require('./package.json');
const path = require('path');
const {create, remove, list} = require('./src/shellcut');

cli.version(pkg.version);

cli.command('create <call> <command>')
.description("create command")
.option('-f, --force', 'ignore already saved same call name.', false)
.action(function(call, command) {
    if(this.force !== true) {
        inquirer.prompt([
            {
                type: 'confirm',
                name: 'proceed',
                message: `'${call}' is already exist. do you want proceed?`,
                default: false
            }
        ]).then(function(answer) {
            if(answer.proceed) {
                create(call, command);
            }
        });
    }
    else {
        create(call, command);
    }
});

cli.command('list')
.option('-c, --call <arg>', 'filter by call name.')
.option('-o, -command <arg>', 'filter by original command.')
.action(function() {
    list(this.call, this.command);
});

cli.command('remove <call>')
.option('-f, -force', "ignore confirm")
.action(function(call) {
    if(this.force !== true) {
        inquirer.prompt([
            {
                type: 'confirm',
                name: 'proceed',
                message: `'${call}' is already exist. do you want proceed?`,
                default: false
            }
        ]).then(function(answer) {
            if(answer.proceed) {
                remove(call);
            }
        });
    }
});

cli.parse(process.argv);