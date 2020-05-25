#!/usr/bin/env node

const cli = require('commander');
const inquirer = require('inquirer');
const pkg = require('./package.json');
const define = require('./define');
const {create, remove, list, isExist, getfilename, getcallname} = require('./src/shellcut');

cli.version(pkg.version);

cli.command('create <call> <cmd...>') // <name> : require, [name] : option
.description('create cmd')
.option('-f, --force', 'ignore already saved same call name.', false)
.action(function(call, cmd) {
    if(this.force !== true && isExist(call)) {
        inquirer.prompt([
            {
                type: 'confirm',
                name: 'proceed',
                message: `'${call}' is already exist. will be replaced. do you want proceed?`,
                default: false
            }
        ]).then(function(answer) {
            if(answer.proceed) {
                create(call, cmd);
            }
        });
    }
    else {
        create(call, cmd);
    }
});

cli.command('list')
.description('show existed shellcut commands.')
.option('-c, --call <arg>', 'filter by call name.')
.option('-o, --cmd <arg>', 'filter by original cmd.')
.action(function() {
    const result = list(this.call, this.cmd);
    console.log(result);
});

cli.command('remove <call>')
.description('remove shellcut command.')
.option('-f, --force', "ignore confirm", false)
.action(function(call) {
    if(this.force !== true) {
        inquirer.prompt([
            {
                type: 'confirm',
                name: 'proceed',
                message: `This task cannot be undone. do you want proceed?`,
                default: false
            }
        ]).then(function(answer) {
            if(answer.proceed) {
                remove(call);
            }
        });
    }
    else {
        remove(call);
    }
});

cli.command('clear')
.description('remove all shellcut commands.')
.option('-f', '--force', 'ignore confirm', false)
.action(function() {
    if(this.force !== false){
        inquirer.prompt([
            {
                type: 'confirm',
                name: 'proceed',
                message: `This task cannot be undone. do you want proceed?`,
                default: false
            }
        ]).then(function(answer) {
            if(answer.proceed) {
                list().forEach(elem => {
                    const call = getcallname(elem);
                    remove(call); 
                });
            }
        });
    }
});

cli.parse(process.argv);
