const describe = require('chai').describe;
require('socket.io-client');

describe('Pharos Socket Interface', () => {
  const users = [];
  const tokens = [];
  before((done) => {
    fetch('/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Augustus',
      }),
    })
      .then(res => res.json())
      .then((json) => {
        tokens.push(json.token);
        connectSocket(json.userID);
      });
  });
});
