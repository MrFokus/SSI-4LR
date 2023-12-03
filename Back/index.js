const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors');
const kohonen = require('./kohonen')
app.use(cors());
app.use(bodyParser.json())
app.get('/',(req,res)=>{
    res.json(kohonen.main())
})
app.listen(3001)