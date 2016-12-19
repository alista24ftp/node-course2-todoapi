const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var todoId = '58583e2b48b76618acb3dcb2';
var userId = '5855cebc0007d8145ca28d1b';
if(!ObjectID.isValid(todoId)){
  console.log('todo id not valid');
}
if(!ObjectID.isValid(userId)){
  console.log('user id not valid');
}

Todo.find({
  _id: todoId
}).then((todos) => {
  console.log('Todos', todos);
}).catch((err) => {
  console.log('Unable to find todos', err);
});

Todo.findOne({
  _id: todoId
}).then((todo) => {
  if(!todo){
    return console.log('todo id not found');
  }
  console.log('Todo', todo);
}).catch((err) => {
  console.log('Unable to find todo', err);
});

Todo.findById(todoId).then((todo) => {
  if(!todo){
    return console.log('todo id not found');
  }
  console.log('Todo by id', todo);
}).catch((err) => {
  console.log('Unable to find todo by id', err);
});

User.findById(userId).then((user) => {
  if(!user){
    return console.log('user id not found');
  }
  console.log('User by id', user);
}).catch((err) => {
  console.log('Unable to find user by id', err);
});
