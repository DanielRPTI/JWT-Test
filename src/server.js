import express from "express";

const api = express();

api.get('/', (req, res) => {return res.send('Test')})



app.listen(3030);