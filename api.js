const path = require('path');
const shell = require('shelljs');
const Client = require('instagram-private-api').V1;

exports.login = async (username, password) => {
  const device = new Client.Device(username);
  const storage = new Client.CookieFileStorage(path.join(__dirname, 'cookies', `${username}.cookie.json`));

  Client.Session.create(device, storage, username, password)
    .then((session) => {
      return [session, Client.Account.searchForUser(session, 'natgeo')]; // natgeo this time :)
    })
    .spread((session, account) => {
      return Client.Relationship.create(session, account.id);
    })
    .then(() => 'Logged you in!')
    .catch((error) => {
      shell.rm(`./cookies/${username}.cookie.json`);
      throw error;
    });
};