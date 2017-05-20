const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var message = 'I am user number 3';
var hash = SHA256(message).toString();

console.log(`Message: ${message}`);
console.log(`Hash: ${hash}`);

//////////////////////////////////////////

var data = {
  id: 4
};
var token = {
  data,
  hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
};

// Man-in-the-middle: user with id 4 wants to change user 5's data
token.data.id = 5;
token.hash = SHA256(JSON.stringify(data)).toString();
// Attempt will fail since user 4 doesn't have access to user 5's 'somesecret' salt

var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
if(resultHash === token.hash){
  console.log('Data was not changed');
}else{
  console.log('Data was changed, reject');
}

////////////////////////////////////////////

// JSON Web Token Example
var data = {
  id: 10
};

var token = jwt.sign(data, '123abc');
console.log(token);
var decoded = jwt.verify(token, '123abc');
console.log(decoded);

///////////////////////////////////////////

// Bcrypt password hashing Example
var pwd = '123abc!';
bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(pwd, salt, (err, hash) => {
    console.log(hash);
  });
});
var hashedPwd = '$2a$10$tV6KfVE5jsd9QQpH/EV2pOhcpkl4b9nFQ6CHpWOtbVa2PpN0bxeem';
bcrypt.compare(pwd, hashedPwd, (err, res) => {
  console.log('Plain and hashed passwords match:', res);
});
