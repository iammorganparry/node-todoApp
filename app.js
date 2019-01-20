const express = require('express');
const app = express();
let port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());



//Rooutes

let todoRoutes = require('./routes/todos');
//Index route
app.get('/',(req,res) => {
     res.send('Home Page!');
});
//User todo routes after api/todos
app.use('/api/todos',todoRoutes);





//Start server 
app.listen(process.env.PORT || 3000, () =>{
    console.log(`Server started on port ${port}`);
});


