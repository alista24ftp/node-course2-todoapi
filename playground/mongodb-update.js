const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  db.collection('Todos')
    .findOneAndUpdate({
      _id: new ObjectID('5855bf93002b762028a25d0b')
    }, {
      $set: {
        completed: false
      }
    }, {
      returnOriginal: false
    })
    .then((result) => {
      console.log('Updated todo', result);
    }, (err) => {
      console.log('Unable to update todo', err);
    });

  db.collection('Users')
    .findOneAndUpdate({
      _id: new ObjectID('5854d101002b762028a25bea')
    }, {
      $set: {
        name: 'John'
      },
      $inc: {
        age: 1
      }
    }, {
      returnOriginal: false
    })
    .then((result) => {
      console.log('Updated user', result);
    }, (err) => {
      console.log('Unable to update user', err)
    });

  db.close();
});
