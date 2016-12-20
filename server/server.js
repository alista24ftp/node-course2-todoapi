require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((todo) => {
    res.send(todo);
  }, (err) => {
    res.status(400).send(err);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (err) => {
    res.status(400).send(err);
  });
});

app.get('/todos/:id', (req, res) => {
  var todoId = req.params.id;
  if(!ObjectID.isValid(todoId)){
    return res.status(404).send();
  }
  Todo.findById(todoId).then((todo) => {
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((err) => {
    res.status(400).send();
  });
});

app.delete('/todos/:id', (req, res) => {
  var todoId = req.params.id;
  if(!ObjectID.isValid(todoId)){
    return res.status(404).send();
  }
  Todo.findByIdAndRemove(todoId).then((todo) => {
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((err) => {
    res.status(400).send();
  });
});

app.patch('/todos/:id', (req, res) => {
  var todoId = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);
  if(!ObjectID.isValid(todoId)){
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  }else{
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(todoId, {$set: body}, {new: true})
    .then((todo) => {
      if(!todo){
        return res.status(404).send();
      }
      res.send({todo});
    }).catch((err) => {
      res.status(400).send();
    });
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {
  app
};
