const chalk = require('chalk');
const inquirer = require('inquirer');
const figlet = require('figlet');
const path = require('path');
const { V1 } = require('instagram-private-api');

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
  const questions = [
    {
      type: 'input',
      name: 'USERNAME',
      message: 'What is your username?'
    }, {
      type: 'password',
      name: 'PASSWORD',
      mask: '*',
      message: (prevAnswers) => {
        return `${prevAnswers.USERNAME}, what is your password?`
      }
    }, {
      type: 'input',
      name: 'LOCATION',
      default: (prevAnswers) => {
        return `/passwords/${prevAnswers.USERNAME}.cookie.json`;
      }
    }
  ];
  return inquirer.prompt(questions);
};

const run = async () => {
  init();

  const answers = await askQuestions();

  // TODO: use username and password to login, save cookie to file
  // const { USERNAME, PASSWORD } = answers;

};

run();