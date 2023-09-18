import ApiResponse from '../helpers/apiResponse.js';

export default function(req, res, next) {
  if (req.user.active === 'DEACTIVATED') {
    return next(ApiResponse.Forbidden('Ваш аккаунт деактивирован', null));
  }
  next();
}