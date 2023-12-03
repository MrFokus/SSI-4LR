const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors');
const kohonen = require('./kohonen')
app.use(cors());
app.use(bodyParser.json())
app.post('/',(req,res)=>{
    res.json(kohonen.main(req.body.points,req.body.clusters))
})
app.listen(3001)