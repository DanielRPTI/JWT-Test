import express from "express";
import jsonwebtoken from "jsonwebtoken";
import {user, PRIVATE_KEY, tokenValited} from "./middleware/auth.js"

const api = express();
api.use(express.json())

api.get('/', (res, req) => res.status(200).json({
  message: 'This is a Public Router...'
}))

api.get('/login', (req, res) => {
  const [, hash] = req.headers.authorization?.split(' ') || [' ', ' ']
  const [email, password] = Buffer.from(hash, 'base64').toString().split(':')

  try {
    const correctPassword = email === 'test@gmail.com' && password === '123456'

    if(!correctPassword) return res.status(401).send('Password or E-mail incorrect!')

    const token  = jsonwebtoken.sign(
      {user: JSON.stringify(user)},
      PRIVATE_KEY,
      {expiresIn: '60m'}
    )
  
    return res.status(200).json({data: {user, token} })
  } catch (error) {
    console.log(error)
    return res.send(error)
  }
})

api.use('*', tokenValited)

api.get('/private', (req, res) =>{
  const {user} =  req.headers
  const currentUser = JSON.parse(user)
  return res.status(200).json({
    message: 'This is a PRIVATE router ...',
    data: {
      userLogged: currentUser
    }
  })
})


app.listen(3030 , () => console.log('Server is running...'));