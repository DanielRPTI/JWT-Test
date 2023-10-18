import express from "express";
import jsonwebtoken from "jsonwebtoken";



const api = express();

api.get('/', (req, res) => {return res.send('Test')})



app.listen(3030);