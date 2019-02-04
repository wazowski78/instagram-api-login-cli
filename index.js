const chalk = require('chalk');
const inquirer = require('inquirer');
const figlet = require('figlet');
const shell = require('shelljs');
const path = require('path');
// const { V1 } = require('instagram-private-api');

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
  }, {
    type: 'input',
    name: 'DIRECTORY',
    message: 'Directory (/cookies/)',
    default: '/cookies/'
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
    DIRECTORY,
    FILENAME
  } = answers;

  // make cookies directory if not exists
  const fileDirectory = path.join(__dirname, DIRECTORY);
  shell.mkdir('-p', fileDirectory);

  // TODO: login and make new file inside directory folder with cookie file
};

run();