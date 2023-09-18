import ApiResponse from "../helpers/apiResponse.js"
import jwt from "jsonwebtoken"
import 'dotenv/config';

export default function(role) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next()
    }

    try {
      const token = req.headers.authorization.split(' ')[1]
      if (!token) {
        return next(ApiResponse.Unauthorized('Пользователь не авторизован', null))
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY)
      if (decoded.role !== role) {
          return next(ApiResponse.Forbidden('У вас нет доступа', null))
      }
      req.user = decoded;
      next();
    } catch(error) {
      return next(ApiResponse.Forbidden(error.message, null))
    }
  }
}