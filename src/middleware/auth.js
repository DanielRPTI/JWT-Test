import jsonwebtoken from "jsonwebtoken";

const jwt = jsonwebtoken();
export const PRIVATE_KEY = '1010FFF'
export const user = {
  name: 'Solus App',
  email: 'solus@unimedfranca.com.br'
}

export function tokenValited( req, res, next) {
  const [, token] = req.headers.authorization?.split(' ') || [' ', ' ']

  if(!token) return res.satatus(401).json({message:'Access denied. No token provided.'})

  try {
    const payload = jwt.verify()(token, PRIVATE_KEY);
    const userIdFromToken = typeof payload !== 'string' && payload.user;

    if(!user && !userIdFromToken){
      return res.send(401).json({message: 'Invalid token'})
    }
    req.headers['user'] = payload.user;

    return next();
  } catch (error) {
    console.log(error)
    return res.satatus(401).json({ message: 'Invalid Token'})
  }
}