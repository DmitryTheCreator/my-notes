import ApiResponse from "../helpers/apiResponse.js"
import jwt from "jsonwebtoken"
import 'dotenv/config';

export default function(req, res, next) {
  if (req.method == 'OPTIONS') {
    next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return next(ApiResponse.Unauthorized('Пользователь не авторизован', null))
    }
    const decodedData = jwt.verify(token, process.env.SECRET_KEY)
    req.user = decodedData
    next()
  } catch(error) {
    return next(ApiResponse.Forbidden(error.nessage, null))
  }
}