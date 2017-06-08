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
        token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
      }
    ]
  },
  {
    _id: userTwoId,
    email: 'jen@example.com',
    password: 'user2pwd',
    tokens: [
      {
        access: 'auth',
        token: jwt.sign({_id: userTwoId, access: 'auth'}, process.env.JWT_SECRET).toString()
      }
    ]
  }
];

const dummyTodos = [
  {
    _id: new ObjectID(),
    text: 'First test todo',
    _creator: userOneId
  },
  {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333,
    _creator: userTwoId
  }
];

const populateTodos = async () => {
  try {
    await Todo.remove({});
    await Todo.insertMany(dummyTodos);
    return Promise.resolve();
  } catch (e) {
    return Promise.reject(e);
  }
};

const populateUsers = async () => {
  try {
    await User.remove({});
    await new User(users[0]).save();
    await new User(users[1]).save();
    return Promise.resolve();
  } catch (e) {
    return Promise.reject(e);
  }
};

module.exports = {dummyTodos, users, populateTodos, populateUsers};
