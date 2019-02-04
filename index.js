const chalk = require('chalk');
const figlet = require('figlet');

const init = () => {
  console.log(
    chalk.blue(
      figlet.textSync('Login to IG', {
        font: 'Standard',
        horizontalLayout: 'default',
        verticalLayout: 'default'
      })
    )
  );
};

const run = async () => {
  init();
};

run();