const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [
  {
    _id: userOneId,
    email: 'john@example.com',
    password: 'user1pwd',
    tokens: [
      {
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
      }
    ]
  },
  {
    _id: userTwoId,
    email: 'jen@example.com',
    password: 'user2pwd'
  }
];

const dummyTodos = [
  {
    _id: new ObjectID(),
    text: 'First test todo'
  },
  {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
  }
];

const populateTodos = (done) => {
  Todo.remove({})
    .then(() => {
      return Todo.insertMany(dummyTodos);
    })
    .then(() => done())
    .catch((err) => done(err));
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo]);
  }).then(() => done()).catch((err) => done(err));
};

module.exports = {dummyTodos, users, populateTodos, populateUsers};
