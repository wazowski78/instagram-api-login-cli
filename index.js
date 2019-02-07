const chalk = require('chalk');
const inquirer = require('inquirer');
const figlet = require('figlet');
const shell = require('shelljs');
const path = require('path');


const init = () => {
  // Output message to chalk in blue
  const message = 'Login to IG';
  const outputConfig = {
    font: 'Standard',
    horizontalLayout: 'default',
    verticalLayout: 'default'
  };
  console.log(
    chalk.blue(
      figlet.textSync(message, outputConfig)
    )
  );
};

const askQuestions = () => {
  const questions = [{
    type: 'input',
    name: 'USERNAME',
    message: 'What is your username?',
    validate: input => (input.length > 0) ? true : 'Enter a valid username.'
  }, {
    type: 'password',
    name: 'PASSWORD',
    mask: '*',
    message: (prevAnswers) => {
      return `${prevAnswers.USERNAME}, what is your password?`
    },
    validate: input => (input.length > 0) ? true : 'Enter a valid password.'
  }, {
    type: 'input',
    name: 'FILENAME',
    default: prevAnswers => `${prevAnswers.USERNAME}.cookie.json`,
    message: "File name (ends with '.cookie.json')",
    validate: (input) => {
      if(input.endsWith('.cookie.json')) {
        return true;
      }
      return "File name must end with '.cookie.json'";
    }
  }];
  return inquirer.prompt(questions);
};

const run = async () => {
  init();

  const answers = await askQuestions();

  // TODO: use username and password to login, save cookie to file
  const {
    USERNAME,
    PASSWORD,
    FILENAME
  } = answers;

  // TODO: login and make new file inside cookie folder with json file

  shell.touch(`./cookies/${FILENAME}`);

  

};

run();