const express = require('express');
const app = express();
const logger = require('morgan');



app.use(logger('dev'));
app.use(express.static('public'));
app.get('/', (req,res) =>{
  console.log(req.body);
  res.redirect('/static/index.html');
});



app.listen(3000, () =>{
    console.log(`Localhost est http://127.0.0.1:3000`);
});
