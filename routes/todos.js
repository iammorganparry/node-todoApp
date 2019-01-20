const express = require('express');
const router = express.Router();
const db = require('../models');
// const app = express();


//Main get request to API 
router.get('/', (req,res) => {
    db.Todo.find()
    .then((todos) => {
        res.json(todos);
    })
    .catch((err) => {
        res.send(err);
    })
});

//POST 
router.post('/',(req,res) => {
    db.Todo.create(req.body)
    .then((newTodo) => {
        res.status(201).json(newTodo);
    }).catch((err) => {
        res.send(err);
    });
    // res.send(req.body);
});

//GET Specific task
router.get('/:id',(req,res) => {
    console.log(req.params);
    db.Todo.findById(req.params.id)
    .then((todo) => {
        res.send(todo);
    })
    .catch((err) => {
        res.send(err);
        console.log(err);
    });
});

//Update a task
router.put('/:id',(req,res) => {
    db.Todo.findOneAndUpdate({_id : req.params.id},req.body, {new: true})
    .then((todo) => {
        res.send(todo);
    })
    .catch((err) => {
        res.send(todo);
    })
});

router.delete('/:id', (req,res) => {
    db.Todo.deleteOne({_id: req.params.id})
    .then((todo) => {
        res.send(todo);
    })
    .catch((err) => {
        res.send(err);
    })
});
//Delete route 

module.exports = router;