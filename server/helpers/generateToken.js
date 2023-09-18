import 'dotenv/config';
import jwt from 'jsonwebtoken'

export default function(id, email, role, active) {
  return jwt.sign(
      {id, email, role, active},
      process.env.SECRET_KEY,
      {expiresIn: '24h'}
  )
}