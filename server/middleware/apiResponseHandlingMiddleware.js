import ApiResponse from '../helpers/apiResponse.js';

export default function (api, req, res, next) {
  if (api instanceof ApiResponse) {
    return res.status(api.status).json({
      status: api.status,
      error: api.error,
      message: api.message,
      data: api.data,
    });
  }
  return res.status(500).json({
    status: 500,
    error: true,
    message: 'Непредвиденная ошибка!',
    data: null,
  });
}