const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // deleteMany
  db.collection('Users')
    .deleteMany({name: 'John'})
    .then((result) => {
      console.log("Multiple users deleted", result.result);
    }, (err) => {
      console.log('Unable to delete user', err)
    });

  // deleteOne
  db.collection('Todos')
    .deleteOne({text: 'Eat lunch'})
    .then((result) => {
      console.log("One todo deleted", result.result);
    }, (err) => {
      console.log('Unable to delete todo', err);
    });

  // findOneAndDelete
  db.collection('Users')
    .findOneAndDelete({_id: new ObjectID("5850662566820fbae5564356")})
    .then((result) => {
      console.log("Deleted user", result.value);
    }, (err) => {
      console.log('Unable to delete user', err);
    });

  db.close();
});
