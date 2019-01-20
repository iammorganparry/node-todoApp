const mongoose = require('mongoose');
mongoose.set('debug',true);
mongoose.connect('mongodb+srv://morgan_parry:imP52NKZRE1hbVrE@nodeproject-vefn0.gcp.mongodb.net/test?retryWrites=true');
mongoose.Promise = Promise;


module.exports.Todo = require('./todo');