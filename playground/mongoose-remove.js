const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

Todo.remove({}).then((todo) => {
  console.log(todo);
}, (err) => {
  console.log('Unable to remove todos', err);
});

Todo.findOneAndRemove({
  text: 'First test todo'
}).then((todo) => {
  console.log(todo);
}, (err) => {
  console.log('Unable to remove todo', err);
});

Todo.findByIdAndRemove('58584e75eb45e41818b996e1').then((todo) => {
  console.log(todo);
}, (err) => {
  console.log('Unable to remove todo', err);
});
